/**
 * Plays the wedding song on a loop.
 *
 * Nothing plays until `start()` is called from a user gesture, as browsers
 * (and WhatsApp's in-app browser) require.
 */
export class WeddingMusic {
  private audioEl: HTMLAudioElement | null = null

  constructor(private trackSrc: string) {}

  async start() {
    this.audioEl ??= Object.assign(new Audio(this.trackSrc), { loop: true, volume: 0.6 })
    await this.audioEl.play()
  }

  stop() {
    this.audioEl?.pause()
  }
}
