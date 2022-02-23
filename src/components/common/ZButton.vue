<template>
  <button class="min-w-4 bg-blue-500 rounded-xl shadow py-2 px-4 text-sm h-9 text-white subpixel-antialiased tracking-widest font-light flex justify-center items-center">
    {{ fill }}
    <slot></slot>
  </button>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  fill: {
    type:String,
    required: false
  }
})
</script>

<style scoped>

</style>