<template>
  <q-page padding class="row items-center justify-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">Page 001 - Sound Test</div>
        <div>Premi il pulsante per suonare un breve beep (Web Audio API)</div>
      </q-card-section>

      <q-card-actions>
        <q-btn label="Play beep" color="primary" @click="playBeep" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
let audioCtx: AudioContext | null = null

function ensureContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
}

function playBeep() {
  ensureContext()
  if (!audioCtx) return

  const o = audioCtx.createOscillator()
  const g = audioCtx.createGain()
  o.type = 'sine'
  o.frequency.value = 440
  g.gain.value = 0.001
  o.connect(g)
  g.connect(audioCtx.destination)
  o.start()
  g.gain.exponentialRampToValueAtTime(0.5, audioCtx.currentTime + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3)
  o.stop(audioCtx.currentTime + 0.31)
}
</script>
