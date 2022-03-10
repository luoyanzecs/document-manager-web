<template>
  <div v-if="isAsideShow"
       class="absolute w-screen h-screen z-10 bg-gray-700 opacity-40 md:hidden"
       @click.stop="toggleAside"/>
  <div class="border-r border-gray-200 border-opacity-70 bg-white absolute z-30 md:relative"
       @click.stop>
    <div class="z-30 absolute h-16 flex items-center px-4">
      <z-button fill="边栏" @click="toggleAside"/>
    </div>
    <transition name="aside">
      <div class="w-52 h-screen flex flex-col pr-2"
           v-show="isAsideShow">
        <div class="mx-2 mb-4 h-16 flex justify-end items-center sticky top-0 flex-shrink-0">
          <slot name="right"></slot>
        </div>
        <slot name="context"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
import ZButton from "@/components/ZButton";

const isAsideShow = ref(false)

onBeforeMount(() => {
    isAsideShow.value = window.innerWidth > 768
})

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

const toggleAside = () => {
  isAsideShow.value = !isAsideShow.value
}

</script>
<style scoped>
.aside-leave-active {
  animation: asideoff ease-in-out .5s reverse;
}

.aside-enter-active {
  animation: asideoff ease-in-out .5s;
}

@keyframes asideoff {
  from {
    @apply w-0 opacity-0
  }
  60% {
    @apply w-52 opacity-5
  }
  to {
    @apply w-52
  }
}
</style>