<template>
  <div class="w-12 h-12 rounded-full bg-gray-300 pos-center">
    <img v-if="image.trim() !== ''"
         :src="image"
         alt=""
         class="rounded-full w-12 h-12"
    />
    <svg v-else class="text-gray-100 m-2" viewBox="0 0 1024 1024"><path fill="currentColor" d="M288 320a224 224 0 10448 0 224 224 0 10-448 0zm544 608H160a32 32 0 01-32-32v-96a160 160 0 01160-160h448a160 160 0 01160 160v96a32 32 0 01-32 32z"></path></svg>
  </div>
</template>

<script setup >
import { defineProps, } from "vue";

defineProps({
  image: {
    type: String,
    default: '',
    required:false
  }
});

</script>

<style scoped>

</style>