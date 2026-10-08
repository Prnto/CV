<script lang="ts">
	import type { ResumeData } from '#lib/core/types';
	import { systemKernel } from '#lib/core/system-state.svelte';
	import { sound } from '#lib/components/audio';
	import Icon from '#lib/components/Icon.svelte';

	interface Props {
		data: ResumeData;
	}

	let { data }: Props = $props();

	let copiedField = $state<string | null>(null);

	function copyText(text: string, field: string) {
		if (typeof navigator !== 'undefined') {
			if (systemKernel.soundEnabled) sound.playSelect();
			navigator.clipboard.writeText(text);
			copiedField = field;
			setTimeout(() => {
				copiedField = null;
			}, 2000);
		}
	}

	function isMatch(text: string): boolean {
		const q = systemKernel.searchQuery.trim().toLowerCase();
		if (!q) return false;
		return text.toLowerCase().includes(q);
	}
</script>

<div class="ref-shell-container">
	<div class="ref-canvas page-container">
		<!-- HEADER SECTION -->
		<header class="ref-header">
			<div class="header-main-row">
				<!-- Avatar with Ukraine Accent and Status -->
				<div class="avatar-block">
					<div class="avatar-wrapper">
						<div class="ua-flag-accent" title="Ukraine">
							<span class="ua-blue"></span>
							<span class="ua-yellow"></span>
						</div>
						<img
							src={data.personal.photoUrl}
							alt={data.personal.fullName}
							class="avatar-img"
							loading="eager"
						/>
					</div>
					<div class="status-pill no-print">
						<span class="status-dot"></span>
						<span>{data.locale === 'uk' ? 'QA Апаратного ПЗ' : 'QA Hardware'}</span>
					</div>
				</div>

				<!-- Identity & Summary -->
				<div class="identity-block">
					<div class="name-social-row">
						<h1 class="person-name">{data.personal.fullName}</h1>
					</div>

					<div class="title-row">
						<span class="person-title">{data.personal.title}</span>
					</div>

					<!-- Header Contacts Strip -->
					<div class="header-contacts-bar">
						<button
							type="button"
							class="contact-pill"
							onclick={() => copyText(data.personal.phone, 'phone')}
							title={data.locale === 'uk' ? 'Натисніть для копіювання номера' : 'Click to copy phone number'}
						>
							<Icon name="phone" size={13} />
							<span>{data.personal.phone}</span>
							{#if copiedField === 'phone'}
								<span class="copy-tooltip">{data.locale === 'uk' ? 'Скопійовано!' : 'Copied!'}</span>
							{/if}
						</button>

						<button
							type="button"
							class="contact-pill"
							onclick={() => copyText(data.personal.email, 'email')}
							title={data.locale === 'uk' ? 'Натисніть для копіювання email' : 'Click to copy email'}
						>
							<Icon name="email" size={13} />
							<span>{data.personal.email}</span>
							{#if copiedField === 'email'}
								<span class="copy-tooltip">{data.locale === 'uk' ? 'Скопійовано!' : 'Copied!'}</span>
							{/if}
						</button>

						<div class="contact-pill static">
							<Icon name="location" size={13} />
							<span>{data.personal.location}</span>
						</div>

						<a
							href="https://t.me/Mr_Pronto"
							target="_blank"
							rel="noopener noreferrer"
							class="contact-pill link"
							title="Telegram: @Mr_Pronto"
						>
							<Icon name="telegram" size={13} />
							<span>@Mr_Pronto</span>
							<span class="link-arrow no-print">↗</span>
						</a>

						<a
							href="https://linkedin.com/in/oleksii-kolosov"
							target="_blank"
							rel="noopener noreferrer"
							class="contact-pill link"
							title={data.locale === 'uk' ? 'LinkedIn профіль' : 'LinkedIn profile'}
						>
							<Icon name="linkedin" size={13} />
							<span>LinkedIn</span>
							<span class="link-arrow no-print">↗</span>
						</a>

						<a
							href="https://github.com/Prnto"
							target="_blank"
							rel="noopener noreferrer"
							class="contact-pill link"
							title={data.locale === 'uk' ? 'GitHub профіль: Prnto' : 'GitHub profile: Prnto'}
						>
							<Icon name="github" size={13} />
							<span>GitHub</span>
							<span class="link-arrow no-print">↗</span>
						</a>
					</div>

					{#if data.personal.summary}
						<p class="person-bio">{data.personal.summary}</p>
					{/if}
				</div>
			</div>
		</header>

		<!-- MAIN 2-COLUMN BALANCED GRID -->
		<main class="ref-main-grid">
			<!-- LEFT COLUMN: CORE EXPERIENCE & MILESTONES (~58%) -->
			<div class="ref-column left-column">
				<!-- EXPERIENCE CARD -->
				<section class="ref-card exp-card">
					<div class="card-header">
						<h3 class="card-title">
							<span class="title-accent-dot"></span>
							<span class="title-text">{data.locale === 'uk' ? 'ДОСВІД РОБОТИ' : 'PROFESSIONAL EXPERIENCE'}</span>
						</h3>
					</div>

					<div class="exp-list">
						{#each data.experience as item}
							<article class="exp-item" class:highlighted={item.highlight}>
								<div class="exp-heading">
									<div class="company-badge-row">
										{#if item.companyUrl}
											<a
												href={item.companyUrl}
												target="_blank"
												rel="noopener noreferrer"
												class="company-link"
												title="{item.company} ({item.companyUrl})"
											>
												{#if item.id === 'exp-atn'}
													<span class="company-logo atn">ATN</span>
												{:else if item.id === 'exp-bastico'}
													<span class="company-logo bastico">B</span>
												{/if}
												<h4 class="company-name" class:matched={isMatch(item.company)}>{item.company}</h4>
												<span class="company-ext-icon no-print">↗</span>
											</a>
										{:else}
											{#if item.id === 'exp-atn'}
												<span class="company-logo atn">ATN</span>
											{:else if item.id === 'exp-bastico'}
												<span class="company-logo bastico">B</span>
											{/if}
											<h4 class="company-name" class:matched={isMatch(item.company)}>{item.company}</h4>
										{/if}
									</div>
									<span class="exp-period">{item.period}</span>
								</div>

								{#if item.id === 'exp-atn'}
									<div class="exp-role-line">
										<span class="role-badge" class:matched={isMatch(item.role)}>{item.role}</span>
									</div>

									{#if item.apps && item.apps.length > 0}
										<div class="projects-block">
											<div class="apps-row">
												<span class="projects-label">
													{data.locale === 'uk' ? 'Мобільні застосунки (QA):' : 'Mobile Apps (QA):'}
												</span>
												<div class="apps-badges-list">
													{#each item.apps as app}
														<span class="app-chip" class:matched={isMatch(app.name)}>
															<span class="app-chip-name">{app.name}</span>
															<span class="app-chip-stores">
																{#if app.androidUrl}
																	<a
																		href={app.androidUrl}
																		target="_blank"
																		rel="noopener noreferrer"
																		class="store-badge android"
																		title="{app.name} — Google Play"
																	>
																		<Icon name="android" size={10} />
																		<span>Play</span>
																	</a>
																{/if}
																{#if app.iosUrl}
																	<a
																		href={app.iosUrl}
																		target="_blank"
																		rel="noopener noreferrer"
																		class="store-badge apple"
																		title="{app.name} — App Store"
																	>
																		<Icon name="apple" size={10} />
																		<span>iOS</span>
																	</a>
																{/if}
															</span>
														</span>
													{/each}
												</div>
											</div>
											<div class="hardware-row">
												<span class="projects-label">
													{data.locale === 'uk' ? 'Пристрої:' : 'Devices:'}
												</span>
												<span class="projects-content">
													{data.locale === 'uk'
														? 'Оптико-електронні прилади ATN 2–6 поколінь (вбудоване ПЗ / Firmware)'
														: 'Gen 2–6 Electro-Optics (Embedded Firmware)'}
												</span>
											</div>
										</div>
									{:else if item.projects && item.projects.length > 0}
										<div class="projects-block">
											<span class="projects-label">
												{data.locale === 'uk' ? 'Проєкти:' : 'Projects:'}
											</span>
											<span class="projects-content">
												{item.projects.join(', ')}
											</span>
										</div>
									{/if}

									<ul class="bullets-list">
										{#each item.bullets as bullet}
											<li class:matched={isMatch(bullet)}>
												<span class="bullet-dot">&bull;</span>
												<span class="bullet-text">{bullet}</span>
											</li>
										{/each}
									</ul>
								{:else}
									<!-- Concise Role / Line for Managerial Experience -->
									<div class="exp-concise-line">
										<span class="exp-role" class:matched={isMatch(item.role)}>{item.role}</span>
										<span class="exp-sep">/</span>
										<span class="exp-desc" class:matched={isMatch(item.bullets[0])}>{item.bullets[0]}</span>
									</div>
								{/if}
							</article>
						{/each}
					</div>
				</section>

				<!-- KEY ACHIEVEMENTS CARD -->
				<section class="ref-card ach-card">
					<div class="card-header">
						<h3 class="card-title">
							<span class="title-accent-dot amber"></span>
							<span class="title-text">{data.locale === 'uk' ? 'КЛЮЧОВІ РЕЗУЛЬТАТИ ТА КВАЛІФІКАЦІЇ' : 'KEY QUALIFICATIONS & ACHIEVEMENTS'}</span>
						</h3>
					</div>

					<div class="ach-list">
						{#each data.achievements as ach}
							<div class="ach-item">
								<div class="ach-icon-circle">
									<Icon name={ach.icon} size={15} />
								</div>
								<div class="ach-text">
									<div class="ach-title" class:matched={isMatch(ach.title)}>{ach.title}</div>
									{#if ach.subtitle}
										<div class="ach-subtitle">{ach.subtitle}</div>
									{/if}
									{#if ach.details}
										<div class="ach-details">{ach.details}</div>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</section>
			</div>

			<!-- RIGHT COLUMN: SKILLS, EDUCATION & CREDENTIALS (~42%) -->
			<div class="ref-column right-column">
				<!-- SKILLS & SOFTWARE CARD -->
				<section class="ref-card skills-card">
					<div class="card-header">
						<h3 class="card-title">
							<span class="title-accent-dot green"></span>
							<span class="title-text">{data.locale === 'uk' ? 'ТЕХНІЧНІ НАВИЧКИ ТА СТЕК' : 'SKILLS & TECH STACK'}</span>
						</h3>
					</div>

					<!-- Hardware Testing -->
					<div class="skills-section-block">
						<div class="sub-label hw-label">
							<Icon name="cpu" size={13} />
							<span>{data.locale === 'uk' ? 'Апаратне тестування & Лабораторія' : 'Hardware Testing & Laboratory'}</span>
						</div>
						<div class="chips-grid hardware-chips">
							{#each data.skillsHardware as skill}
								<span class="chip chip-hw" class:matched={isMatch(skill)}>
									{skill}
								</span>
							{/each}
						</div>
					</div>

					<!-- Software, QA & Dev Utilities -->
					<div class="skills-section-block">
						<div class="sub-label tool-label">
							<Icon name="tool" size={13} />
							<span>{data.locale === 'uk' ? 'ПЗ, QA, Мобільні утиліти & Інструменти' : 'Software, QA, Mobile & Tools'}</span>
						</div>
						<div class="chips-grid tool-chips">
							{#each data.skillsSoftware as tool}
								<span class="chip chip-tool" class:matched={isMatch(tool)}>
									{tool}
								</span>
							{/each}
						</div>
					</div>

					<!-- Platforms & Operating Systems -->
					<div class="skills-section-block compact">
						<div class="sub-label platform-label">
							<Icon name="layout" size={13} />
							<span>{data.locale === 'uk' ? 'Платформи та операційні системи' : 'Platforms & Operating Systems'}</span>
						</div>
						<div class="chips-grid platform-chips">
							{#each ['Linux', 'Windows', 'iOS', 'Android'] as plat}
								<span class="chip chip-platform" class:matched={isMatch(plat)}>
									{plat}
								</span>
							{/each}
						</div>
					</div>
				</section>

				<!-- EDUCATION & CERTIFICATIONS CARD -->
				<section class="ref-card edu-card">
					<div class="card-header">
						<h3 class="card-title">
							<span class="title-accent-dot purple"></span>
							<span class="title-text">{data.locale === 'uk' ? 'ОСВІТА ТА СЕРТИФІКАЦІЯ' : 'EDUCATION & CERTIFICATIONS'}</span>
						</h3>
					</div>

					<div class="edu-list">
						{#each data.education as edu}
							<div class="edu-item">
								<div class="edu-icon">
									<Icon name="file-text" size={14} />
								</div>
								<div class="edu-details">
									<div class="edu-top-row">
										{#if edu.institutionUrl}
											<a
												href={edu.institutionUrl}
												target="_blank"
												rel="noopener noreferrer"
												class="edu-inst-link"
												title="{edu.institution} ({edu.institutionUrl})"
											>
												<h4 class="edu-inst" class:matched={isMatch(edu.institution)}>{edu.institution}</h4>
												<span class="edu-ext-icon no-print">↗</span>
											</a>
										{:else}
											<h4 class="edu-inst" class:matched={isMatch(edu.institution)}>{edu.institution}</h4>
										{/if}
										<span class="edu-period">{edu.period}</span>
									</div>									<div class="edu-meta">
										<span class="edu-degree">{edu.degree}</span>
										<span class="edu-dot">&bull;</span>
										<span class="edu-spec" class:matched={isMatch(edu.specialization)}>{edu.specialization}</span>
									</div>
								</div>
							</div>
						{/each}

						<!-- CRDF Certification Box -->
						{#each data.courses as course}
							<div class="course-box">
								<div class="course-header-row">
									<span class="course-badge">CRDF GLOBAL</span>
									<span class="course-year">{course.year ?? 'Сертифіковано'}</span>
								</div>
								<p class="course-text" class:matched={isMatch(course.details)}>
									{course.details}
								</p>
							</div>
						{/each}
					</div>
				</section>

				<!-- LANGUAGES & HOBBIES CARD -->
				<section class="ref-card lang-hobbies-card">
					<div class="card-header">
						<h3 class="card-title">
							<span class="title-accent-dot blue"></span>
							<span class="title-text">{data.locale === 'uk' ? 'МОВИ ТА ХОБІ' : 'LANGUAGES & INTERESTS'}</span>
						</h3>
					</div>

					<div class="lang-hobbies-split">
						<!-- Languages Column -->
						<div class="lang-col">
							<div class="sub-label-mini">
								{data.locale === 'uk' ? 'Володіння мовами' : 'Languages'}
							</div>
							<div class="lang-list">
								{#each data.languages as lang}
									<div class="lang-row">
										<div class="lang-badge-group">
											{#if lang.badge}
												<span class="flag-pill {lang.badge.toLowerCase()}">{lang.badge}</span>
											{/if}
											<span class="lang-name">{lang.language}</span>
										</div>
										<span class="lang-level">{lang.level}</span>
									</div>
								{/each}
							</div>
						</div>

						<!-- Hobbies Column -->
						<div class="hobbies-col">
							<div class="sub-label-mini">
								{data.locale === 'uk' ? 'Технічні інтереси' : 'Tech Interests'}
							</div>
							<div class="hobbies-grid">
								{#each data.hobbies as hobby}
									<div class="hobby-pill">
										<Icon name={hobby.icon} size={12} />
										<span>{hobby.name}</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	</div>
</div>

<style>
	.ref-shell-container {
		width: 100%;
		padding: 24px 16px 80px;
		display: flex;
		justify-content: center;
		background: #0b0f19;
		background-image: radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.05) 0%, transparent 50%);
		color: #e2e8f0;
	}

	.ref-canvas {
		width: 100%;
		max-width: 1160px;
		background: #131824;
		border-radius: 14px;
		padding: 26px 30px;
		box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.07);
		border: 1px solid rgba(255, 255, 255, 0.07);
	}

	/* ================= HEADER SECTION ================= */
	.ref-header {
		padding-bottom: 18px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		margin-bottom: 16px;
	}

	.header-main-row {
		display: flex;
		align-items: flex-start;
		gap: 22px;
	}

	/* Avatar */
	.avatar-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.avatar-wrapper {
		position: relative;
		width: 102px;
		height: 102px;
		border-radius: 10px;
		overflow: hidden;
		background: #1c2230;
		border: 2px solid rgba(56, 189, 248, 0.35);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
	}

	.ua-flag-accent {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		display: flex;
		z-index: 2;
	}

	.ua-blue { flex: 1; background: #0057b7; }
	.ua-yellow { flex: 1; background: #ffd700; }

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
	}

	.status-pill {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		background: rgba(16, 185, 129, 0.12);
		border: 1px solid rgba(16, 185, 129, 0.3);
		padding: 2px 8px;
		border-radius: 12px;
		font-size: 0.65rem;
		font-family: var(--font-mono);
		color: #10b981;
		white-space: nowrap;
	}

	.status-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #10b981;
		box-shadow: 0 0 6px #10b981;
	}

	/* Identity */
	.identity-block {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.name-social-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}

	.person-name {
		font-size: 1.95rem;
		font-weight: 800;
		letter-spacing: 0.04em;
		color: #ffffff;
		line-height: 1.1;
		text-transform: uppercase;
	}

	.social-links-row {
		display: flex;
		gap: 6px;
	}

	.social-icon-btn {
		width: 28px;
		height: 28px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 180ms ease;
	}

	.social-icon-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
	}

	.social-icon-btn.linkedin:hover { background: #0077b5; border-color: #0077b5; }
	.social-icon-btn.telegram:hover { background: #229ed9; border-color: #229ed9; }
	.social-icon-btn.github:hover { background: #24292e; border-color: #f0f6fc; }
	.social-icon-btn.facebook:hover { background: #1877f2; border-color: #1877f2; }

	.title-row {
		display: flex;
		align-items: center;
	}

	.person-title {
		font-size: 1.08rem;
		font-weight: 600;
		color: #38bdf8;
		letter-spacing: 0.01em;
	}

	/* Header Contacts Bar */
	.header-contacts-bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
		margin: 2px 0;
	}

	.contact-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.09);
		padding: 3px 9px;
		border-radius: 6px;
		font-size: 0.74rem;
		color: #cbd5e1;
		font-family: var(--font-mono);
		position: relative;
		cursor: pointer;
		text-decoration: none;
		transition: all 150ms ease;
	}

	.contact-pill:hover {
		background: rgba(56, 189, 248, 0.12);
		border-color: rgba(56, 189, 248, 0.35);
		color: #ffffff;
	}

	.contact-pill.static {
		cursor: default;
	}

	.contact-pill.static:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.09);
		color: #cbd5e1;
	}

	.link-arrow {
		font-size: 0.75rem;
		opacity: 0.7;
	}

	.copy-tooltip {
		position: absolute;
		top: -24px;
		left: 50%;
		transform: translateX(-50%);
		background: #10b981;
		color: #ffffff;
		font-size: 0.62rem;
		padding: 2px 6px;
		border-radius: 4px;
		font-weight: 600;
		white-space: nowrap;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
		z-index: 10;
	}

	.person-bio {
		font-size: 0.81rem;
		color: #94a3b8;
		line-height: 1.45;
		margin-top: 3px;
	}

	/* ================= MAIN 2-COLUMN GRID ================= */
	.ref-main-grid {
		display: grid;
		grid-template-columns: 1.28fr 1fr;
		gap: 16px;
	}

	.ref-column {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	/* Card Base */
	.ref-card {
		background: #181e2b;
		border-radius: 10px;
		padding: 15px 17px;
		border: 1px solid rgba(255, 255, 255, 0.07);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
		transition: border-color 200ms ease;
	}

	.ref-card:hover {
		border-color: rgba(255, 255, 255, 0.12);
	}

	.card-header {
		margin-bottom: 12px;
		padding-bottom: 7px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
	}

	.card-title {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 0.86rem;
		font-weight: 700;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.title-accent-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #38bdf8;
		box-shadow: 0 0 8px rgba(56, 189, 248, 0.8);
		flex-shrink: 0;
	}

	.title-accent-dot.amber { background: #f59e0b; box-shadow: 0 0 8px rgba(245, 158, 11, 0.8); }
	.title-accent-dot.green { background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.8); }
	.title-accent-dot.purple { background: #a855f7; box-shadow: 0 0 8px rgba(168, 85, 247, 0.8); }
	.title-accent-dot.blue { background: #60a5fa; box-shadow: 0 0 8px rgba(96, 165, 250, 0.8); }

	/* ================= EXPERIENCE ================= */
	.exp-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.exp-item {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.exp-item.highlighted {
		background: rgba(255, 255, 255, 0.025);
		border: 1px solid rgba(56, 189, 248, 0.15);
		border-radius: 8px;
		padding: 12px 14px;
	}

	.exp-heading {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
	}

	.company-badge-row {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.company-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: inherit;
		text-decoration: none;
		transition: color 150ms ease;
	}

	.company-link:hover .company-name {
		color: #38bdf8;
	}

	.company-logo {
		font-size: 0.62rem;
		font-weight: 800;
		padding: 1px 5px;
		border-radius: 3px;
		color: #ffffff;
		font-family: var(--font-mono);
	}

	.company-logo.atn { background: #ef4444; }
	.company-logo.bastico { background: #10b981; }

	.company-name {
		font-size: 0.88rem;
		font-weight: 700;
		color: #ffffff;
	}

	.company-ext-icon {
		font-size: 0.72rem;
		color: #64748b;
	}

	.exp-period {
		font-size: 0.73rem;
		font-family: var(--font-mono);
		color: #94a3b8;
		white-space: nowrap;
	}

	.exp-role-line {
		margin-top: 1px;
	}

	.role-badge {
		display: inline-block;
		background: rgba(56, 189, 248, 0.12);
		color: #38bdf8;
		border: 1px solid rgba(56, 189, 248, 0.25);
		padding: 2px 8px;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.projects-block {
		background: rgba(0, 0, 0, 0.25);
		border-radius: 5px;
		padding: 5px 8px;
		font-size: 0.73rem;
		color: #cbd5e1;
		border-left: 2px solid #38bdf8;
		margin-top: 2px;
	}

	.projects-label {
		color: #38bdf8;
		font-weight: 700;
		margin-right: 4px;
	}

	.apps-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
		margin-bottom: 3px;
	}

	.apps-badges-list {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 5px;
	}

	.app-chip {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 4px;
		padding: 1px 4px 1px 6px;
	}

	.app-chip.matched {
		background: rgba(234, 179, 8, 0.2);
		border-color: #eab308;
	}

	.app-chip-name {
		font-size: 0.71rem;
		font-weight: 600;
		color: #f1f5f9;
		white-space: nowrap;
	}

	.app-chip-stores {
		display: inline-flex;
		align-items: center;
		gap: 3px;
	}

	.store-badge {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		text-decoration: none;
		font-size: 0.62rem;
		font-family: var(--font-mono);
		font-weight: 600;
		padding: 1px 4px;
		border-radius: 3px;
		line-height: 1;
		transition: all 120ms ease;
	}

	.store-badge.android {
		background: rgba(34, 197, 94, 0.15);
		color: #4ade80;
		border: 1px solid rgba(34, 197, 94, 0.35);
	}

	.store-badge.android:hover {
		background: rgba(34, 197, 94, 0.3);
		color: #86efac;
		border-color: rgba(34, 197, 94, 0.7);
		transform: translateY(-0.5px);
	}

	.store-badge.apple {
		background: rgba(248, 250, 252, 0.12);
		color: #f1f5f9;
		border: 1px solid rgba(248, 250, 252, 0.25);
	}

	.store-badge.apple:hover {
		background: rgba(248, 250, 252, 0.25);
		color: #ffffff;
		border-color: rgba(248, 250, 252, 0.6);
		transform: translateY(-0.5px);
	}

	.hardware-row {
		display: flex;
		align-items: baseline;
		font-size: 0.71rem;
		color: #cbd5e1;
		margin-top: 2px;
	}

	.bullets-list {
		list-style: none;
		padding: 0;
		margin: 4px 0 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.bullets-list li {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		font-size: 0.76rem;
		line-height: 1.4;
		color: #cbd5e1;
	}

	.bullet-dot {
		color: #38bdf8;
		font-size: 0.9rem;
		line-height: 1.1;
		flex-shrink: 0;
	}

	.bullet-text {
		flex: 1;
	}

	/* Concise Non-IT Experience */
	.exp-concise-line {
		display: flex;
		align-items: baseline;
		gap: 6px;
		font-size: 0.74rem;
		color: #94a3b8;
		padding-left: 2px;
	}

	.exp-concise-line .exp-role {
		color: #e2e8f0;
		font-weight: 600;
	}

	.exp-concise-line .exp-sep {
		color: #475569;
	}

	.exp-concise-line .exp-desc {
		color: #94a3b8;
	}

	/* ================= ACHIEVEMENTS ================= */
	.ach-list {
		display: flex;
		flex-direction: column;
		gap: 9px;
	}

	.ach-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 7px;
		padding: 8px 10px;
	}

	.ach-icon-circle {
		width: 26px;
		height: 26px;
		border-radius: 6px;
		background: rgba(245, 158, 11, 0.12);
		border: 1px solid rgba(245, 158, 11, 0.25);
		color: #f59e0b;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top: 1px;
	}

	.ach-text {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.ach-title {
		font-size: 0.79rem;
		font-weight: 700;
		color: #ffffff;
	}

	.ach-subtitle {
		font-size: 0.71rem;
		font-family: var(--font-mono);
		color: #f59e0b;
	}

	.ach-details {
		font-size: 0.71rem;
		color: #94a3b8;
		line-height: 1.35;
	}

	/* ================= SKILLS CARD ================= */
	.skills-section-block {
		margin-bottom: 11px;
	}

	.skills-section-block:last-child {
		margin-bottom: 0;
	}

	.sub-label {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.74rem;
		font-weight: 700;
		margin-bottom: 6px;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.sub-label.hw-label { color: #10b981; }
	.sub-label.tool-label { color: #38bdf8; }
	.sub-label.platform-label { color: #818cf8; }

	.chips-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.chip {
		font-size: 0.72rem;
		padding: 3px 7px;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.05);
		color: #e2e8f0;
		border: 1px solid rgba(255, 255, 255, 0.08);
		transition: all 150ms ease;
	}

	.chip:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #ffffff;
	}

	.chip-hw { border-left: 2px solid #10b981; }
	.chip-tool { border-left: 2px solid #38bdf8; }
	.chip-platform { border-left: 2px solid #818cf8; }

	/* ================= EDUCATION & CERTIFICATIONS ================= */
	.edu-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.edu-item {
		display: flex;
		gap: 9px;
		align-items: flex-start;
	}

	.edu-icon {
		background: rgba(168, 85, 247, 0.12);
		border: 1px solid rgba(168, 85, 247, 0.25);
		width: 24px;
		height: 24px;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #a855f7;
		flex-shrink: 0;
		margin-top: 1px;
	}

	.edu-details {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.edu-top-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 6px;
	}

	.edu-inst-link {
		color: inherit;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}

	.edu-inst-link:hover .edu-inst {
		color: #a855f7;
	}

	.edu-inst {
		font-size: 0.78rem;
		font-weight: 700;
		color: #ffffff;
		line-height: 1.25;
	}

	.edu-ext-icon {
		font-size: 0.7rem;
		color: #64748b;
	}

	.edu-period {
		font-size: 0.71rem;
		font-family: var(--font-mono);
		color: #94a3b8;
		white-space: nowrap;
	}

	.edu-meta {
		font-size: 0.72rem;
		color: #cbd5e1;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.edu-dot {
		color: #64748b;
	}

	.edu-spec {
		color: #94a3b8;
	}

	.course-box {
		background: rgba(245, 158, 11, 0.05);
		border: 1px solid rgba(245, 158, 11, 0.2);
		border-radius: 6px;
		padding: 7px 9px;
		margin-top: 2px;
	}

	.course-header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 3px;
	}

	.course-badge {
		font-size: 0.65rem;
		font-weight: 800;
		color: #f59e0b;
		font-family: var(--font-mono);
		background: rgba(245, 158, 11, 0.15);
		padding: 1px 5px;
		border-radius: 3px;
	}

	.course-year {
		font-size: 0.67rem;
		font-family: var(--font-mono);
		color: #94a3b8;
	}

	.course-text {
		font-size: 0.71rem;
		color: #cbd5e1;
		line-height: 1.35;
		margin: 0;
	}

	/* ================= LANGUAGES & HOBBIES ================= */
	.lang-hobbies-split {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
	}

	.sub-label-mini {
		font-size: 0.7rem;
		font-weight: 700;
		color: #94a3b8;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		margin-bottom: 6px;
	}

	.lang-list {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.lang-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.72rem;
		padding: 3px 0;
		border-bottom: 1px dashed rgba(255, 255, 255, 0.06);
	}

	.lang-row:last-child {
		border-bottom: none;
	}

	.lang-badge-group {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.flag-pill {
		font-size: 0.58rem;
		font-weight: 800;
		padding: 1px 4px;
		border-radius: 3px;
		font-family: var(--font-mono);
	}

	.flag-pill.ua { background: #0057b7; color: #ffd700; }
	.flag-pill.en { background: #2563eb; color: #ffffff; }
	.flag-pill.ru { background: #475569; color: #ffffff; }

	.lang-name {
		color: #e2e8f0;
	}

	.lang-level {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: #38bdf8;
		white-space: nowrap;
	}

	.hobbies-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.hobby-pill {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 4px;
		padding: 3px 6px;
		font-size: 0.69rem;
		color: #cbd5e1;
	}

	/* Search Highlight */
	.matched {
		background: rgba(245, 158, 11, 0.28) !important;
		color: #ffffff !important;
		border-radius: 2px;
		outline: 1px solid #f59e0b;
	}

	/* ================= PRINT / A4 FIDELITY ================= */
	/* ================= PRINT / A4 FIDELITY (AUTHENTIC FULL-BLEED DARK THEME) ================= */
	@media print {
		:global(body) {
			background: #141418 !important;
			color: #f4f4f5 !important;
			-webkit-print-color-adjust: exact !important;
			print-color-adjust: exact !important;
		}

		.no-print {
			display: none !important;
		}

		.ref-shell-container {
			padding: 0 !important;
			margin: 0 !important;
			background: #141418 !important;
			background-image: none !important;
			width: 100% !important;
			max-width: 100% !important;
			height: auto !important;
			min-height: 0 !important;
		}

		.ref-canvas {
			width: 100% !important;
			max-width: 100% !important;
			height: auto !important;
			max-height: none !important;
			margin: 0 auto !important;
			padding: 5mm 7mm !important;
			background: #141418 !important;
			border: none !important;
			box-shadow: none !important;
			border-radius: 0 !important;
			box-sizing: border-box !important;
			overflow: visible !important;
		}

		.ref-header {
			padding-bottom: 7px !important;
			margin-bottom: 8px !important;
			border-bottom: 1.5px solid #38bdf8 !important;
		}

		.header-main-row {
			display: flex !important;
			flex-direction: row !important;
			align-items: center !important;
			text-align: left !important;
			gap: 13px !important;
		}

		.avatar-block {
			align-items: flex-start !important;
			flex-shrink: 0 !important;
		}

		.avatar-wrapper {
			width: 64px !important;
			height: 64px !important;
			border-radius: 6px !important;
			border: 1.5px solid #38bdf8 !important;
		}

		.identity-block {
			flex: 1 !important;
			gap: 2px !important;
			text-align: left !important;
		}

		.name-social-row {
			display: flex !important;
			flex-direction: row !important;
			justify-content: flex-start !important;
			align-items: baseline !important;
			gap: 10px !important;
		}

		.person-name {
			font-size: 1.48rem !important;
			color: #ffffff !important;
			line-height: 1.1 !important;
			font-weight: 800 !important;
			letter-spacing: 0.02em !important;
		}

		.title-row {
			display: flex !important;
			justify-content: flex-start !important;
			margin-top: 1px !important;
		}

		.person-title {
			font-size: 0.86rem !important;
			color: #38bdf8 !important;
			font-weight: 600 !important;
		}

		.header-contacts-bar {
			display: flex !important;
			flex-wrap: wrap !important;
			justify-content: flex-start !important;
			gap: 4px 7px !important;
			margin: 3px 0 !important;
		}

		.contact-pill {
			background: #1e1e24 !important;
			border: 1px solid #3f3f4a !important;
			color: #e4e4e7 !important;
			font-size: 0.68rem !important;
			padding: 2px 7px !important;
			border-radius: 4px !important;
			line-height: 1.15 !important;
		}

		.contact-pill :global(svg) {
			color: #38bdf8 !important;
			width: 12px !important;
			height: 12px !important;
		}

		.person-bio {
			font-size: 0.69rem !important;
			color: #cbd5e1 !important;
			line-height: 1.28 !important;
			margin-top: 3px !important;
			text-align: left !important;
		}

		.ref-main-grid {
			display: grid !important;
			grid-template-columns: 1.18fr 1fr !important;
			gap: 8px !important;
		}

		.ref-column {
			display: flex !important;
			flex-direction: column !important;
			gap: 7px !important;
		}

		.ref-card {
			background: #1b1b22 !important;
			border: 1px solid #2e2e38 !important;
			box-shadow: none !important;
			padding: 6px 9px !important;
			border-radius: 5px !important;
			break-inside: avoid !important;
			page-break-inside: avoid !important;
		}

		.card-header {
			margin-bottom: 4px !important;
			padding-bottom: 3px !important;
			border-bottom: 1px solid #2e2e38 !important;
		}

		.card-title {
			font-size: 0.79rem !important;
			font-weight: 700 !important;
			color: #f4f4f5 !important;
		}

		.title-accent-dot {
			background: #38bdf8 !important;
			box-shadow: 0 0 6px rgba(56, 189, 248, 0.6) !important;
		}

		.title-accent-dot.amber {
			background: #f59e0b !important;
			box-shadow: 0 0 6px rgba(245, 158, 11, 0.6) !important;
		}

		.title-accent-dot.purple {
			background: #a855f7 !important;
			box-shadow: 0 0 6px rgba(168, 85, 247, 0.6) !important;
		}

		.title-accent-dot.blue {
			background: #3b82f6 !important;
			box-shadow: 0 0 6px rgba(59, 130, 246, 0.6) !important;
		}

		.exp-list {
			gap: 5px !important;
		}

		.exp-item {
			padding-bottom: 3px !important;
			border-bottom-color: #2e2e38 !important;
		}

		.exp-item.highlighted {
			background: rgba(56, 189, 248, 0.04) !important;
			border: 1px solid rgba(56, 189, 248, 0.22) !important;
			padding: 4px 6px !important;
			border-radius: 4px !important;
		}

		.company-name {
			font-size: 0.82rem !important;
			font-weight: 700 !important;
			color: #ffffff !important;
		}

		.company-logo.atn { background: #dc2626 !important; }
		.company-logo.bastico { background: #16a34a !important; }

		.exp-period {
			font-size: 0.67rem !important;
			color: #a1a1aa !important;
		}

		.role-badge {
			background: rgba(56, 189, 248, 0.14) !important;
			color: #38bdf8 !important;
			border-color: rgba(56, 189, 248, 0.3) !important;
			font-size: 0.70rem !important;
			padding: 1px 5px !important;
			font-weight: 600 !important;
		}

		.projects-block {
			background: #141418 !important;
			border-left: 2px solid #38bdf8 !important;
			font-size: 0.65rem !important;
			color: #d4d4d8 !important;
			padding: 2.5px 5px !important;
			margin: 2px 0 3px !important;
		}

		.apps-row {
			gap: 3px !important;
			margin-bottom: 1.5px !important;
		}

		.apps-badges-list {
			gap: 2.5px !important;
		}

		.app-chip {
			padding: 1px 4px !important;
			background: #18181f !important;
			border: 1px solid #31313d !important;
			gap: 3px !important;
			border-radius: 3px !important;
		}

		.app-chip-name {
			font-size: 0.61rem !important;
			font-weight: 600 !important;
			color: #f4f4f5 !important;
		}

		.app-chip-stores {
			gap: 1.5px !important;
		}

		.store-badge {
			font-size: 0.54rem !important;
			padding: 0.5px 3px !important;
			border-radius: 2px !important;
		}

		.store-badge.android {
			background: rgba(34, 197, 94, 0.2) !important;
			color: #4ade80 !important;
			border: 1px solid rgba(34, 197, 94, 0.45) !important;
		}

		.store-badge.apple {
			background: rgba(255, 255, 255, 0.15) !important;
			color: #ffffff !important;
			border: 1px solid rgba(255, 255, 255, 0.35) !important;
		}

		.hardware-row {
			font-size: 0.63rem !important;
			margin-top: 1.5px !important;
		}

		.bullets-list {
			gap: 2.5px !important;
		}

		.bullets-list li {
			font-size: 0.68rem !important;
			line-height: 1.22 !important;
			color: #d4d4d8 !important;
		}

		.bullet-dot {
			color: #38bdf8 !important;
		}

		.exp-concise-line {
			font-size: 0.68rem !important;
			gap: 4px !important;
		}

		.exp-concise-line .exp-role {
			color: #f4f4f5 !important;
			font-weight: 600 !important;
		}

		.exp-concise-line .exp-desc {
			color: #a1a1aa !important;
		}

		.ach-list {
			gap: 4px !important;
		}

		.ach-item {
			background: #141419 !important;
			border: 1px solid #2e2e38 !important;
			padding: 3px 6.5px !important;
			border-radius: 4px !important;
			gap: 7px !important;
		}

		.ach-icon-circle {
			background: rgba(245, 158, 11, 0.15) !important;
			border-color: rgba(245, 158, 11, 0.3) !important;
			color: #f59e0b !important;
			width: 18px !important;
			height: 18px !important;
			min-width: 18px !important;
		}

		.ach-title {
			font-size: 0.71rem !important;
			font-weight: 700 !important;
			color: #ffffff !important;
			line-height: 1.15 !important;
		}

		.ach-subtitle {
			font-size: 0.64rem !important;
			color: #fbbf24 !important;
			line-height: 1.15 !important;
		}

		.ach-details {
			font-size: 0.64rem !important;
			color: #cbd5e1 !important;
			line-height: 1.18 !important;
		}

		.skills-section-block {
			margin-bottom: 5px !important;
		}

		.sub-label {
			font-size: 0.69rem !important;
			font-weight: 600 !important;
			margin-bottom: 2.5px !important;
			color: #38bdf8 !important;
		}

		.sub-label.tool-label {
			color: #10b981 !important;
		}

		.sub-label.platform-label {
			color: #f59e0b !important;
		}

		.chips-grid {
			gap: 3px !important;
		}

		.chip {
			font-size: 0.66rem !important;
			padding: 1.5px 5px !important;
			background: #141419 !important;
			color: #e4e4e7 !important;
			border: 1px solid #383842 !important;
			border-radius: 3px !important;
		}

		.chip-hw {
			border-left: 2px solid #38bdf8 !important;
		}

		.chip-tool {
			border-left: 2px solid #10b981 !important;
		}

		.chip-platform {
			border-left: 2px solid #f59e0b !important;
		}

		.edu-list {
			gap: 5px !important;
		}

		.edu-item {
			padding-bottom: 3px !important;
			border-bottom-color: #2e2e38 !important;
		}

		.edu-inst {
			font-size: 0.73rem !important;
			font-weight: 700 !important;
			color: #ffffff !important;
		}

		.edu-period {
			font-size: 0.66rem !important;
			color: #a1a1aa !important;
		}

		.edu-meta {
			font-size: 0.66rem !important;
			color: #a1a1aa !important;
		}

		.course-box {
			background: rgba(56, 189, 248, 0.05) !important;
			border: 1px solid rgba(56, 189, 248, 0.25) !important;
			padding: 4px 7px !important;
			border-radius: 4px !important;
			margin-top: 3px !important;
		}

		.course-badge {
			font-size: 0.65rem !important;
			font-weight: 700 !important;
			color: #38bdf8 !important;
		}

		.course-year {
			font-size: 0.64rem !important;
			color: #a1a1aa !important;
		}

		.course-text {
			font-size: 0.66rem !important;
			color: #d4d4d8 !important;
			line-height: 1.20 !important;
		}

		.lang-hobbies-split {
			gap: 8px !important;
		}

		.sub-label-mini {
			font-size: 0.66rem !important;
			color: #94a3b8 !important;
			margin-bottom: 2px !important;
			font-weight: 600 !important;
		}

		.lang-list {
			gap: 2.5px !important;
		}

		.lang-row {
			font-size: 0.67rem !important;
			padding: 1.5px 0 !important;
		}

		.lang-name {
			color: #f4f4f5 !important;
		}

		.lang-level {
			color: #38bdf8 !important;
			font-weight: 600 !important;
		}

		.hobbies-grid {
			gap: 3px !important;
		}

		.hobby-pill {
			font-size: 0.66rem !important;
			padding: 1.5px 5px !important;
			background: #141419 !important;
			border: 1px solid #383842 !important;
			color: #d4d4d8 !important;
			border-radius: 3px !important;
		}
	}

	/* =========================================================
	   RESPONSIVE DESIGN SYSTEM: DESKTOPS, LAPTOPS, TABLETS & MOBILES
	   ========================================================= */

	/* Laptops & Tablets Landscape (<= 1024px) */
	@media screen and (max-width: 1024px) {
		.ref-shell-container {
			padding: 16px 12px 60px;
		}

		.ref-canvas {
			padding: 22px 20px;
		}

		.ref-main-grid {
			grid-template-columns: 1.5fr 1fr;
			gap: 16px;
		}

		.person-name {
			font-size: 1.75rem;
		}
	}

	/* Tablets Portrait & Large Phablets (<= 860px) */
	@media screen and (max-width: 860px) {
		.ref-shell-container {
			padding: 12px max(10px, env(safe-area-inset-right, 10px)) max(50px, env(safe-area-inset-bottom, 50px)) max(10px, env(safe-area-inset-left, 10px));
		}

		.ref-canvas {
			padding: 18px 16px;
			border-radius: 12px;
		}

		.header-main-row {
			flex-direction: column;
			align-items: center;
			text-align: center;
			gap: 16px;
		}

		.name-social-row {
			flex-direction: column;
			align-items: center;
			gap: 10px;
		}

		.title-row {
			justify-content: center;
		}

		.header-contacts-bar {
			justify-content: center;
		}

		.ref-main-grid {
			grid-template-columns: 1fr;
			gap: 16px;
		}

		.lang-hobbies-split {
			grid-template-columns: 1fr;
			gap: 14px;
		}
	}

	/* Standard Mobile Phones (<= 600px) - iPhones, Android flagships */
	@media screen and (max-width: 600px) {
		.ref-shell-container {
			padding: 8px max(6px, env(safe-area-inset-right, 6px)) max(40px, env(safe-area-inset-bottom, 40px)) max(6px, env(safe-area-inset-left, 6px));
		}

		.ref-canvas {
			padding: 16px 12px;
			border-radius: 10px;
		}

		.ref-header {
			padding-bottom: 14px;
			margin-bottom: 14px;
		}

		.person-name {
			font-size: clamp(1.4rem, 6vw, 1.7rem);
			letter-spacing: 0.02em;
		}

		.person-title {
			font-size: 0.85rem;
			line-height: 1.35;
		}

		.summary-text {
			font-size: 0.82rem;
			line-height: 1.45;
			text-align: left;
		}

		.header-contacts-bar {
			gap: 5px;
			justify-content: stretch;
		}

		.contact-pill {
			font-size: 0.72rem;
			padding: 5px 8px;
			flex: 1 1 calc(50% - 5px);
			min-width: 140px;
			justify-content: center;
		}

		.exp-heading {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
		}

		.apps-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 5px;
		}

		.apps-badges-list {
			width: 100%;
			gap: 5px;
		}

		.app-chip {
			padding: 3px 6px;
		}

		.store-badge {
			padding: 2px 5px;
			font-size: 0.65rem;
			min-height: 24px;
		}

		.hardware-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 2px;
		}

		.ach-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 6px;
		}

		.chips-grid {
			gap: 5px;
		}

		.chip {
			font-size: 0.74rem;
			padding: 4px 8px;
		}
	}

	/* Compact Mobile Screens (<= 380px) - iPhone SE, older Androids */
	@media screen and (max-width: 380px) {
		.ref-canvas {
			padding: 12px 8px;
		}

		.contact-pill {
			flex: 1 1 100%;
			min-width: 100%;
		}

		.avatar-wrapper {
			width: 86px;
			height: 86px;
		}

		.person-name {
			font-size: 1.35rem;
		}

		.bullets-list li {
			font-size: 0.74rem;
		}
	}
</style>
