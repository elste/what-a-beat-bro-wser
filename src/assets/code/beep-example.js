// 1. Creiamo o assicuriamoci di avere un AudioContext
const audioCtx = new AudioContext()

// 2. Creiamo i nodi: oscillatore (sorgente) e gain (controllo volume)
const osc = audioCtx.createOscillator()
const gain = audioCtx.createGain()

// 3. Configuriamo il suono
osc.type = 'sine'               // tipo d'onda: sine, square, sawtooth, triangle
osc.frequency.value = 440      // frequenza in Hz (440 = nota A4)
gain.gain.value = 0.2          // volume (0.0 - 1.0)

// 4. Connettiamo i nodi e inviamo al dispositivo di output
osc.connect(gain)
gain.connect(audioCtx.destination)

// 5. Avviamo e fermiamo dopo una durata
osc.start()
osc.stop(audioCtx.currentTime + 3) // suona per 3 secondi

// Nota: pulire le connessioni (osc.disconnect(), gain.disconnect()) dopo l'uso
