import type { ResumeData } from './types';
import avatarImg from '../assets/avatar.jpg';

export const resumeDataUk: ResumeData = {
	locale: 'uk',
	personal: {
		fullName: 'КОЛОСОВ ОЛЕКСІЙ',
		title: 'Hardware & Embedded QA Engineer / Manual QA Engineer',
		photoUrl: avatarImg,
		phone: '+380966980458',
		email: 'Prontos317@gmail.com',
		location: 'Одеса, UA',
		summary:
			'QA-інженер із 5.5+ роками практичного досвіду тестування комплексного апаратного та програмного забезпечення (Embedded Systems, Firmware, iOS/Android Apps). Спеціалізуюся на комплексній перевірці пристроїв та мобільних застосунків, стрес-тестуванні в екстремальних умовах (кліматичні камери, теплові датчики). Маю глибоке розуміння схемотехніки, збирання та налагодження електроніки.',
		socials: [
			{
				platform: 'linkedin',
				label: 'LinkedIn',
				url: 'https://linkedin.com/in/oleksii-kolosov',
				icon: 'linkedin'
			},
			{
				platform: 'telegram',
				label: 'Telegram',
				url: 'https://t.me/Mr_Pronto',
				icon: 'telegram'
			},
			{
				platform: 'facebook',
				label: 'Facebook',
				url: 'https://facebook.com/',
				icon: 'facebook'
			}
		]
	},
	experience: [
		{
			id: 'exp-atn',
			company: 'ATN (American Technologies Network, Corp.)',
			companyShort: 'ATN Corp.',
			companyUrl: 'https://www.atncorp.com/',
			period: '02/2021 – 09/2026',
			role: 'QA Engineer (Hardware, Embedded & Mobile)',
			category: 'qa',
			highlight: true,
			projects: [
				'Obsidian-4',
				'Radar 360',
				'Connect 5',
				'Connect 6',
				'Tactical Map',
				'Девайси 2-го – 6-го поколінь (мобільні застосунки та вбудовані системи)'
			],
			bullets: [
				'Повний цикл функціонального та регресійного тестування оптико-електронних приладів і супутніх мобільних застосунків (Android / iOS)',
				'Теплові та вологісні стрес-тести електронного обладнання в кліматичній камері: виявлення критичних апаратних дефектів до серійного виробництва',
				'Прецизійне калібрування теплових сенсорів за допомогою калібратора чорного тіла для забезпечення максимальної точності вимірювань',
				'Діагностика, збирання, розбирання та доопрацювання / пайка друкованих плат (PCB) під час лабораторних випробувань',
				'Документування та ведення життєвого циклу дефектів у Jira/Redmine, пряма взаємодія з розробниками для оперативного усунення багів'
			],
			tags: ['Hardware QA', 'Embedded Systems', 'Climatic Chamber', 'Black Body Calibrator', 'Android/iOS', 'Firmware']
		},
		{
			id: 'exp-ozon',
			company: 'ОЗОН - ДЕЗ',
			companyShort: 'ОЗОН-ДЕЗ',
			period: '07/2023 – 2026',
			role: 'Директор',
			category: 'management',
			highlight: false,
			bullets: [
				'Операційне управління, контроль якості послуг та регламентів безпеки',
				'Організація бізнес-процесів, контроль якості виконання робіт та дотримання регламентів безпеки',
				'Керування командою співробітників та взаємодія з корпоративними клієнтами'
			],
			tags: ['Management', 'Operations', 'Quality Control', 'Safety Protocols']
		},
		{
			id: 'exp-bastico',
			company: 'BASTICO',
			companyShort: 'BASTICO',
			companyUrl: 'https://bastico.com/',
			period: '09/2015 – 02/2021',
			role: 'Інспектор з якості продукції',
			category: 'inspection',
			highlight: false,
			bullets: [
				'Контроль якості та кількості продукції, інспекційний нагляд за стандартами',
				'Проведення інспекцій, лабораторний відбір зразків та оформлення офіційної звітності',
				'Контроль відповідності міжнародним регламентам та стандартам якості'
			],
			tags: ['Quality Inspection', 'Standards Compliance', 'Reporting', 'Sampling']
		}
	],
	skillsHardware: [
		'Кліматичні камери (стрес-тести)',
		'Калібратор чорного тіла',
		'Калібрування теплових сенсорів',
		'Прошивка мікропроцесорів',
		'Збірка, пайка та реворк PCB',
		'Схемотехніка та електроніка'
	],
	skillsSoftware: [
		'Jira',
		'ClickUp',
		'Qase TMS',
		'Redmine',
		'Postman',
		'Android Studio',
		'Tera Term',
		'PuTTY',
		'AmbaUSB',
		'Intel Quartus Prime',
		'Cura / Creality Slicer',
		'Figma',
		'Linux',
		'Windows',
		'iOS / Android'
	],
	skillsManagement: [
		'Звітування про дефекти (Bug Lifecycle)',
		'Складання тест-планів та чек-листів',
		'Організація лабораторних випробувань',
		'Управління операційними процесами'
	],
	allSkills: [
		{
			category: 'QA & Testing',
			skills: [
				'Manual Testing',
				'Функціональне та регресійне тестування',
				'Стрес-тестування (Thermal & Humidity)',
				'Мобільне тестування (Android / iOS)',
				'Звітування про помилки та трекінг дефектів',
				'Тест-документація (Jira, ClickUp, Qase, Redmine)',
				'Postman (API)'
			]
		},
		{
			category: 'Embedded & Hardware',
			skills: [
				'Кліматичні камери (екстремальні умови)',
				'Калібратор чорного тіла',
				'Прецизійне калібрування сенсорів',
				'Прошивка мікропроцесорів та дебаг',
				'Діагностика, збірка та пайка плат (PCB)',
				'Схемотехніка цифрових пристроїв'
			]
		},
		{
			category: 'Tools & Utilities',
			skills: [
				'Tera Term / PuTTY',
				'AmbaUSB',
				'Intel Quartus Prime',
				'Android Studio',
				'Cura / Creality Slicer (3D-друк)',
				'Figma'
			]
		},
		{
			category: 'Platforms & OS',
			skills: [
				'iOS',
				'Android',
				'Linux',
				'Windows'
			]
		}
	],
	education: [
		{
			id: 'edu-onmu',
			institution: 'ОДЕСЬКИЙ НАЦІОНАЛЬНИЙ МОРСЬКИЙ УНІВЕРСИТЕТ',
			institutionUrl: 'https://onmu.org.ua/',
			period: '2008 – 2012',
			degree: 'Спеціаліст з інженерії',
			specialization: 'Транспортні технології та системи'
		},
		{
			id: 'edu-college',
			institution: 'ЧОРНОМОРСЬКИЙ МОРСЬКИЙ ПРОФЕСІЙНИЙ КОЛЕДЖ ОНМУ',
			institutionUrl: 'https://www.cmac.ukr.education/',
			period: '2005 – 2008',
			degree: 'Диплом спеціаліста з інженерії',
			specialization: 'Стивідор'
		}
	],
	achievements: [
		{
			id: 'ach-hw-qa',
			title: '5.5+ років у Hardware & Embedded QA',
			subtitle: 'ATN Corp. (Gen 2–6, Obsidian-4, Radar 360)',
			details: 'Повний цикл лабораторних випробувань пристроїв та застосунків без витоку критичних дефектів у серійне виробництво',
			icon: 'cpu'
		},
		{
			id: 'ach-lab-cert',
			title: 'Лабораторні тести та Кібербезпека',
			subtitle: 'CRDF Global Certified • Black Body Calibrator',
			details: 'Стрес-випробування в кліматичних камерах; захист критичної інфраструктури від загроз',
			icon: 'tool'
		},
		{
			id: 'ach-driver',
			title: 'Мобільність та польові випробування',
			subtitle: 'Водійські права категорій A, B, C (стаж з 2007)',
			details: 'Готовність до польових випробувань техніки, налаштування та транспортування тестових стендів',
			icon: 'car'
		}
	],
	courses: [
		{
			id: 'course-crdf',
			organization: 'CRDF Global',
			title: "Підтримка кібербезпеки для об'єктів критичної інфраструктури в Україні",
			details:
				'Спеціалізований курс захисту хімічних, біологічних, радіологічних та ядерних (ХБРЯ) об’єктів та пов’язаної з ними критичної інфраструктури.',
			year: 'Сертифіковано'
		}
	],
	languages: [
		{
			language: 'Українська',
			level: 'вільно',
			badge: 'UA',
			proficiencyPercent: 100
		},
		{
			language: 'Англійська',
			level: 'А2',
			badge: 'EN',
			proficiencyPercent: 45
		},
		{
			language: 'Російська',
			level: 'вільно',
			badge: 'RU',
			proficiencyPercent: 100
		}
	],
	hobbies: [
		{
			name: '3D-друк (Cura/Slicer)',
			icon: 'printer',
			description: 'Моделювання та виготовлення деталей, оптимізація друку'
		},
		{
			name: 'Штучний інтелект',
			icon: 'cpu',
			description: 'AI-асистенти, автоматизація робочих процесів'
		},
		{
			name: 'Пайка та схемотехніка',
			icon: 'tool',
			description: 'DIY електроніка, мікроконтролери, схемотехніка'
		},
		{
			name: 'Спорт',
			icon: 'activity',
			description: 'Фізична витривалість, активний спосіб життя'
		}
	],
	metadata: {
		lastUpdated: '2026-10-07',
		version: '2.0.0-kernel',
		author: 'Oleksii Kolosov'
	}
};
