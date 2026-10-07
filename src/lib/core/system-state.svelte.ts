import type { ResumeData, ShellId } from './types';
import { resumeDataUk } from './resume-data-uk';
import { resumeDataEn } from './resume-data-en';
import { SHELLS } from './shell-registry';

class SystemKernelState {
	currentShell = $state<ShellId>('reference-dark');
	locale = $state<'uk' | 'en'>('uk');
	searchQuery = $state<string>('');
	isSearchOpen = $state<boolean>(false);
	soundEnabled = $state<boolean>(false);
	showSpecsModal = $state<boolean>(false);

	// Derived current resume data based on selected locale
	data = $derived<ResumeData>(this.locale === 'uk' ? resumeDataUk : resumeDataEn);

	setShell(shell: ShellId) {
		this.currentShell = shell;
		if (typeof window !== 'undefined') {
			localStorage.setItem('kolosov_resume_shell', shell);
			document.documentElement.setAttribute('data-shell', shell);
		}
	}

	setLocale(locale: 'uk' | 'en') {
		this.locale = locale;
		if (typeof window !== 'undefined') {
			localStorage.setItem('kolosov_resume_locale', locale);
			document.documentElement.lang = locale;
		}
	}

	toggleLocale() {
		this.setLocale(this.locale === 'uk' ? 'en' : 'uk');
	}

	toggleSound() {
		this.soundEnabled = !this.soundEnabled;
	}

	toggleSearch() {
		this.isSearchOpen = !this.isSearchOpen;
	}

	setSearchQuery(q: string) {
		this.searchQuery = q;
	}

	initFromStorage() {
		if (typeof window === 'undefined') return;
		const savedShell = localStorage.getItem('kolosov_resume_shell') as ShellId | null;
		if (savedShell && SHELLS.some((s) => s.id === savedShell && !s.hidden)) {
			this.currentShell = savedShell;
		} else {
			this.currentShell = 'reference-dark';
		}
		const savedLocale = localStorage.getItem('kolosov_resume_locale') as 'uk' | 'en' | null;
		if (savedLocale === 'uk' || savedLocale === 'en') {
			this.locale = savedLocale;
		}
		document.documentElement.setAttribute('data-shell', this.currentShell);
		document.documentElement.lang = this.locale;
	}

	triggerPrint() {
		if (typeof window !== 'undefined') {
			window.print();
		}
	}
}

export const systemKernel = new SystemKernelState();
