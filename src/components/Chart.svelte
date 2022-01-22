<script>
  import Canvas from './Canvas.svelte';

  export let data;
  export let frame;

  let width;
  let height;

  $: console.log(width, height)
</script>

<div class="chart">
  <div
    class="draw-area"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <Canvas
      width={width}
      height={height}
    >

    </Canvas>
  </div>
</div>

<style>
  .chart {
    flex: 1;
    display: flex;
    width: 100%;
  }

  .draw-area {
    flex: 1;
    width: 100%;
    overflow: hidden;
  }
</style>