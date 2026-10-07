<script lang="ts">
	import '#lib/styles/global.css';
	import { onMount } from 'svelte';
	import { systemKernel } from '#lib/core/system-state.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(() => {
		systemKernel.initFromStorage();
	});
</script>

<svelte:head>
	<link rel="icon" href={systemKernel.data.personal.photoUrl} />
</svelte:head>

{@render children()}

