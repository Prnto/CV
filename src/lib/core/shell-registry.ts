import type { ShellDefinition, ShellId } from './types';

export const SHELLS: ShellDefinition[] = [
	{
		id: 'reference-dark',
		name: 'Темна',
		nameUk: 'Темна',
		nameEn: 'Dark',
		description: 'Оригінальна темна тема (Dark Reference)',
		descriptionUk: 'Оригінальна темна тема (Dark Reference)',
		descriptionEn: 'Original Dark Reference theme',
		icon: 'layout',
		badge: 'Reference UI',
		accentColor: '#38bdf8'
	},
	{
		id: 'cyberpunk-hud',
		name: 'Hyprland QA HUD',
		nameUk: 'Hyprland QA HUD',
		nameEn: 'Hyprland QA HUD',
		description: 'Тайлінговий хай-тек інтерфейс стенду випробувань (Obsidian-4, термо-датчики, телеметрія)',
		descriptionUk: 'Тайлінговий хай-тек інтерфейс стенду випробувань',
		descriptionEn: 'Tiling high-tech QA lab HUD',
		icon: 'cpu',
		badge: 'Tiling WM',
		accentColor: '#10b981',
		hidden: true
	},
	{
		id: 'terminal-cli',
		name: 'Linux Terminal',
		nameUk: 'Термінал CLI',
		nameEn: 'Linux Terminal',
		description: 'Інтерактивний термінал Linux: підтримка команд whoami, cat, skills, contact, test-run',
		descriptionUk: 'Інтерактивний термінал Linux: підтримка команд whoami, skills, contact',
		descriptionEn: 'Interactive Linux terminal: commands whoami, skills, contact',
		icon: 'terminal',
		badge: 'Bash / TUI',
		accentColor: '#f59e0b',
		hidden: true
	},
	{
		id: 'executive-paper',
		name: 'Світла',
		nameUk: 'Світла',
		nameEn: 'White',
		description: 'Корпоративна світла тема (White / Print ATS)',
		descriptionUk: 'Корпоративна світла тема (White / Print ATS)',
		descriptionEn: 'Clean White theme (Print / ATS)',
		icon: 'file-text',
		badge: 'Print / ATS',
		accentColor: '#2563eb'
	}
];

export const VISIBLE_SHELLS: ShellDefinition[] = SHELLS.filter((s) => !s.hidden);

export function getShellById(id: ShellId): ShellDefinition {
	return SHELLS.find((s) => s.id === id) ?? SHELLS[0];
}
