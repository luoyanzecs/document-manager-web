<template>
  <transition name="notice">
    <div v-if="isVisable"
         :class="['notice-base', mountClass]">
      <div :class="['pos-center', 'notice-type', messageType]">
        <Select v-if="iconType === 1" class="w-8 h-8 text-white"/>
        <close-bold v-else-if="iconType === 2" class="w-8 h-8 text-white"/>
        <chat-round v-else class="w-8 h-8 text-white"/>
      </div>
      <div class="font-light tracking-normal">{{ message }}</div>
      <div class="w-4 bg-red-500 flex-shrink-0"/>
      <div class="absolute right-2 top-2"
           @click.stop="closeHandler">
        <Close class="w-4 h-4 text-gray-400"/>
      </div>
    </div>
  </transition>
</template>

<script setup>
import {ref, defineProps, computed, onMounted, defineEmits} from "vue";
import {ChatRound, Close, CloseBold, Select} from "@element-plus/icons-vue";

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    default: 0,
    required: false
  },
  delay: {
    type: Number,
    default: 0,
    required: false
  }
})
const emit = defineEmits(['close'])
const isVisable = ref(true)
const mountClass = ref('mount-transition')

const iconType = computed(() => props.type)
const anmationDelay = computed(() => props.delay)
const unique = computed(() => props.id)
const messageType = computed(() => {
  switch (props.type) {
      // 1: 成功 2: 失败
    case 1:
      return 'notice-success'
    case 2 :
      return 'notice-error'
    default:
      return 'notice-info'
  }
})

onMounted(() => {
  setTimeout(() => mountClass.value = '', 700)
  setTimeout(() => isVisable.value = false, anmationDelay.value)
})

const closeHandler = () => {
  isVisable.value = false
  setTimeout(() => emit('close', unique))
}

</script>

<style scoped>
.mount-transition {
  animation: slideoff ease-in-out .7s reverse;
}
.notice-leave-active {
  animation: slideoff ease-in-out .7s;
}

@keyframes slideoff {
  from {
    @apply h-20
  }
  to{
    @apply h-0 py-0 my-0 shadow-none
  }
}

.notice-success {
  @apply bg-green-500
}

.notice-error {
  @apply bg-red-500
}

.notice-info {
  @apply bg-yellow-500
}

.notice-base {
  @apply overflow-hidden relative w-80 h-20 z-40 rounded-lg bg-gray-50 flex items-center gap-1 my-2 p-2 shadow hover:shadow-lg
}

.notice-type {
  @apply w-8 h-8 rounded-full p-1.5 flex-shrink-0 mx-2
}

</style>