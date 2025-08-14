<script lang="ts">
	import Hero from '$lib/sections/Hero.svelte';
	import Product from '$lib/sections/Product.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	const products = [

		{
			id: 'plates',
			title: 'Plates',
			description: 'Plates is a unitary computing platform of hybrid systems designed to establish healthy relationships with your devices.',
			logo: '/plates.png',
			tech: [
				{ label: 'swift', class: 't-swift' },
				{ label: 'rust', class: 't-rust' },
				{ label: 'alpine', class: 't-alpine' },
				{ label: 'ai', class: 't-ai' }
			],
			links: [
			]
		},
		{
			id: 'infrastruct',
			title: 'Infrastruct',
			description: 'Infrastruct is a belief-agnostic logic-filtered unitarian jurisprudence system for all major religions.',
			logo: '/infrastruct-logo.tsx',
			tech: [
				{ label: 'next.js' },
				{ label: 'react', class: 't-react' },
				{ label: 'typescript', class: 't-ts' },
				{ label: 'tailwind', class: 't-tailwind' }
			],
			links: [
				{ label: 'github', href: 'https://github.com/atechnology-company/infrastruct', external: true },
				{ label: 'whitepaper', href: 'https://undivisible.notion.site/infrastruct-22f5f9801be48068aa1bdb1899ad9ed4', external: true }
			]
		},
		{
			id: 'standpoint',
			title: 'Standpoint',
			description: 'Standpoint is the ultimate opinion-based social media platform and tool for creating tierlists, voting on polls and sharing standpoints.',
			logo: '/standpoint.png',
			tech: [
				{ label: 'svelte', class: 't-svelte' },
				{ label: 'typescript', class: 't-ts' },
				{ label: 'tailwind', class: 't-tailwind' },
				{ label: 'sanic', class: 't-sanic' },
				{ label: 'python', class: 't-python' },
				{ label: 'firebase', class: 't-firebase' },
				{ label: 'ai', class: 't-ai' }
			],
			links: [
				{ label: 'website', href: 'https://standpoint.atechnology.company', external: true },
				{ label: 'github', href: 'https://github.com/atechnology-company/standpoint', external: true }
			]
		},
		{
			id: 'vuno',
			title: 'Vuno',
			description: 'Vuno is the utilitarian keyboard focused minimal text editor for everyday life. Edit code, documents, or just take notes, with markdown support, code highlighting and an AI copilot.',
			logo: '/vuno.png',
			tech: [
				{ label: 'tauri', class: 't-tauri' },
				{ label: 'svelte', class: 't-svelte' },
				{ label: 'typescript', class: 't-ts' },
				{ label: 'rust', class: 't-rust' },
				{ label: 'tailwind', class: 't-tailwind' },
				{ label: 'ai', class: 't-ai' }
			],
			links: [
				{ label: 'github', href: 'https://github.com/atechnology-company/vuno', external: true }
			]
		},
		{
			id: 'akh',
			title: 'Akh',
			description: 'Akh is the ultimate muslim companion, aiming to centralise all Islamic software on one platform.',
			logo: '/akh.png',
			tech: [
				{ label: 'tauri', class: 't-tauri' },
				{ label: 'svelte', class: 't-svelte' },
				{ label: 'typescript', class: 't-ts' },
				{ label: 'rust', class: 't-rust' },
				{ label: 'tailwind', class: 't-tailwind' },
				{ label: 'ai', class: 't-ai' }
			],
			links: [
				{ label: 'website', href: 'https://akh.atechnology.company', external: true },
				{ label: 'github', href: 'https://github.com/atechnology-company/akh', external: true }
			]
		}
	];
	const current = writable(0);
	const showIndicator = writable(false);
	let sections: HTMLElement[] = [];
	let mainEl: HTMLElement;

	function goToProduct(i: number) {
		const target = sections[i + 1]; // +1 to skip Hero panel
		if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
			function onScroll() {
				if (!sections.length) return;
				let idx = 0;
				for (let i = 0; i < sections.length; i++) {
					const rect = sections[i].getBoundingClientRect();
					if (rect.top <= window.innerHeight * 0.5) idx = i;
				}
				// idx 0 = Hero, idx 1 = first product, etc.
				current.set(idx - 1 < 0 ? 0 : idx - 1);
				// show indicator once we've left the hero
				showIndicator.set(idx > 0);
			}
			onMount(() => {
				// select all .panel sections (Hero and Product)
				sections = Array.from(mainEl.querySelectorAll('.panel')) as HTMLElement[];
				mainEl.addEventListener('scroll', onScroll, { passive: true });
				onScroll();
				return () => mainEl.removeEventListener('scroll', onScroll);
			});
</script>


{#if $showIndicator}
	<div class="fixed top-0 right-0 w-full z-[250] pointer-events-none">
		<div class="ml-auto w-fit flex gap-6 pr-[clamp(2rem,4vw,6rem)] text-sm select-none pointer-events-auto" style="align-items: center; height: calc(var(--logo-center, 48px)); padding-top: 5rem;">
			{#each products as p, i}
				<button
					class="relative transition-colors duration-150 font-semibold outline-none { $current === i ? 'text-white' : 'text-white/50' }"
					on:click={() => goToProduct(i)}
				>
					{p.title}
				</button>
			{/each}
		</div>
	</div>
{/if}

<main bind:this={mainEl} class="h-screen w-screen overflow-y-auto snap-y snap-mandatory">
	<div class="panel snap-start min-h-screen min-w-screen w-screen">
		<Hero />
	</div>
	{#each products as p}
		<Product {...p} class="snap-start min-h-screen min-w-screen w-screen" />
	{/each}
</main>
