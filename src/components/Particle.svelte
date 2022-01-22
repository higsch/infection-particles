<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
  import { tweened } from 'svelte/motion';

  export let x;
  export let y;
  export let radius = 5;
  export let color = '#000000';

  const movingDuration = 20;

  const { register, deregister, invalidate } = getContext('canvas');

  function draw(ctx) {
    if (datum.snowflakeRadius) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.fill()
    }
  }

  onMount(() => {
    invalidate();
    register(draw);
    return () => {
      deregister(draw);
    };
  });

	afterUpdate(invalidate);
	onDestroy(invalidate);
</script>