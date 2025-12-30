export class SoundManager {
    private context: AudioContext | null = null
    private masterGain: GainNode | null = null

    constructor() {
        if (typeof window !== "undefined") {
            this.context = new (window.AudioContext || (window as any).webkitAudioContext)()
            this.masterGain = this.context.createGain()
            this.masterGain.connect(this.context.destination)
            this.masterGain.gain.value = 0.3 // Default volume
        }
    }

    private playTone(frequency: number, type: OscillatorType, duration: number, startTime: number = 0) {
        if (!this.context || !this.masterGain) return

        const osc = this.context.createOscillator()
        const gain = this.context.createGain()

        osc.type = type
        osc.frequency.setValueAtTime(frequency, this.context.currentTime + startTime)

        gain.gain.setValueAtTime(this.masterGain.gain.value, this.context.currentTime + startTime)
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + startTime + duration)

        osc.connect(gain)
        gain.connect(this.masterGain)

        osc.start(this.context.currentTime + startTime)
        osc.stop(this.context.currentTime + startTime + duration)
    }

    playMove() {
        if (!this.context) this.init()
        // Soft "thock" sound
        this.playTone(150, "triangle", 0.1)
        this.playTone(100, "sine", 0.15, 0.05)
    }

    playCapture() {
        if (!this.context) this.init()
        // Sharper "crunch" sound
        this.playTone(200, "sawtooth", 0.05)
        this.playTone(150, "square", 0.1, 0.02)
        this.playTone(100, "sine", 0.15, 0.05)
    }

    playCheck() {
        if (!this.context) this.init()
        // Warning bell
        this.playTone(880, "sine", 0.3)
        this.playTone(440, "sine", 0.4, 0.1)
    }

    playCastle() {
        if (!this.context) this.init()
        // Sliding sound
        this.playTone(120, "sine", 0.1)
        this.playTone(140, "sine", 0.1, 0.1)
    }

    init() {
        if ((!this.context || this.context.state === 'suspended') && typeof window !== "undefined") {
            this.context = new (window.AudioContext || (window as any).webkitAudioContext)()
            this.masterGain = this.context.createGain()
            this.masterGain.connect(this.context.destination)
            this.masterGain.gain.value = 0.3
        }
        if (this.context && this.context.state === 'suspended') {
            this.context.resume();
        }
    }
}

export const soundManager = new SoundManager()
