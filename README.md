# What a Beat Bro-wser

Browser-based TypeScript + Web Audio DSP curriculum with 10 progressive exercises.

## Descrizione

Questo progetto è una raccolta di esercizi didattici per Web Audio API, Digital Signal Processing e TypeScript avanzato.
Ogni esercizio è progettato per esplorare un concetto diverso, dal semplice oscillatore sinusoidale fino a separazione delle sorgenti con NMF.

## Struttura

- `src/`
  - `exercises/`
    - `01 - Oscillatore sinusoidale/`
    - `02 - Campionamento aliasing/`
    - `03 - DFT da zero/`
    - `04 - FFT live windowing/`
    - `05 - Filtri biquad IIR/`
    - `06 - Convoluzione riverbero/`
    - `07 - Phase vocoder pitch/`
    - `08 - Onset detection BPM/`
    - `09 - Sintesi FM Chowning/`
    - `10 - Source separation NMF/`
- `public/` — asset pubblici
- `index.html` — pagina principale
- `package.json` — script di sviluppo e dipendenze
- `tsconfig.json` — configurazione TypeScript

## Esercizi principali

1. Oscillatore sinusoidale in TypeScript
2. Campionamento e aliasing
3. DFT implementata da zero
4. FFT live con AnalyserNode e windowing
5. Filtri IIR biquad in AudioWorklet
6. Convoluzione e riverbero con impulse response
7. Phase vocoder e pitch shifting
8. Onset detection e stima del BPM
9. Sintesi FM Chowning
10. Source separation NMF

## Requisiti

- Node.js 18+ / 20+
- npm

## Installazione

```bash
npm install
```

## Avvio in sviluppo

```bash
npm run dev
```

Quindi apri il browser all'indirizzo indicato da Vite e naviga a uno degli esercizi in `src/exercises/`.

Esempio:

```text
http://localhost:5173/src/exercises/01%20-%20Oscillatore%20sinusoidale/index.html
```

## Build

```bash
npm run build
```

## Anteprima

```bash
npm run preview
```

## Note

- Il progetto usa TypeScript con `moduleResolution: bundler` e `allowImportingTsExtensions: true`.
- Le esercitazioni sfruttano AudioContext, AudioWorklet, AnalyserNode e altre API Web Audio.
