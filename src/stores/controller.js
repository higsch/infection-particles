import { writable, derived } from 'svelte/store';

import { dates } from './data';

export const frameCounter = (() => {
  const { set, update, subscribe } = writable(0);

  let afId;
  let maxI = null;

  const init = (arr) => {
    maxI = arr.length - 1;
  }

  const increment = () => update(value => {
    if (value < maxI) {
      return value + 1;
    } else {
      cancelAnimationFrame(afId);
      return value;
    }
  });

  const run = (arr) => {
    if (arr && arr.length) init(arr);
    if (!maxI || maxI < 0) return;
    const step = () => {
      increment();
      afId = requestAnimationFrame(step);
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