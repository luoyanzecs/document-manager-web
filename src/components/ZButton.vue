<template>
  <button :class="[{'animate-shake': denyAnimation}, 'btn-class']">
    <span :class="[{'invisible': loadVisible}]">{{ fill }}</span>
    <span class="absolute pos-center top-0 left-0 w-full h-full">
      <svg v-if="loadVisible" class="text-white w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
  </button>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  loadVisible: {
    type: Boolean,
    default: false,
    required: false
  },
  fill: {
    type: String,
    required: false
  },
  denyAnimation: {
    type: Boolean,
    default: false,
    required: false
  }
})
</script>

<style scoped>
.btn-class {
  @apply min-w-4 bg-blue-500 rounded-2xl p-2 text-sm text-white tracking-widest flex-shrink-0 select-none relative
}
</style>