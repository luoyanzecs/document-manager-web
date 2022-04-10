<template>
  <template v-if="type === 2">
    <slot></slot>
  </template>
  <template v-else>
    <div v-show="show" class="absolute right-0 top-0 w-screen h-screen z-10 bg-gray-700 opacity-40 md:hidden" @click.stop="switchTool"/>
    <z-button v-show="!show" @click="switchTool" fill="工具"/>
    <transition name="aside">
      <div v-show="show" class="absolute flex flex-col gap-6 pt-4 px-2 w-20 bg-white right-0 top-0 h-screen z-30">
        <z-button @click="switchTool" fill="收起"/>
        <slot></slot>
      </div>
    </transition>
  </template>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import ZButton from "@/components/ZButton";

const show = ref(false)
const type = ref(1)
const switchTool = () => show.value = !show.value

onBeforeMount(() => type.value = window.innerWidth > 768 ? 2 : 1)

onMounted(() => {
  window.addEventListener("resize", () => type.value = window.innerWidth <= 768 ? 1 : 2)
})

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
    @apply w-20 opacity-5
  }
  to {
    @apply w-20
  }
}

</style>