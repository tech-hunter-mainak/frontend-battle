<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import * as THREE from 'three';
  export let bgImageSrc: string = '';

  let canvas: HTMLCanvasElement;
  let renderer: THREE.WebGLRenderer;
  let animationId: number;
  let mouse = new THREE.Vector2(-1, -1); // -1 means no ripple
  let inject = false;
  let lastInjectTime = 0;
  let injectStrength = 0.5;

  // Shaders
  const simVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;
  // Ripple simulation: wave equation (ping-pong)
  const simFragmentShader = `
    varying vec2 vUv;
    uniform sampler2D prevTex;
    uniform sampler2D prevPrevTex;
    uniform vec2 uMouse;
    uniform float uTime;
    uniform float uInjectStrength;
    void main() {
      float center = texture2D(prevTex, vUv).r;
      float prev = texture2D(prevPrevTex, vUv).r;
      float sum = 0.0;
      sum += texture2D(prevTex, vUv + vec2(1.0, 0.0) / 512.0).r;
      sum += texture2D(prevTex, vUv + vec2(-1.0, 0.0) / 512.0).r;
      sum += texture2D(prevTex, vUv + vec2(0.0, 1.0) / 512.0).r;
      sum += texture2D(prevTex, vUv + vec2(0.0, -1.0) / 512.0).r;
      // Add diagonals for more propagation
      sum += texture2D(prevTex, vUv + vec2(1.0, 1.0) / 512.0).r;
      sum += texture2D(prevTex, vUv + vec2(-1.0, 1.0) / 512.0).r;
      sum += texture2D(prevTex, vUv + vec2(1.0, -1.0) / 512.0).r;
      sum += texture2D(prevTex, vUv + vec2(-1.0, -1.0) / 512.0).r;
      sum /= 8.0;
      float wave = (sum * 2.0 - prev);
      wave *= 0.998; // Less damping for more propagation
      // Inject ripple with strength
      float d = distance(vUv, uMouse);
      if (d < 0.01) wave += uInjectStrength * (0.01 - d);
      gl_FragColor = vec4(wave, 0.0, 0.0, 1.0);
    }
  `;
  // Render: use ripple map to distort background image and add glow
  const renderFragmentShader = `
    varying vec2 vUv;
    uniform sampler2D rippleTex;
    uniform sampler2D bgTex;
    uniform bool useBgImage;
    void main() {
      float h = texture2D(rippleTex, vUv).r;
      // Compute gradient for glow
      float dx = texture2D(rippleTex, vUv + vec2(1.0/512.0, 0)).r - texture2D(rippleTex, vUv - vec2(1.0/512.0, 0)).r;
      float dy = texture2D(rippleTex, vUv + vec2(0, 1.0/512.0)).r - texture2D(rippleTex, vUv - vec2(0, 1.0/512.0)).r;
      float grad = sqrt(dx*dx + dy*dy);
      float glow = smoothstep(0.02, 0.12, grad) * 0.7;
      vec2 offset = vUv + h * 0.06 * normalize(vUv - 0.5);
      vec3 bg = useBgImage ? texture2D(bgTex, offset).rgb : vec3(1.0);
      vec3 glowColor = mix(vec3(0.7,0.8,1.0), vec3(0.4,0.7,1.0), vUv.y);
      bg += glow * glowColor;
      // Add blue color to the ripple itself
      float rippleBlue = smoothstep(0.01, 0.08, abs(h)) * 0.7;
      bg = mix(bg, vec3(0.6,0.8,1.0), rippleBlue); // lighter blue
      gl_FragColor = vec4(bg, 1.0);
    }
  `;

  onMount(() => {
    if (!browser) return;
    const size = 512;
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setClearColor(0x000000, 0); // Transparent
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Scene/camera for simulation
    const simScene = new THREE.Scene();
    const simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    // Scene/camera for render
    const renderScene = new THREE.Scene();
    const renderCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Render targets for ping-pong
    const rtA = new THREE.WebGLRenderTarget(size, size, { type: THREE.FloatType });
    const rtB = new THREE.WebGLRenderTarget(size, size, { type: THREE.FloatType });
    const rtC = new THREE.WebGLRenderTarget(size, size, { type: THREE.FloatType });
    let prev = rtA, curr = rtB, next = rtC;

    // Simulation material
    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        prevTex: { value: null },
        prevPrevTex: { value: null },
        uMouse: { value: new THREE.Vector2(-1, -1) },
        uTime: { value: 0 },
        uInjectStrength: { value: 2.5 }
      },
      vertexShader: simVertexShader,
      fragmentShader: simFragmentShader
    });
    const simPlane = new THREE.PlaneGeometry(2, 2);
    const simMesh = new THREE.Mesh(simPlane, simMaterial);
    simScene.add(simMesh);

    // Load background image as texture (if provided)
    let renderMaterial: THREE.ShaderMaterial | undefined;
    if (bgImageSrc) {
      const loader = new THREE.TextureLoader();
      loader.load(bgImageSrc, (bgTexture) => {
        bgTexture.minFilter = THREE.LinearFilter;
        bgTexture.magFilter = THREE.LinearFilter;
        bgTexture.wrapS = bgTexture.wrapT = THREE.ClampToEdgeWrapping;
        renderMaterial = new THREE.ShaderMaterial({
          uniforms: {
            rippleTex: { value: null },
            bgTex: { value: bgTexture },
            useBgImage: { value: true }
          },
          vertexShader: simVertexShader,
          fragmentShader: renderFragmentShader,
          transparent: true
        });
        const renderMesh = new THREE.Mesh(simPlane, renderMaterial);
        renderScene.add(renderMesh);
        animateLoop();
      });
    } else {
      // No image: use white background
      renderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          rippleTex: { value: null },
          bgTex: { value: null },
          useBgImage: { value: false }
        },
        vertexShader: simVertexShader,
        fragmentShader: renderFragmentShader,
        transparent: true
      });
      const renderMesh = new THREE.Mesh(simPlane, renderMaterial);
      renderScene.add(renderMesh);
      animateLoop();
    }

    // Animation loop
    function animateLoop() {
      function animate() {
        // Simulate ripple
        simMaterial.uniforms.prevTex.value = curr.texture;
        simMaterial.uniforms.prevPrevTex.value = prev.texture;
        simMaterial.uniforms.uMouse.value = mouse.clone();
        simMaterial.uniforms.uTime.value += 0.01;
        // Decay the injection strength over time
        if (simMaterial.uniforms.uInjectStrength.value > 0.08) {
          simMaterial.uniforms.uInjectStrength.value *= 0.96;
        } else {
          simMaterial.uniforms.uInjectStrength.value = 0.08;
        }
        renderer.setRenderTarget(next);
        renderer.render(simScene, simCamera);
        renderer.setRenderTarget(null);
        // Render to screen
        if (renderMaterial) {
          renderMaterial.uniforms.rippleTex.value = next.texture;
        }
        renderer.render(renderScene, renderCamera);
        // Ping-pong
        [prev, curr, next] = [curr, next, prev];
        // Reset mouse after injection
        if (inject) { mouse.set(-1, -1); inject = false; }
        animationId = requestAnimationFrame(animate);
      }
      animate();
    }

    // Mouse interaction
    function onPointer(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.set((e.clientX - rect.left) / rect.width, 1 - (e.clientY - rect.top) / rect.height);
      inject = true;
      simMaterial.uniforms.uInjectStrength.value = 2.5;
    }
    canvas.addEventListener('pointermove', onPointer);
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Cleanup
    onDestroy(() => {
      if (animationId) cancelAnimationFrame(animationId);
      renderer.dispose();
      canvas.removeEventListener('pointermove', onPointer);
    });
  });
</script>

<style>
  section {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    pointer-events: none;
    z-index: 1000;
    background: transparent;
  }
  canvas {
    width: 100vw;
    height: 100vh;
    display: block;
    background: transparent;
    pointer-events: auto;
    z-index: 1000;
  }
</style>

<section>
  <canvas bind:this={canvas}></canvas>
</section>