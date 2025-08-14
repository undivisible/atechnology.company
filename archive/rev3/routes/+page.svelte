<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import platesData from '$lib/data/products/plates.json';
	import akhData from '$lib/data/products/akh.json';

	// Bionic reading utility
	function bionicText(text: string): string {
		return text
			.split(' ')
			.map((word) => {
				if (word.length < 3) return `<span class='opacity-50'>${word}</span>`;
				const split = Math.ceil(word.length / 2);
				return `<b>${word.slice(0, split)}</b>${word.slice(split)}`;
			})
			.join(' ');
	}

	function bionicColor(text: string, color: string): string {
		return `<span class='${color}'>${bionicText(text)}</span>`;
	}

	// Colorize helper for specific words
	function colorizeBionic(html: string): string {
		return html
			.replace(/\bhelpful\b/i, "<span class='text-[#7C9B6D]'>$&</span>")
			.replace(/\bfast\b/i, "<span class='text-[#F9A7A7]'>$&</span>")
			.replace(/easy to use/i, "<span class='text-[#5A6E99]'>$&</span>")
			.replace(/a third hand/i, "<span class='text-[#AD73B0]'>$&</span>")
			.replace(/a project started to create/i, "<span class='text-white/50'>$&</span>")
			.replace(/that feel like/i, "<span class='text-white/50'>$&</span>");
	}

	const slides = [
		{
			id: 'title',
			name: 'atechnology company',
			tagline: 'a project started to create helpful, fast, easy to use tools for people that feel like a third hand.',
			description: '',
			longDescription: '',
			version: '',
			releaseDate: '',
			features: [],
			technologies: [],
			bg: 'bg-white',
			text: 'text-black',
			icon: '/images/plates.png',
		},
		{
			...platesData
		},
		{
			...akhData
		}
	];

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function goToProduct(productId: string) {
		window.location.href = `/product/${productId}`;
	}
</script>

<svelte:head>
	<title>atechnology company</title>
</svelte:head>

<div class="h-screen w-screen overflow-x-hidden overflow-y-scroll snap-y snap-mandatory relative">
	<!-- Title Slide -->
	<section id="title" class="snap-start min-h-screen flex flex-col justify-center {slides[0].bg} {slides[0].text} px-8 relative">
		<div class="max-w-5xl pt-32 pb-24">
			<h1
				class="mb-8 text-6xl md:text-8xl font-light text-left"
				in:fly={{ y: 60, duration: 700, delay: 100, easing: quintOut }}
			>
				<span class="text-orange-500">a</span><span>technology company</span>
			</h1>
			<p
				class="text-2xl md:text-4xl font-light text-left max-w-3xl mx-0"
				in:fly={{ y: 60, duration: 700, delay: 300, easing: quintOut }}>
				{@html [
					bionicColor('a project started to create', 'text-black/50'),
					bionicColor('helpful', 'text-[#7C9B6D]'), ', ',
					bionicColor('fast', 'text-[#F9A7A7]'), ', ',
					bionicColor('easy to use', 'text-[#5A6E99]'),
					bionicColor(' tools for people ', 'text-black'), ' ',
					bionicColor('that feel like', 'text-black/50'), ' ',
					bionicColor('a third hand', 'text-[#AD73B0]'), '.'
				].join(' ')}
			</p>
		</div>
		<!-- Pulsing scroll hint -->
		<div class="fixed md:absolute right-6 bottom-6 z-20 pointer-events-none">
			<p class="text-right text-lg text-gray-500 animate-pulse-custom select-none">
				scroll to see our projects
			</p>
		</div>
	</section>

	<!-- Product Slides -->
	{#each slides.slice(1) as slide, i (slide.id)}
		<section
			id={slide.id}
			class="snap-start min-h-screen flex flex-col justify-center {slide.bg} {slide.text} px-8 cursor-pointer relative"
			on:click={() => goToProduct(slide.id)}
		>
			<div class="flex flex-col md:flex-row items-center md:items-start gap-16 max-w-6xl mx-auto pt-32 pb-24">
				<img
					src={slide.icon}
					alt={slide.name + ' icon'}
					class="mb-8 md:mb-0 h-32 w-32 object-contain"
					in:fly={{ x: -60, duration: 700, delay: 100 + i * 150, easing: quintOut }}
				/>
				<h1
					class="text-5xl md:text-7xl font-bold mb-8"
					in:fly={{ y: 60, duration: 700, delay: 200 + i * 150, easing: quintOut }}
				>
					{slide.name}
				</h1>
				<p
					class="text-2xl md:text-3xl font-light leading-snug"
					in:fly={{ y: 60, duration: 700, delay: 350 + i * 150, easing: quintOut }}
				>
					{(slide.description || '')}
				</p>
			</div>
		</section>
	{/each}
</div>

<style>
	:global(.animate-pulse-custom) {
		animation: pulse-custom 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
	@keyframes pulse-custom {
		0%, 100% { opacity: 0.5; transform: scale(1);}
		50% { opacity: 1; transform: scale(1.08);}
	}
	:global(html) {
		scroll-behavior: smooth;
	}
	:global(b) {
		font-weight: 800 !important;
	}
</style>
