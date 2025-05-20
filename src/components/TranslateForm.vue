<template>
  <form @submit.prevent="translate" class="form-card">
    <div class="input-group">
      <input
        v-model="text"
        type="text"
        placeholder="Enter English text"
        required
        class="input-field"
      />
      <button type="submit" class="btn-primary">Translate</button>
    </div>

    <div v-if="loading" class="status">🔄 Translating...</div>
    <div v-if="error" class="error-msg">❌ {{ error }}</div>

    <div v-if="translatedText" class="translation-result">
      <strong>Translation:</strong> {{ translatedText }}
      <button type="button" @click="speak" class="btn-speak" title="Speak">
        🔊
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { translateText } from '../api/translateApi'

const props = defineProps({
  sourceLang: String,
  targetLang: String
})
const emit = defineEmits(['translated'])

const text = ref('')
const translatedText = ref('')
const error = ref('')
const loading = ref(false)

async function translate() {
  error.value = ''
  translatedText.value = ''
  if (!text.value.trim()) return
  loading.value = true
  try {
    const result = await translateText(text.value, props.sourceLang, props.targetLang)
    translatedText.value = result
    emit('translated', {
      source: text.value,
      translated: result,
      sourceLang: props.sourceLang,
      targetLang: props.targetLang
    })
  } catch (e) {
    error.value = 'Translation failed. Please try again.'
  } finally {
    loading.value = false
  }
}

function speak() {
  if (!translatedText.value) return
  const utterance = new window.SpeechSynthesisUtterance(translatedText.value)
  utterance.lang = props.targetLang
  window.speechSynthesis.speak(utterance)
}
</script>

<style scoped>
.form-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.input-field {
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.2s ease;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}

.btn-primary {
  padding: 0.6rem 1.2rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: #0056b3;
}

.status {
  margin-top: 1rem;
  font-style: italic;
  color: #444;
}

.error-msg {
  margin-top: 1rem;
  color: #d9534f;
  font-weight: 500;
}

.translation-result {
  margin-top: 1.5rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  background: #f8f9fa;
  padding: 0.8rem 1rem;
  border-radius: 8px;
}

.btn-speak {
  font-size: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
  transition: color 0.2s ease;
}

.btn-speak:hover {
  color: #0056b3;
}
</style>
