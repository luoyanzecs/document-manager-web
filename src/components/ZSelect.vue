<template>
  <div>
    <div v-if="isSelectShow" class="absolute top-0 left-0 w-screen h-screen" @click="isSelectShow=false"></div>
    <div class="flex items-center relative cursor-pointer select-none min-h-6"
        @click.stop="isSelectShow = !isSelectShow">
      <p class="flex-1 truncate">{{ show }}</p>
      <svg class="w-4 h-4" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8="">
        <path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"></path>
      </svg>
      <div v-show="isSelectShow"
           class="absolute bg-white z-20 left-0 top-full bg-gray-300 mt-1 cursor-pointer space-y-1 p-2 bg-opacity-90 rounded-lg overflow-auto max-h-48 text-gray-700">
        <div v-for="option in options" :key="option.value" class="hover:bg-white hover:bg-opacity-75 rounded-lg px-2"
             @click="clickHandler(option.value)">
          <span class="whitespace-nowrap">{{ option.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps, defineEmits, computed} from "vue";
const isSelectShow = ref(false)
const emit = defineEmits(['update:value'])
const show = computed(() => {
  const find = Props.options.find(it => it.value === Props.value);
  return find ? find.name : ''
})

const Props = defineProps({
  options: {
    required: false,
  },
  value: {
    required: true,
  }
})

function clickHandler(value) {
  emit('update:value', value)
}
</script>

<style scoped>

</style>