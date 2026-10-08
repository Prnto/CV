<script lang="ts">
	import { systemKernel } from '#lib/core/system-state.svelte';
	import ReferenceDarkShell from './reference-dark/ReferenceDarkShell.svelte';
	import TerminalShell from './terminal-cli/TerminalShell.svelte';
	import CyberpunkShell from './cyberpunk-hud/CyberpunkShell.svelte';
	import ExecutivePaperShell from './executive-paper/ExecutivePaperShell.svelte';

	let currentShell = $derived(systemKernel.currentShell);
	let data = $derived(systemKernel.data);
</script>

<main id="main-content" class="shell-host" data-shell-active={currentShell}>
	{#if currentShell === 'reference-dark'}
		<ReferenceDarkShell {data} />
	{:else if currentShell === 'terminal-cli'}
		<TerminalShell {data} />
	{:else if currentShell === 'cyberpunk-hud'}
		<CyberpunkShell {data} />
	{:else if currentShell === 'executive-paper'}
		<ExecutivePaperShell {data} />
	{/if}
</main>

<style>
	.shell-host {
		width: 100%;
		min-height: calc(100vh - 54px);
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}
</style>

