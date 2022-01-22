<script>
  import { locationData } from './stores/data';
  import { frame } from './stores/controller';

  import Chart from './components/Chart.svelte';
</script>

<div
  class="wrapper"
>
  <Chart
    locationData={$locationData}
    frame={$frame}
  />
</div>

<style>
  .wrapper {
    width: 100%;
  }
</style>