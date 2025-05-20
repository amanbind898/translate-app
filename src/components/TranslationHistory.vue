<template>
  <div class="history-card">
    <div class="header">
      <h3>🕒 Translation History</h3>
      <button @click="$emit('clear')" class="btn-clear" v-if="history.length">Clear</button>
    </div>

    <ul v-if="history.length">
      <li v-for="(item, idx) in history" :key="idx" class="history-item">
        <span class="src">{{ item.source }} ({{ item.sourceLang }})</span>
        <span class="arrow">→</span>
        <span class="tgt">{{ item.translated }} ({{ item.targetLang }})</span>
      </li>
    </ul>

    <p v-else class="empty">No translation history yet.</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({ history: Array })
</script>

<style scoped>
.history-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-item {
  background: #f9f9f9;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
  font-size: 0.95rem;
  transition: background 0.2s ease;
}

.history-item:hover {
  background: #eef1f7;
}

.src, .tgt {
  font-weight: 500;
  color: #2c3e50;
}

.arrow {
  margin: 0 0.5rem;
  color: #888;
}

.btn-clear {
  font-size: 0.85rem;
  color: #fff;
  background: #e74c3c;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.9rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-clear:hover {
  background: #c0392b;
}

.empty {
  color: #777;
  font-style: italic;
  text-align: center;
  margin-top: 1rem;
}
</style>
