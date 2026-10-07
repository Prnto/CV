import type { ResumeData } from './types';
import avatarImg from '../assets/avatar.jpg';

export const resumeDataEn: ResumeData = {
	locale: 'en',
	personal: {
		fullName: 'OLEKSII KOLOSOV',
		title: 'Quality Assurance Engineer (Hardware / Embedded / Mobile QA)',
		photoUrl: avatarImg,
		phone: '+380966980458',
		email: 'Prontos317@gmail.com',
		location: 'Odesa, UA',
		summary:
			'Manual QA Engineer specializing in digital & embedded hardware devices, mobile applications, and electro-optical systems. Extensive hands-on background in climatic chamber thermal stress testing, black body calibrator thermal sensor calibration, firmware flashing, and hardware disassembly/rework.',
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
				url: 'https://t.me/Prontos317',
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
			period: '02/2021 – 09/2026',
			role: 'Manual Quality Assurance Engineer',
			category: 'qa',
			highlight: true,
			projects: [
				'Obsidian-4',
				'Radar 360',
				'Connect 5',
				'Connect 6',
				'Tactical Map',
				'Gen 2-4-5 & Gen 6 Devices (Mobile App & Embedded Device)'
			],
			bullets: [
				'Regression and functional testing of smart optic devices and mobile applications (Android / iOS)',
				'Bug reporting, defect tracking, and comprehensive test documentation',
				'Conducting thermal and humidity stress tests using climatic test chambers',
				'Thermal sensor calibration utilizing black body radiation calibrators',
				'Hardware device assembly and disassembly'
			],
			tags: ['Manual QA', 'Hardware Testing', 'Android/iOS', 'Climatic Chamber', 'Black Body Calibrator', 'Firmware']
		},
		{
			id: 'exp-ozon',
			company: 'OZON - DEZ',
			companyShort: 'OZON-DEZ',
			period: '07/2023 – 2026',
			role: 'Director',
			category: 'management',
			highlight: false,
			bullets: [
				'Pest control and sanitation services',
				'Operational leadership, service quality assurance, and safety protocol adherence',
				'Team leadership and client account management'
			],
			tags: ['Management', 'Operations', 'Quality Control', 'Safety Protocols']
		},
		{
			id: 'exp-bastico',
			company: 'BASTICO',
			companyShort: 'BASTICO',
			period: '09/2015 – 02/2021',
			role: 'Inspector',
			category: 'inspection',
			highlight: false,
			bullets: [
				'Quality and quantity inspection of agricultural commodities',
				'Conducting on-site cargo inspections, sampling, and drafting official reports',
				'Verification of compliance with international trade and quality standards'
			],
			tags: ['Quality Inspection', 'Standards Compliance', 'Reporting', 'Sampling']
		}
	],
	skillsHardware: [
		'Manual testing of digital devices',
		'Electronics assembly & soldering',
		'PCB assembly and rework',
		'Climatic chamber stress testing',
		'Thermal sensor calibration & black body calibrator',
		'Microprocessor programming & firmware flashing'
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
		'Defect reporting & bug lifecycle tracking',
		'Test planning and checklists development',
		'Team & operations management',
		'Lab test procedures design'
	],
	allSkills: [
		{
			category: 'Hardware & Lab Quality Assurance',
			skills: [
				'Manual testing of digital electro-optical devices',
				'Climatic chamber environmental stress testing',
				'Black body radiator calibration',
				'Thermal sensor calibration',
				'PCB assembly, rework & precision soldering',
				'Microprocessor flashing & embedded firmware verification'
			]
		},
		{
			category: 'Software QA, Defects & Documentation',
			skills: [
				'Regression & functional testing',
				'Mobile application testing (Android / iOS)',
				'Bug reporting & lifecycle management',
				'Jira',
				'ClickUp',
				'Qase TMS',
				'Redmine',
				'Postman (REST API verification)'
			]
		},
		{
			category: 'Engineering & System Utilities',
			skills: [
				'Tera Term / At Term',
				'PuTTY',
				'AmbaUSB',
				'Intel Quartus Prime Programmer',
				'Android Studio',
				'Figma',
				'Cura / Creality Slicer (3D Printing)',
				'Linux, Windows, iOS'
			]
		}
	],
	education: [
		{
			id: 'edu-onmu',
			institution: 'ODESA NATIONAL MARITIME UNIVERSITY',
			period: '2008 – 2012',
			degree: 'Specialist in Engineering',
			specialization: 'Transport Technologies and Systems'
		},
		{
			id: 'edu-college',
			institution: 'CHORNOMORSK MARITIME COLLEGE OF ONMU',
			period: '2005 – 2008',
			degree: 'Specialist Diploma in Engineering',
			specialization: 'Stevedoring'
		}
	],
	achievements: [
		{
			id: 'ach-driver',
			title: 'Driving License (Driving since 2007)',
			subtitle: 'Categories: A, A1, B, B1, C, C1',
			details: 'Extensive accident-free driving record across light and heavy utility vehicles',
			icon: 'car'
		},
		{
			id: 'ach-forklift',
			title: 'Forklift Operator Certificate',
			subtitle: 'Certified Operator',
			details: 'Official license for industrial forklift and warehouse machinery operation',
			icon: 'forklift'
		},
		{
			id: 'ach-crane',
			title: 'Portal Crane Operator Certificate',
			subtitle: 'Certified Operator',
			details: 'Licensed certification for heavy port cargo crane operation',
			icon: 'crane'
		}
	],
	courses: [
		{
			id: 'course-crdf',
			organization: 'CRDF Global',
			title: 'Cybersecurity Support for Critical Infrastructure in Ukraine',
			details:
				'Specialized cybersecurity training for chemical, biological, radiological, and nuclear (CBRN) facilities and related critical infrastructure.',
			year: 'Certified'
		}
	],
	languages: [
		{
			language: 'Ukrainian',
			level: 'Native (Fluent)',
			badge: 'UA',
			proficiencyPercent: 100
		},
		{
			language: 'English',
			level: 'A2 (Pre-Intermediate)',
			badge: 'EN',
			proficiencyPercent: 45
		},
		{
			language: 'Russian',
			level: 'Fluent',
			badge: 'RU',
			proficiencyPercent: 100
		}
	],
	hobbies: [
		{
			name: '3D Printing',
			icon: 'printer',
			description: 'CAD modeling, slicer configuration, functional prototypes'
		},
		{
			name: 'Sports',
			icon: 'activity',
			description: 'Fitness endurance, active lifestyle'
		},
		{
			name: 'Artificial Intelligence',
			icon: 'cpu',
			description: 'AI workflows, productivity tools, generative models'
		},
		{
			name: 'Soldering & Electronics Assembly',
			icon: 'tool',
			description: 'DIY electronics, microcontrollers, circuit board repair'
		}
	],
	metadata: {
		lastUpdated: '2026-10-07',
		version: '2.0.0-kernel',
		author: 'Oleksii Kolosov'
	}
};
