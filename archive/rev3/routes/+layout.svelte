<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { Github, Instagram } from 'lucide-svelte';
	import { derived } from 'svelte/store';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Determine current route for navbar logic
	const currentPath = derived(page, ($page) => $page.url.pathname);

	// Helper to determine if on title slide (home)
	function isHome(path: string) {
		return path === '/';
	}
	// Helper to determine if on a product page
	function isProduct(path: string, slug: string) {
		return path === `/product/${slug}`;
	}

	// Product icons and slugs
	const navProducts = [
		{ name: 'plates', slug: 'plates', icon: '/images/plates.png' },
		{ name: 'akh', slug: 'akh', icon: '/images/w/akh.png' },
		{ name: 'vuno', slug: 'vuno', icon: '/images/w/vuno.png' },
		{ name: 'standpoint', slug: 'standpoint', icon: '/images/w/standpoint.png' }
	];

	function scrollToSection(slug: string) {
		if (typeof window !== 'undefined') {
			const el = document.getElementById(slug);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' });
			}
			// If not on home, navigate to home with hash
			if (window.location.pathname !== '/') {
				window.location.href = `/#${slug}`;
			}
		}
	}

	const activeSection = writable('');

	onMount(() => {
		if (typeof window !== 'undefined') {
			const handler = () => {
				const sections = Array.from(document.querySelectorAll('section[id]'));
				let current = '';
				const scrollY = window.scrollY + window.innerHeight / 3;
				for (const section of sections) {
					const rect = section.getBoundingClientRect();
					const top = rect.top + window.scrollY;
					if (scrollY >= top) {
						current = section.id;
					}
				}
				activeSection.set(current);
			};
			handler();
			window.addEventListener('scroll', handler);
			return () => window.removeEventListener('scroll', handler);
		}
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
</svelte:head>

<nav class="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-6 pointer-events-none">
	<!-- Left: Logo and Products -->
	<div class="flex-1 flex items-center justify-start pointer-events-auto">
		<div class="bg-black shadow-2xl flex items-center gap-6 px-8 py-3 island-bar">
			<a href="/" class="flex items-center">
				<img
					src={$activeSection === '' || $activeSection === 'title' ? '/images/a.png' : '/images/w/a.png'}
					alt="a"
					class="h-8 w-8 object-contain island-icon"
					style="opacity:1;"
				/>
			</a>
			{#each navProducts as prod}
				<a href={`/#${prod.slug}`} class="flex items-center" on:click|preventDefault={() => scrollToSection(prod.slug)}>
					<img
						src={prod.icon}
						alt={prod.name}
						class="h-8 w-8 object-contain island-icon hover:opacity-100 transition"
						style="opacity:{$activeSection === prod.slug ? 1 : 0.5};"
					/>
				</a>
			{/each}
		</div>
	</div>
	<!-- Right: Social Icons -->
	<div class="flex-1 flex justify-end items-center pointer-events-auto">
		<div class="bg-black shadow-2xl flex items-center gap-6 px-8 py-3 island-bar">
			<a href="https://instagram.com" target="_blank" aria-label="Instagram">
				<Instagram class="h-8 w-8 text-white hover:text-orange-400 transition island-icon" />
			</a>
			<a href="https://github.com" target="_blank" aria-label="GitHub">
				<Github class="h-8 w-8 text-white hover:text-orange-400 transition island-icon" />
			</a>
		</div>
	</div>
</nav>

<main class="font-[Instrument Sans] pt-24 absolute">
	<slot />
</main>

<style>
nav {
	border-radius: 0;
	box-shadow: none;
}
.island-bar {
	border-radius: 0 !important;
	min-height: 64px;
	box-shadow: 0 4px 24px 0 rgba(0,0,0,0.4) !important;
}
.island-icon {
	height: 32px !important;
	width: 32px !important;
	margin: 0 2px;
}
nav img, nav svg {
	background: transparent;
	border-radius: 0 !important;
	box-shadow: none;
	display: block;
}
.bg-black {
	background: #000 !important;
}
.shadow-2xl {
	box-shadow: 0 4px 24px 0 rgba(0,0,0,0.4) !important;
}
</style>
