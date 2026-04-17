let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

async function ensureAudioContextRunning(ctx: AudioContext): Promise<void> {
  if (ctx.state === "suspended") {
    await ctx.resume();
  }
}

export async function execute(): Promise<void> {
  const ctx = getAudioContext();
  await ensureAudioContextRunning(ctx);

  const osc: OscillatorNode = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 440;

  const gain: GainNode = ctx.createGain();
  gain.gain.value = 0.5;

  osc.connect(gain);
  gain.connect(ctx.destination);  

  osc.start();
  osc.stop(ctx.currentTime + 1); // suona per 1 secondo
}

