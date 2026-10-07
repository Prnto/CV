import type { ShellDefinition, ShellId } from './types';

export const SHELLS: ShellDefinition[] = [
	{
		id: 'reference-dark',
		name: 'ATN Dark Reference',
		description: 'Оригінальний графічний референс (темний кард-інтерфейс з преміальними акцентами)',
		icon: 'layout',
		badge: 'Reference UI',
		accentColor: '#38bdf8'
	},
	{
		id: 'cyberpunk-hud',
		name: 'Hyprland QA HUD',
		description: 'Тайлінговий хай-тек інтерфейс стенду випробувань (Obsidian-4, термо-датчики, телеметрія)',
		icon: 'cpu',
		badge: 'Tiling WM',
		accentColor: '#10b981',
		hidden: true
	},
	{
		id: 'terminal-cli',
		name: 'Linux Terminal (Arch TUI)',
		description: 'Інтерактивний термінал Linux: підтримка команд whoami, cat, skills, contact, test-run',
		icon: 'terminal',
		badge: 'Bash / TUI',
		accentColor: '#f59e0b',
		hidden: true
	},
	{
		id: 'executive-paper',
		name: 'Executive Print (ATS Clean)',
		description: 'Корпоративна світла версія для друку та HR систем, оптимізована під PDF (A4)',
		icon: 'file-text',
		badge: 'Print / ATS',
		accentColor: '#2563eb'
	}
];

export const VISIBLE_SHELLS: ShellDefinition[] = SHELLS.filter((s) => !s.hidden);

export function getShellById(id: ShellId): ShellDefinition {
	return SHELLS.find((s) => s.id === id) ?? SHELLS[0];
}
