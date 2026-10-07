<script lang="ts">
	import type { ResumeData } from '#lib/core/types';
	import Icon from '#lib/components/Icon.svelte';

	interface Props {
		data: ResumeData;
	}

	let { data }: Props = $props();
</script>

<div class="exec-shell-container">
	<div class="exec-paper page-container">
		<!-- HEADER -->
		<header class="exec-header">
			<div class="exec-header-main">
				<div class="name-block">
					<h1 class="exec-name">{data.personal.fullName}</h1>
					<h2 class="exec-title">{data.personal.title}</h2>
				</div>
				<img src={data.personal.photoUrl} alt={data.personal.fullName} class="exec-avatar" />
			</div>

			<!-- CONTACTS BAR -->
			<div class="exec-contacts-bar">
				<div class="contact-entry">
					<Icon name="phone" size={14} />
					<a href="tel:{data.personal.phone}">{data.personal.phone}</a>
				</div>
				<div class="contact-entry">
					<Icon name="email" size={14} />
					<a href="mailto:{data.personal.email}">{data.personal.email}</a>
				</div>
				<div class="contact-entry">
					<Icon name="location" size={14} />
					<span>{data.personal.location}</span>
				</div>
				<div class="contact-entry">
					<Icon name="linkedin" size={14} />
					<a href="https://linkedin.com/in/oleksii-kolosov" target="_blank" rel="noopener noreferrer">LinkedIn</a>
				</div>
				<div class="contact-entry">
					<Icon name="telegram" size={14} />
					<a href="https://t.me/Mr_Pronto" target="_blank" rel="noopener noreferrer">Telegram</a>
				</div>
				<div class="contact-entry">
					<Icon name="github" size={14} />
					<a href="https://github.com/Prnto" target="_blank" rel="noopener noreferrer">GitHub</a>
				</div>
			</div>

			{#if data.personal.summary}
				<p class="exec-summary">{data.personal.summary}</p>
			{/if}
		</header>

		<!-- 2-COLUMN CORPORATE LAYOUT -->
		<div class="exec-body-grid">
			<!-- MAIN COLUMN (Experience) -->
			<div class="exec-main-col">
				<section class="exec-section">
					<h3 class="exec-section-heading">
						<span class="heading-line"></span>
						<span>{data.locale === 'uk' ? 'ДОСВІД РОБОТИ' : 'PROFESSIONAL EXPERIENCE'}</span>
					</h3>

					<div class="exec-exp-list">
						{#each data.experience as exp}
							<div class="exec-exp-entry">
								<div class="exp-title-row">
									<div>
										{#if exp.companyUrl}
											<a
												href={exp.companyUrl}
												target="_blank"
												rel="noopener noreferrer"
												class="exec-company-link"
												title="{exp.company} ({exp.companyUrl})"
											>
												<h4 class="company-text">{exp.company}</h4>
												<span class="exec-link-ext no-print">↗</span>
											</a>
										{:else}
											<h4 class="company-text">{exp.company}</h4>
										{/if}
									</div>
									<span class="period-text">{exp.period}</span>
								</div>
								<div class="role-text">{exp.role}</div>

								{#if exp.apps && exp.apps.length > 0}
									<div class="projects-text">
										<div class="exec-apps-row">
											<strong class="exec-proj-label">{data.locale === 'uk' ? 'Мобільні застосунки (QA):' : 'Mobile Apps (QA):'}</strong>
											<div class="exec-apps-list">
												{#each exp.apps as app}
													<span class="exec-app-chip">
														<span class="exec-app-name">{app.name}</span>
														<span class="exec-store-btns">
															{#if app.androidUrl}
																<a
																	href={app.androidUrl}
																	target="_blank"
																	rel="noopener noreferrer"
																	class="exec-store-badge android"
																	title="{app.name} — Google Play"
																>
																	<Icon name="android" size={9} />
																	<span>Play</span>
																</a>
															{/if}
															{#if app.iosUrl}
																<a
																	href={app.iosUrl}
																	target="_blank"
																	rel="noopener noreferrer"
																	class="exec-store-badge apple"
																	title="{app.name} — App Store"
																>
																	<Icon name="apple" size={9} />
																	<span>iOS</span>
																</a>
															{/if}
														</span>
													</span>
												{/each}
											</div>
										</div>
										<div class="exec-hw-row">
											<strong class="exec-proj-label">{data.locale === 'uk' ? 'Пристрої:' : 'Devices:'}</strong>
											<span>{data.locale === 'uk' ? 'Оптико-електронні прилади ATN 2–6 поколінь (вбудоване ПЗ / Firmware)' : 'ATN Gen 2–6 Electro-Optics (Embedded Firmware)'}</span>
										</div>
									</div>
								{:else if exp.projects}
									<div class="projects-text">
										<strong>{data.locale === 'uk' ? 'Проєкти:' : 'Projects:'}</strong> {exp.projects.join(', ')}
									</div>
								{/if}

								<ul class="exec-bullets">
									{#each exp.bullets as b}
										<li>{b}</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</section>

				<section class="exec-section">
					<h3 class="exec-section-heading">
						<span class="heading-line"></span>
						<span>{data.locale === 'uk' ? 'ОСВІТА' : 'EDUCATION'}</span>
					</h3>

					<div class="exec-edu-list">
						{#each data.education as edu}
							<div class="exec-edu-entry">
								<div class="edu-top">
									{#if edu.institutionUrl}
										<a
											href={edu.institutionUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="exec-edu-link"
											title="{edu.institution} ({edu.institutionUrl})"
										>
											<strong>{edu.institution}</strong>
											<span class="exec-link-ext no-print">↗</span>
										</a>
									{:else}
										<strong>{edu.institution}</strong>
									{/if}
									<span class="period-text">{edu.period}</span>
								</div>
								<div class="edu-sub">{edu.degree} &bull; {edu.specialization}</div>
							</div>
						{/each}
					</div>
				</section>
			</div>

			<!-- SIDEBAR COLUMN (Skills, Certs, Languages) -->
			<div class="exec-side-col">
				<!-- HARDWARE SKILLS -->
				<section class="exec-side-section">
					<h3 class="side-heading">
						{data.locale === 'uk' ? 'АПАРАТНІ НАВИЧКИ ТА QA' : 'HARDWARE QA & TESTING'}
					</h3>
					<ul class="side-list">
						{#each data.skillsHardware as s}
							<li>{s}</li>
						{/each}
					</ul>
				</section>

				<!-- SOFTWARE SKILLS -->
				<section class="exec-side-section">
					<h3 class="side-heading">
						{data.locale === 'uk' ? 'ПЗ, ТРЕКЕРИ ТА УТИЛІТИ' : 'SOFTWARE & UTILITIES'}
					</h3>
					<div class="side-tags">
						{#each data.skillsSoftware as tool}
							<span class="side-tag">{tool}</span>
						{/each}
					</div>
				</section>

				<!-- ACHIEVEMENTS -->
				<section class="exec-side-section">
					<h3 class="side-heading">
						{data.locale === 'uk' ? 'ДОСЯГНЕННЯ ТА КВАЛІФІКАЦІЇ' : 'ACHIEVEMENTS & QUALIFICATIONS'}
					</h3>
					<ul class="side-list">
						{#each data.achievements as a}
							<li>
								<strong>{a.title}</strong>
								{#if a.subtitle}
									<div class="small-sub">{a.subtitle}</div>
								{/if}
							</li>
						{/each}
					</ul>
				</section>

				<!-- COURSES -->
				<section class="exec-side-section">
					<h3 class="side-heading">
						{data.locale === 'uk' ? 'ПРОФЕСІЙНІ КУРСИ' : 'PROFESSIONAL COURSES'}
					</h3>
					{#each data.courses as c}
						<div class="course-side-box">
							<strong>{c.organization}</strong>
							<p>{c.details}</p>
						</div>
					{/each}
				</section>

				<!-- LANGUAGES -->
				<section class="exec-side-section">
					<h3 class="side-heading">
						{data.locale === 'uk' ? 'МОВИ' : 'LANGUAGES'}
					</h3>
					<div class="lang-exec-list">
						{#each data.languages as l}
							<div class="lang-exec-row">
								<span>{l.language}</span>
								<strong>{l.level}</strong>
							</div>
						{/each}
					</div>
				</section>

				<!-- HOBBIES -->
				<section class="exec-side-section">
					<h3 class="side-heading">
						{data.locale === 'uk' ? 'ХОБІ' : 'HOBBIES'}
					</h3>
					<div class="side-tags">
						{#each data.hobbies as h}
							<span class="side-tag hobby">{h.name}</span>
						{/each}
					</div>
				</section>
			</div>
		</div>
	</div>
</div>

<style>
	.exec-shell-container {
		width: 100%;
		padding: 30px 16px 80px;
		display: flex;
		justify-content: center;
		background: #f1f5f9;
		color: #1e293b;
	}

	.exec-paper {
		width: 100%;
		max-width: 980px;
		background: #ffffff;
		border-radius: 8px;
		padding: 44px 48px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
		border: 1px solid #e2e8f0;
	}

	.exec-header {
		border-bottom: 2px solid #2563eb;
		padding-bottom: 20px;
		margin-bottom: 24px;
	}

	.exec-header-main {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
	}

	.exec-name {
		font-size: 2.3rem;
		font-weight: 800;
		color: #0f172a;
		letter-spacing: -0.02em;
	}

	.exec-title {
		font-size: 1.2rem;
		font-weight: 600;
		color: #2563eb;
		margin-top: 2px;
	}

	.exec-avatar {
		width: 105px;
		height: 105px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid #e2e8f0;
		flex-shrink: 0;
	}

	.exec-contacts-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin-top: 14px;
		padding: 8px 12px;
		background: #f8fafc;
		border-radius: 6px;
		font-size: 0.82rem;
		color: #475569;
	}

	.contact-entry {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.contact-entry a {
		color: #0f172a;
		text-decoration: none;
	}

	.contact-entry a:hover {
		color: #2563eb;
		text-decoration: underline;
	}

	.exec-summary {
		margin-top: 12px;
		font-size: 0.88rem;
		line-height: 1.5;
		color: #334155;
	}

	.exec-body-grid {
		display: grid;
		grid-template-columns: 1.6fr 1fr;
		gap: 36px;
	}

	.exec-section-heading {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 1rem;
		font-weight: 800;
		color: #0f172a;
		letter-spacing: 0.05em;
		margin-bottom: 16px;
	}

	.heading-line {
		width: 4px;
		height: 18px;
		background: #2563eb;
		border-radius: 2px;
	}

	.exec-exp-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.exec-exp-entry {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.exp-title-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.company-text {
		font-size: 1rem;
		font-weight: 700;
		color: #0f172a;
	}

	.exec-company-link {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		text-decoration: none;
		color: inherit;
	}

	.exec-company-link:hover .company-text {
		color: #2563eb;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.exec-link-ext {
		font-size: 0.72rem;
		color: #64748b;
		opacity: 0.8;
		transition: color 0.15s ease;
	}

	.exec-company-link:hover .exec-link-ext {
		color: #2563eb;
	}

	.period-text {
		font-size: 0.8rem;
		color: #64748b;
		font-weight: 500;
	}

	.role-text {
		font-size: 0.9rem;
		font-weight: 600;
		color: #2563eb;
	}

	.projects-text {
		font-size: 0.82rem;
		color: #475569;
		background: #f8fafc;
		padding: 6px 10px;
		border-radius: 4px;
		margin: 4px 0;
		border-left: 3px solid #2563eb;
	}

	.exec-apps-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
		margin-bottom: 3px;
	}

	.exec-proj-label {
		color: #1e293b;
		font-weight: 700;
	}

	.exec-apps-list {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 5px;
	}

	.exec-app-chip {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		background: #ffffff;
		border: 1px solid #cbd5e1;
		border-radius: 4px;
		padding: 1px 4px 1px 6px;
	}

	.exec-app-name {
		font-size: 0.73rem;
		font-weight: 600;
		color: #0f172a;
		white-space: nowrap;
	}

	.exec-store-btns {
		display: inline-flex;
		align-items: center;
		gap: 3px;
	}

	.exec-store-badge {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		text-decoration: none;
		font-size: 0.64rem;
		font-weight: 600;
		padding: 1px 4px;
		border-radius: 3px;
		line-height: 1;
		transition: all 120ms ease;
	}

	.exec-store-badge.android {
		background: #ecfdf5;
		color: #047857;
		border: 1px solid #a7f3d0;
	}

	.exec-store-badge.android:hover {
		background: #d1fae5;
		color: #065f46;
		border-color: #6ee7b7;
	}

	.exec-store-badge.apple {
		background: #f1f5f9;
		color: #334155;
		border: 1px solid #cbd5e1;
	}

	.exec-store-badge.apple:hover {
		background: #e2e8f0;
		color: #0f172a;
		border-color: #94a3b8;
	}

	.exec-hw-row {
		display: flex;
		align-items: baseline;
		gap: 4px;
		font-size: 0.74rem;
		color: #475569;
		margin-top: 2px;
	}

	.exec-bullets {
		margin-top: 4px;
		padding-left: 18px;
		font-size: 0.84rem;
		color: #334155;
		line-height: 1.5;
	}

	.exec-edu-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.exec-edu-entry strong {
		font-size: 0.88rem;
		color: #0f172a;
	}

	.exec-edu-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		text-decoration: none;
		color: inherit;
	}

	.exec-edu-link:hover strong {
		color: #2563eb;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.exec-edu-link:hover .exec-link-ext {
		color: #2563eb;
	}

	.edu-top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.edu-sub {
		font-size: 0.82rem;
		color: #475569;
	}

	/* SIDEBAR */
	.exec-side-col {
		display: flex;
		flex-direction: column;
		gap: 22px;
	}

	.side-heading {
		font-size: 0.84rem;
		font-weight: 800;
		color: #0f172a;
		letter-spacing: 0.05em;
		border-bottom: 1px solid #e2e8f0;
		padding-bottom: 6px;
		margin-bottom: 10px;
	}

	.side-list {
		padding-left: 16px;
		font-size: 0.82rem;
		color: #334155;
		line-height: 1.5;
	}

	.small-sub {
		font-size: 0.74rem;
		color: #64748b;
	}

	.side-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.side-tag {
		background: #f1f5f9;
		border: 1px solid #cbd5e1;
		color: #1e293b;
		padding: 3px 8px;
		border-radius: 4px;
		font-size: 0.76rem;
		font-weight: 500;
	}

	.side-tag.hobby {
		background: #eff6ff;
		border-color: #bfdbfe;
		color: #1d4ed8;
	}

	.course-side-box {
		background: #f8fafc;
		border-left: 3px solid #2563eb;
		padding: 8px 10px;
		font-size: 0.78rem;
		color: #334155;
	}

	.lang-exec-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
		font-size: 0.82rem;
	}

	.lang-exec-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 4px 0;
		border-bottom: 1px dashed #e2e8f0;
		white-space: nowrap;
		gap: 8px;
	}

	@media screen and (max-width: 800px) {
		.exec-body-grid {
			grid-template-columns: 1fr;
		}
		.exec-paper {
			padding: 24px;
		}
	}

	@media print {
		:global(body) {
			background: #ffffff !important;
			color: #0f172a !important;
			-webkit-print-color-adjust: exact !important;
			print-color-adjust: exact !important;
		}

		.no-print {
			display: none !important;
		}

		.exec-shell-container {
			padding: 0 !important;
			margin: 0 !important;
			width: 100% !important;
			background: #ffffff !important;
		}

		.exec-paper {
			width: 100% !important;
			max-width: 100% !important;
			min-height: 100% !important;
			margin: 0 !important;
			padding: 5mm 8mm !important;
			border: none !important;
			box-shadow: none !important;
			box-sizing: border-box !important;
			overflow: visible !important;
		}

		.exec-header {
			margin-bottom: 6px !important;
			padding-bottom: 6px !important;
			border-bottom: 1.5px solid #2563eb !important;
		}

		.exec-avatar {
			width: 58px !important;
			height: 58px !important;
		}

		.exec-name {
			font-size: 1.35rem !important;
			line-height: 1.1 !important;
		}

		.exec-title {
			font-size: 0.80rem !important;
			margin-top: 1px !important;
		}

		.exec-contacts-bar {
			gap: 8px !important;
			font-size: 0.62rem !important;
			margin-top: 3px !important;
		}

		.exec-contacts-bar a {
			text-decoration: none !important;
		}


		.exec-summary {
			font-size: 0.67rem !important;
			line-height: 1.25 !important;
			margin-top: 3px !important;
			color: #334155 !important;
		}

		.exec-body-grid {
			display: grid !important;
			grid-template-columns: 1.55fr 1fr !important;
			gap: 14px !important;
		}

		.exec-section-heading {
			font-size: 0.75rem !important;
			margin-bottom: 5px !important;
			gap: 6px !important;
		}

		.heading-line {
			height: 14px !important;
			width: 3px !important;
		}

		.exec-exp-list {
			gap: 6px !important;
		}

		.exec-exp-entry {
			gap: 2px !important;
			break-inside: avoid !important;
			page-break-inside: avoid !important;
		}

		.company-text {
			font-size: 0.76rem !important;
		}

		.period-text {
			font-size: 0.62rem !important;
		}

		.role-text {
			font-size: 0.68rem !important;
		}

		.projects-text {
			font-size: 0.60rem !important;
			padding: 2px 5px !important;
			margin: 1px 0 2px !important;
			border-left: 2px solid #2563eb !important;
		}

		.exec-apps-row {
			gap: 3px !important;
			margin-bottom: 1px !important;
		}

		.exec-apps-list {
			gap: 2.5px !important;
		}

		.exec-app-chip {
			padding: 0 3px !important;
			gap: 2.5px !important;
			border: 1px solid #94a3b8 !important;
			background: #ffffff !important;
		}

		.exec-app-name {
			font-size: 0.58rem !important;
			color: #0f172a !important;
		}

		.exec-store-btns {
			gap: 1.5px !important;
		}

		.exec-store-badge {
			font-size: 0.51rem !important;
			padding: 0 2px !important;
			border-radius: 2px !important;
		}

		.exec-store-badge.android {
			background: #ecfdf5 !important;
			color: #047857 !important;
			border: 1px solid #10b981 !important;
		}

		.exec-store-badge.apple {
			background: #f8fafc !important;
			color: #1e293b !important;
			border: 1px solid #64748b !important;
		}

		.exec-hw-row {
			font-size: 0.58rem !important;
			margin-top: 1px !important;
		}

		.exec-bullets {
			padding-left: 14px !important;
			margin-top: 2px !important;
			gap: 1.5px !important;
		}

		.exec-bullets li {
			font-size: 0.62rem !important;
			line-height: 1.18 !important;
			color: #334155 !important;
		}

		.exec-edu-list {
			gap: 4px !important;
		}

		.exec-edu-entry strong {
			font-size: 0.72rem !important;
		}

		.edu-sub {
			font-size: 0.61rem !important;
		}

		.exec-side-section {
			margin-bottom: 5px !important;
			break-inside: avoid !important;
			page-break-inside: avoid !important;
		}

		.side-heading {
			font-size: 0.68rem !important;
			margin-bottom: 3px !important;
			padding-bottom: 2px !important;
		}

		.side-list {
			padding-left: 12px !important;
			gap: 1.5px !important;
		}

		.side-list li {
			font-size: 0.62rem !important;
			line-height: 1.18 !important;
		}

		.side-tags {
			gap: 2.5px !important;
		}

		.side-tag {
			font-size: 0.60rem !important;
			padding: 1px 4px !important;
		}

		.course-side-box {
			padding: 3px 6px !important;
			font-size: 0.61rem !important;
			line-height: 1.15 !important;
		}

		.lang-exec-list {
			gap: 2px !important;
			font-size: 0.63rem !important;
		}

		.lang-exec-row {
			padding: 1.5px 0 !important;
		}

		.exec-company-link,
		.exec-edu-link {
			text-decoration: none !important;
			color: inherit !important;
		}

		.exec-link-ext {
			display: none !important;
		}
	}

	/* =========================================================
	   RESPONSIVE DESIGN SYSTEM: DESKTOPS, LAPTOPS, TABLETS & MOBILES
	   ========================================================= */

	/* Tablets (<= 900px) */
	@media screen and (max-width: 900px) {
		.exec-shell-container {
			padding: 16px 12px 60px;
		}

		.exec-paper {
			padding: 32px 28px;
		}

		.exec-body-grid {
			grid-template-columns: 1fr;
			gap: 24px;
		}
	}

	/* Smartphones (<= 640px) */
	@media screen and (max-width: 640px) {
		.exec-shell-container {
			padding: 8px max(6px, env(safe-area-inset-right, 6px)) max(40px, env(safe-area-inset-bottom, 40px)) max(6px, env(safe-area-inset-left, 6px));
		}

		.exec-paper {
			padding: 18px 14px;
			border-radius: 6px;
		}

		.exec-header-main {
			flex-direction: column-reverse;
			align-items: center;
			text-align: center;
			gap: 14px;
		}

		.exec-name {
			font-size: clamp(1.5rem, 6vw, 1.95rem);
		}

		.exec-title {
			font-size: 0.95rem;
		}

		.exec-contacts-bar {
			gap: 8px;
			justify-content: center;
			font-size: 0.78rem;
		}

		.contact-entry {
			flex: 1 1 calc(50% - 8px);
			min-width: 140px;
			justify-content: center;
		}

		.exec-summary {
			font-size: 0.82rem;
			text-align: left;
		}

		.exec-apps-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
		}

		.exec-apps-list {
			width: 100%;
			gap: 4px;
		}

		.exec-app-chip {
			padding: 2px 5px;
		}

		.exec-store-badge {
			padding: 2px 5px;
			font-size: 0.65rem;
			min-height: 24px;
		}

		.exec-hw-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 2px;
		}

		.edu-top {
			flex-direction: column;
			align-items: flex-start;
			gap: 2px;
		}
	}

	/* Compact Phones (<= 380px) */
	@media screen and (max-width: 380px) {
		.exec-paper {
			padding: 14px 10px;
		}

		.contact-entry {
			flex: 1 1 100%;
			min-width: 100%;
		}

		.exec-avatar {
			width: 80px;
			height: 80px;
		}

		.exec-name {
			font-size: 1.4rem;
		}
	}
</style>

