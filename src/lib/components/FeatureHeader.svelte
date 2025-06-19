<script>
  export let subtitle;
  export let title;
  export let description;
</script>

<div>
  <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">{subtitle}</h2>
  <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
    {title}
  </p>
  <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
    {description}
  </p>
</div>
