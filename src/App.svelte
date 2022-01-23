<script>
  import { locationData, dates } from './stores/data';

  import Controls from './components/Controls.svelte';
  import Chart from './components/Chart.svelte';
  import Credit from './components/Credit.svelte';

  let frameTime;
  let movingTime;
</script>

<div
  class="wrapper"
>
  <Controls
    dates={$dates}
    bind:frameTime={frameTime}
    bind:movingTime={movingTime}
  />
  <Chart
    locationData={$locationData}
    frameTime={frameTime}
    movingTime={movingTime}
  />
  <Credit />
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 100%;
    padding: 1rem;
  }
</style>