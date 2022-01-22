import { writable, derived } from 'svelte/store';

import { dates } from './data';

export const frameCounter = (() => {
  const { set, subscribe } = writable(0);
  
  const reset = () => set(0);

  return {
    set,
    reset,
    subscribe
  }
})();

export const frame = derived([dates, frameCounter], ([$dates, $frameCounter], set) => {
  const update = () => {
    if ($frameCounter > $dates.length - 1) return;
    const { id = 0 } = $dates[$frameCounter] || {};
    set(id);
    $frameCounter++;
    requestAnimationFrame(update);
  };

	requestAnimationFrame(update);
}, 0);