<template>
  <div class="border-r border-gray-200 border-opacity-70 absolute z-10 bg-gray-50 md:relative">
    <div class="z-20 absolute h-16 flex items-center px-4">
      <z-header-button @click="clickHandler">
        <span>边栏</span>
      </z-header-button>
    </div>
    <transition name="aside">
      <div class="w-52 h-screen flex flex-col overflow-scroll"
           v-show="isAsideShow">
        <div class="mx-4">
          <div class="h-16 flex justify-end items-center px-4 sticky top-0">
            <slot name="right"></slot>
          </div>
          <div class="pt-4">
            <slot name="context"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import ZHeaderButton from "@/components/common/ZButton";
const isAsideShow = ref(true)

onMounted(() => {
  let lastWidth = window.innerWidth
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768 && lastWidth >= 768) {
      isAsideShow.value = false
    }
    if (window.innerWidth >= 768 && lastWidth < 768) {
      isAsideShow.value = true
    }
    lastWidth = window.innerWidth
  })
})

const clickHandler = () => {
  isAsideShow.value = !isAsideShow.value
}

</script>
<style scoped>
.aside-leave-active {
  animation: asideoff ease-in-out .7s reverse;
}

.aside-enter-active {
  animation: asideoff ease-in-out .7s ;
}

@keyframes asideoff {
  from {
    @apply w-0 opacity-0
  }
  50% {
    @apply w-52 opacity-5
  }
  to {
    @apply w-52
  }
}
</style>