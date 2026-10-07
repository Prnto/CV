import { GTA_HOVER_URI, GTA_SELECT_URI, GTA_CHEAT_URI } from './sound-data';

// High-fidelity audio player utilizing GTA San Andreas menu audio assets
class GtaSoundPlayer {
	private ctx: AudioContext | null = null;
	private hoverBuffer: AudioBuffer | null = null;
	private selectBuffer: AudioBuffer | null = null;
	private cheatBuffer: AudioBuffer | null = null;
	private isInitialized = false;
	private initPromise: Promise<void> | null = null;
	private lastHoverTime = 0;
	private lastSelectTime = 0;

	private getContext(): AudioContext | null {
		if (typeof window === 'undefined') return null;
		if (!this.ctx) {
			const AudioCtx =
				window.AudioContext ||
				(window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
			if (AudioCtx) {
				this.ctx = new AudioCtx();
			}
		}
		if (this.ctx && this.ctx.state === 'suspended') {
			this.ctx.resume().catch(() => {});
		}
		return this.ctx;
	}

	private async base64ToArrayBuffer(base64Uri: string): Promise<ArrayBuffer> {
		const base64 = base64Uri.split(',')[1];
		const binaryString = window.atob(base64);
		const len = binaryString.length;
		const bytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		return bytes.buffer;
	}

	async init(): Promise<void> {
		if (this.isInitialized || typeof window === 'undefined') return;
		if (this.initPromise) return this.initPromise;

		this.initPromise = (async () => {
			const ctx = this.getContext();
			if (!ctx) return;

			try {
				const [hoverBuf, selectBuf, cheatBuf] = await Promise.all([
					this.base64ToArrayBuffer(GTA_HOVER_URI),
					this.base64ToArrayBuffer(GTA_SELECT_URI),
					this.base64ToArrayBuffer(GTA_CHEAT_URI)
				]);

				this.hoverBuffer = await ctx.decodeAudioData(hoverBuf);
				this.selectBuffer = await ctx.decodeAudioData(selectBuf);
				this.cheatBuffer = await ctx.decodeAudioData(cheatBuf);
				this.isInitialized = true;
			} catch (err) {
				// Fallback: Web Audio decode failed or unsupported codec
				console.warn('[GTA Sound] Web Audio decode fallback:', err);
			}
		})();

		return this.initPromise;
	}

	private playBuffer(buffer: AudioBuffer | null, fallbackUri: string, volume = 0.5) {
		try {
			const ctx = this.getContext();
			if (ctx && buffer && ctx.state === 'running') {
				const source = ctx.createBufferSource();
				const gainNode = ctx.createGain();
				gainNode.gain.value = volume;
				source.buffer = buffer;
				source.connect(gainNode);
				gainNode.connect(ctx.destination);
				source.start(0);
				return;
			}

			// Fallback using HTMLAudioElement
			if (typeof Audio !== 'undefined') {
				const audio = new Audio(fallbackUri);
				audio.volume = volume;
				audio.play().catch(() => {});
			}
		} catch {
			// Ignore audio policy errors
		}
	}

	/**
	 * GTA San Andreas menu hover sound (classic cursor movement blip)
	 */
	playHover(volume = 0.45) {
		const now = Date.now();
		if (now - this.lastHoverTime < 50) return;
		this.lastHoverTime = now;

		if (!this.isInitialized) this.init();
		this.playBuffer(this.hoverBuffer, GTA_HOVER_URI, volume);
	}

	/**
	 * GTA San Andreas menu selected sound (classic item activation sound)
	 */
	playSelect(volume = 0.55) {
		const now = Date.now();
		if (now - this.lastSelectTime < 70) return;
		this.lastSelectTime = now;

		if (!this.isInitialized) this.init();
		this.playBuffer(this.selectBuffer, GTA_SELECT_URI, volume);
	}

	/**
	 * GTA San Andreas cheat sound (classic mission passed / cheat activated chime)
	 */
	playCheat(volume = 0.6) {
		if (!this.isInitialized) this.init();
		this.playBuffer(this.cheatBuffer, GTA_CHEAT_URI, volume);
	}

	// Aliases for compatibility
	playClick(volume = 0.55) {
		this.playSelect(volume);
	}

	playSwitch(volume = 0.55) {
		this.playSelect(volume);
	}

	playKey(volume = 0.35) {
		this.playHover(volume);
	}
}

export const sound = new GtaSoundPlayer();

