<template>
  <div class="pos-center flex-shrink-0">
    <p class="pagination-text mr-4">首页</p>
    <template v-for="i of 5" :key="currentPage - i + 3">
      <p v-if="currentPage + i - 3 > 0"
         :class="['pagination-text', {'ring-1': i === 3}]"
         @click="$emit('selectPage', currentPage + i - 3)"
      >{{ currentPage + i - 3}}</p>
    </template>
    <svg :class="[visible ? 'visible': 'invisible', 'animate-spin', 'h-4', 'w-4', 'text-gray-300']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <input type="text"
           maxlength="4"
           ref="input"
           @input="$event.target.value = $event.target.value.replace(/[^\d]/g,'')"
           class="w-12 bg-gray-200 rounded-lg p-1 mx-1 text-gray-600 mr-2">
    <p class="pagination-text" @click="go">跳转</p>
    <div class="border-l border-gray-400 w-2 h-7"/>
    <p class="text-gray-600">共<span class="pagination-text">{{ totalPage }}</span>页</p>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, ref} from "vue";

const emit = defineEmits(['selectPage'])

defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  visible: {
    type: Boolean,
    default: false,
    required: false
  },
  totalPage: {
    type: Number,
    required: true
  }
})
const input = ref();
const go = () => emit('selectPage', input.value.value)

</script>

<style scoped>
.pagination-text {
  @apply text-blue-600 cursor-pointer hover:bg-gray-300 rounded-lg py-1 px-2
}
</style>