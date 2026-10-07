<script lang="ts">
	import { systemKernel } from '#lib/core/system-state.svelte';
	import Icon from './Icon.svelte';
</script>

{#if systemKernel.showSpecsModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="modal-backdrop no-print" onclick={() => (systemKernel.showSpecsModal = false)}>
		<div class="modal-card" onclick={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<div class="modal-title-group">
					<Icon name="cpu" size={20} class="accent-icon" />
					<h3>Архітектура проєкту: Linux-подібне розділення</h3>
				</div>
				<button class="close-btn" onclick={() => (systemKernel.showSpecsModal = false)} aria-label="Закрити">
					<Icon name="x" size={18} />
				</button>
			</div>

			<div class="modal-content">
				<p class="intro">
					Проєкт побудовано строго за принципом архітектури ОС Linux: <strong>дані (ядро / модель)</strong> повністю відокремлені від <strong>графічних оболонок (Desktop Environments / Shells)</strong>.
				</p>

				<div class="arch-diagram">
					<div class="arch-box kernel-box">
						<div class="box-tag">ЯДРО ДАНИХ (KERNEL LAYER)</div>
						<div class="box-desc">
							<code>src/lib/core/resume-data-uk.ts</code> &bull; <code>types.ts</code>
						</div>
						<div class="box-note">
							Чисті типізовані дані резюме (досвід, навички, контакти, освіта). Жодного зв'язку з DOM чи CSS.
						</div>
					</div>

					<div class="arch-arrow">&darr; &darr; &darr; ШИНА СТАНУ (SYSTEM BUS: Svelte 5 Runes) &darr; &darr; &darr;</div>

					<div class="arch-box shells-box">
						<div class="box-tag">ОБОЛОНКИ / ДЕСКТОПИ (PLUGGABLE SHELLS)</div>
						<div class="shells-grid">
							<div class="shell-pill">
								<strong>1. ATN Dark Ref</strong>
								<span>Оригінальний темний референс</span>
							</div>
							<div class="shell-pill">
								<strong>2. Executive Paper</strong>
								<span>A4 PDF / ATS корпоративна тема</span>
							</div>
						</div>
					</div>
				</div>

				<div class="benefits-grid">
					<div class="benefit-card">
						<h4>Легкість масштабування</h4>
						<p>Щоб додати новий стиль або тему, достатньо створити один Svelte-компонент у <code>shells/</code>. Дані залишаються недоторканими.</p>
					</div>
					<div class="benefit-card">
						<h4>Багатомовність "з коробки"</h4>
						<p>Ядро підтримує українську та англійську локалі без дублювання розмітки чи логіки інтерфейсу.</p>
					</div>
					<div class="benefit-card">
						<h4>Експорт та друк</h4>
						<p>Окрема оптимізація друку під стандартизований формат A4 без зайвих кнопок перемикання теми.</p>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button class="ok-btn" onclick={() => (systemKernel.showSpecsModal = false)}>
					Зрозуміло
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(8px);
		z-index: 210;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}

	.modal-card {
		background: #181d28;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 16px;
		width: 95%;
		max-width: 680px;
		max-height: 90vh;
		overflow-y: auto;
		box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7);
		animation: modal-pop 160ms cubic-bezier(0, 0, 0.2, 1);
	}

	@keyframes modal-pop {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 22px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(255, 255, 255, 0.02);
	}

	.modal-title-group {
		display: flex;
		align-items: center;
		gap: 10px;
		color: #ffffff;
	}

	.modal-title-group h3 {
		font-size: 1.05rem;
		font-weight: 600;
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

	.modal-content {
		padding: 22px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.intro {
		color: #cbd5e1;
		font-size: 0.92rem;
		line-height: 1.5;
	}

	.arch-diagram {
		background: #0f131c;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 10px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.arch-box {
		padding: 12px;
		border-radius: 8px;
	}

	.kernel-box {
		background: rgba(56, 189, 248, 0.08);
		border: 1px solid rgba(56, 189, 248, 0.3);
	}

	.shells-box {
		background: rgba(16, 185, 129, 0.08);
		border: 1px solid rgba(16, 185, 129, 0.3);
	}

	.box-tag {
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: #38bdf8;
		margin-bottom: 4px;
	}

	.shells-box .box-tag {
		color: #10b981;
	}

	.box-desc {
		font-size: 0.82rem;
		color: #ffffff;
	}

	.box-note {
		font-size: 0.78rem;
		color: #94a3b8;
		margin-top: 4px;
	}

	.arch-arrow {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: #f59e0b;
		text-align: center;
		letter-spacing: 0.05em;
	}

	.shells-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 8px;
		margin-top: 8px;
	}

	.shell-pill {
		background: rgba(255, 255, 255, 0.05);
		padding: 8px 10px;
		border-radius: 6px;
		border: 1px solid rgba(255, 255, 255, 0.06);
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.shell-pill strong {
		color: #ffffff;
		font-size: 0.82rem;
	}

	.shell-pill span {
		font-size: 0.72rem;
		color: #94a3b8;
	}

	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}

	.benefit-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 8px;
		padding: 10px;
	}

	.benefit-card h4 {
		font-size: 0.84rem;
		color: #ffffff;
		margin-bottom: 4px;
	}

	.benefit-card p {
		font-size: 0.75rem;
		color: #94a3b8;
		line-height: 1.4;
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		padding: 14px 22px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(0, 0, 0, 0.2);
	}

	.ok-btn {
		background: #2563eb;
		color: #ffffff;
		padding: 8px 20px;
		border-radius: 6px;
		font-size: 0.86rem;
		font-weight: 600;
	}

	.ok-btn:hover {
		background: #1d4ed8;
	}

	@media (max-width: 600px) {
		.shells-grid,
		.benefits-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

