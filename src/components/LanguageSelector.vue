<template>
  <div class="lang-select">
    <div class="select-group">
      <label class="label">
        From:
        <select v-model="localSource" class="dropdown">
          <option v-for="lang in languages" :key="lang.code" :value="lang.code">
            {{ lang.name }}
          </option>
        </select>
      </label>

      <label class="label">
        To:
        <select v-model="localTarget" class="dropdown">
          <option v-for="lang in languages" :key="lang.code" :value="lang.code">
            {{ lang.name }}
          </option>
        </select>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  source: String,
  target: String,
  languages: Array
})

const emit = defineEmits(['update:source', 'update:target'])

const localSource = computed({
  get: () => props.source,
  set: (val) => emit('update:source', val)
})
const localTarget = computed({
  get: () => props.target,
  set: (val) => emit('update:target', val)
})
</script>

<style scoped>
.lang-select {
  background: #fff;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  max-width: 600px;
  margin: 1.5rem auto;
  transition: all 0.3s ease;
}

.select-group {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.label {
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  display: flex;
  flex-direction: column;
}

.dropdown {
  margin-top: 0.4rem;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  outline: none;
  transition: border 0.2s ease;
  min-width: 150px;
}

.dropdown:focus {
  border-color: #007bff;
}
</style>
