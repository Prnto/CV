<script lang="ts">
	import { systemKernel } from '#lib/core/system-state.svelte';
	import { VISIBLE_SHELLS, type getShellById } from '#lib/core/shell-registry';
	import { sound } from '#lib/components/audio';
	import Icon from './Icon.svelte';

	function handleShellChange(shellId: (typeof VISIBLE_SHELLS)[number]['id']) {
		if (systemKernel.soundEnabled) sound.playSwitch();
		systemKernel.setShell(shellId);
	}

	function handleLocaleToggle() {
		if (systemKernel.soundEnabled) sound.playClick();
		systemKernel.toggleLocale();
	}

	function handleSoundToggle() {
		systemKernel.toggleSound();
		if (systemKernel.soundEnabled) sound.playClick();
	}

	function handlePrint() {
		if (systemKernel.soundEnabled) sound.playClick();
		systemKernel.triggerPrint();
	}
</script>

<header class="top-panel no-print">
	<div class="panel-inner">
		<!-- Brand & Status -->
		<div class="brand-group">
			<div class="status-indicator" title="Kernel state: online">
				<span class="status-dot"></span>
				<span class="status-ping"></span>
			</div>
			<div class="brand-text">
				<span class="kernel-name">KOLOSOV // QA</span>
				<span class="kernel-ver">v2.0-kernel</span>
			</div>
		</div>

		<!-- Desktop Environment / Shell Switcher -->
		<div class="shell-switcher" role="radiogroup" aria-label="Desktop Shell Switcher">
			<span class="switcher-label">
				<Icon name="layout" size={14} />
				<span>ОБОЛОНКА:</span>
			</span>
			<div class="shell-buttons">
				{#each VISIBLE_SHELLS as shell}
					{@const active = systemKernel.currentShell === shell.id}
					<button
						type="button"
						class="shell-btn"
						class:active
						onclick={() => handleShellChange(shell.id)}
						title={shell.description}
						role="radio"
						aria-checked={active}
					>
						<Icon name={shell.icon} size={14} />
						<span class="shell-btn-name">{shell.name}</span>
						{#if active}
							<span class="active-indicator"></span>
						{/if}
					</button>
				{/each}
			</div>
		</div>

		<!-- Action Tools -->
		<div class="panel-actions">
			<!-- Quick search trigger -->
			<button
				type="button"
				class="action-btn"
				onclick={() => systemKernel.toggleSearch()}
				title="Пошук по навичках (Ctrl+K)"
				aria-label="Пошук по навичках"
			>
				<Icon name="search" size={16} />
				<span class="key-hint">Ctrl+K</span>
			</button>

			<!-- Language Switcher -->
			<button
				type="button"
				class="action-btn lang-btn"
				onclick={handleLocaleToggle}
				title="Перемкнути мову (UA / EN)"
				aria-label="Перемкнути мову"
			>
				<Icon name="globe" size={15} />
				<span class="lang-text">{systemKernel.locale.toUpperCase()}</span>
			</button>

			<!-- Sound FX Toggle -->
			<button
				type="button"
				class="action-btn"
				class:sound-on={systemKernel.soundEnabled}
				onclick={handleSoundToggle}
				title={systemKernel.soundEnabled ? 'Звук: Увімкнено' : 'Звук: Вимкнено'}
				aria-label="Звукові ефекти"
			>
				<Icon name={systemKernel.soundEnabled ? 'sound' : 'sound-off'} size={16} />
			</button>

			<!-- Architecture Explainer Modal Trigger -->
			<button
				type="button"
				class="action-btn"
				onclick={() => { systemKernel.showSpecsModal = true; if (systemKernel.soundEnabled) sound.playClick(); }}
				title="Архітектура проєкту (Linux Data/Shell Separation)"
				aria-label="Інформація про архітектуру"
			>
				<Icon name="info" size={16} />
			</button>

			<!-- Print / PDF Export -->
			<button
				type="button"
				class="action-btn print-btn"
				onclick={handlePrint}
				title="Друк / Зберегти як PDF"
				aria-label="Друк резюме"
			>
				<Icon name="printer" size={16} />
				<span class="print-text">PDF / Друк</span>
			</button>
		</div>
	</div>
</header>

<style>
	.top-panel {
		position: sticky;
		top: 0;
		z-index: 100;
		width: 100%;
		background: rgba(20, 20, 23, 0.85);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		padding: 8px 16px;
		color: #e2e8f0;
		font-size: 0.82rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
	}

	.panel-inner {
		max-width: 1360px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
	}

	.brand-group {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.status-indicator {
		position: relative;
		width: 10px;
		height: 10px;
	}

	.status-dot {
		position: absolute;
		inset: 1px;
		background: #10b981;
		border-radius: 50%;
	}

	.status-ping {
		position: absolute;
		inset: -2px;
		border-radius: 50%;
		border: 2px solid rgba(16, 185, 129, 0.4);
		animation: pulse-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	@keyframes pulse-ping {
		0% {
			transform: scale(0.9);
			opacity: 1;
		}
		100% {
			transform: scale(2.2);
			opacity: 0;
		}
	}

	.brand-text {
		display: flex;
		align-items: baseline;
		gap: 6px;
	}

	.kernel-name {
		font-weight: 700;
		letter-spacing: 0.05em;
		color: #ffffff;
		font-size: 0.86rem;
	}

	.kernel-ver {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: #38bdf8;
		background: rgba(56, 189, 248, 0.12);
		padding: 2px 6px;
		border-radius: 4px;
		border: 1px solid rgba(56, 189, 248, 0.25);
	}

	.shell-switcher {
		display: flex;
		align-items: center;
		gap: 8px;
		background: rgba(0, 0, 0, 0.35);
		padding: 3px 4px;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.switcher-label {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 0.68rem;
		font-weight: 700;
		color: #94a3b8;
		letter-spacing: 0.05em;
		padding: 0 6px;
	}

	.shell-buttons {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.shell-btn {
		position: relative;
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		border-radius: 6px;
		font-size: 0.78rem;
		font-weight: 500;
		color: #94a3b8;
		transition: all 180ms ease;
	}

	.shell-btn:hover {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.06);
	}

	.shell-btn.active {
		color: #ffffff;
		background: rgba(56, 189, 248, 0.18);
		border: 1px solid rgba(56, 189, 248, 0.4);
		box-shadow: 0 0 12px rgba(56, 189, 248, 0.2);
	}

	.panel-actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.action-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 10px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.09);
		color: #cbd5e1;
		font-size: 0.78rem;
		transition: all 180ms ease;
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.12);
		color: #ffffff;
		border-color: rgba(255, 255, 255, 0.2);
	}

	.key-hint {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		background: rgba(0, 0, 0, 0.4);
		padding: 2px 5px;
		border-radius: 4px;
		color: #94a3b8;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.lang-btn {
		font-weight: 700;
		font-family: var(--font-mono);
	}

	.sound-on {
		color: #10b981;
		border-color: rgba(16, 185, 129, 0.4);
		background: rgba(16, 185, 129, 0.1);
	}

	.print-btn {
		background: linear-gradient(135deg, #0284c7, #2563eb);
		border: 1px solid rgba(56, 189, 248, 0.4);
		color: #ffffff;
		font-weight: 600;
		box-shadow: 0 2px 10px rgba(37, 99, 235, 0.3);
	}

	.print-btn:hover {
		background: linear-gradient(135deg, #0369a1, #1d4ed8);
		box-shadow: 0 4px 14px rgba(37, 99, 235, 0.5);
	}

	@media (max-width: 900px) {
		.switcher-label {
			display: none;
		}
		.shell-btn-name {
			display: none;
		}
		.print-text,
		.key-hint {
			display: none;
		}
	}
</style>

