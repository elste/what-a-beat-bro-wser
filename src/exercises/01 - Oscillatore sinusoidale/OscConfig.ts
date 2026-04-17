export interface OscConfig {
  frequency: number;      // Hz
  type: OscillatorType;   // "sine" | "square" | "sawtooth" | "triangle" | "custom"
  gain: number;           // 0–1
}