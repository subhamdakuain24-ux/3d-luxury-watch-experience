/**
 * High-end Swiss Mechanical Horology Sound Synthesizer
 * Procedurally synthesizes 28,800 vph (4 Hz / 8 beats per second) mechanical escapement clicks.
 */

class WatchAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private intervalId: number | null = null;
  private beatState: boolean = false;
  private volume: number = 0.25;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public isMuted(): boolean {
    return !this.isRunning;
  }

  public start() {
    this.initContext();
    if (!this.ctx) return;
    this.isRunning = true;

    // 28,800 beats per hour = 8 beats per second = 125ms per beat
    if (this.intervalId) window.clearInterval(this.intervalId);
    this.intervalId = window.setInterval(() => {
      this.playTickTock();
    }, 125);
  }

  public stop() {
    this.isRunning = false;
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private playTickTock() {
    if (!this.ctx || this.ctx.state !== 'running') return;

    this.beatState = !this.beatState;
    const now = this.ctx.currentTime;

    // Metallic pallet fork click
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Alternate slightly in pitch for tick vs tock
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(this.beatState ? 2450 : 2280, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.018);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(this.beatState ? 3200 : 2800, now);
    filter.Q.setValueAtTime(8, now);

    gain.gain.setValueAtTime(this.volume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.025);

    // Micro metallic chime ring (synthetic ruby jewel resonance)
    const jewelOsc = this.ctx.createOscillator();
    const jewelGain = this.ctx.createGain();
    jewelOsc.type = 'sine';
    jewelOsc.frequency.setValueAtTime(this.beatState ? 5400 : 4900, now);
    jewelGain.gain.setValueAtTime(this.volume * 0.12, now);
    jewelGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    jewelOsc.connect(jewelGain);
    jewelGain.connect(this.ctx.destination);

    jewelOsc.start(now);
    jewelOsc.stop(now + 0.04);
  }
}

export const watchAudio = new WatchAudioEngine();
