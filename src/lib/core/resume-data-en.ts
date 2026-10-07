import type { ResumeData } from './types';
import avatarImg from '../assets/avatar.jpg';

export const resumeDataEn: ResumeData = {
	locale: 'en',
	personal: {
		fullName: 'OLEKSII KOLOSOV',
		title: 'Hardware & Embedded QA Engineer / Manual QA Engineer',
		photoUrl: avatarImg,
		phone: '+380966980458',
		email: 'Prontos317@gmail.com',
		location: 'Odesa, UA',
		summary:
			'QA Engineer with 5.5+ years of hands-on experience testing complex hardware and software systems (Embedded Systems, Firmware, iOS/Android Apps). Specialized in end-to-end device and mobile verification, extreme environmental stress testing (climatic chambers, thermal sensors), circuitry diagnostics, and electronics assembly & rework.',
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
				'Gen 2–6 Optoelectronic Devices (Mobile Apps & Embedded Firmware)'
			],
			bullets: [
				'Full-cycle functional and regression testing of electro-optical devices and companion mobile applications (Android / iOS)',
				'Thermal and humidity stress testing in environmental climatic chambers: identifying critical hardware flaws prior to mass production',
				'High-precision calibration of thermal sensors utilizing black body radiation calibrators to ensure measurement accuracy',
				'Hardware diagnostics, assembly/disassembly, and PCB rework/soldering during laboratory validation tests',
				'Defect reporting and lifecycle tracking in Jira/Redmine, partnering with engineering teams to accelerate bug resolution'
			],
			tags: ['Hardware QA', 'Embedded Systems', 'Climatic Chamber', 'Black Body Calibrator', 'Android/iOS', 'Firmware']
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
				'Operational management, service quality assurance and safety standards compliance',
				'Workflow orchestration, quality control procedures, and safety protocol adherence',
				'Operations leadership, team mentoring, and corporate client relationship management'
			],
			tags: ['Management', 'Operations', 'Quality Control', 'Safety Protocols']
		},
		{
			id: 'exp-bastico',
			company: 'BASTICO',
			companyShort: 'BASTICO',
			companyUrl: 'https://bastico.com/',
			period: '09/2015 – 02/2021',
			role: 'Product Quality Inspector',
			category: 'inspection',
			highlight: false,
			bullets: [
				'Product quality and quantity inspection, standards compliance verification',
				'Conducting on-site cargo inspections, laboratory sampling, and drafting official reports',
				'Ensuring rigorous adherence to international trade quality and safety regulations'
			],
			tags: ['Quality Inspection', 'Standards Compliance', 'Reporting', 'Sampling']
		}
	],
	skillsHardware: [
		'Climatic test chambers (stress testing)',
		'Black body radiation calibrator',
		'Thermal sensor calibration',
		'Microprocessor firmware flashing',
		'PCB assembly, rework & soldering',
		'Circuitry & digital electronics'
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
		'Defect reporting & bug lifecycle tracking',
		'Test planning and checklists development',
		'Lab validation procedures design',
		'Operations & team management'
	],
	allSkills: [
		{
			category: 'QA & Testing',
			skills: [
				'Manual Testing',
				'Functional & Regression Testing',
				'Stress Testing (Thermal & Humidity)',
				'Mobile App Testing (Android / iOS)',
				'Bug Reporting & Defect Lifecycle Management',
				'Test Documentation (Jira, ClickUp, Qase, Redmine)',
				'Postman (REST API Verification)'
			]
		},
		{
			category: 'Embedded & Hardware',
			skills: [
				'Climatic Test Chambers (extreme conditions)',
				'Black Body Radiation Calibrator',
				'Precision Thermal Sensor Calibration',
				'Microprocessor Flashing & Debugging',
				'PCB Assembly, Rework & Precision Soldering',
				'Digital Circuitry Diagnostics'
			]
		},
		{
			category: 'Tools & Utilities',
			skills: [
				'Tera Term / PuTTY',
				'AmbaUSB',
				'Intel Quartus Prime',
				'Android Studio',
				'Cura / Creality Slicer (3D Printing)',
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
			institution: 'ODESA NATIONAL MARITIME UNIVERSITY',
			institutionUrl: 'https://onmu.org.ua/',
			period: '2008 – 2012',
			degree: 'Specialist in Engineering',
			specialization: 'Transport Technologies and Systems'
		},
		{
			id: 'edu-college',
			institution: 'CHORNOMORSK MARITIME COLLEGE OF ONMU',
			institutionUrl: 'https://www.cmac.ukr.education/',
			period: '2005 – 2008',
			degree: 'Specialist Diploma in Engineering',
			specialization: 'Stevedoring'
		}
	],
	achievements: [
		{
			id: 'ach-hw-qa',
			title: '5.5+ Years Hardware & Embedded QA',
			subtitle: 'ATN Corp. (Gen 2–6, Obsidian-4, Radar 360)',
			details: 'Full-cycle laboratory validation of devices and mobile apps with zero critical defect escape to mass production',
			icon: 'cpu'
		},
		{
			id: 'ach-lab-cert',
			title: 'Lab Testing & Cybersecurity Certification',
			subtitle: 'CRDF Global Certified • Black Body Calibrator',
			details: 'Environmental chamber stress testing; certified protection of critical national infrastructure',
			icon: 'tool'
		},
		{
			id: 'ach-driver',
			title: 'Technical Mobility & Field Test Readiness',
			subtitle: 'Driving Categories A, B, C (Licensed since 2007)',
			details: 'Readiness for field testing, equipment transport, and rapid on-site test bench deployment',
			icon: 'car'
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
			level: 'Native',
			badge: 'UA',
			proficiencyPercent: 100
		},
		{
			language: 'English',
			level: 'A2',
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
			name: '3D Printing (Cura/Slicer)',
			icon: 'printer',
			description: 'CAD prototyping, enclosure fabrication, slicer optimization'
		},
		{
			name: 'Artificial Intelligence',
			icon: 'cpu',
			description: 'AI workflows, productivity tools, generative models'
		},
		{
			name: 'Soldering & Circuitry',
			icon: 'tool',
			description: 'DIY electronics, microcontrollers, circuit board repair'
		},
		{
			name: 'Sports',
			icon: 'activity',
			description: 'Fitness endurance, active lifestyle'
		}
	],
	metadata: {
		lastUpdated: '2026-10-07',
		version: '2.0.0-kernel',
		author: 'Oleksii Kolosov'
	}
};
