<template>
  <div class="flex items-center gap-4">
    <div :class="['whitespace-nowrap', {'text-blue-500' : !value}]">{{ left }}</div>
    <div @click="$emit('update:value', !value)" class="box-base">
      <div :class="['dot-base', value ? 'ml-7' : 'ml-0']"/>
    </div>
    <div :class="['whitespace-nowrap', {'text-blue-500' : value}]">{{ right }}</div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";

defineEmits(['update:value'])
defineProps({
  left: {
    type: [String, Object],
    default: '',
    required: false
  },
  right: {
    type: [String, Object],
    default: '',
    required: false
  },
  value: {
    type: Boolean,
    default: false,
    required:true
  }
})

</script>

<style scoped>
.box-base {
  @apply w-14 h-7 bg-blue-500 flex items-center rounded-full flex-shrink-0
}
.dot-base {
  @apply w-7 h-7 rounded-full bg-white transform scale-90 duration-200
}
</style>