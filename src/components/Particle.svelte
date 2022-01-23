<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
  import { tweened } from 'svelte/motion';

  export let x;
  export let y;
  export let radius = 5;
  export let color = 'purple';
  export let movingTime;

  const { register, deregister, invalidate } = getContext('canvas');
  const tween = tweened(undefined, { duration: movingTime });

  function draw(ctx) {
    if ($tween === undefined) return;

    ctx.globalAlpha = 0.5;
    ctx.fillStyle = color;
    
    ctx.beginPath();
    ctx.arc($tween[0], $tween[1], radius, 0, 2 * Math.PI, false);
    ctx.fill()
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

  $: if (x !== undefined && y !== undefined) tween.set([x, y]);
</script>