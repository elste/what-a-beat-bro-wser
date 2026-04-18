// Configurazione
const duration = 0.02; // 1 secondo
// un pc non può generare un segnale analogico "continuo",
// quindi usiamo una frequenza di campionamento molto alta per simulare il segnale
const continuousFreq = 44100;
const signalFreq = 440; // Frequenza del tono (configurabile)
let samplingFreq1 = 10000; // Frequenza di campionamento sufficiente (superiore a 2*signalFreq)
let samplingFreq2 = 500; // Frequenza di campionamento ridotta (per confronto)

function setupEventHandlers(): void {
  const runButton = document.getElementById("run");
  runButton?.addEventListener("click", () => {
    execute();
  });

  const samplingFreq1Slider = document.getElementById("samplingFreq1") as HTMLInputElement;
  const samplingFreq2Slider = document.getElementById("samplingFreq2") as HTMLInputElement;
  const samplingFreq1Value = document.getElementById("samplingFreq1Value");
  const samplingFreq2Value = document.getElementById("samplingFreq2Value");

  const updateSamplingFreq1 = () => {
    samplingFreq1 = parseFloat(samplingFreq1Slider.value);
    if (samplingFreq1Value) {
      samplingFreq1Value.textContent = samplingFreq1Slider.value;
    }
  };

  const updateSamplingFreq2 = () => {
    samplingFreq2 = parseFloat(samplingFreq2Slider.value);
    if (samplingFreq2Value) {
      samplingFreq2Value.textContent = samplingFreq2Slider.value;
    }
  };

  samplingFreq1Slider?.addEventListener("input", updateSamplingFreq1);
  samplingFreq2Slider?.addEventListener("input", updateSamplingFreq2);

  updateSamplingFreq1();
  updateSamplingFreq2();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupEventHandlers, { once: true });
} else {
  setupEventHandlers();
}

export function execute() {
  
  // 1. Genera Segnale "Continuo"
  const continuousSignal = new Float32Array(continuousFreq * duration);
  for (let n = 0; n < continuousSignal.length; n++) {
    continuousSignal[n] = Math.sin(2 * Math.PI * signalFreq * (n / continuousFreq));
  }

  // 2. Campionamento (Downsampling)
  // Per simulare il campionamento, prendiamo punti a intervalli regolari
  const sampledSignal1 = new Float32Array(samplingFreq1 * duration);
  const step = continuousFreq / samplingFreq1;

  for (let i = 0; i < sampledSignal1.length; i++) {
    const index = Math.floor(i * step);
    sampledSignal1[i] = continuousSignal[index];
  }

  const sampledSignal2 = new Float32Array(samplingFreq2 * duration);
  const step2 = continuousFreq / samplingFreq2;
  for (let i = 0; i < sampledSignal2.length; i++) {
    const index = Math.floor(i * step2); // offset per mostrare aliasing
    sampledSignal2[i] = continuousSignal[index];
  }

  // 3. Visualizzazione
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    draw(ctx, continuousSignal, continuousFreq, sampledSignal1, samplingFreq1, duration);
  }

  const canvas2 = document.getElementById("canvas2") as HTMLCanvasElement;
  const ctx2 = canvas2.getContext("2d");
  if (ctx2) {
    draw(ctx2, continuousSignal, continuousFreq, sampledSignal2, samplingFreq2, duration);
  }
}




function draw(
  ctx: CanvasRenderingContext2D,
  continuous: Float32Array,
  continuousRate: number,
  sampled: Float32Array,
  sampledRate: number,
  duration: number
): void {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const mid = h / 2;
  const amp = h / 2 - 8;

  ctx.clearRect(0, 0, w, h);

  // curva continua
  ctx.beginPath();
  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = 1;
  for (let i = 0; i < continuous.length; i++) {
    const t = i / continuousRate;
    const x = (t / duration) * w;
    const y = mid - continuous[i] * amp;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();

  // campioni discreti
  ctx.fillStyle = "#c00";
  for (let i = 0; i < sampled.length; i++) {
    const t = i / sampledRate;
    const x = (t / duration) * w;
    const y = mid - sampled[i] * amp;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

