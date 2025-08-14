<script lang="ts">
	import '../app.css';
	export const prerender = true;
</script>
<slot />

<style>
	:global(html), :global(body) {
		height: 100%;
		scroll-behavior: smooth;
	}
	:global(body) { background: #000000; color: #ffffff; font-family: system-ui, sans-serif; }
</style>
