<script lang="ts">
import { onMount } from 'svelte';
import { writable } from 'svelte/store';
export const logoSticky = writable(false);
let logoEl: HTMLDivElement;
let observer: IntersectionObserver;

onMount(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      logoSticky.set(!entry.isIntersecting);
    },
    { threshold: 0.01 }
  );
  const hero = document.querySelector('.panel');
  if (hero) observer.observe(hero);
  return () => observer.disconnect();
});
</script>

<div bind:this={logoEl} class="fixed z-[100] left-0 top-0 w-full pointer-events-none">
  <div class="relative h-24 flex items-center transition-all duration-500"
    class:!h-16={$logoSticky}
    style="padding-left:clamp(2rem,4vw,6rem);">
    <div class="absolute inset-0 h-full w-full bg-gradient-to-b from-black to-transparent pointer-events-none" style="z-index:-1;"></div>
  </div>
</div>

<slot />
