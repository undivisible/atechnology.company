<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { Laptop, Monitor, Cpu, Apple, Windows, Linux, ChevronRight, ArrowLeft, X, Memory } from 'lucide-svelte';

	export let data: DataProp;

	// Types for product/platform/downloads
	type DownloadInfo = {
		url: string;
		size: string;
		checksum: string;
	};
	type Downloads = Record<string, Record<string, DownloadInfo>>;
	type Product = {
		id: string;
		name: string;
		tagline: string;
		description: string;
		longDescription: string;
		version: string;
		releaseDate: string;
		features: string[];
		technologies: string[];
		downloads: Downloads;
		screenshots: string[];
		icon?: string;
	};

	type DataProp = {
		product: Product;
	};

	let showDownloadModal: boolean = false;
	let selectedPlatform: string | null = null;
	let mounted: boolean = false;

	onMount(() => {
		mounted = true;
	});

	function openDownloadModal(): void {
		showDownloadModal = true;
	}

	function closeDownloadModal(): void {
		showDownloadModal = false;
		selectedPlatform = null;
	}

	function selectPlatform(platform: string): void {
		selectedPlatform = platform;
	}

	function downloadFile(downloadInfo: DownloadInfo): void {
		// In a real app, this would trigger the actual download
		const link = document.createElement('a');
		link.href = downloadInfo.url;
		link.download = downloadInfo.url.split('/').pop() ?? '';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		closeDownloadModal();
	}

	// Platform icon mapping based on product id
	function getProductIcon(product: Product): string {
		// Prefer icon from JSON, fallback to /images/{id}.png
		return product.icon || `/images/${product.id}.png`;
	}

	// Platform icon mapping for download modal
	function getPlatformIcon(platform: string): any {
		// You can expand this mapping as needed
		switch (platform.toLowerCase()) {
			case 'windows':
				return Windows;
			case 'macos':
				return Apple;
			case 'linux':
				return Linux;
			default:
				return Monitor;
		}
	}

	// Architecture icon mapping for download modal
	function getArchIcon(arch: string): any {
		// You can expand this mapping as needed
		switch (arch.toLowerCase()) {
			case 'x64':
				return Cpu;
			case 'arm64':
				return Memory;
			default:
				return Cpu;
		}
	}

	// Bionic reading utility for tagline
	function bionicTagline(tagline: string): string {
		return tagline
			.split(' ')
			.map((word) => {
				if (word.length < 3) return `<span class="opacity-50">${word}</span>`;
				const split = Math.ceil(word.length / 2);
				return `<span class="opacity-100"><b>${word.slice(0, split)}</b>${word.slice(split)}</span>`;
			})
			.join(' ');
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<!-- Material Symbols Rounded -->
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" rel="stylesheet" />
	<title>{data.product.name} | atechnology company</title>
	<meta name="description" content={data.product.description} />
</svelte:head>

<div class="min-h-screen bg-transparent pt-20 font-[Instrument Sans]">
	{#if mounted}
		<!-- Back Button -->
		<div in:fade={{ duration: 300 }} class="fixed top-24 left-6 z-40">
			<a
				href="/"
				class="flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900"
				aria-label="Back"
			>
				<!-- Material Symbols: arrow_back -->
				<span class="material-symbols-rounded h-5 w-5 align-middle" style="font-size:20px;"
					>arrow_back</span
				>
				<span>Back</span>
			</a>
		</div>

		<!-- Download Button -->
		<div in:fade={{ duration: 300, delay: 100 }} class="fixed top-24 right-6 z-40">
			<button
				onclick={openDownloadModal}
				class="flex items-center space-x-2 rounded-lg bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
				aria-label="Download"
			>
				<!-- Material Symbols: download -->
				<span class="material-symbols-rounded h-5 w-5 align-middle" style="font-size:20px;"
					>download</span
				>
				<span>Download</span>
			</button>
		</div>

		<!-- Product Header -->
		<div class="mx-auto max-w-6xl px-6 py-12">
			<div in:fly={{ y: 50, duration: 800 }} class="mb-16 text-center">
				<div class="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-black">
					<img
						src={getProductIcon(data.product)}
						alt="{data.product.name} icon"
						class="h-16 w-16 object-contain"
					/>
				</div>
				<h1 class="mb-4 text-6xl font-light md:text-8xl">{data.product.name}</h1>
				<p class="mb-8 text-xl text-gray-600 md:text-2xl">
					<!-- Bionic reading for tagline: bold first half of each 3+ letter word -->
					{@html bionicTagline(data.product.tagline)}
				</p>
				<div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
					<span>Version {data.product.version}</span>
					<span>•</span>
					<span>Released {new Date(data.product.releaseDate).toLocaleDateString()}</span>
				</div>
			</div>

			<!-- Description -->
			<div in:fly={{ y: 50, duration: 800, delay: 200 }} class="mb-16 grid gap-12 md:grid-cols-2">
				<div>
					<h2 class="mb-6 text-3xl font-light">About {data.product.name}</h2>
					<p class="text-lg leading-relaxed text-gray-700">{data.product.longDescription}</p>
				</div>
				<div>
					<h3 class="mb-6 text-2xl font-light">Key Features</h3>
					<ul class="space-y-3">
						{#each data.product.features as feature}
							<li class="flex items-start space-x-3">
								<div class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></div>
								<span class="text-gray-700">{feature}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- Technologies -->
			<div in:fly={{ y: 50, duration: 800, delay: 400 }} class="mb-16">
				<h3 class="mb-6 text-center text-2xl font-light">Built With</h3>
				<div class="flex flex-wrap justify-center gap-4">
					{#each data.product.technologies as tech}
						<span class="rounded-full border bg-white px-4 py-2 text-sm font-medium text-gray-700">
							{tech}
						</span>
					{/each}
				</div>
			</div>

			<!-- Screenshots -->
			{#if data.product.screenshots && data.product.screenshots.length > 0}
				<div in:fly={{ y: 50, duration: 800, delay: 600 }} class="mb-16">
					<h3 class="mb-8 text-center text-2xl font-light">Screenshots</h3>
					<div class="grid gap-6 md:grid-cols-3">
						{#each data.product.screenshots as screenshot, index}
							<div class="overflow-hidden rounded-lg bg-white shadow-lg">
								<img
									src="/placeholder.svg?height=300&width=400"
									alt="{data.product.name} screenshot {index + 1}"
									class="h-48 w-full object-cover"
								/>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<!-- Download Modal -->
{#if showDownloadModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		role="dialog"
		aria-modal="true"
		onclick={closeDownloadModal}
		transition:fade={{ duration: 200 }}
	>
		<div
			class="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white"
			onclick={(e) => e.stopPropagation()}
			role="document"
			transition:fly={{ y: 50, duration: 300 }}
		>
			<div class="p-8">
				<div class="mb-8 flex items-center justify-between">
					<h2 class="text-3xl font-light">Download {data.product.name}</h2>
					<button
						onclick={closeDownloadModal}
						class="text-gray-400 hover:text-gray-600"
						aria-label="Close"
					>
						<X class="h-6 w-6" />
					</button>
				</div>

				{#if !selectedPlatform}
					<div class="grid gap-4">
						{#each Object.entries(data.product.downloads) as [platform, architectures]}
							{@const PlatformIcon = getPlatformIcon(platform)}
							<button
								onclick={() => selectPlatform(platform)}
								class="flex items-center justify-between rounded-xl border p-6 text-left transition-colors hover:bg-gray-50"
								aria-label={`Download for ${platform}`}
							>
								<div class="flex items-center space-x-4">
									<PlatformIcon class="h-8 w-8 text-gray-600" />
									<div>
										<h3 class="text-lg font-medium capitalize">{platform}</h3>
										<p class="text-sm text-gray-500">
											{Object.keys(architectures).length} architecture{Object.keys(architectures)
												.length > 1
												? 's'
												: ''} available
										</p>
									</div>
								</div>
								<ChevronRight class="h-5 w-5 text-gray-400" />
							</button>
						{/each}
					</div>
				{:else}
					<div>
						<button
							onclick={() => (selectedPlatform = null)}
							class="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900"
							aria-label="Back to platforms"
						>
							<ArrowLeft class="h-4 w-4" />
							<span>Back to platforms</span>
						</button>

						<h3 class="mb-6 text-xl font-medium capitalize">{selectedPlatform} Downloads</h3>

						<div class="grid gap-4">
							{#each Object.entries(data.product.downloads[selectedPlatform]) as [arch, downloadInfo]}
								{@const ArchIcon = getArchIcon(arch)}
								<div class="flex items-center justify-between rounded-xl border p-6">
									<div class="flex items-center space-x-4">
										<ArchIcon class="h-6 w-6 text-gray-600" />
										<div>
											<h4 class="font-medium capitalize">{arch}</h4>
											<p class="text-sm text-gray-500">{downloadInfo.size}</p>
										</div>
									</div>
									<button
										onclick={() => downloadFile(downloadInfo)}
										class="rounded-lg bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800"
										aria-label={`Download ${arch}`}
									>
										Download
									</button>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
