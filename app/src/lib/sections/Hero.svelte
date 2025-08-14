<script lang="ts">
  import { fadeIn } from '$lib/actions/fadeIn';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  export const heroSticky = writable(false);
  
  let heroSection: HTMLElement;
  let headingEl: HTMLElement;
  let observer: IntersectionObserver;
  let rootEl: HTMLElement | null = null;
  let scrollProgress = 0;
  let raf = 0;
  
  // Animation parameters
  const stickyThreshold = 0.3; // When to start sticky behavior (30% scroll)
  const maxScale = 0.7; // Final scale when fully sticky
  
  function updateLogoTransform() {
    if (!headingEl) return;
    
    // Calculate animation progress (0 to 1)
    const animProgress = Math.max(0, Math.min(1, (scrollProgress - stickyThreshold) / (1 - stickyThreshold)));
    
    // Apply easing
    const eased = 1 - Math.pow(1 - animProgress, 3);
    
    // Calculate scale
    const currentScale = 1 - (1 - maxScale) * eased;
    
    // Apply transform only when sticky
    if (scrollProgress >= stickyThreshold) {
      headingEl.style.transform = `scale(${currentScale})`;
      heroSticky.set(true);
    } else {
      headingEl.style.transform = '';
      heroSticky.set(false);
    }
    
    // Set CSS variable for navigation alignment
    const logoCenter = scrollProgress >= stickyThreshold ? 80 : 0;
    document.documentElement.style.setProperty('--logo-center', `${logoCenter}px`);
  }

  function handleScroll() {
    if (!rootEl || !heroSection) return;
    
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const scrollTop = rootEl!.scrollTop;
      const heroHeight = heroSection.offsetHeight;
      scrollProgress = Math.max(0, Math.min(1, scrollTop / heroHeight));
      updateLogoTransform();
    });
  }

  onMount(() => {
    rootEl = heroSection?.closest('main') as HTMLElement | null;
    
    observer = new IntersectionObserver(
      ([entry]) => {
        // Simple intersection-based fallback
        if (!entry.isIntersecting) {
          heroSticky.set(true);
        }
      },
      { threshold: 0.1, root: rootEl as Element }
    );
    
    if (heroSection) observer.observe(heroSection);
    
    // Add scroll listener
    rootEl?.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer?.disconnect();
      rootEl?.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(raf);
    };
  });
</script>

<section bind:this={heroSection} class="flex items-center justify-start min-h-screen w-full bg-black" data-node="35:489" aria-label="Hero">
  <div class="relative max-w-[50vw] px-[clamp(2rem,4vw,6rem)] py-[clamp(2rem,4vw,6rem)]">
    <h1 bind:this={headingEl}
      class="tracking-tight text-[clamp(3rem,8vw,6.25rem)] leading-[0.85] font-bold will-change-transform z-[300] pointer-events-none origin-top-left"
      class:fixed={$heroSticky}
      class:relative={!$heroSticky}
      class:top-15={$heroSticky}
      class:left-[clamp(2rem,4vw,6rem)]={$heroSticky}
      style="line-height:51%; transform-origin: top left;"
    >
      <span class="text-[#ff5705]">a</span>technology <br /> company
    </h1>
  <p class="text-[clamp(1.5rem,2.5vw,3.125rem)] mt-6 font-medium will-change-transform" use:fadeIn>we make software</p>
  <nav class="flex gap-6 mt-4 font-semibold text-lg" use:fadeIn>
      <a href="https://instagram.com/atechnology.company" class="relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:bg-white">instagram</a>
      <a href="https://github.com/atechnology-company" class="relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:bg-white">github</a>
    </nav>
  <p class="absolute right-[clamp(2rem,4vw,6rem)] bottom-12 text-[1.25rem] opacity-80 md:static md:mt-12 md:right-auto will-change-transform">scroll the page</p>

  </div>
  <p class="relative mt-10 text-[clamp(1.5rem,2.3vw,3.25rem)] font-medium leading-[1.05] max-w-none w-[calc(40vw+10vw)] text-right ml-auto md:text-left md:max-w-full overflow-visible whitespace-normal break-words will-change-transform">
    <span class="muted fade" style="--i:0">a</span>
    <strong class="fade" style="--i:1">proj</strong><span class="muted fade" style="--i:2">ect</span>
    <strong class="muted fade" style="--i:3">star</strong><span class="muted fade" style="--i:4">ted</span>
    <strong class="muted fade" style="--i:5">t</strong><span class="muted fade" style="--i:6">o</span>
    <strong class="fade" style="--i:7">crea</strong><span class="muted fade" style="--i:8">te</span>
    <strong class="fade" style="--i:9; --target:#7c9b6d">helpf</strong><span class="fade" style="--i:10; --target:#7c9b6d">ul,</span>
    <strong class="fade" style="--i:11; --target:#f9a7a7">fas</strong><span class="fade" style="--i:12; --target:#f9a7a7">t,</span>
    <strong class="fade" style="--i:13; --target:#5a6e99">eas</strong><span class="fade" style="--i:14; --target:#5a6e99">y</span>
    <strong class="fade" style="--i:15; --target:#5a6e99">t</strong><span class="fade" style="--i:16; --target:#5a6e99">o</span>
    <strong class="fade" style="--i:17; --target:#5a6e99">us</strong><span class="fade" style="--i:18; --target:#5a6e99">e</span>
    <strong class="fade" style="--i:19">tool</strong><span class="fade" style="--i:20">s</span>
    <strong class="fade" style="--i:21">fo</strong><span class="fade" style="--i:22">r</span>
    <strong class="fade" style="--i:23">peo</strong><span class="fade" style="--i:24">ple</span>
    <strong class="muted fade" style="--i:25">th</strong><span class="muted fade" style="--i:26">at</span>
    <strong class="muted fade" style="--i:27">fe</strong><span class="muted fade" style="--i:28">el</span>
    <strong class="muted fade" style="--i:29">li</strong><span class="muted fade" style="--i:30">ke</span>
    <span class="fade" style="--i:31; --target:#ad73b0">a</span>
    <strong class="fade" style="--i:32; --target:#ad73b0">thi</strong><span class="fade" style="--i:33; --target:#ad73b0">rd</span>
    <strong class="fade" style="--i:34; --target:#ad73b0">ha</strong><span class="fade" style="--i:35; --target:#ad73b0">nd.</span>
    </p>
</section>

<style>
  .muted { opacity:.5; font-weight:600; }
  .fade {
    opacity: 0;
    color: #fff;
    animation: fadein-color 0.25s cubic-bezier(.4,0,.2,1) forwards;
    animation-delay: calc(var(--i) * 0.06s + 0.05s);
  }
  .fade.muted { --target: #fff; }
  @keyframes fadein-color {
    from {
      opacity: 0;
      color: #fff;
      transform: translateY(0.5em);
    }
    60% {
      opacity: 1;
      color: #fff;
    }
    to {
      opacity: 1;
      color: var(--target, #fff);
      transform: none;
    }
  }
</style>
