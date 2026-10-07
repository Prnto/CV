<script lang="ts">
	import type { ResumeData, ExperienceItem, EducationItem, AchievementItem, CourseItem } from '#lib/core/types';
	import { systemKernel } from '#lib/core/system-state.svelte';
	import { sound } from '#lib/components/audio';

	interface Props {
		data: ResumeData;
	}

	let { data }: Props = $props();

	interface HistoryItem {
		command: string;
		outputHtml: string;
	}

	let inputVal = $state('');
	let commandHistory = $state<HistoryItem[]>([]);
	let terminalScrollEl = $state<HTMLDivElement | null>(null);

	let initialBanner = $derived(`
<div class="neofetch-block">
  <div class="ascii-art">
   /\\        kolosov@atn-lab
  /  \\       --------------------
 / /\\ \\      OS: Antigravity Linux (QA Edition)
/ /  \\ \\     Kernel: 6.12.0-kolosov-qa
/ /    \\ \\    Uptime: 2021-2026 (ATN Corp Hardware QA)
/_/      \\_\\   Shell: zsh 5.9 (arch-tui)
             Packages: 24 (Jira, Postman, TeraTerm, AmbaUSB)
             Hardware Stand: Climatic Chamber + Black Body
             Locale: ${data.locale.toUpperCase()} (UTF-8)
  </div>
  <div class="neo-info">
    <div class="neo-name">${data.personal.fullName}</div>
    <div class="neo-role">${data.personal.title}</div>
    <div class="neo-loc">📍 ${data.personal.location} | 📞 ${data.personal.phone}</div>
    <div class="neo-hint">Введіть <code>help</code> або клікніть команди нижче для перегляду резюме.</div>
  </div>
</div>`);

	function executeCommand(cmd: string) {
		const raw = cmd.trim();
		const clean = raw.toLowerCase();

		if (systemKernel.soundEnabled) sound.playKey();

		let out = '';

		if (clean === 'clear' || clean === 'cls') {
			commandHistory = [];
			inputVal = '';
			return;
		}

		if (clean === 'help' || clean === '?') {
			out = `
<div class="term-help">
  <div class="help-title">Доступні команди ядра:</div>
  <div class="help-grid">
    <div><code>whoami</code> — Інформація про інженера</div>
    <div><code>experience</code> — Досвід роботи (ATN, ОЗОН, BASTICO)</div>
    <div><code>skills</code> — Навички тестування та інженерні утиліти</div>
    <div><code>education</code> — Вища освіта та коледж</div>
    <div><code>achievements</code> — Кваліфікації та досягнення</div>
    <div><code>courses</code> — Курси безпеки CRDF Global</div>
    <div><code>contact</code> — Контакти (телефон, email, соціальні мережі)</div>
    <div><code>neofetch</code> — Системна інформація стенду</div>
    <div><code>test-run</code> — Симуляція випробування приладу у кліматичній камері</div>
    <div><code>clear</code> — Очистити екран</div>
  </div>
</div>`;
		} else if (clean === 'whoami') {
			out = `
<div class="term-section">
  <strong>${data.personal.fullName}</strong> — ${data.personal.title}
  <p>${data.personal.summary ?? ''}</p>
</div>`;
		} else if (clean === 'experience' || clean === 'cat experience' || clean === 'exp') {
			out = `<div class="term-exp">` + data.experience.map((e: ExperienceItem) => `
  <div class="term-card">
    <div class="term-card-title">🏢 ${e.companyUrl ? `<a href="${e.companyUrl}" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;text-decoration:underline;"><strong>${e.company}</strong></a>` : `<strong>${e.company}</strong>`} (${e.period})</div>
    <div class="term-card-role">Посада: ${e.role}</div>
    ${e.projects ? `<div class="term-card-projects">Проєкти: ${e.projects.join(', ')}</div>` : ''}
    <ul class="term-bullets">
      ${e.bullets.map((b: string) => `<li>- ${b}</li>`).join('')}
    </ul>
  </div>
`).join('') + `</div>`;
		} else if (clean === 'skills' || clean === 'cat skills') {
			out = `
<div class="term-skills">
  <div class="skills-group">
    <div class="term-group-title">🛠️ АПАРАТНЕ ТА ЛАБОРАТОРНЕ ТЕСТУВАННЯ:</div>
    <ul>${data.skillsHardware.map((s: string) => `<li>+ ${s}</li>`).join('')}</ul>
  </div>
  <div class="skills-group">
    <div class="term-group-title">💻 ПЗ, ТРЕКЕРИ ТА УТИЛІТИ:</div>
    <div class="chips-row">${data.skillsSoftware.map((s: string) => `<span class="term-chip">${s}</span>`).join(' ')}</div>
  </div>
</div>`;
		} else if (clean === 'education' || clean === 'cat education') {
			out = `<div class="term-edu">` + data.education.map((e: EducationItem) => `
  <div class="term-card">
    <div>🎓 ${e.institutionUrl ? `<a href="${e.institutionUrl}" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;text-decoration:underline;"><strong>${e.institution}</strong></a>` : `<strong>${e.institution}</strong>`} (${e.period})</div>
    <div>${e.degree} &bull; ${e.specialization}</div>
  </div>
`).join('') + `</div>`;
		} else if (clean === 'achievements') {
			out = `<div class="term-ach">` + data.achievements.map((a: AchievementItem) => `
  <div>🏆 <strong>${a.title}</strong> — ${a.subtitle ?? ''}</div>
`).join('') + `</div>`;
		} else if (clean === 'courses') {
			out = `<div class="term-courses">` + data.courses.map((c: CourseItem) => `
  <div>📜 <strong>${c.organization}</strong>: ${c.details}</div>
`).join('') + `</div>`;
		} else if (clean === 'contact' || clean === 'contacts') {
			out = `
<div class="term-contact">
  <div>📞 Телефон: <a href="tel:${data.personal.phone}">${data.personal.phone}</a></div>
  <div>✉️ Email: <a href="mailto:${data.personal.email}">${data.personal.email}</a></div>
  <div>📍 Локація: ${data.personal.location}</div>
  <div>🔗 LinkedIn: <a href="https://linkedin.com/in/oleksii-kolosov" target="_blank">linkedin.com/in/oleksii-kolosov</a></div>
  <div>✈️ Telegram: <a href="https://t.me/Mr_Pronto" target="_blank">@Mr_Pronto</a></div>
  <div>🐙 GitHub: <a href="https://github.com/Prnto" target="_blank">github.com/Prnto</a></div>
</div>`;
		} else if (clean === 'neofetch') {
			out = initialBanner;
		} else if (clean === 'test-run') {
			out = `
<div class="term-test-run">
  <span style="color:#10b981;">[STATUS] Ініціалізація стенду випробувань ATN...</span><br/>
  <span>[STAND] Прилад: Obsidian-4 / Smart Thermal Core</span><br/>
  <span>[STAGE 1] Кліматична камера: Нагрів до +55°C (Вологість 90%)... [OK]</span><br/>
  <span>[STAGE 2] Калібратор чорного тіла: перевірка дельти температури &lt;0.05°C... [PASS]</span><br/>
  <span>[STAGE 3] Протокол зв'язку: Tera Term UART / AmbaUSB streaming... [CONNECTED]</span><br/>
  <span style="color:#38bdf8;">[RESULT] Усі 5 циклів регресії завершено без дефектів. QA Pass!</span>
</div>`;
		} else if (raw !== '') {
			out = `<span style="color:#ef4444;">Команда не знайдена: ${raw}. Введіть <code>help</code> для списку команд.</span>`;
		}

		commandHistory = [...commandHistory, { command: raw, outputHtml: out }];
		inputVal = '';

		setTimeout(() => {
			if (terminalScrollEl) {
				terminalScrollEl.scrollTop = terminalScrollEl.scrollHeight;
			}
		}, 20);
	}

	function handleFormSubmit(e: SubmitEvent) {
		e.preventDefault();
		executeCommand(inputVal);
	}
</script>

<div class="term-shell-container">
	<div class="term-window page-container">
		<!-- Window Header -->
		<div class="term-header">
			<div class="window-controls">
				<span class="dot close"></span>
				<span class="dot min"></span>
				<span class="dot max"></span>
			</div>
			<div class="term-title">
				kolosov@atn-lab: ~ (zsh / sveltekit)
			</div>
			<div class="term-tools">
				<button class="clear-btn" onclick={() => executeCommand('clear')} title="Очистити">
					clear
				</button>
			</div>
		</div>

		<!-- Quick Action Chips for Easy Navigation -->
		<div class="quick-commands-bar no-print">
			<span class="bar-title">Швидкий запуск:</span>
			{#each ['whoami', 'experience', 'skills', 'education', 'achievements', 'courses', 'contact', 'test-run', 'help'] as cmd}
				<button type="button" class="q-btn" onclick={() => executeCommand(cmd)}>
					${cmd}
				</button>
			{/each}
		</div>

		<!-- Terminal Screen -->
		<div class="term-body" bind:this={terminalScrollEl}>
			{@html initialBanner}

			{#each commandHistory as item}
				<div class="history-item">
					<div class="prompt-line">
						<span class="user-host">kolosov@atn-lab</span>:<span class="dir">~</span>$&nbsp;<span class="executed-cmd">{item.command}</span>
					</div>
					{#if item.outputHtml}
						<div class="output-line">
							{@html item.outputHtml}
						</div>
					{/if}
				</div>
			{/each}

			<!-- Current active prompt -->
			<form class="active-prompt-form no-print" onsubmit={handleFormSubmit}>
				<span class="user-host">kolosov@atn-lab</span>:<span class="dir">~</span>$&nbsp;
				<input
					type="text"
					bind:value={inputVal}
					class="term-input"
					placeholder="Введіть команду..."
					autocomplete="off"
					spellcheck="false"
				/>
			</form>
		</div>
	</div>
</div>

<style>
	.term-shell-container {
		width: 100%;
		padding: 24px 16px 80px;
		display: flex;
		justify-content: center;
		font-family: var(--font-mono);
	}

	.term-window {
		width: 100%;
		max-width: 1040px;
		background: #0d1117;
		border: 1px solid #30363d;
		border-radius: 12px;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.term-header {
		background: #161b22;
		border-bottom: 1px solid #30363d;
		padding: 10px 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.window-controls {
		display: flex;
		gap: 8px;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		display: inline-block;
	}

	.dot.close { background: #ff5f56; }
	.dot.min { background: #ffbd2e; }
	.dot.max { background: #27c93f; }

	.term-title {
		font-size: 0.8rem;
		color: #8b949e;
		font-weight: 500;
	}

	.clear-btn {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid #30363d;
		color: #8b949e;
		font-size: 0.72rem;
		padding: 2px 8px;
		border-radius: 4px;
	}

	.clear-btn:hover {
		color: #ffffff;
		border-color: #58a6ff;
	}

	.quick-commands-bar {
		background: #11151c;
		border-bottom: 1px solid #21262d;
		padding: 8px 16px;
		display: flex;
		align-items: center;
		gap: 8px;
		overflow-x: auto;
	}

	.bar-title {
		font-size: 0.72rem;
		color: #6e7681;
		flex-shrink: 0;
	}

	.q-btn {
		background: #161b22;
		border: 1px solid #30363d;
		color: #58a6ff;
		padding: 3px 8px;
		border-radius: 4px;
		font-size: 0.72rem;
		font-family: inherit;
		white-space: nowrap;
		transition: all 140ms ease;
	}

	.q-btn:hover {
		background: #1f6feb;
		color: #ffffff;
		border-color: #58a6ff;
	}

	.term-body {
		padding: 20px;
		font-size: 0.84rem;
		line-height: 1.6;
		color: #c9d1d9;
		min-height: 480px;
		max-height: 720px;
		overflow-y: auto;
	}

	:global(.neofetch-block) {
		display: flex;
		gap: 30px;
		margin-bottom: 24px;
		padding-bottom: 20px;
		border-bottom: 1px dashed #30363d;
		flex-wrap: wrap;
	}

	:global(.ascii-art) {
		color: #58a6ff;
		white-space: pre;
		font-family: monospace;
		line-height: 1.25;
		font-size: 0.78rem;
	}

	:global(.neo-info) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 4px;
	}

	:global(.neo-name) {
		font-size: 1.25rem;
		font-weight: 700;
		color: #f0f6fc;
	}

	:global(.neo-role) {
		color: #10b981;
		font-weight: 600;
	}

	:global(.neo-loc) {
		color: #8b949e;
		font-size: 0.8rem;
	}

	:global(.neo-hint) {
		margin-top: 8px;
		color: #e3b341;
		font-size: 0.78rem;
	}

	:global(.term-help) {
		background: rgba(22, 27, 34, 0.8);
		border: 1px solid #30363d;
		border-radius: 8px;
		padding: 12px 16px;
		margin: 8px 0;
	}

	:global(.help-title) {
		color: #58a6ff;
		font-weight: 600;
		margin-bottom: 8px;
	}

	:global(.help-grid) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 6px 16px;
		font-size: 0.8rem;
	}

	:global(.term-card) {
		background: #161b22;
		border: 1px solid #30363d;
		border-radius: 6px;
		padding: 12px;
		margin-bottom: 10px;
	}

	:global(.term-card-title) {
		color: #f0f6fc;
	}

	:global(.term-card-role) {
		color: #58a6ff;
		font-size: 0.82rem;
	}

	:global(.term-card-projects) {
		color: #e3b341;
		font-size: 0.78rem;
		margin: 4px 0;
	}

	:global(.term-bullets) {
		list-style: none;
		margin-top: 6px;
		color: #8b949e;
		font-size: 0.8rem;
	}

	:global(.term-chip) {
		background: #21262d;
		border: 1px solid #30363d;
		color: #58a6ff;
		padding: 2px 6px;
		border-radius: 4px;
		font-size: 0.76rem;
		display: inline-block;
		margin: 2px;
	}

	:global(.term-contact a) {
		color: #58a6ff;
		text-decoration: underline;
	}

	.history-item {
		margin-bottom: 14px;
	}

	.prompt-line {
		color: #8b949e;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.user-host {
		color: #7ee787;
		font-weight: 600;
	}

	.dir {
		color: #58a6ff;
	}

	.executed-cmd {
		color: #ffffff;
		font-weight: 600;
	}

	.output-line {
		margin-top: 4px;
	}

	.active-prompt-form {
		display: flex;
		align-items: center;
		margin-top: 8px;
	}

	.term-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: #f0f6fc;
		font-family: inherit;
		font-size: inherit;
		caret-color: #58a6ff;
	}

	@media print {
		.term-shell-container {
			padding: 0 !important;
			margin: 0 !important;
			width: 100% !important;
			background: #0d1117 !important;
		}

		.term-window {
			width: 210mm !important;
			max-width: 210mm !important;
			min-height: 297mm !important;
			margin: 0 auto !important;
			border-radius: 0 !important;
			box-shadow: none !important;
			box-sizing: border-box !important;
		}

		.term-body {
			max-height: none !important;
			overflow: visible !important;
		}
	}
</style>

