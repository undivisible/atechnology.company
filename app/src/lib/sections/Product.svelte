<script lang="ts">
  import { fadeIn } from '$lib/actions/fadeIn';
  import InfrastructLogo from '$lib/components/InfrastructLogo.svelte';
  
  export let id: string;
  export let title: string;
  export let description: string;
  export let logo: string;
  export let tech: { label: string; class?: string }[] = [];
  export let links: { label: string; href: string; external?: boolean }[] = [];
  export let bgClass: string = '';
</script>

<section {...$$restProps} {id} class="panel product {bgClass} snap-start min-h-screen min-w-screen w-screen box-border bg-black text-white" aria-labelledby={id + '-title'} use:fadeIn>
  <div class="left" use:fadeIn>
    {#if logo}
      <div class="logo-block" use:fadeIn>
        {#if logo.endsWith('.tsx')}
          <InfrastructLogo />
        {:else}
          <img src={logo} alt={title + ' logo'} />
        {/if}
      </div>
    {/if}
    <h2 id={id + '-title'} class="product-name" use:fadeIn>{title}</h2>
    {#if tech.length}
      <ul class="tech-tags" use:fadeIn>
        {#each tech as t}
          <li class={t.class}>{t.label}</li>
        {/each}
      </ul>
    {/if}
    {#if links.length}
      <nav class="links" use:fadeIn>
        {#each links as l}
          <a href={l.href} target={l.external ? '_blank' : undefined} rel={l.external ? 'noopener' : undefined}>{l.label}</a>
        {/each}
      </nav>
    {/if}
  </div>
  <p class="description" use:fadeIn>{description}</p>
</section>

<style>
  .product { display:flex; flex-wrap:wrap; align-items:center; padding: clamp(2rem,4vw,4rem); gap:3rem; min-height:100vh; min-width:100vw; box-sizing:border-box; }
  .logo-block {
    width: auto;
    max-width: 170px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: start;
    border-radius: 1.25rem;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
    margin-bottom: 1.5rem;
    overflow: hidden;
  }
  .logo-block img,
  .logo-block :global(svg) {
    width: 100%;
    height: 100%;
    object-fit: contain;
    aspect-ratio: 1 / 1;
    display: block;
  }
  .left { flex:1 1 480px; min-width:320px; }
  .product-name { font-size: clamp(3rem,7vw,7.5rem); line-height:.85; font-weight:700; }
  .tech-tags { display:flex; flex-wrap:wrap; gap:.75rem; margin-top:2rem; list-style:none; padding:0; }
  .tech-tags li { font-weight:600; font-size:1.25rem; padding:.5rem 1rem; border-radius:.5rem; }
  .t-react { background:rgba(104,72,63,0.2); color:#68483f; }
  .t-ts { background:rgba(43,0,255,0.2); color:#2b00ff; }
  .t-tailwind { background:rgba(5,109,255,0.2); color:#056dff; }
  .t-swift { background:rgba(0,255,255,0.2); color:#00ffff; }
  .t-rust { background:rgba(255,87,5,0.2); color:#ff5705; }
  .t-alpine { background:rgba(180,0,255,0.2); color:#b400ff; }
  .t-ai { background:rgba(192,255,5,0.2); color:#c0ff05; }
  .t-svelte { background:rgba(255,157,0,0.2); color:#ff9d00; }
  .t-sanic { background:rgba(255,0,195,0.2); color:#ff00c3; }
  .t-python { background:rgba(0,255,26,0.2); color:#00ff1a; }
  .t-firebase { background:rgba(255,47,0,0.2); color:#ff2f00; }
  .t-tauri { background:rgba(0,144,255,0.2); color:#0090ff; }
  .links { display:flex; gap:1.25rem; margin-top:3rem; font-weight:600; font-size:1.25rem; }
  .links a { text-decoration:none; position:relative; }
  .links a::after { content:''; position:absolute; left:0; bottom:-2px; height:2px; width:0; background:#fff; transition:width .3s; }
  .links a:hover::after { width:100%; }
  .description { flex:1 1 520px; font-size:clamp(1.75rem,2.3vw,4rem); font-weight:600; line-height:1.05; }
  @media (max-width:1000px){ .description { flex-basis:100%; } }
</style>
