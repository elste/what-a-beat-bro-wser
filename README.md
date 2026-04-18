# What a Beat Bro-wser

Percorso didattico browser-based su Web Audio API, DSP e TypeScript, organizzato in 10 esercizi progressivi.

## Stato del progetto

Al momento risultano completati:

- ✅ Esercizio 01 — Oscillatore sinusoidale
- ✅ Esercizio 02 — Campionamento e aliasing

In roadmap:

- ⏳ Esercizio 03 — DFT da zero
- ⏳ Esercizio 04 — FFT live windowing
- ⏳ Esercizio 05 — Filtri biquad IIR
- ⏳ Esercizio 06 — Convoluzione riverbero
- ⏳ Esercizio 07 — Phase vocoder pitch
- ⏳ Esercizio 08 — Onset detection BPM
- ⏳ Esercizio 09 — Sintesi FM Chowning
- ⏳ Esercizio 10 — Source separation NMF

## Obiettivo

Il repository raccoglie piccole esperienze pratiche per studiare:

- generazione sonora nel browser
- campionamento, aliasing e analisi spettrale
- filtri, convoluzione e trasformate
- tecniche avanzate di sintesi e analisi audio

## Struttura

- `src/exercises/` contiene tutte le esercitazioni
- `public/` contiene eventuali asset statici
- `index.html` è la pagina principale del progetto
- `exercises3.html` può essere usato come pagina di accesso rapida agli esercizi

## Avvio rapido

### Requisiti

- Node.js 18+ oppure 20+
- npm

### Installazione

```bash
npm install
```

### Sviluppo

```bash
npm run dev
```

Apri poi il browser sull'indirizzo mostrato da Vite.
Per accedere direttamente a un esercizio puoi usare un URL come:

```text
http://localhost:5173/src/exercises/01%20-%20Oscillatore%20sinusoidale/index.html
```

## Elenco esercizi

1. Oscillatore sinusoidale in TypeScript
2. Campionamento e aliasing
3. DFT implementata da zero
4. FFT live con windowing
5. Filtri biquad IIR
6. Convoluzione e riverbero
7. Phase vocoder e pitch shifting
8. Onset detection e stima BPM
9. Sintesi FM Chowning
10. Source separation NMF

## Script utili

```bash
npm run dev
npm run build
npm run preview
```

## Note tecniche

- Il progetto usa TypeScript con configurazione orientata a Vite.
- Le demo sfruttano principalmente `AudioContext`, `OscillatorNode`, `AnalyserNode` e altre API Web Audio.
