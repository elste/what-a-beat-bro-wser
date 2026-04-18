import type { OscConfig } from "./OscConfig";
import { log } from "../../logger";

export class SineOscillator {
    private context: AudioContext;
    private config: OscConfig;
    private osc: OscillatorNode | null = null;
    private gain: GainNode;
    private started = false;

    constructor(context: AudioContext, config: OscConfig) {
        log("Creating SineOscillator", config);

        this.context = context;
        this.config = { ...config };
        this.gain = context.createGain();
        this.gain.gain.value = config.gain;
        this.gain.connect(context.destination);
    }

    private createOscillator(): void {
        this.osc = this.context.createOscillator();
        this.osc.type = this.config.type;
        this.osc.frequency.value = this.config.frequency;
        this.osc.connect(this.gain);
    }

    // start(), stop(), setFrequency(), setGain()

    public start() {
        if (this.started) {
            log("SineOscillator.start called while already started");
            return;
        }

        if (!this.osc) {
            this.createOscillator();
        }

        log("SineOscillator.start");
        this.osc?.start();
        this.started = true;
    }

    public stop() {
        if (!this.started || !this.osc) {
            log("SineOscillator.stop called while not started");
            return;
        }

        log("SineOscillator.stop");
        this.osc.stop();
        this.osc.disconnect();
        this.osc = null;
        this.started = false;
    }

    public setFrequency(freq: number) {
        log("SineOscillator.setFrequency", freq);
        this.config.frequency = freq;
        if (this.osc) {
            this.osc.frequency.value = freq;
        }
    }

    public setGain(gain: number) {
        log("SineOscillator.setGain", gain);
        this.config.gain = gain;
        this.gain.gain.value = gain;
    }
}