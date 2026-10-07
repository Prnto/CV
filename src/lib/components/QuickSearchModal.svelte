<script lang="ts">
	import { systemKernel } from '#lib/core/system-state.svelte';
	import { sound } from './audio';
	import Icon from './Icon.svelte';

	let inputEl = $state<HTMLInputElement | null>(null);

	$effect(() => {
		if (systemKernel.isSearchOpen && inputEl) {
			setTimeout(() => inputEl?.focus(), 50);
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			systemKernel.isSearchOpen = false;
		}
	}

	const searchResults = $derived.by(() => {
		const q = systemKernel.searchQuery.trim().toLowerCase();
		if (!q) return [];
		const data = systemKernel.data;
		const results: { type: string; title: string; subtitle: string; tag: string }[] = [];

		// Check experience
		data.experience.forEach((exp) => {
			if (
				exp.company.toLowerCase().includes(q) ||
				exp.role.toLowerCase().includes(q) ||
				exp.bullets.some((b) => b.toLowerCase().includes(q)) ||
				exp.projects?.some((p) => p.toLowerCase().includes(q))
			) {
				results.push({
					type: 'Досвід',
					title: exp.company,
					subtitle: exp.role + ' — ' + exp.period,
					tag: exp.category || 'exp'
				});
			}
		});

		// Check skills hardware
		data.skillsHardware.forEach((skill) => {
			if (skill.toLowerCase().includes(q)) {
				results.push({
					type: 'Апаратні навички',
					title: skill,
					subtitle: systemKernel.locale === 'uk' ? 'Апаратне QA / Електроніка' : 'Hardware QA / Electronics',
					tag: 'hardware'
				});
			}
		});

		// Check skills software
		data.skillsSoftware.forEach((tool) => {
			if (tool.toLowerCase().includes(q)) {
				results.push({
					type: 'ПЗ та Утиліти',
					title: tool,
					subtitle: systemKernel.locale === 'uk' ? 'Програмне QA / Інструменти тестування' : 'Software QA / Testing Tools',
					tag: 'software'
				});
			}
		});

		// Check education
		data.education.forEach((edu) => {
			if (edu.institution.toLowerCase().includes(q) || edu.specialization.toLowerCase().includes(q)) {
				results.push({
					type: 'Освіта',
					title: edu.institution,
					subtitle: edu.specialization,
					tag: 'education'
				});
			}
		});

		return results;
	});
</script>

<svelte:window onkeydown={(e) => {
	if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
		e.preventDefault();
		if (systemKernel.soundEnabled) sound.playSelect();
		systemKernel.toggleSearch();
	}
}} />

{#if systemKernel.isSearchOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="search-backdrop no-print" onclick={() => (systemKernel.isSearchOpen = false)} onkeydown={handleKeydown}>
		<div class="search-modal" onclick={(e) => e.stopPropagation()}>
			<div class="search-header">
				<Icon name="search" size={20} class="search-icon" />
				<input
					bind:this={inputEl}
					type="text"
					placeholder="Шукати навичку, технологію, прилад (напр. кліматична камера, Jira, Black body)..."
					value={systemKernel.searchQuery}
					oninput={(e) => {
						if (systemKernel.soundEnabled) sound.playHover();
						systemKernel.setSearchQuery((e.target as HTMLInputElement).value);
					}}
				/>
				<button class="close-btn" onclick={() => (systemKernel.isSearchOpen = false)} aria-label="Закрити">
					<Icon name="x" size={18} />
				</button>
			</div>

			<div class="search-body">
				{#if systemKernel.searchQuery.trim() === ''}
					<div class="search-hints">
						<span class="hint-title">Швидкі запити:</span>
						<div class="tag-row">
							{#each ['Кліматична камера', 'Калібратор', 'Jira', 'Android / iOS', 'Obsidian-4', 'Пайка', 'PuTTY'] as hint}
								<button
									class="hint-tag"
									onmouseenter={() => { if (systemKernel.soundEnabled) sound.playHover(); }}
									onclick={() => {
										if (systemKernel.soundEnabled) sound.playSelect();
										systemKernel.setSearchQuery(hint);
									}}
								>
									{hint}
								</button>
							{/each}
						</div>
					</div>
				{:else if searchResults.length === 0}
					<div class="no-results">
						Нічого не знайдено за запитом "{systemKernel.searchQuery}". Спробуйте іншу назву приладу або навички.
					</div>
				{:else}
					<div class="results-list">
						{#each searchResults as item}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div
								class="result-card"
								onmouseenter={() => { if (systemKernel.soundEnabled) sound.playHover(); }}
								onclick={() => {
									if (systemKernel.soundEnabled) sound.playSelect();
									systemKernel.isSearchOpen = false;
								}}
							>
								<div class="result-meta">
									<span class="result-type">{item.type}</span>
								</div>
								<div class="result-title">{item.title}</div>
								<div class="result-sub">{item.subtitle}</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="search-footer">
				<span>Натисніть <kbd>ESC</kbd> для виходу</span>
				<span>{searchResults.length} збігів знайдено</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.search-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		z-index: 200;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: max(16px, env(safe-area-inset-top, 16px)) 12px 16px;
	}

	.search-modal {
		background: #1e222d;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 14px;
		width: 95%;
		max-width: 640px;
		max-height: 85vh;
		box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		animation: modal-pop 160ms cubic-bezier(0, 0, 0.2, 1);
	}

	@keyframes modal-pop {
		from {
			opacity: 0;
			transform: scale(0.96) translateY(-10px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.search-header {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 20px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.search-header input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: #ffffff;
		font-size: 1.05rem;
		font-family: inherit;
	}

	.search-header input::placeholder {
		color: #64748b;
	}

	.close-btn {
		color: #94a3b8;
		padding: 4px;
		border-radius: 6px;
	}

	.close-btn:hover {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.1);
	}

	.search-body {
		padding: 16px 20px;
		max-height: 380px;
		overflow-y: auto;
	}

	.search-hints {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.hint-title {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #94a3b8;
	}

	.tag-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.hint-tag {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: #cbd5e1;
		padding: 5px 12px;
		border-radius: 6px;
		font-size: 0.8rem;
		transition: all 150ms ease;
	}

	.hint-tag:hover {
		background: rgba(56, 189, 248, 0.2);
		border-color: rgba(56, 189, 248, 0.4);
		color: #ffffff;
	}

	.results-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.result-card {
		padding: 10px 14px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.result-card:hover {
		background: rgba(255, 255, 255, 0.07);
	}

	.result-type {
		font-size: 0.7rem;
		color: #38bdf8;
		font-family: var(--font-mono);
		text-transform: uppercase;
	}

	.result-title {
		font-weight: 600;
		color: #ffffff;
		font-size: 0.95rem;
		margin-top: 2px;
	}

	.result-sub {
		font-size: 0.82rem;
		color: #94a3b8;
	}

	.no-results {
		color: #94a3b8;
		text-align: center;
		padding: 30px 0;
		font-size: 0.9rem;
	}

	.search-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;
		background: rgba(0, 0, 0, 0.25);
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		font-size: 0.75rem;
		color: #64748b;
	}

	kbd {
		background: rgba(255, 255, 255, 0.1);
		padding: 2px 5px;
		border-radius: 4px;
		color: #cbd5e1;
		font-family: var(--font-mono);
	}
</style>

