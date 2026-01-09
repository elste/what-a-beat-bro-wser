<template>
  <q-page padding class="row items-center justify-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">Beep</div>
        <div>Premi il pulsante per suonare un breve beep</div>
      </q-card-section>

      <q-card-actions>
        <q-btn label="Play beep" color="primary" @click="playBeep" :loading="loading" />
      </q-card-actions>

      <q-separator />

      <q-card-section class="q-pt-md">
        <div class="row items-center justify-between q-mb-sm">
          <div class="text-subtitle2">Come funziona</div>
          <div class="row items-center">
            <q-btn dense flat icon="content_copy" @click="copyCode" :loading="copying" aria-label="Copia codice" />
            <div class="q-ml-sm text-caption">{{ copyStatus }}</div>
          </div>
        </div>

        <pre class="q-pa-sm"><code class="language-javascript" v-html="highlightedHtml"></code></pre>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import codeTextRaw from 'src/assets/code/beep-example.js?raw'

let audioCtx: AudioContext | null = null
const loading = ref(false)
const copying = ref(false)
const copyStatus = ref('')
const codeText = ref(codeTextRaw)
const highlightedHtml = ref('')

function ensureContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
}

function playBeep() {
  ensureContext()
  if (!audioCtx || loading.value) return

  loading.value = true
  const now = audioCtx.currentTime
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()

  osc.type = 'sine'
  osc.frequency.value = 440

  gain.gain.value = 0.2

  osc.onended = () => {
    loading.value = false
    // cleanup (disconnect)
    try {
      osc.disconnect()
      gain.disconnect()
    } catch (e) {
      /* ignore */
    }
  }

  osc.connect(gain)
  gain.connect(audioCtx.destination)

  osc.start(now)
  osc.stop(now + 3.0)
}

async function copyCode() {
  if (copying.value) return
  copying.value = true
  copyStatus.value = ''
  try {
    await navigator.clipboard.writeText(codeText.value)
    copyStatus.value = 'Copiato!'
  } catch (e) {
    copyStatus.value = 'Copia fallita'
  } finally {
    copying.value = false
    setTimeout(() => { copyStatus.value = '' }, 2500)
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

onMounted(async () => {
  await nextTick()
  const P = (window as any).Prism
  if (P && typeof P.highlight === 'function') {
    highlightedHtml.value = P.highlight(codeText.value, P.languages.javascript, 'javascript')
  } else if (P && typeof P.highlightElement === 'function') {
    // if only highlightElement available, use it on a temporary element
    const temp = document.createElement('code')
    temp.className = 'language-javascript'
    temp.textContent = codeText.value
    P.highlightElement(temp)
    highlightedHtml.value = temp.innerHTML
  } else {
    highlightedHtml.value = escapeHtml(codeText.value)
  }
})
</script>
