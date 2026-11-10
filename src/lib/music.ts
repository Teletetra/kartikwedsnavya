/**
 * A small Web Audio engine that synthesises a gentle wedding atmosphere:
 * a tanpura-style drone, a shehnai melody in Raag Yaman with meend (glides)
 * and vibrato, and an optional dhol groove.
 *
 * Nothing plays until `start()` is called from a user gesture, as browsers
 * (and WhatsApp's in-app browser) require.
 */

const SA = 277.18 // C#4 — a typical shehnai tonic
const BPM = 72
const BEAT = 60 / BPM

// Semitone offsets from Sa. null = rest. Yaman: S R G M# P D N
type Note = [number | null, number]
const MELODY: Note[] = [
  // Aalap-like opening
  [-1, 0.5], [2, 0.5], [4, 2], [null, 0.5], [2, 0.5], [4, 0.5], [6, 0.5], [7, 2.5], [null, 0.5],
  [6, 0.5], [4, 0.5], [2, 1], [4, 0.5], [2, 0.5], [0, 2.5], [null, 1],
  // Rising phrase
  [-1, 0.5], [2, 0.5], [4, 0.5], [6, 0.5], [7, 1], [9, 1], [11, 0.5], [12, 2.5], [null, 0.5],
  [11, 0.5], [9, 0.5], [7, 1], [6, 0.5], [4, 0.5], [7, 2], [null, 0.5],
  // Gat-like, rhythmic
  [4, 0.5], [6, 0.5], [7, 0.5], [9, 0.5], [7, 1], [6, 0.5], [4, 0.5], [2, 1], [4, 1],
  [7, 0.5], [6, 0.5], [4, 0.5], [2, 0.5], [0, 1], [-1, 0.5], [2, 0.5], [0, 3], [null, 1.5],
]

// Dhol chaal over 8 eighth-notes: B = bass (dagga), T = treble (tilli)
const DHOL: string[] = ['B', '', 'T', 'B', 'T', 'T', 'B', 'T']

export class WeddingMusic {
  private ctx: AudioContext | null = null
  private master!: GainNode
  private shehnaiBus!: GainNode
  private dholBus!: GainNode
  private voiceGain!: GainNode
  private oscA!: OscillatorNode
  private oscB!: OscillatorNode
  private noise!: AudioBuffer
  private timer: number | null = null
  private noteIndex = 0
  private nextNoteTime = 0
  private dholStep = 0
  private nextDholTime = 0
  private audioEl: HTMLAudioElement | null = null
  shehnaiOn = true
  dholOn = true

  constructor(private trackSrc = '') {}

  get playing() {
    return this.timer !== null || (this.audioEl !== null && !this.audioEl.paused)
  }

  async start() {
    if (this.trackSrc) {
      this.audioEl ??= Object.assign(new Audio(this.trackSrc), { loop: true, volume: 0.6 })
      await this.audioEl.play()
      return
    }
    if (!this.ctx) this.build()
    const ctx = this.ctx!
    await ctx.resume()
    const now = ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setValueAtTime(this.master.gain.value, now)
    this.master.gain.linearRampToValueAtTime(0.55, now + 2)
    this.nextNoteTime = now + 0.6
    this.nextDholTime = now + 0.6
    this.timer = window.setInterval(() => this.schedule(), 80)
  }

  stop() {
    if (this.audioEl) {
      this.audioEl.pause()
      return
    }
    if (!this.ctx) return
    const ctx = this.ctx
    const now = ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setValueAtTime(this.master.gain.value, now)
    this.master.gain.linearRampToValueAtTime(0, now + 0.8)
    if (this.timer !== null) window.clearInterval(this.timer)
    this.timer = null
    window.setTimeout(() => {
      if (this.timer === null) void ctx.suspend()
    }, 900)
  }

  setShehnai(on: boolean) {
    this.shehnaiOn = on
    if (this.ctx) this.shehnaiBus.gain.setTargetAtTime(on ? 1 : 0, this.ctx.currentTime, 0.2)
  }

  setDhol(on: boolean) {
    this.dholOn = on
    if (this.ctx) this.dholBus.gain.setTargetAtTime(on ? 1 : 0, this.ctx.currentTime, 0.2)
  }

  private build() {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    this.ctx = ctx

    this.master = ctx.createGain()
    this.master.gain.value = 0
    const comp = ctx.createDynamicsCompressor()
    this.master.connect(comp).connect(ctx.destination)

    // Simple feedback-delay "hall" for warmth
    const delay = ctx.createDelay()
    delay.delayTime.value = 0.23
    const fb = ctx.createGain()
    fb.gain.value = 0.28
    const wet = ctx.createGain()
    wet.gain.value = 0.22
    delay.connect(fb).connect(delay)
    delay.connect(wet).connect(this.master)

    this.shehnaiBus = ctx.createGain()
    this.shehnaiBus.gain.value = this.shehnaiOn ? 1 : 0
    this.shehnaiBus.connect(this.master)
    this.shehnaiBus.connect(delay)

    this.dholBus = ctx.createGain()
    this.dholBus.gain.value = this.dholOn ? 1 : 0
    this.dholBus.connect(this.master)

    // --- Drone (Sa + Pa) ---
    const droneFilter = ctx.createBiquadFilter()
    droneFilter.type = 'lowpass'
    droneFilter.frequency.value = 700
    const droneGain = ctx.createGain()
    droneGain.gain.value = 0.035
    droneFilter.connect(droneGain).connect(this.shehnaiBus)
    for (const [f, d] of [
      [SA / 2, 0],
      [(SA / 2) * 1.5, 3],
      [SA / 4, -2],
    ] as const) {
      const o = ctx.createOscillator()
      o.type = 'sawtooth'
      o.frequency.value = f
      o.detune.value = d
      o.connect(droneFilter)
      o.start()
    }

    // --- Shehnai voice: reedy double-reed timbre ---
    this.oscA = ctx.createOscillator()
    this.oscA.type = 'sawtooth'
    this.oscB = ctx.createOscillator()
    this.oscB.type = 'square'
    this.oscB.detune.value = 6
    this.oscA.frequency.value = SA
    this.oscB.frequency.value = SA

    const vibrato = ctx.createOscillator()
    vibrato.frequency.value = 5.3
    const vibDepth = ctx.createGain()
    vibDepth.gain.value = 16 // cents
    vibrato.connect(vibDepth)
    vibDepth.connect(this.oscA.detune)
    vibDepth.connect(this.oscB.detune)
    vibrato.start()

    const mixB = ctx.createGain()
    mixB.gain.value = 0.35
    const body = ctx.createBiquadFilter()
    body.type = 'bandpass'
    body.frequency.value = 1300
    body.Q.value = 0.9
    const nasal = ctx.createBiquadFilter()
    nasal.type = 'peaking'
    nasal.frequency.value = 2900
    nasal.gain.value = 7
    nasal.Q.value = 2
    const soft = ctx.createBiquadFilter()
    soft.type = 'lowpass'
    soft.frequency.value = 4200

    this.voiceGain = ctx.createGain()
    this.voiceGain.gain.value = 0
    this.oscA.connect(body)
    this.oscB.connect(mixB).connect(body)
    body.connect(nasal).connect(soft).connect(this.voiceGain).connect(this.shehnaiBus)
    this.oscA.start()
    this.oscB.start()

    // White noise for dhol slaps
    const len = ctx.sampleRate * 0.5
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = this.noise.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  }

  private schedule() {
    const ctx = this.ctx
    if (!ctx) return
    const horizon = ctx.currentTime + 0.35
    while (this.nextNoteTime < horizon) {
      const [semi, beats] = MELODY[this.noteIndex]
      this.playNote(semi, this.nextNoteTime, beats * BEAT)
      this.nextNoteTime += beats * BEAT
      this.noteIndex = (this.noteIndex + 1) % MELODY.length
    }
    while (this.nextDholTime < horizon) {
      const hit = DHOL[this.dholStep]
      if (hit === 'B') this.bass(this.nextDholTime)
      if (hit === 'T') this.treble(this.nextDholTime, this.dholStep === 7)
      this.nextDholTime += BEAT / 2
      this.dholStep = (this.dholStep + 1) % DHOL.length
    }
  }

  private playNote(semi: number | null, t: number, dur: number) {
    const g = this.voiceGain.gain
    if (semi === null) {
      g.setTargetAtTime(0, t, 0.09)
      return
    }
    const f = SA * Math.pow(2, semi / 12)
    // meend: glide into the note
    this.oscA.frequency.setTargetAtTime(f, t, 0.045)
    this.oscB.frequency.setTargetAtTime(f, t, 0.045)
    g.setTargetAtTime(0.11, t, 0.025)
    g.setTargetAtTime(0.135, t + 0.08, 0.2)
    // slight breath at the end of each note
    g.setTargetAtTime(0.07, t + dur - 0.06, 0.02)
  }

  private bass(t: number) {
    const ctx = this.ctx!
    const o = ctx.createOscillator()
    o.type = 'sine'
    o.frequency.setValueAtTime(130, t)
    o.frequency.exponentialRampToValueAtTime(52, t + 0.28)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.008)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42)
    o.connect(g).connect(this.dholBus)
    o.start(t)
    o.stop(t + 0.45)
  }

  private treble(t: number, accent: boolean) {
    const ctx = this.ctx!
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 2600
    bp.Q.value = 1.2
    const g = ctx.createGain()
    const peak = accent ? 0.22 : 0.14
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(peak, t + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09)
    src.connect(bp).connect(g).connect(this.dholBus)
    src.start(t)
    src.stop(t + 0.12)

    const o = ctx.createOscillator()
    o.type = 'triangle'
    o.frequency.setValueAtTime(520, t)
    o.frequency.exponentialRampToValueAtTime(380, t + 0.06)
    const og = ctx.createGain()
    og.gain.setValueAtTime(0.0001, t)
    og.gain.exponentialRampToValueAtTime(peak * 0.6, t + 0.004)
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.08)
    o.connect(og).connect(this.dholBus)
    o.start(t)
    o.stop(t + 0.1)
  }
}
