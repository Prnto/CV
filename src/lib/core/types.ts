export interface SocialLink {
	platform: 'linkedin' | 'telegram' | 'facebook' | 'github' | 'email' | 'phone';
	label: string;
	url: string;
	icon: string;
}

export interface PersonalInfo {
	fullName: string;
	title: string;
	photoUrl: string;
	phone: string;
	email: string;
	location: string;
	summary?: string;
	socials: SocialLink[];
}

export interface ExperienceItem {
	id: string;
	company: string;
	companyShort?: string;
	companyUrl?: string;
	period: string;
	role: string;
	category?: 'qa' | 'management' | 'inspection';
	projects?: string[];
	bullets: string[];
	tags?: string[];
	highlight?: boolean;
}

export interface EducationItem {
	id: string;
	institution: string;
	period: string;
	degree: string;
	specialization: string;
}

export interface SkillGroup {
	category: string;
	skills: string[];
}

export interface AchievementItem {
	id: string;
	title: string;
	subtitle?: string;
	details?: string;
	icon: string;
}

export interface CourseItem {
	id: string;
	organization: string;
	title: string;
	details: string;
	year?: string;
}

export interface LanguageItem {
	language: string;
	level: string;
	badge?: string;
	proficiencyPercent?: number;
}

export interface HobbyItem {
	name: string;
	icon: string;
	description?: string;
}

export interface ResumeData {
	locale: 'uk' | 'en';
	personal: PersonalInfo;
	experience: ExperienceItem[];
	skillsHardware: string[];
	skillsSoftware: string[];
	skillsManagement: string[];
	allSkills: SkillGroup[];
	education: EducationItem[];
	achievements: AchievementItem[];
	courses: CourseItem[];
	languages: LanguageItem[];
	hobbies: HobbyItem[];
	metadata: {
		lastUpdated: string;
		version: string;
		author: string;
	};
}

export type ShellId = 'reference-dark' | 'terminal-cli' | 'cyberpunk-hud' | 'executive-paper';

export interface ShellDefinition {
	id: ShellId;
	name: string;
	description: string;
	icon: string;
	badge: string;
	accentColor: string;
}
