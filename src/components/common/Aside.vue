<template>
  <div class="border-r border-gray-200 border-opacity-70">
    <div class="z-10 absolute h-16 flex items-center px-4">
      <my-button @click="clickHandler">
        <span>边栏</span>
      </my-button>
    </div>
    <div class="w-52 h-screen"
         v-show="isAsideShow">
      <div class="mx-4">
        <div class="h-16 flex justify-end items-center px-4">
          <slot name="right"></slot>
        </div>
        <div class="pt-4">
          <slot name="context"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import MyButton from "@/components/common/HeaderButton";
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
</style>