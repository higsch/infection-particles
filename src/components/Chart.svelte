<script>
  import { max, scaleLinear, scaleLog } from 'd3';

  import Canvas from './Canvas.svelte';
  import Particle from './Particle.svelte';

  export let locationData;
  export let frameTime;
  export let movingTime;
  export let xAccessor = 'deaths';
  export let yAccessor = 'incidence';
  export let colorAccessor = 'vacc';

  const padding = 10;

  let width;
  let height;

  const getMax = (objArr, accessor) => max(objArr.map(d => d.data).flat(), d => d[accessor]);

  $: maxX = getMax(locationData, xAccessor);
  $: maxY = getMax(locationData, yAccessor);

  $: xScale = scaleLog()
    .domain([0.01, maxX])
    .range([padding, width - padding]);

  $: yScale = scaleLog()
    .domain([0.01, maxY])
    .range([height - padding, padding]);

  $: colorScale = scaleLinear()
    .domain([0, 100])
    .range(['red', 'blue'])

  $: renderedLocationData = locationData.map(({ location, data }) => {
    const renderedData = data.map(d => {
      return {
        ...d,
        x: xScale(d[xAccessor]),
        y: yScale(d[yAccessor]),
        color: colorScale(d[colorAccessor])
      };
    });
    return {
      location,
      data: renderedData
    };
  });

  $: frameData = renderedLocationData.map(({ location, data }) => {
    const selectedData = data.find(d => d.time === frameTime) || {};
    return {
      location,
      data: selectedData
    };
  });
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
      {#each frameData as { location, data: { x, y, color } } (location)}
        <Particle
          x={x}
          y={y}
          color={color}
          movingTime={movingTime}
        />
      {/each}
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