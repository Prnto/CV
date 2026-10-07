<script lang="ts">
	import type { ResumeData } from '#lib/core/types';
	import { systemKernel } from '#lib/core/system-state.svelte';
	import Icon from '#lib/components/Icon.svelte';

	interface Props {
		data: ResumeData;
	}

	let { data }: Props = $props();

	let copiedField = $state<string | null>(null);

	function copyText(text: string, field: string) {
		if (typeof navigator !== 'undefined') {
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
			<div class="header-left">
				<!-- Social Badges Stack (as in original reference) -->
				<div class="social-column">
					{#each data.personal.socials as social}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class="social-icon-btn {social.platform}"
							title={social.label}
							aria-label={social.label}
						>
							<Icon name={social.icon} size={16} />
						</a>
					{/each}
				</div>

				<!-- Photo Frame with UA Accent Bar -->
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
			</div>

			<div class="header-right">
				<h1 class="person-name">{data.personal.fullName}</h1>
				<h2 class="person-title">{data.personal.title}</h2>
				{#if data.personal.summary}
					<p class="person-bio no-print">{data.personal.summary}</p>
				{/if}
			</div>
		</header>

		<!-- MAIN 2-COLUMN GRID -->
		<main class="ref-main-grid">
			<!-- LEFT COLUMN -->
			<div class="ref-column left-column">
				<!-- EXPERIENCE CARD -->
				<section class="ref-card exp-card">
					<div class="card-header">
						<h3 class="card-title">
							<span class="title-text">{data.locale === 'uk' ? 'ДОСВІД' : 'EXPERIENCE'}</span>
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
										<span class="exp-role" class:matched={isMatch(item.role)}>{item.role}</span>
									</div>

									{#if item.projects && item.projects.length > 0}
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
												<span>{bullet}</span>
											</li>
										{/each}
									</ul>
								{:else}
									<!-- Concise Role / Line as in original reference -->
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

				<!-- EDUCATION CARD -->
				<section class="ref-card edu-card">
					<div class="card-header">
						<h3 class="card-title">
							<span class="title-text">{data.locale === 'uk' ? 'ОСВІТА' : 'EDUCATION'}</span>
						</h3>
					</div>

					<div class="edu-list">
						{#each data.education as edu}
							<div class="edu-item">
								<div class="edu-icon">
									<Icon name="file-text" size={14} />
								</div>
								<div class="edu-details">
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
									<div class="edu-meta">
										<span class="edu-period">{edu.period}</span>
										<span class="edu-dot">&bull;</span>
										<span class="edu-degree">{edu.degree}</span>
									</div>
									<div class="edu-spec" class:matched={isMatch(edu.specialization)}>
										{data.locale === 'uk' ? 'Спеціалізація: ' : 'Specialization: '}{edu.specialization}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</section>

				<!-- ACHIEVEMENTS CARD -->
				<section class="ref-card ach-card">
					<div class="card-header">
						<h3 class="card-title">
							<span class="title-text">{data.locale === 'uk' ? 'ДОСЯГНЕННЯ' : 'ACHIEVEMENTS'}</span>
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
								</div>
							</div>
						{/each}
					</div>
				</section>
			</div>

			<!-- RIGHT COLUMN -->
			<div class="ref-column right-column">
				<!-- SKILLS & SOFTWARE CARD -->
				<section class="ref-card skills-card">
					<div class="card-header">
						<h3 class="card-title">
							<span class="title-text">{data.locale === 'uk' ? 'НАВИЧКИ та ПРОГРАМИ' : 'SKILLS & SOFTWARE'}</span>
						</h3>
					</div>

					<div class="skills-section-block">
						<div class="sub-label">
							{data.locale === 'uk' ? 'Апаратне тестування & Електроніка' : 'Hardware Testing & Electronics'}
						</div>
						<div class="chips-grid hardware-chips">
							{#each data.skillsHardware as skill}
								<span class="chip chip-hw" class:matched={isMatch(skill)}>
									{skill}
								</span>
							{/each}
						</div>
					</div>

					<div class="skills-section-block">
						<div class="sub-label">
							{data.locale === 'uk' ? 'Програмне забезпечення, QA та Утиліти' : 'Software, QA & Engineering Utilities'}
						</div>
						<div class="chips-grid tool-chips">
							{#each data.skillsSoftware as tool}
								<span class="chip chip-tool" class:matched={isMatch(tool)}>
									{tool}
								</span>
							{/each}
						</div>
					</div>
				</section>

				<!-- COURSES & HOBBIES ROW -->
				<div class="two-subcards-row">
					<!-- COURSES -->
					<section class="ref-card courses-card">
						<div class="card-header">
							<h3 class="card-title">
								<span class="title-text">{data.locale === 'uk' ? 'ПРОФЕСІЙНІ КУРСИ' : 'PROFESSIONAL COURSES'}</span>
							</h3>
						</div>
						<div class="course-list">
							{#each data.courses as course}
								<div class="course-item">
									<span class="course-org">{course.organization}</span>
									<p class="course-text" class:matched={isMatch(course.details)}>
										{course.details}
									</p>
								</div>
							{/each}
						</div>
					</section>

					<!-- HOBBIES -->
					<section class="ref-card hobbies-card">
						<div class="card-header">
							<h3 class="card-title">
								<span class="title-text">{data.locale === 'uk' ? 'ХОБІ' : 'HOBBIES'}</span>
							</h3>
						</div>
						<div class="hobbies-grid">
							{#each data.hobbies as hobby}
								<div class="hobby-pill">
									<Icon name={hobby.icon} size={13} />
									<span>{hobby.name}</span>
								</div>
							{/each}
						</div>
					</section>
				</div>

				<!-- LANGUAGES & CONTACTS ROW -->
				<div class="two-subcards-row">
					<!-- LANGUAGES -->
					<section class="ref-card languages-card">
						<div class="card-header">
							<h3 class="card-title">
								<span class="title-text">{data.locale === 'uk' ? 'МОВИ' : 'LANGUAGES'}</span>
							</h3>
						</div>
						<div class="lang-list">
							{#each data.languages as lang}
								<div class="lang-row">
									<div class="lang-badge-group">
										{#if lang.badge === 'UA'}
											<span class="flag-pill ua">UA</span>
										{:else if lang.badge === 'EN'}
											<span class="flag-pill en">EN</span>
										{:else}
											<span class="flag-pill other">RU</span>
										{/if}
										<span class="lang-name">{lang.language}</span>
									</div>
									<span class="lang-level">{lang.level}</span>
								</div>
							{/each}
						</div>
					</section>

					<!-- CONTACTS -->
					<section class="ref-card contacts-card">
						<div class="card-header">
							<h3 class="card-title">
								<span class="title-text">{data.locale === 'uk' ? 'КОНТАКТИ' : 'CONTACTS'}</span>
							</h3>
						</div>
						<div class="contacts-list">
							<!-- Phone -->
							<button
								type="button"
								class="contact-item-btn"
								onclick={() => copyText(data.personal.phone, 'phone')}
								title="Натисніть для копіювання номера"
							>
								<Icon name="phone" size={13} />
								<span class="contact-val">{data.personal.phone}</span>
								{#if copiedField === 'phone'}
									<span class="copy-alert no-print">Скопійовано!</span>
								{/if}
							</button>

							<!-- Email -->
							<button
								type="button"
								class="contact-item-btn"
								onclick={() => copyText(data.personal.email, 'email')}
								title="Натисніть для копіювання email"
							>
								<Icon name="email" size={13} />
								<span class="contact-val">{data.personal.email}</span>
								{#if copiedField === 'email'}
									<span class="copy-alert no-print">Скопійовано!</span>
								{/if}
							</button>

							<!-- Location -->
							<div class="contact-item-static">
								<Icon name="location" size={13} />
								<span class="contact-val">{data.personal.location}</span>
							</div>
						</div>
					</section>
				</div>
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
		background: #1e1e1e;
	}

	.ref-canvas {
		width: 100%;
		max-width: 1020px;
		background: #252528;
		border-radius: 14px;
		padding: 24px 28px;
		box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	/* HEADER */
	.ref-header {
		display: flex;
		align-items: center;
		gap: 20px;
		padding-bottom: 16px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		margin-bottom: 14px;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-shrink: 0;
	}

	.social-column {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.social-icon-btn {
		width: 30px;
		height: 30px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		transition: transform 180ms ease, box-shadow 180ms ease;
	}

	.social-icon-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.social-icon-btn.linkedin { background: #0077b5; }
	.social-icon-btn.telegram { background: #229ed9; }
	.social-icon-btn.facebook { background: #1877f2; }

	.avatar-wrapper {
		position: relative;
		width: 100px;
		height: 100px;
		border-radius: 8px;
		overflow: hidden;
		background: #1e1e20;
		border: 2px solid rgba(255, 255, 255, 0.15);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
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

	.header-right {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.person-name {
		font-size: 1.95rem;
		font-weight: 800;
		letter-spacing: 0.04em;
		color: #ffffff;
		line-height: 1.15;
		text-transform: uppercase;
	}

	.person-title {
		font-size: 1.18rem;
		font-weight: 500;
		color: #e2e8f0;
	}

	.person-bio {
		margin-top: 4px;
		font-size: 0.8rem;
		color: #94a3b8;
		line-height: 1.4;
		max-width: 750px;
	}

	/* MAIN GRID */
	.ref-main-grid {
		display: grid;
		grid-template-columns: 1.12fr 1fr;
		gap: 14px;
	}

	.ref-column {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	/* CARD STYLES */
	.ref-card {
		background: #2d2d31;
		border-radius: 10px;
		padding: 13px 15px;
		border: 1px solid rgba(255, 255, 255, 0.07);
		transition: border-color 200ms ease, box-shadow 200ms ease;
	}

	.ref-card:hover {
		border-color: rgba(255, 255, 255, 0.16);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
	}

	.card-header {
		margin-bottom: 8px;
		padding-bottom: 5px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.card-title {
		font-size: 0.84rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: #ffffff;
		text-transform: uppercase;
	}

	/* EXPERIENCE */
	.exp-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.exp-item {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.exp-item.highlighted {
		background: rgba(255, 255, 255, 0.02);
		padding: 7px 9px;
		border-radius: 6px;
		border-left: 3px solid #38bdf8;
	}

	.exp-heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px;
		flex-wrap: wrap;
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
		text-decoration: none;
		color: inherit;
		cursor: pointer;
		border-radius: 4px;
		transition: opacity 0.15s ease;
	}

	.company-link:hover .company-name {
		color: #38bdf8;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.company-link:hover .company-logo {
		filter: brightness(1.2);
	}

	.company-ext-icon {
		font-size: 0.72rem;
		color: #94a3b8;
		opacity: 0.75;
		line-height: 1;
		transition: transform 0.15s ease, opacity 0.15s ease, color 0.15s ease;
	}

	.company-link:hover .company-ext-icon {
		color: #38bdf8;
		opacity: 1;
		transform: translate(1px, -1px);
	}

	.company-logo {
		font-size: 0.6rem;
		font-weight: 900;
		padding: 1px 4px;
		border-radius: 3px;
		color: #ffffff;
		font-family: var(--font-mono);
	}

	.company-logo.atn { background: #dc2626; }
	.company-logo.bastico { background: #16a34a; }

	.company-name {
		font-size: 0.86rem;
		font-weight: 700;
		color: #ffffff;
	}

	.exp-period {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		color: #94a3b8;
	}

	.exp-role-line {
		font-size: 0.78rem;
		color: #cbd5e1;
		font-weight: 500;
	}

	.exp-concise-line {
		font-size: 0.77rem;
		color: #cbd5e1;
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		align-items: baseline;
	}

	.exp-sep {
		color: #64748b;
	}

	.exp-desc {
		color: #94a3b8;
	}

	.projects-block {
		background: rgba(0, 0, 0, 0.25);
		padding: 5px 7px;
		border-radius: 5px;
		font-size: 0.72rem;
		line-height: 1.35;
		margin: 2px 0;
	}

	.projects-label {
		color: #38bdf8;
		font-weight: 600;
		margin-right: 4px;
	}

	.projects-content {
		color: #cbd5e1;
	}

	.bullets-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 3px;
		margin-top: 2px;
	}

	.bullets-list li {
		display: flex;
		align-items: flex-start;
		gap: 6px;
		font-size: 0.74rem;
		line-height: 1.32;
		color: #cbd5e1;
	}

	.bullet-dot {
		color: #94a3b8;
		font-size: 0.85rem;
		line-height: 1.2;
	}

	/* EDUCATION */
	.edu-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.edu-item {
		display: flex;
		gap: 8px;
		align-items: flex-start;
	}

	.edu-icon {
		background: rgba(255, 255, 255, 0.08);
		width: 22px;
		height: 22px;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #38bdf8;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.edu-details {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.edu-inst {
		font-size: 0.79rem;
		font-weight: 700;
		color: #ffffff;
		line-height: 1.25;
	}

	.edu-inst-link {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		text-decoration: none;
		color: inherit;
		cursor: pointer;
		transition: opacity 0.15s ease;
	}

	.edu-inst-link:hover .edu-inst {
		color: #38bdf8;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.edu-ext-icon {
		font-size: 0.72rem;
		color: #94a3b8;
		opacity: 0.75;
		line-height: 1;
		transition: transform 0.15s ease, opacity 0.15s ease, color 0.15s ease;
	}

	.edu-inst-link:hover .edu-ext-icon {
		color: #38bdf8;
		opacity: 1;
		transform: translate(1px, -1px);
	}

	.edu-meta {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.71rem;
		color: #94a3b8;
	}

	.edu-dot {
		color: #64748b;
	}

	.edu-spec {
		font-size: 0.73rem;
		color: #cbd5e1;
	}

	/* ACHIEVEMENTS */
	.ach-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.ach-item {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.ach-icon-circle {
		width: 24px;
		height: 24px;
		border-radius: 5px;
		background: rgba(245, 158, 11, 0.15);
		color: #f59e0b;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.ach-title {
		font-size: 0.77rem;
		font-weight: 600;
		color: #ffffff;
	}

	.ach-subtitle {
		font-size: 0.68rem;
		color: #94a3b8;
	}

	/* SKILLS */
	.skills-section-block {
		margin-bottom: 10px;
	}

	.sub-label {
		font-size: 0.69rem;
		font-weight: 700;
		color: #94a3b8;
		margin-bottom: 5px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.chips-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.chip {
		font-size: 0.71rem;
		padding: 3px 6px;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.06);
		color: #e2e8f0;
		border: 1px solid rgba(255, 255, 255, 0.08);
		transition: all 160ms ease;
	}

	.chip:hover {
		background: rgba(255, 255, 255, 0.12);
		color: #ffffff;
	}

	.chip-hw { border-left: 2px solid #10b981; }
	.chip-tool { border-left: 2px solid #38bdf8; }

	/* SUBCARDS ROW */
	.two-subcards-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.course-org {
		font-size: 0.75rem;
		font-weight: 700;
		color: #f59e0b;
		display: block;
		margin-bottom: 2px;
	}

	.course-text {
		font-size: 0.69rem;
		color: #cbd5e1;
		line-height: 1.32;
	}

	.hobbies-grid {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.hobby-pill {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.71rem;
		color: #e2e8f0;
		background: rgba(255, 255, 255, 0.04);
		padding: 3px 6px;
		border-radius: 4px;
	}

	/* LANGUAGES */
	.lang-list {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.lang-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.73rem;
		gap: 6px;
		white-space: nowrap;
	}

	.lang-badge-group {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-shrink: 0;
	}

	.flag-pill {
		font-size: 0.6rem;
		font-weight: 800;
		padding: 1px 4px;
		border-radius: 2px;
		font-family: var(--font-mono);
		line-height: 1.2;
	}

	.flag-pill.ua { background: #0057b7; color: #ffd700; }
	.flag-pill.en { background: #dc2626; color: #ffffff; }
	.flag-pill.other { background: #475569; color: #ffffff; }

	.lang-name {
		color: #ffffff;
		font-weight: 500;
	}

	.lang-level {
		color: #94a3b8;
		font-size: 0.72rem;
		font-family: var(--font-mono);
		font-weight: 500;
		flex-shrink: 0;
		text-align: right;
	}

	/* CONTACTS */
	.contacts-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.contact-item-btn,
	.contact-item-static {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.73rem;
		color: #cbd5e1;
		padding: 3px 5px;
		border-radius: 4px;
		width: 100%;
		text-align: left;
		position: relative;
	}

	.contact-item-btn {
		background: rgba(255, 255, 255, 0.03);
		transition: all 150ms ease;
	}

	.contact-item-btn:hover {
		background: rgba(255, 255, 255, 0.09);
		color: #ffffff;
	}

	.copy-alert {
		position: absolute;
		right: 6px;
		font-size: 0.62rem;
		background: #10b981;
		color: #ffffff;
		padding: 1px 4px;
		border-radius: 3px;
	}

	/* MATCH SEARCH HIGHLIGHT */
	.matched {
		background: rgba(245, 158, 11, 0.25) !important;
		color: #fef08a !important;
		padding: 1px 3px;
		border-radius: 3px;
	}

	/* SCREEN-ONLY RESPONSIVE RULES (NEVER TRIGGERS IN PRINT) */
	@media screen and (max-width: 860px) {
		.ref-header {
			flex-direction: column;
			align-items: flex-start;
		}
		.ref-main-grid {
			grid-template-columns: 1fr;
		}
		.two-subcards-row {
			grid-template-columns: 1fr;
		}
		.ref-canvas {
			padding: 20px 16px;
		}
	}

	/* =========================================================
	   PRINT MEDIA: 1:1 PIXEL FIDELITY, EXACT A4 SINGLE PAGE FIT
	   ========================================================= */
	@media print {
		.ref-shell-container {
			padding: 0 !important;
			margin: 0 !important;
			width: 100% !important;
			min-height: 297mm !important;
			background: #1e1e1e !important;
			display: block !important;
		}

		.ref-canvas {
			width: 210mm !important;
			max-width: 210mm !important;
			height: 297mm !important;
			max-height: 297mm !important;
			margin: 0 auto !important;
			padding: 7mm 8mm !important;
			border-radius: 0 !important;
			box-shadow: none !important;
			border: none !important;
			background: #252528 !important;
			box-sizing: border-box !important;
			overflow: hidden !important;
		}

		.ref-header {
			padding-bottom: 8px !important;
			margin-bottom: 8px !important;
			gap: 14px !important;
		}

		.avatar-wrapper {
			width: 85px !important;
			height: 85px !important;
		}

		.social-icon-btn {
			width: 26px !important;
			height: 26px !important;
		}

		.person-name {
			font-size: 1.7rem !important;
		}

		.person-title {
			font-size: 1.05rem !important;
		}

		.ref-main-grid {
			display: grid !important;
			grid-template-columns: 1.12fr 1fr !important;
			gap: 8px !important;
		}

		.ref-column {
			gap: 8px !important;
		}

		.ref-card {
			padding: 8px 10px !important;
			border-radius: 6px !important;
			break-inside: avoid !important;
			page-break-inside: avoid !important;
		}

		.card-header {
			margin-bottom: 5px !important;
			padding-bottom: 3px !important;
		}

		.card-title {
			font-size: 0.78rem !important;
		}

		.exp-list {
			gap: 6px !important;
		}

		.exp-item.highlighted {
			padding: 5px 7px !important;
		}

		.company-name {
			font-size: 0.8rem !important;
		}

		.two-subcards-row {
			gap: 6px !important;
		}

		.chip {
			padding: 2px 5px !important;
			font-size: 0.65rem !important;
		}

		.bullets-list li {
			font-size: 0.68rem !important;
			line-height: 1.25 !important;
		}

		.projects-block {
			padding: 3px 6px !important;
			font-size: 0.66rem !important;
		}

		.edu-list {
			gap: 5px !important;
		}

		.edu-inst {
			font-size: 0.74rem !important;
		}

		.edu-meta,
		.edu-spec {
			font-size: 0.67rem !important;
		}

		.ach-list {
			gap: 4px !important;
		}

		.ach-title {
			font-size: 0.72rem !important;
		}

		.ach-subtitle {
			font-size: 0.64rem !important;
		}

		.course-text {
			font-size: 0.65rem !important;
		}

		.hobby-pill {
			font-size: 0.66rem !important;
			padding: 2px 5px !important;
		}

		.lang-row {
			font-size: 0.68rem !important;
			padding: 2px 0 !important;
			white-space: nowrap !important;
		}

		.contact-item-btn,
		.contact-item-static {
			font-size: 0.68rem !important;
			padding: 2px 4px !important;
		}

		.company-link,
		.edu-inst-link {
			text-decoration: none !important;
			color: inherit !important;
		}

		.company-ext-icon,
		.edu-ext-icon {
			display: none !important;
		}
	}
</style>
