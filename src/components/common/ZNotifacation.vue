<template>
  <transition name="notice">
    <div v-if="isVisable"
         ref="notice"
         :class="['notice-base', mountClass]">
      <div :class="['pos-center', 'notice-type', messageType]">
        <svg v-if="iconType === 1" class="icon w-8 h-8 text-white" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M77.248 415.04a64 64 0 0190.496 0l226.304 226.304L846.528 188.8a64 64 0 1190.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 010-90.496z"></path></svg>
        <svg v-else-if="iconType === 2" class="w-8 h-8 text-white" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M195.2 195.2a64 64 0 0190.496 0L512 421.504 738.304 195.2a64 64 0 0190.496 90.496L602.496 512 828.8 738.304a64 64 0 01-90.496 90.496L512 602.496 285.696 828.8a64 64 0 01-90.496-90.496L421.504 512 195.2 285.696a64 64 0 010-90.496z"></path></svg>
        <svg v-else class="w-8 h-8 text-white" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M174.72 855.68l130.048-43.392 23.424 11.392C382.4 849.984 444.352 864 512 864c223.744 0 384-159.872 384-352 0-192.832-159.104-352-384-352S128 319.168 128 512a341.12 341.12 0 0069.248 204.288l21.632 28.8-44.16 110.528zm-45.248 82.56A32 32 0 0189.6 896l56.512-141.248A405.12 405.12 0 0164 512C64 299.904 235.648 96 512 96s448 203.904 448 416-173.44 416-448 416c-79.68 0-150.848-17.152-211.712-46.72l-170.88 56.96z"></path></svg>
      </div>
      <div class="font-light tracking-normal">{{ message }}</div>
      <div class="w-4 bg-red-500 flex-shrink-0"/>
      <div class="absolute right-2 top-2"
           @click.stop="closeHandler">
        <svg class="w-4 h-4 text-gray-400" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z"></path></svg>
      </div>
    </div>
  </transition>
</template>

<script setup>
import {ref, defineProps, computed, onMounted, defineEmits, onBeforeUnmount} from "vue";

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
      return 'bg-green-500'
    case 2 :
      return 'bg-red-500'
    default:
      return 'bg-yellow-500'
  }
})

const notice = ref()

onMounted(() => {
  notice.value.addEventListener('animationend', dropMountClass)
  setTimeout(() => closeHandler(), anmationDelay.value)
})

const dropMountClass =  () => mountClass.value = ''
const closeHandler = () => {
  isVisable.value = false
  setTimeout(() => emit('close', unique.value), 500)
}

onBeforeUnmount(() => notice.value && notice.value.removeEventListener('animationend', dropMountClass))

</script>

<style scoped>
.mount-transition {
  animation: slideoff ease-in-out .5s reverse;
}
.notice-leave-active {
  animation: slideoff ease-in-out .5s;
}

@keyframes slideoff {
  from {
    @apply h-16
  }
  to{
    @apply h-0 py-0 my-0 shadow-none
  }
}
.notice-base {
  @apply overflow-hidden relative w-80 h-16 z-40 rounded-2xl bg-gray-100 flex items-center gap-1 my-2 p-2 shadow hover:shadow-lg
}

.notice-type {
  @apply w-8 h-8 rounded-full p-1.5 flex-shrink-0 mx-2
}

</style>