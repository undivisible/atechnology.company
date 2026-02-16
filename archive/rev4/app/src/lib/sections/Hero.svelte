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
  const stickyThreshold = 0.3;
  const maxScale = 0.7;

  function updateLogoTransform() {
    if (!headingEl) return;
    const animProgress = Math.max(0, Math.min(1, (scrollProgress - stickyThreshold) / (1 - stickyThreshold)));
    const eased = 1 - Math.pow(1 - animProgress, 3);
    const currentScale = 1 - (1 - maxScale) * eased;
    if (scrollProgress >= stickyThreshold) {
      headingEl.style.transform = `scale(${currentScale})`;
      heroSticky.set(true);
    } else {
      headingEl.style.transform = '';
      heroSticky.set(false);
    }
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
        if (!entry.isIntersecting) {
          heroSticky.set(true);
        }
      },
      { threshold: 0.1, root: rootEl as Element }
    );
    if (heroSection) observer.observe(heroSection);
    rootEl?.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      observer?.disconnect();
      rootEl?.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(raf);
    };
  });

  const blurb = [
    { text: 'a', muted: true },
    { text: 'project', strong: true },
    { text: 'started', muted: true },
    { text: 'to', strong: true },
    { text: 'create', strong: true },
    { text: 'helpful,', strong: true, color: '#7c9b6d' },
    { text: 'fast,', strong: true, color: '#f9a7a7' },
    { text: 'easy', strong: true, color: '#5a6e99' },
    { text: 'to', strong: true, color: '#5a6e99' },
    { text: 'use', strong: true, color: '#5a6e99' },
    { text: 'tools', strong: true },
    { text: 'for', strong: true },
    { text: 'people', strong: true },
    { text: 'that', muted: true },
    { text: 'feel', muted: true },
    { text: 'like', muted: true },
    { text: 'a', color: '#ad73b0' },
    { text: 'third', strong: true, color: '#ad73b0' },
    { text: 'hand.', strong: true, color: '#ad73b0' }
  ];

  function splitParts(text: string): [string, string] {
    const len = text.length;
    const split = Math.ceil(len / 2);
    return [text.slice(0, split), text.slice(split)];
  }

  const bionicBlurb = blurb.map((w) => ({ ...w, parts: splitParts(w.text) }));
</script>

<section bind:this={heroSection} class="flex items-center justify-center min-h-[100dvh] w-full bg-black" data-node="35:489" aria-label="Hero">
  <div class="hero-left relative max-w-[50vw] px-[clamp(2rem,4vw,6rem)] py-[clamp(2rem,4vw,6rem)]">
    <h1 bind:this={headingEl}
      class="tracking-tight text-[clamp(3rem,8vw,6.25rem)] leading-[0.85] font-bold will-change-transform z-[300] pointer-events-none origin-top-left"
      class:fixed={$heroSticky}
      class:relative={!$heroSticky}
      class:top-15={$heroSticky}
      class:left-[clamp(2rem,4vw,6rem)]={$heroSticky}
      style="line-height:51%; transform-origin: top left;"
    >
      <span class="brand-line"><span class="text-[#ff5705]">a</span>technology</span>
      <span class="brand-line">company</span>
    </h1>
    <p class="text-[clamp(1.5rem,2.5vw,3.125rem)] mt-6 font-medium will-change-transform" use:fadeIn>we make software</p>
    <nav class="flex gap-6 mt-4 font-semibold text-lg" use:fadeIn>
      <a href="https://instagram.com/atechnology.company" class="relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:bg-white">instagram</a>
      <a href="https://github.com/atechnology-company" class="relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:bg-white">github</a>
    </nav>
    <p class="absolute right-[clamp(2rem,4vw,6rem)] bottom-12 text-[1.25rem] opacity-80 md:static md:mt-12 md:right-auto will-change-transform">scroll the page</p>
  </div>
  <p class="hero-right-blurb relative mt-0 text-[clamp(1.5rem,2.3vw,3.25rem)] font-medium leading-[1.05] max-w-none w-[calc(40vw+10vw)] text-right ml-auto md:text-left md:max-w-full overflow-visible whitespace-normal break-words will-change-transform">
    {#each bionicBlurb as word, i}
      <span class="fade {word.muted ? 'muted' : ''}" style="--i:{i}; {word.color ? `--target:${word.color}` : ''}">
        <strong class="bionic-first">{word.parts[0]}</strong><span class="bionic-rest">{word.parts[1]}</span>
      </span>
      {#if i < bionicBlurb.length - 1}
        {' '}
      {/if}
    {/each}
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

  section[aria-label="Hero"] {
    display: flex;
    align-items: center;
    justify-content: center; /* Center horizontally */
    min-height: 100dvh;
    padding: 0;
  }
  .hero-left {
    max-width: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5rem;
  }
  h1 { display: block; line-height: 1; }
  .brand-line { display: block; }
  .hero-right-blurb {
    width: calc(40vw + 10vw);
    text-align: right;
    margin-left: clamp(1rem,4vw,6rem);
    margin-top: 0;
    max-width: 46vw;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .bionic-first { font-weight: 800; }
  .bionic-rest { font-weight: 500; }
  .hero-right-blurb .bionic-first, .hero-right-blurb .bionic-rest { display: inline; }

  @media (max-width: 900px) {
    section[aria-label="Hero"] { flex-direction: column; align-items: flex-start; padding-top: 2rem; padding-bottom: 2rem; }
    .hero-left { max-width: 100%; padding: 1.25rem; }
    .hero-right-blurb { width: 100% !important; margin-left: 0 !important; text-align: left !important; margin-top: 1rem; max-width: none; padding-left: 1rem; padding-right: 1rem; }
    h1 {
      font-size: clamp(2rem, 9vw, 3.25rem) !important;
      line-height: 1.05 !important;
      transform-origin: left top !important;
      text-align: left;
      word-break: break-word;
    }
    .brand-line { line-height: 0.51; }
    h1.fixed { position: static !important; transform: none !important; }
    nav { gap: 0.75rem; flex-wrap: wrap; }
    .absolute { position: static !important; right: auto !important; bottom: auto !important; margin-top: 1rem; }
  }

  @media (min-width: 1100px) {
    .hero-right-blurb { padding-left: clamp(1rem,4vw,6rem); }
  }
</style>
