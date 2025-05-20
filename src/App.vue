<script setup>
import { ref, watch, onMounted } from 'vue'
import TranslateForm from './components/TranslateForm.vue'
import TranslationHistory from './components/TranslationHistory.vue'
import LanguageSelector from './components/LanguageSelector.vue'

const HISTORY_KEY = 'translate_history'
const history = ref([])

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
]

const sourceLang = ref('en')
const targetLang = ref('hi')

onMounted(() => {
  const saved = localStorage.getItem(HISTORY_KEY)
  if (saved) {
    try {
      history.value = JSON.parse(saved)
    } catch (e) {
      history.value = []
    }
  }
})

watch(history, (newVal) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newVal))
}, { deep: true })

function handleTranslation(entry) {
  history.value.unshift(entry)
  if (history.value.length > 10) history.value.pop()
}

function clearHistory() {
  history.value = []
}
</script>

<template>
  <div class="container">
    <h1 class="title">🌍 Language Translator</h1>

    <LanguageSelector
      :languages="languages"
      v-model:source="sourceLang"
      v-model:target="targetLang"
    />

    <TranslateForm
      :sourceLang="sourceLang"
      :targetLang="targetLang"
      @translated="handleTranslation"
    />

    <TranslationHistory
      :history="history"
      @clear="clearHistory"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 720px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fdfdfd;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease-in-out;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
}
</style>
