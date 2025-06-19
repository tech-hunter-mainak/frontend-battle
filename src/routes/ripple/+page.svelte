<script lang="ts">
  import { onMount } from 'svelte';
  let container: HTMLDivElement;

  function createRipple(event: MouseEvent) {
    const button = container;
    const circle = document.createElement('span');

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }
</script>

<style>
  .ripple {
    position: absolute;
    border-radius: 9999px;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.5);
    pointer-events: none;
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
</style>

<div
  bind:this={container}
  on:click={createRipple}
  class="relative overflow-hidden inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md cursor-pointer select-none"
>
  Click Me
</div>
