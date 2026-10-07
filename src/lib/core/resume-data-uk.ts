import type { ResumeData } from './types';
import avatarImg from '../assets/avatar.jpg';

export const resumeDataUk: ResumeData = {
	locale: 'uk',
	personal: {
		fullName: 'КОЛОСОВ ОЛЕКСІЙ',
		title: 'QA Інженер апаратного та вбудованого ПЗ / Manual QA Інженер',
		photoUrl: avatarImg,
		phone: '+380966980458',
		email: 'Prontos317@gmail.com',
		location: 'Одеса, Україна',
		summary:
			'QA-інженер із 5.5+ роками практичного досвіду тестування комплексного апаратного та програмного забезпечення (Embedded Systems, Firmware, iOS/Android Apps). Спеціалізуюся на комплексній перевірці пристроїв та мобільних застосунків, стрес-тестуванні в екстремальних умовах (кліматичні камери, recoil-машини, теплові датчики). Маю базове розуміння схемотехніки, збирання та налагодження електроніки.',
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
				platform: 'github',
				label: 'GitHub',
				url: 'https://github.com/Prnto',
				icon: 'github'
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
			role: 'QA Інженер (Апаратне, вбудоване ПЗ та мобільні застосунки)',
			category: 'qa',
			highlight: true,
			projects: [
				'Connect 5',
				'Connect 6',
				'Obsidian 4',
				'Radar 360',
				'Tactical Map',
				'ATN Obsidian',
				'ATN Ballistics',
				'Девайси 2-го – 6-го поколінь (мобільні застосунки та вбудовані системи)'
			],
			apps: [
				{
					name: 'Connect 5',
					androidUrl: 'https://play.google.com/store/apps/details?id=com.atn.obsidian5',
					iosUrl: 'https://apps.apple.com/ua/app/atn-connect-5/id1583221269?l=ru'
				},
				{
					name: 'Connect 6',
					androidUrl: 'https://play.google.com/store/apps/details?id=com.atn.blaze',
					iosUrl: 'https://apps.apple.com/ua/app/atn-connect-6/id6476927551?l=ru'
				},
				{
					name: 'Obsidian 4',
					androidUrl: 'https://play.google.com/store/apps/details?id=com.atn.obsidian4K',
					iosUrl: 'https://apps.apple.com/ua/app/atn-obsidian-4/id1337731256?l=ru'
				},
				{
					name: 'Radar 360',
					androidUrl: 'https://play.google.com/store/apps/details?id=com.atn.tl',
					iosUrl: 'https://apps.apple.com/ua/app/atn-radar-360/id1526186603?l=ru'
				},
				{
					name: 'Tactical Map',
					androidUrl: 'https://play.google.com/store/apps/details?id=com.atn.tacticalnav',
					iosUrl: 'https://apps.apple.com/ua/app/tactical-map/id1618223523?l=ru'
				},
				{
					name: 'Obsidian',
					androidUrl: 'https://play.google.com/store/apps/details?id=com.atn.obsidian',
					iosUrl: 'https://apps.apple.com/ua/app/atn-obsidian/id931990224?l=ru'
				},
				{
					name: 'Ballistics',
					androidUrl: 'https://play.google.com/store/apps/details?id=com.atn.bc',
					iosUrl: 'https://apps.apple.com/ua/app/atn-ballistics/id1193084973?l=ru'
				}
			],
			bullets: [
				'Повний цикл функціонального та регресійного тестування оптико-електронних приладів і супутніх мобільних застосунків (Android / iOS)',
				'Теплові та вологісні стрес-тести електронного обладнання в кліматичній камері: виявлення критичних апаратних дефектів до серійного виробництва',
				'Прецизійне калібрування теплових сенсорів (калібратор чорного тіла); калібрування та стрес-випробування стійкості до відбою на Recoil-машині',
				'Діагностика, збирання, розбирання та доопрацювання / пайка друкованих плат (PCB) під час лабораторних випробувань',
				'Документування та ведення життєвого циклу дефектів у Jira/Redmine, пряма взаємодія з розробниками для оперативного усунення багів'
			],
			tags: ['Тестування апаратного ПЗ', 'Вбудовані системи', 'Recoil-машина', 'Кліматична камера', 'Калібратор чорного тіла', 'Android/iOS']
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
			tags: ['Менеджмент', 'Операційне управління', 'Контроль якості', 'Протоколи безпеки']
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
			tags: ['Контроль якості', 'Відповідність стандартам', 'Звітність', 'Відбір зразків']
		}
	],
	skillsHardware: [
		'Кліматичні камери (стрес-тести)',
		'Recoil-машина (тести відбою)',
		'Калібратор чорного тіла',
		'Калібрування теплових сенсорів',
		'Прошивка мікропроцесорів',
		'Збірка, пайка та реворк PCB',
		'Схемотехніка та електроніка'
	],
	skillsSoftware: [
		'Git',
		'Postman',
		'Figma',
		'Firebase',
		'Jira',
		'ClickUp',
		'Qase TMS',
		'Redmine',
		'Android Studio',
		'Tera Term',
		'PuTTY',
		'AmbaUSB',
		'Intel Quartus Prime',
		'Cura / Creality Slicer',
		'Linux',
		'Windows',
		'iOS / Android'
	],
	skillsManagement: [
		'Життєвий цикл дефектів (Bug Lifecycle)',
		'Складання тест-планів та чек-листів',
		'Організація лабораторних випробувань',
		'Управління операційними процесами'
	],
	allSkills: [
		{
			category: 'QA та тестування',
			skills: [
				'Ручне тестування (Manual Testing)',
				'Функціональне та регресійне тестування',
				'Стрес-тестування (температурне та вологісне)',
				'Мобільне тестування (Android / iOS)',
				'Звітування про помилки та трекінг дефектів',
				'Тестова документація (Jira, ClickUp, Qase, Redmine)',
				'Postman (Тестування API)',
				'Firebase (Crashlytics, App Distribution)'
			]
		},
		{
			category: 'Вбудовані системи та електроніка',
			skills: [
				'Кліматичні камери (екстремальні умови)',
				'Recoil-машина (калібрування та відбій)',
				'Калібратор чорного тіла',
				'Прецизійне калібрування сенсорів',
				'Прошивка мікропроцесорів та дебаг',
				'Діагностика, збірка та пайка плат (PCB)',
				'Схемотехніка цифрових пристроїв'
			]
		},
		{
			category: 'Інструменти та утиліти',
			skills: [
				'Git',
				'Postman',
				'Figma',
				'Firebase',
				'Android Studio',
				'Tera Term / PuTTY',
				'AmbaUSB',
				'Intel Quartus Prime',
				'Cura / Creality Slicer (3D-друк)'
			]
		},
		{
			category: 'Платформи та операційні системи',
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
			title: '5.5+ років у тестуванні Hardware & Embedded',
			subtitle: 'ATN Corp. (Покоління 2–6, Obsidian-4, Radar 360)',
			details: 'Повний цикл лабораторних випробувань пристроїв та застосунків без витоку критичних дефектів у серійне виробництво',
			icon: 'cpu'
		},
		{
			id: 'ach-lab-cert',
			title: 'Лабораторні тести та Кібербезпека',
			subtitle: 'Сертифіковано CRDF Global • Recoil-машина • Чорне тіло',
			details: 'Стрес-випробування в кліматичних камерах та на ударних стендах (recoil); захист критичної інфраструктури',
			icon: 'tool'
		},
		{
			id: 'ach-driver',
			title: 'Мобільність та польові випробування',
			subtitle: 'Водійські права категорій A, A1, B, B1, C, C1 (стаж з 2007)',
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
			level: 'Рідна / Вільно',
			badge: 'UA',
			proficiencyPercent: 100
		},
		{
			language: 'Англійська',
			level: 'А2 (Pre-Intermediate)',
			badge: 'EN',
			proficiencyPercent: 45
		},
		{
			language: 'Російська',
			level: 'Вільно',
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
