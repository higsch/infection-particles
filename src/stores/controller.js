import { writable, derived } from 'svelte/store';

export const frameCounter = (() => {
  const { set, update, subscribe } = writable(0);

  let afId;
  let maxI = null;
  let time = 0;

  const init = (arr, movingTime) => {
    maxI = arr.length - 1;
    time = movingTime;
  }

  const increment = () => update(value => {
    if (value < maxI) {
      return value + 1;
    } else {
      cancelAnimationFrame(afId);
      return value;
    }
  });

  const run = (arr, movingTime) => {
    if (arr && arr.length) init(arr, movingTime);
    if (!maxI || maxI < 0) return;
    let previousTimeStamp = 0;
    const step = (timeStamp) => {
      afId = requestAnimationFrame(step);
      if (timeStamp - previousTimeStamp >= time) {
        increment();
        previousTimeStamp = timeStamp;
      }
    };
    afId = requestAnimationFrame(step);
  };

  const reset = () => {
    set(0);
    run();
  }

  return {
    set,
    init,
    run,
    reset,
    subscribe
  }
})();