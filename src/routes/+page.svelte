<script lang="ts">
	import TopPanel from '#lib/components/TopPanel.svelte';
	import ShellContainer from '#lib/shells/ShellContainer.svelte';
	import QuickSearchModal from '#lib/components/QuickSearchModal.svelte';
	import ArchitectureModal from '#lib/components/ArchitectureModal.svelte';
</script>

<div class="resume-application">
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

