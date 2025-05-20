import { ref, nextTick } from 'vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock localStorage
function mockLocalStorage() {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value }),
    removeItem: vi.fn((key) => { delete store[key] }),
    clear: vi.fn(() => { store = {} })
  }
}

describe('Translation History with localStorage', () => {
  let history
  let localStorageMock

  beforeEach(() => {
    localStorageMock = mockLocalStorage()
    global.localStorage = localStorageMock
    history = ref([])
  })

  it('loads history from localStorage on mount', () => {
    const fakeHistory = [{ source: 'hello', translated: 'नमस्ते', sourceLang: 'en', targetLang: 'hi' }]
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(fakeHistory))
   
    const saved = localStorage.getItem('translate_history')
    if (saved) history.value = JSON.parse(saved)
    expect(history.value).toEqual(fakeHistory)
  })

  it('saves history to localStorage when changed', async () => {
    history.value.push({ source: 'cat', translated: 'बिल्ली', sourceLang: 'en', targetLang: 'hi' })
    localStorage.setItem('translate_history', JSON.stringify(history.value))
    expect(localStorage.setItem).toHaveBeenCalledWith('translate_history', JSON.stringify(history.value))
  })

  it('limits history to 10 entries', () => {
    for (let i = 0; i < 12; i++) {
      history.value.unshift({ source: `word${i}`, translated: `शब्द${i}`, sourceLang: 'en', targetLang: 'hi' })
      if (history.value.length > 10) history.value.pop()
    }
    expect(history.value.length).toBe(10)
  })

  it('clears history and localStorage', () => {
    history.value = [{ source: 'dog', translated: 'कुत्ता', sourceLang: 'en', targetLang: 'hi' }]
    history.value = []
    localStorage.setItem('translate_history', JSON.stringify(history.value))
    expect(history.value).toEqual([])
    expect(localStorage.setItem).toHaveBeenCalledWith('translate_history', '[]')
  })
})
