import type { ResumeData } from './types';
import avatarImg from '../assets/avatar.jpg';

export const resumeDataUk: ResumeData = {
	locale: 'uk',
	personal: {
		fullName: 'КОЛОСОВ ОЛЕКСІЙ',
		title: 'Інженер з якості (QA Engineer)',
		photoUrl: avatarImg,
		phone: '+380966980458',
		email: 'Prontos317@gmail.com',
		location: 'Одеса, UA',
		summary:
			'Інженер з мануального забезпечення якості цифрових та вбудованих пристроїв, мобільних додатків і складного радіоелектронного обладнання. Глибокий практичний досвід кліматичних та термічних випробувань, калібрування теплових датчиків (калібратор чорного тіла), збірки та дебагу апаратних платформ і підготовки технічної документації.',
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
			role: 'Тестувальник (мануальний) з забезпечення якості',
			category: 'qa',
			highlight: true,
			projects: [
				'Obsidian-4',
				'Radar 360',
				'Connect 5',
				'Connect 6',
				'Tactical Map',
				'Робота з Девайсами 2-4-5 та 6 покоління (Мобільний додаток та вбудований пристрій)'
			],
			bullets: [
				'Регресійне функціональне тестування пристроїв та мобільних додатків (Android / iOS)',
				'Звітування про помилки, відстеження дефектів, документування тестів',
				'Виконання теплових та вологісних стрес-тестів електронних пристроїв за допомогою кліматичної камери',
				'Калібрування теплових датчиків за допомогою калібратора чорного тіла',
				'Збирання - розбирання пристроїв'
			],
			tags: ['Manual QA', 'Hardware Testing', 'Android/iOS', 'Climatic Chamber', 'Black Body Calibrator', 'Firmware']
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
				'Послуги з боротьби зі шкідниками та санітарії',
				'Організація операційної діяльності, контроль якості виконання робіт та дотримання регламентів безпеки',
				'Керування командою співробітників та взаємодія з клієнтами'
			],
			tags: ['Management', 'Operations', 'Quality Control', 'Safety Protocols']
		},
		{
			id: 'exp-bastico',
			company: 'BASTICO',
			companyShort: 'BASTICO',
			companyUrl: 'https://bastico.com/',
			period: '09/2015 – 02/2021',
			role: 'Інспектор',
			category: 'inspection',
			highlight: false,
			bullets: [
				'Перевірка якості та кількості сільськогосподарської продукції',
				'Проведення інспекцій, відбір зразків та оформлення офіційної звітної документації',
				'Контроль відповідності міжнародним стандартам якості'
			],
			tags: ['Quality Inspection', 'Standards Compliance', 'Reporting', 'Sampling']
		}
	],
	skillsHardware: [
		'Ручне тестування діджитал приладів',
		'Збірка та пайка електроніки',
		'Збірка та переробка друкованих плат (PCB)',
		'Кліматична камера (стрес-тестування приладів)',
		'Калібрування термодатчика та калібратор чорного тіла',
		'Програмування мікропроцесорів'
	],
	skillsSoftware: [
		'Jira',
		'ClickUp',
		'Qase',
		'Redmine',
		'Slack',
		'Tera Term',
		'At Term',
		'PuTTY',
		'AmbaUSB',
		'Figma',
		'Intel Quartus Prime Programmer',
		'Cura / Creality Slicer',
		'Android Studio',
		'Postman',
		'Linux',
		'Windows',
		'iOS / Android'
	],
	skillsManagement: [
		'Звітування про дефекти (Bug Reports)',
		'Складання тест-планів та чек-листів',
		'Управління командами та процесами',
		'Організація лабораторних випробувань'
	],
	allSkills: [
		{
			category: 'Апаратне та лабораторне тестування (Hardware QA)',
			skills: [
				'Ручне тестування цифрових приладів',
				'Кліматична камера (теплові та вологісні тести)',
				'Калібратор чорного тіла',
				'Калібрування теплових сенсорів',
				'Збірка, пайка та реворк друкованих плат (PCB)',
				'Програмування мікропроцесорів та прошивка'
			]
		},
		{
			category: 'QA ПЗ, дефекти та документація',
			skills: [
				'Регресійне та функціональне тестування',
				'Мобільне тестування (Android / iOS)',
				'Звітування про помилки та трекінг багів',
				'Jira',
				'ClickUp',
				'Qase TMS',
				'Redmine',
				'Postman (API)'
			]
		},
		{
			category: 'Інженерні та системні утиліти',
			skills: [
				'Tera Term / At Term',
				'PuTTY',
				'AmbaUSB',
				'Intel Quartus Prime Programmer',
				'Android Studio',
				'Figma',
				'Cura / Creality Slicer (3D-друк)',
				'Linux, Windows, iOS'
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
			id: 'ach-driver',
			title: 'Водійські права (керування з 2007 року)',
			subtitle: 'Категорії: A, A1, B, B1, C, C1',
			details: 'Багаторічний безаварійний стаж водіння легкового та вантажного транспорту',
			icon: 'car'
		},
		{
			id: 'ach-forklift',
			title: 'Сертифікат оператора вилкового навантажувача',
			subtitle: 'Кваліфікований оператор',
			details: 'Офіційна сертифікація керування складською технікою',
			icon: 'forklift'
		},
		{
			id: 'ach-crane',
			title: 'Сертифікат оператора портального крана',
			subtitle: 'Професійний допуск',
			details: 'Сертифікація роботи з вантажопідйомним портовим обладнанням',
			icon: 'crane'
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
			name: '3D-друк',
			icon: 'printer',
			description: 'Моделювання та виготовлення деталей, slicer оптимізація'
		},
		{
			name: 'Спорт',
			icon: 'activity',
			description: 'Фізична витривалість, активний спосіб життя'
		},
		{
			name: 'Штучний інтелект',
			icon: 'cpu',
			description: 'AI-асистенти, автоматизація, генеративні моделі'
		},
		{
			name: 'Пайка та складання електронних пристроїв',
			icon: 'tool',
			description: 'DIY електроніка, мікроконтролери, схемотехніка'
		}
	],
	metadata: {
		lastUpdated: '2026-10-07',
		version: '2.0.0-kernel',
		author: 'Oleksii Kolosov'
	}
};
