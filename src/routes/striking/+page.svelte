<script lang="ts">
  import BrandKitCard from '$lib/components/BrandKitCard.svelte';
  import InteractiveScene from '$lib/components/InteractiveScene.svelte';

  let selectedIndexes = [2];
  const brands = [
    { brand: 'ECorp', colors: ['#10b981', '#fff', '#fff'] },
    { brand: 'ICorp', colors: ['#f59e42', '#fff', '#fff'] },
    { brand: 'The Agency', colors: ['#7c3aed', '#fff', '#ef4444'] }
  ];

  function toggleSelect(i: number) {
    if (selectedIndexes.includes(i)) {
      selectedIndexes = selectedIndexes.filter(idx => idx !== i);
    } else {
      selectedIndexes = [...selectedIndexes, i];
    }
  }
</script>

<main>
  <InteractiveScene />
</main>

<style>
  main {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
