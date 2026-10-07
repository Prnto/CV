<script lang="ts">
	import type { ResumeData } from '#lib/core/types';
	import { systemKernel } from '#lib/core/system-state.svelte';
	import Icon from '#lib/components/Icon.svelte';

	interface Props {
		data: ResumeData;
	}

	let { data }: Props = $props();

	let telemetryTemp = $state(42.5);
	let telemetryHumidity = $state(88);
	let chamberStatus = $state<'CALIBRATED' | 'STRESS_TEST' | 'STANDBY'>('CALIBRATED');

	function cycleChamber() {
		if (chamberStatus === 'CALIBRATED') {
			chamberStatus = 'STRESS_TEST';
			telemetryTemp = 65.0;
			telemetryHumidity = 95;
		} else if (chamberStatus === 'STRESS_TEST') {
			chamberStatus = 'STANDBY';
			telemetryTemp = 22.0;
			telemetryHumidity = 50;
		} else {
			chamberStatus = 'CALIBRATED';
			telemetryTemp = 37.0;
			telemetryHumidity = 60;
		}
	}
</script>

<div class="hud-shell-container">
	<div class="hud-layout page-container">
		<!-- HUD STATUS BAR / WAYBAR HEADER -->
		<div class="waybar-header">
			<div class="waybar-left">
				<span class="hud-badge arch">HYPRLAND // WM</span>
				<span class="hud-stat">WORKSPACE: [ 1: QA-BENCH ]</span>
			</div>
			<div class="waybar-center">
				<span class="hud-title">ATN HARDWARE TESTING LAB HUD // OLEKSII KOLOSOV</span>
			</div>
			<div class="waybar-right">
				<button class="telemetry-toggle-btn" onclick={cycleChamber} title="Перемкнути режим стенду">
					<span class="dot-live"></span>
					<span>CHAMBER: {chamberStatus}</span>
				</button>
			</div>
		</div>

		<!-- TOP TELEMETRY WIDGETS STRIP -->
		<div class="telemetry-grid">
			<div class="telemetry-card">
				<div class="tele-label">КЛІМАТИЧНА КАМЕРА</div>
				<div class="tele-val">{telemetryTemp}°C</div>
				<div class="tele-sub">Вологість: {telemetryHumidity}% RH</div>
			</div>
			<div class="telemetry-card">
				<div class="tele-label">КАЛІБРАТОР ЧОРНОГО ТІЛА</div>
				<div class="tele-val text-emerald">37.00°C</div>
				<div class="tele-sub">Delta T: ±0.02°C [STABLE]</div>
			</div>
			<div class="telemetry-card">
				<div class="tele-label">ПРИСТРОЇ У ТЕСТІ (DUT)</div>
				<div class="tele-val text-cyan">Gen 4, 5, 6</div>
				<div class="tele-sub">Obsidian-4 &bull; Radar 360</div>
			</div>
			<div class="telemetry-card">
				<div class="tele-label">ЗВ'ЯЗОК З ПЛАТОЮ (UART)</div>
				<div class="tele-val text-amber">115200 BAUD</div>
				<div class="tele-sub">Tera Term / PuTTY / AmbaUSB</div>
			</div>
		</div>

		<!-- TILING WINDOWS GRID -->
		<div class="tiling-grid">
			<!-- WINDOW 1: IDENTITY & OVERVIEW -->
			<div class="tile-window col-span-12">
				<div class="win-titlebar">
					<span class="win-icon"><Icon name="cpu" size={14} /></span>
					<span class="win-title">NODE://PROFILE_IDENTITY.SYS</span>
					<span class="win-tag">STATUS: ONLINE</span>
				</div>
				<div class="win-body profile-hud">
					<div class="hud-avatar-box">
						<img src={data.personal.photoUrl} alt={data.personal.fullName} class="hud-avatar" />
						<div class="scan-line"></div>
					</div>
					<div class="hud-profile-info">
						<h1 class="hud-name">{data.personal.fullName}</h1>
						<div class="hud-role">{data.personal.title}</div>
						<p class="hud-summary">{data.personal.summary}</p>
						<div class="hud-contact-pills">
							<span class="hud-pill">📍 {data.personal.location}</span>
							<a href="tel:{data.personal.phone}" class="hud-pill">📞 {data.personal.phone}</a>
							<a href="mailto:{data.personal.email}" class="hud-pill">✉️ {data.personal.email}</a>
							<a href="https://linkedin.com/in/oleksii-kolosov" target="_blank" class="hud-pill">🔗 LinkedIn</a>
							<a href="https://t.me/Mr_Pronto" target="_blank" class="hud-pill">✈️ @Mr_Pronto</a>
						</div>
					</div>
				</div>
			</div>

			<!-- WINDOW 2: HARDWARE TESTING EXPERIENCE -->
			<div class="tile-window col-span-7">
				<div class="win-titlebar">
					<span class="win-icon"><Icon name="activity" size={14} /></span>
					<span class="win-title">LOG://EXPERIENCE_TIMELINE.DAT</span>
					<span class="win-tag">3 RECORDS</span>
				</div>
				<div class="win-body">
					<div class="timeline-list">
						{#each data.experience as exp}
							<div class="timeline-card">
								<div class="tc-header">
									<div class="tc-company">
										<span class="tc-bullet">&gt;</span>
										<strong>{exp.company}</strong>
									</div>
									<span class="tc-period">{exp.period}</span>
								</div>
								<div class="tc-role">{exp.role}</div>

								{#if exp.projects}
									<div class="tc-projects">
										<span class="tc-proj-label">PROJ:</span> {exp.projects.join(' | ')}
									</div>
								{/if}

								<ul class="tc-bullets">
									{#each exp.bullets as bullet}
										<li>[+] {bullet}</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- WINDOW 3: HARDWARE & SOFTWARE MATRIX -->
			<div class="tile-window col-span-5">
				<div class="win-titlebar">
					<span class="win-icon"><Icon name="tool" size={14} /></span>
					<span class="win-title">MATRIX://HARDWARE_STACK.HEX</span>
					<span class="win-tag">STAND VERIFIED</span>
				</div>
				<div class="win-body stack-hud">
					<div class="stack-block">
						<div class="stack-title">⚡ АПАРАТНІ ТА ЛАБОРАТОРНІ ВИПРОБУВАННЯ:</div>
						<div class="neon-chips">
							{#each data.skillsHardware as s}
								<span class="neon-chip hw">{s}</span>
							{/each}
						</div>
					</div>

					<div class="stack-block">
						<div class="stack-title">🛠️ ПЗ, ДЕФЕКТ-ТРЕКІНГ ТА УТИЛІТИ:</div>
						<div class="neon-chips">
							{#each data.skillsSoftware as s}
								<span class="neon-chip sw">{s}</span>
							{/each}
						</div>
					</div>

					<div class="stack-block">
						<div class="stack-title">🏆 КВАЛІФІКАЦІЇ ТА ДОПУСКИ:</div>
						<div class="ach-mini-list">
							{#each data.achievements as a}
								<div class="ach-mini">
									<span class="ach-sym">✦</span>
									<div>
										<strong>{a.title}</strong>
										{#if a.subtitle}
											<div class="ach-sub">{a.subtitle}</div>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<!-- WINDOW 4: EDUCATION & COURSES -->
			<div class="tile-window col-span-7">
				<div class="win-titlebar">
					<span class="win-icon"><Icon name="file-text" size={14} /></span>
					<span class="win-title">SYS://EDUCATION_CERTIFICATION.DOC</span>
				</div>
				<div class="win-body">
					<div class="edu-grid-hud">
						{#each data.education as edu}
							<div class="edu-hud-card">
								<div class="ehc-inst">{edu.institution}</div>
								<div class="ehc-deg">{edu.degree} &bull; {edu.specialization}</div>
								<div class="ehc-year">{edu.period}</div>
							</div>
						{/each}
						{#each data.courses as crs}
							<div class="edu-hud-card course-highlight">
								<div class="ehc-inst">📜 {crs.organization}</div>
								<div class="ehc-deg">{crs.details}</div>
								<div class="ehc-year">{crs.year ?? 'Сертифіковано'}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- WINDOW 5: TELEMETRY & LANGUAGES & HOBBIES -->
			<div class="tile-window col-span-5">
				<div class="win-titlebar">
					<span class="win-icon"><Icon name="globe" size={14} /></span>
					<span class="win-title">MODULES://LANGUAGES_HOBBIES.PKG</span>
				</div>
				<div class="win-body">
					<div class="lang-hud-list">
						{#each data.languages as l}
							<div class="lang-hud-item">
								<div class="lh-name">{l.language}</div>
								<div class="lh-bar-container">
									<div class="lh-bar-fill" style="width: {l.proficiencyPercent ?? 80}%"></div>
								</div>
								<div class="lh-level">{l.level}</div>
							</div>
						{/each}
					</div>

					<div class="hobbies-hud-row">
						{#each data.hobbies as h}
							<div class="hh-pill">
								<Icon name={h.icon} size={14} />
								<span>{h.name}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.hud-shell-container {
		width: 100%;
		padding: 20px 16px 80px;
		display: flex;
		justify-content: center;
		font-family: var(--font-mono);
	}

	.hud-layout {
		width: 100%;
		max-width: 1240px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	/* WAYBAR HEADER */
	.waybar-header {
		background: #0a0e17;
		border: 1px solid #1e3352;
		border-radius: 8px;
		padding: 8px 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.78rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
		flex-wrap: wrap;
		gap: 10px;
	}

	.waybar-left {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.hud-badge.arch {
		background: #0088cc;
		color: #ffffff;
		font-weight: 800;
		padding: 2px 8px;
		border-radius: 4px;
	}

	.hud-stat {
		color: #94a3b8;
	}

	.waybar-center {
		color: #10b981;
		font-weight: 700;
		letter-spacing: 0.05em;
	}

	.telemetry-toggle-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		background: rgba(16, 185, 129, 0.15);
		border: 1px solid #10b981;
		color: #10b981;
		padding: 4px 10px;
		border-radius: 4px;
		font-family: inherit;
		font-size: 0.76rem;
		transition: all 160ms ease;
	}

	.telemetry-toggle-btn:hover {
		background: rgba(16, 185, 129, 0.3);
	}

	.dot-live {
		width: 8px;
		height: 8px;
		background: #10b981;
		border-radius: 50%;
		box-shadow: 0 0 8px #10b981;
	}

	/* TELEMETRY CARDS */
	.telemetry-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
	}

	.telemetry-card {
		background: #0d1424;
		border: 1px solid #1e3352;
		border-radius: 8px;
		padding: 12px 14px;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.tele-label {
		font-size: 0.68rem;
		color: #64748b;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.tele-val {
		font-size: 1.25rem;
		font-weight: 800;
		color: #38bdf8;
	}

	.tele-val.text-emerald { color: #10b981; }
	.tele-val.text-cyan { color: #38bdf8; }
	.tele-val.text-amber { color: #f59e0b; }

	.tele-sub {
		font-size: 0.72rem;
		color: #94a3b8;
	}

	/* TILING WINDOWS */
	.tiling-grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 14px;
	}

	.col-span-12 { grid-column: span 12; }
	.col-span-7 { grid-column: span 7; }
	.col-span-5 { grid-column: span 5; }

	.tile-window {
		background: #0b111e;
		border: 1px solid #1e3352;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
		transition: border-color 200ms ease;
	}

	.tile-window:hover {
		border-color: #38bdf8;
	}

	.win-titlebar {
		background: #101a2d;
		border-bottom: 1px solid #1e3352;
		padding: 8px 14px;
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 0.76rem;
	}

	.win-title {
		color: #cbd5e1;
		font-weight: 600;
		flex: 1;
	}

	.win-tag {
		color: #10b981;
		font-size: 0.68rem;
	}

	.win-body {
		padding: 16px;
	}

	/* PROFILE HUD */
	.profile-hud {
		display: flex;
		gap: 20px;
		align-items: center;
	}

	.hud-avatar-box {
		position: relative;
		width: 100px;
		height: 100px;
		border-radius: 8px;
		overflow: hidden;
		border: 2px solid #10b981;
		flex-shrink: 0;
		box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
	}

	.hud-avatar {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.scan-line {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: rgba(16, 185, 129, 0.8);
		box-shadow: 0 0 8px #10b981;
		animation: scan-anim 3s linear infinite;
	}

	@keyframes scan-anim {
		0% { top: 0; }
		50% { top: 100%; }
		100% { top: 0; }
	}

	.hud-name {
		font-size: 1.5rem;
		font-weight: 800;
		color: #ffffff;
		letter-spacing: 0.04em;
	}

	.hud-role {
		font-size: 0.95rem;
		color: #10b981;
		margin-bottom: 6px;
	}

	.hud-summary {
		font-size: 0.82rem;
		color: #94a3b8;
		line-height: 1.5;
		margin-bottom: 10px;
	}

	.hud-contact-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.hud-pill {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid #1e3352;
		color: #cbd5e1;
		font-size: 0.74rem;
		padding: 4px 10px;
		border-radius: 4px;
	}

	/* TIMELINE */
	.timeline-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.timeline-card {
		background: rgba(255, 255, 255, 0.02);
		border-left: 2px solid #10b981;
		padding: 10px 14px;
		border-radius: 0 6px 6px 0;
	}

	.tc-header {
		display: flex;
		justify-content: space-between;
		font-size: 0.85rem;
		color: #ffffff;
		margin-bottom: 3px;
	}

	.tc-bullet {
		color: #10b981;
		margin-right: 6px;
	}

	.tc-period {
		font-size: 0.74rem;
		color: #64748b;
	}

	.tc-role {
		font-size: 0.8rem;
		color: #38bdf8;
		margin-bottom: 4px;
	}

	.tc-projects {
		font-size: 0.74rem;
		color: #f59e0b;
		margin-bottom: 6px;
	}

	.tc-bullets {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-size: 0.78rem;
		color: #cbd5e1;
	}

	/* NEON STACK */
	.stack-hud {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.stack-title {
		font-size: 0.74rem;
		color: #94a3b8;
		margin-bottom: 6px;
		font-weight: 700;
	}

	.neon-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.neon-chip {
		font-size: 0.74rem;
		padding: 4px 8px;
		border-radius: 4px;
		background: #060910;
		border: 1px solid #1e3352;
		color: #cbd5e1;
	}

	.neon-chip.hw {
		border-color: rgba(16, 185, 129, 0.5);
		color: #6ee7b7;
	}

	.neon-chip.sw {
		border-color: rgba(56, 189, 248, 0.5);
		color: #7dd3fc;
	}

	.ach-mini-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.ach-mini {
		display: flex;
		gap: 8px;
		font-size: 0.78rem;
		color: #cbd5e1;
	}

	.ach-sym {
		color: #f59e0b;
	}

	.ach-sub {
		font-size: 0.72rem;
		color: #64748b;
	}

	/* EDU & COURSES */
	.edu-grid-hud {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.edu-hud-card {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid #1e3352;
		border-radius: 6px;
		padding: 10px 12px;
	}

	.edu-hud-card.course-highlight {
		border-color: rgba(245, 158, 11, 0.4);
	}

	.ehc-inst {
		font-size: 0.82rem;
		font-weight: 700;
		color: #ffffff;
	}

	.ehc-deg {
		font-size: 0.76rem;
		color: #cbd5e1;
		margin-top: 2px;
	}

	.ehc-year {
		font-size: 0.72rem;
		color: #64748b;
		margin-top: 2px;
	}

	/* LANGUAGES HUD */
	.lang-hud-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 14px;
	}

	.lang-hud-item {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 0.76rem;
	}

	.lh-name {
		width: 90px;
		color: #cbd5e1;
	}

	.lh-bar-container {
		flex: 1;
		height: 6px;
		background: #1e3352;
		border-radius: 3px;
		overflow: hidden;
	}

	.lh-bar-fill {
		height: 100%;
		background: #10b981;
		border-radius: 3px;
	}

	.lh-level {
		font-size: 0.72rem;
		color: #94a3b8;
		width: 100px;
		text-align: right;
	}

	.hobbies-hud-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.hh-pill {
		display: flex;
		align-items: center;
		gap: 6px;
		background: #060910;
		border: 1px solid #1e3352;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 0.74rem;
		color: #cbd5e1;
	}

	@media screen and (max-width: 900px) {
		.telemetry-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.col-span-7,
		.col-span-5 {
			grid-column: span 12;
		}
		.profile-hud {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	@media print {
		.hud-shell-container {
			padding: 0 !important;
			margin: 0 !important;
			width: 100% !important;
			background: #0a0e17 !important;
		}

		.hud-layout {
			width: 210mm !important;
			max-width: 210mm !important;
			padding: 8mm !important;
			box-sizing: border-box !important;
		}

		.tile-window {
			break-inside: avoid !important;
			page-break-inside: avoid !important;
		}
	}
</style>

