// Web Audio API synthesizers for micro-sound feedback
class SoundSynthesizer {
	private ctx: AudioContext | null = null;

	private getContext(): AudioContext | null {
		if (typeof window === 'undefined') return null;
		if (!this.ctx) {
			const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
			if (AudioCtx) {
				this.ctx = new AudioCtx();
			}
		}
		if (this.ctx && this.ctx.state === 'suspended') {
			this.ctx.resume();
		}
		return this.ctx;
	}

	// Crisp click for UI actions
	playClick() {
		try {
			const ctx = this.getContext();
			if (!ctx) return;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			osc.type = 'sine';
			osc.frequency.setValueAtTime(800, ctx.currentTime);
			osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

			gain.gain.setValueAtTime(0.04, ctx.currentTime);
			gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

			osc.connect(gain);
			gain.connect(ctx.destination);

			osc.start();
			osc.stop(ctx.currentTime + 0.04);
		} catch {
			// Ignore audio context errors
		}
	}

	// Shell switch futuristic chord
	playSwitch() {
		try {
			const ctx = this.getContext();
			if (!ctx) return;
			const now = ctx.currentTime;

			[523.25, 659.25, 783.99].forEach((freq, idx) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();

				osc.type = 'triangle';
				osc.frequency.setValueAtTime(freq, now + idx * 0.03);

				gain.gain.setValueAtTime(0.03, now + idx * 0.03);
				gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.12);

				osc.connect(gain);
				gain.connect(ctx.destination);

				osc.start(now + idx * 0.03);
				osc.stop(now + idx * 0.03 + 0.13);
			});
		} catch {
			// Ignore
		}
	}

	// Terminal keypress tap
	playKey() {
		try {
			const ctx = this.getContext();
			if (!ctx) return;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			osc.type = 'sine';
			osc.frequency.setValueAtTime(1200, ctx.currentTime);
			gain.gain.setValueAtTime(0.015, ctx.currentTime);
			gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);

			osc.connect(gain);
			gain.connect(ctx.destination);

			osc.start();
			osc.stop(ctx.currentTime + 0.02);
		} catch {
			// Ignore
		}
	}
}

export const sound = new SoundSynthesizer();
