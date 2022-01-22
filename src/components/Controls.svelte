<script>
  import { frameCounter } from '../stores/controller';

  export let dates;
  export let frame;

  $: frameCounter.run(dates);

  $: frame = $frameCounter;
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