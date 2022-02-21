<template>
  <div class="w-12 h-12 rounded-full p-1 bg-gray-300 pos-center">
    <component :is="iconComponent" class="w-8 h-8 text-white"/>
  </div>
</template>

<script setup >
import { defineProps, computed, } from "vue";

const props = defineProps({
  icon: {}
});

const iconComponent = computed(() => props.icon)

</script>

<style scoped>

</style>