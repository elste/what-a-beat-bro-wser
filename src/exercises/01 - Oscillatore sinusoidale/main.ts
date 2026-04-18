import type { OscConfig } from "./OscConfig";
import { SineOscillator } from "./SineOscillator";
import { error, log, setLogEnabled } from "../../logger";

setLogEnabled(true);

let audioCtx: AudioContext | null = null;
let sineOsc: SineOscillator | null = null;
const sineConf: OscConfig = {
  type: "sine",
  frequency: 440,
  gain: 0.5,
};


function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

async function ensureAudioContextRunning(ctx: AudioContext): Promise<void> {
  if (ctx.state === "suspended") {
    log("AudioContext is suspended, resuming...");
    await ctx.resume();
  }
}

export async function init(): Promise<void> {
  log("Initializing SineOscillator exercise");
  const ctx = getAudioContext();
  await ensureAudioContextRunning(ctx);
log("AudioContext is running", ctx.state);


  sineOsc = new SineOscillator(ctx, sineConf);
  log("SineOscillator created", sineConf);
}

export async function play(): Promise<void> {
  if (!sineOsc) {
    await init();
  }
  log("play");
  sineOsc!.start();
}

export function stop(): void {
  if (!sineOsc) {
    error("SineOscillator not initialized");
    return;
  }
  log("stop");
  sineOsc.stop();
}

export function setFrequency(freq: number): void {
  if (!sineOsc) {
    error("SineOscillator not initialized");
    return;
  }
  log("setFrequency", freq);
  sineOsc.setFrequency(freq);
}

export function setGain(gain: number): void {
  if (!sineOsc) {
    error("SineOscillator not initialized");
    return;
  }
  log("setGain", gain);
  sineOsc.setGain(gain);
}

export function execute(): Promise<void> {
  return init();
}

