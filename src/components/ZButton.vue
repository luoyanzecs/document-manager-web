<template>
  <button :class="['btn-class', {'animate-pulse': loadVisible}]">
    {{ fill }}
  </button>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  loadVisible : {
    type: Boolean,
    default: false,
    required: false
  },
  fill: {
    type:String,
    required: false
  }
})
</script>

<style scoped>
.btn-class {
  @apply min-w-4 bg-blue-500 rounded-2xl p-2 text-sm text-white tracking-widest flex-shrink-0
}
</style>