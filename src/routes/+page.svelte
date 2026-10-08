<script lang="ts">
	import TopPanel from '#lib/components/TopPanel.svelte';
	import ShellContainer from '#lib/shells/ShellContainer.svelte';
	import QuickSearchModal from '#lib/components/QuickSearchModal.svelte';
	import ArchitectureModal from '#lib/components/ArchitectureModal.svelte';
	import { systemKernel } from '#lib/core/system-state.svelte';
	import { sound } from '#lib/components/audio';

	let lastHovered: Element | null = null;

	function handleGlobalMouseOver(e: MouseEvent) {
		if (!systemKernel.soundEnabled) return;
		const target = e.target as HTMLElement | null;
		if (!target) return;

		const interactive = target.closest(
			'button, a, .chip, .hobby-pill, .result-card, .hint-tag, .contact-pill, .shell-btn, .action-btn'
		);

		if (interactive && interactive !== lastHovered) {
			lastHovered = interactive;
			sound.playHover();
		} else if (!interactive) {
			lastHovered = null;
		}
	}

	function handleGlobalClick(e: MouseEvent) {
		// Initialize audio context on user click
		sound.init();

		if (!systemKernel.soundEnabled) return;
		const target = e.target as HTMLElement | null;
		if (!target) return;

		// Sound toggle button handles its own cheat sound
		if (target.closest('.sound-btn')) return;

		const clickable = target.closest('button, a, .result-card, .hint-tag, .contact-pill:not(.static)');
		if (clickable) {
			sound.playSelect();
		}
	}
</script>

<svelte:window
	onmouseover={handleGlobalMouseOver}
	onclick={handleGlobalClick}
/>

<div class="resume-application">
	<a href="#main-content" class="skip-link">
		{systemKernel.locale === 'uk' ? 'Перейти до основного вмісту' : 'Skip to main content'}
	</a>
	<TopPanel />
	<ShellContainer />
	<QuickSearchModal />
	<ArchitectureModal />
</div>

<style>
	.resume-application {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>


