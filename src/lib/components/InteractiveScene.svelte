<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
  import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
  import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
  import { browser } from '$app/environment';

  let container: HTMLDivElement;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let composer: EffectComposer;
  let objects: THREE.Mesh[] = [];
  let mousePosition = new THREE.Vector2(0.5, 0.5);
  let mouse3D = new THREE.Vector3(0, 0, 0);
  let mouseOver = false;
  let lastMouseMove = Date.now();
  let animationFrameId: number;
  let velocities: THREE.Vector3[] = [];

  // Custom shader for the distortion effect
  const distortionShader = {
    uniforms: {
      'tDiffuse': { value: null },
      'mousePos': { value: new THREE.Vector2(0.5, 0.5) },
      'time': { value: 0 },
      'distortionStrength': { value: 0.3 },
      'distortionRadius': { value: 0.2 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform vec2 mousePos;
      uniform float time;
      uniform float distortionStrength;
      uniform float distortionRadius;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        vec2 mouseOffset = mousePos - uv;
        float dist = length(mouseOffset);
        float strength = smoothstep(distortionRadius, 0.0, dist);

        // Chromatic aberration
        vec2 redOffset = uv + mouseOffset * distortionStrength * strength * 0.03;
        vec2 greenOffset = uv + mouseOffset * distortionStrength * strength * 0.02;
        vec2 blueOffset = uv + mouseOffset * distortionStrength * strength * 0.01;

        vec4 redChannel = texture2D(tDiffuse, redOffset);
        vec4 greenChannel = texture2D(tDiffuse, greenOffset);
        vec4 blueChannel = texture2D(tDiffuse, blueOffset);

        gl_FragColor = vec4(
          redChannel.r,
          greenChannel.g,
          blueChannel.b,
          1.0
        );
      }
    `
  };

  // Add gradient shader for background sphere
  const bgVertexShader = `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const bgFragmentShader = `
    varying vec3 vWorldPosition;
    void main() {
      float h = normalize(vWorldPosition).y * 0.5 + 0.5;
      vec3 top = vec3(0.74, 0.74, 0.74); // #bcbcbc
      vec3 bottom = vec3(0.137, 0.137, 0.164); // #23232a
      vec3 color = mix(bottom, top, h);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Shape and color palette options
  const shapeTypes = ['cross', 'sphere', 'cube', 'torus', 'cone'];
  const colorPalettes = [
    [0x0066ff, 0x222222, 0xe0e0e0], // blue, black, light grey
    [0xff0055, 0x222222, 0xffe066], // pink, black, yellow
    [0x10b981, 0x7c3aed, 0xf59e42], // teal, purple, orange
    [0x23232a, 0x7c3aed, 0xffffff], // dark, purple, white
    [0x1e90ff, 0xff6347, 0x32cd32], // blue, tomato, lime
  ];
  let currentShape = 0;
  let currentPalette = 0;

  function createShape(type: string, color: number) {
    switch (type) {
      case 'sphere':
        return new THREE.Mesh(
          new THREE.SphereGeometry(0.23, 24, 16),
          new THREE.MeshStandardMaterial({ color, roughness: 0.2, metalness: 0.5 })
        );
      case 'cube':
        return new THREE.Mesh(
          new THREE.BoxGeometry(0.32, 0.32, 0.32),
          new THREE.MeshStandardMaterial({ color, roughness: 0.2, metalness: 0.5 })
        );
      case 'torus':
        return new THREE.Mesh(
          new THREE.TorusGeometry(0.18, 0.07, 16, 32),
          new THREE.MeshStandardMaterial({ color, roughness: 0.2, metalness: 0.5 })
        );
      case 'cone':
        return new THREE.Mesh(
          new THREE.ConeGeometry(0.18, 0.36, 20),
          new THREE.MeshStandardMaterial({ color, roughness: 0.2, metalness: 0.5 })
        );
      case 'cross':
      default:
        return createCrossShape(color);
    }
  }

  function createCrossShape(color?: number) {
    const group = new THREE.Group();
    const radius = 0.1;
    const height = 0.5;
    const segments = 16;
    const matColor = color !== undefined ? color : colorPalettes[currentPalette][Math.floor(Math.random() * 3)];
    const material = new THREE.MeshStandardMaterial({ color: matColor, roughness: 0.2, metalness: 0.5 });
    const geometryCylinder = new THREE.CylinderGeometry(radius, radius, height, segments);
    const cylinder1 = new THREE.Mesh(geometryCylinder, material);
    const cylinder2 = new THREE.Mesh(geometryCylinder, material);
    const cylinder3 = new THREE.Mesh(geometryCylinder, material);
    cylinder1.rotation.z = Math.PI / 2;
    cylinder3.rotation.x = Math.PI / 2;
    group.add(cylinder1);
    group.add(cylinder2);
    group.add(cylinder3);
    return group;
  }

  function resetObjects() {
    // Remove old objects from scene
    objects.forEach(obj => scene.remove(obj));
    objects = [];
    velocities = [];
    // Add new objects
    for (let i = 0; i < 50; i++) {
      const color = colorPalettes[currentPalette][Math.floor(Math.random() * 3)];
      const mesh = createShape(shapeTypes[currentShape], color);
      mesh.position.set(
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 3.5
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(mesh);
      objects.push(mesh as unknown as THREE.Mesh);
      velocities.push(new THREE.Vector3());
    }
  }

  function handleClick() {
    currentShape = (currentShape + 1) % shapeTypes.length;
    currentPalette = (currentPalette + 1) % colorPalettes.length;
    resetObjects();
  }

  function init() {
    // Scene setup
    scene = new THREE.Scene();

    // Add large background sphere with gradient
    const bgGeometry = new THREE.SphereGeometry(30, 64, 32);
    const bgMaterial = new THREE.ShaderMaterial({
      vertexShader: bgVertexShader,
      fragmentShader: bgFragmentShader,
      side: THREE.BackSide,
      depthWrite: false
    });
    const bgSphere = new THREE.Mesh(bgGeometry, bgMaterial);
    scene.add(bgSphere);

    // Camera setup
    camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting (brighter and more varied)
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xffffff, 0, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Remove old objects if any
    objects.forEach(obj => scene.remove(obj));
    objects = [];
    velocities = [];
    // Add initial objects
    for (let i = 0; i < 50; i++) {
      const color = colorPalettes[currentPalette][Math.floor(Math.random() * 3)];
      const mesh = createShape(shapeTypes[currentShape], color);
      mesh.position.set(
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 3.5
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(mesh);
      objects.push(mesh as unknown as THREE.Mesh);
      velocities.push(new THREE.Vector3());
    }

    // Post-processing setup
    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const distortionPass = new ShaderPass(distortionShader);
    composer.addPass(distortionPass);
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    // Project mouse to 3D near center (z=0)
    if (mouseOver && container && camera) {
      const x = (mousePosition.x) * 2 - 1;
      const y = (mousePosition.y) * 2 - 1;
      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);
      // Place the mouse3D point at z=0 plane
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouse3D = camera.position.clone().add(dir.multiplyScalar(distance));
    }

    // Animate objects: spring to center, soft mouse repulsion, soft collision, with more damping
    const center = new THREE.Vector3(0, 0, 0);
    objects.forEach((obj, idx) => {
      // Spring force to center (softer)
      const toCenter = center.clone().sub(obj.position).multiplyScalar(0.015);
      // Repulsion from mouse (softer, with smoothstep)
      let repulse = new THREE.Vector3(0, 0, 0);
      if (mouseOver) {
        const fromMouse = obj.position.clone().sub(mouse3D);
        const dist = fromMouse.length();
        const minDist = 1.2;
        const maxDist = 2.0;
        // Use smoothstep for a soft falloff
        const t = Math.max(0, Math.min(1, (maxDist - dist) / (maxDist - minDist)));
        const strength = 0.03 * (0.5 - 0.5 * Math.cos(Math.PI * t)); // smooth in/out
        if (dist < maxDist) {
          repulse = fromMouse.normalize().multiplyScalar(strength * (maxDist - dist));
        }
      }
      // Simple collision/repulsion between objects (softer)
      const minDist = 1.1;
      let collision = new THREE.Vector3();
      for (let j = 0; j < objects.length; j++) {
        if (j === idx) continue;
        const other = objects[j];
        const delta = obj.position.clone().sub(other.position);
        const dist = delta.length();
        if (dist < minDist && dist > 0.0001) {
          collision.add(delta.normalize().multiplyScalar((minDist - dist) * 0.025));
        }
      }
      // Velocity-based movement with more damping (fluid)
      velocities[idx].add(toCenter).add(repulse).add(collision);
      velocities[idx].multiplyScalar(0.80); // More damping for fluidity
      obj.position.add(velocities[idx]);
      // Gentle rotation
      obj.rotation.x += 0.002;
      obj.rotation.y += 0.0015;
    });
    composer.render();
  }

  function handleMouseMove(event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    mousePosition.x = (event.clientX - rect.left) / rect.width;
    mousePosition.y = 1 - (event.clientY - rect.top) / rect.height;
    lastMouseMove = Date.now();
  }

  function handleMouseEnter() {
    mouseOver = true;
  }

  function handleMouseLeave() {
    mouseOver = false;
  }

  function handleResize() {
    if (!container) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    composer.setSize(width, height);
  }

  onMount(() => {
    if (browser) {
      init();
      animate();
      window.addEventListener('resize', handleResize);
    }
  });

  onDestroy(() => {
    if (browser) {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', handleResize);
      
      // Clean up Three.js resources
      scene?.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer?.dispose();
    }
  });
</script>

<div
  class="scene-container"
  bind:this={container}
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:click={handleClick}
  aria-label="Interactive Scene"
  role="img"
>
</div>

<style>
  .scene-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
</style> 