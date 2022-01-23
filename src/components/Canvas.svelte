<script>
  import { onDestroy, setContext } from 'svelte';

  export let width = 0;
  export let height = 0;
  export let pixelRatio = window.devicePixelRatio || 1;

  const drawFunctions = [];

  const setupCanvas = (canvas, width = 0, height = 0) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(pixelRatio, pixelRatio);

    return ctx;
  };

  let canvas;
  let ctx;
  let frameId;
  let pendingInvalidation = false;

  setContext('canvas', {
    register(fn) {
      drawFunctions.push(fn);
    },
    deregister(fn) {
      drawFunctions.splice(drawFunctions.indexOf(fn), 1);
    },
    invalidate() {
			if (pendingInvalidation) return;
			pendingInvalidation = true;
			frameId = requestAnimationFrame(update);
		}
  });

  function update() {
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    drawFunctions.forEach((fn) => {
      ctx.save();
      fn(ctx);
      ctx.restore();
    });

    pendingInvalidation = false;
  }

  onDestroy(() => {
    if (frameId) {
      cancelAnimationFrame(frameId);
    }
  });

  $: ctx = setupCanvas(canvas, width, height);
</script>

<canvas
  bind:this={canvas}
/>
<slot />

<style>
  canvas {
    position: absolute;
    z-index: 10;
  }
</style>