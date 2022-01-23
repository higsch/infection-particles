<script>
  import { frameCounter } from '../stores/controller';

  export let dates;
  export let frame;
  export let frameDate = null;
  export let frameTime = null;
  export let movingTime = 20;

  $: frameCounter.run(dates, movingTime);

  $: frame = $frameCounter;
  $: ({ date: frameDate, time: frameTime } = dates[frame] || {});

  $: console.log(frameDate)
</script>

<div class="controls">
  <button
    class="reset"
    on:click={frameCounter.reset}
  >
    Reset
  </button>
</div>

<style>
  
</style>