<template>
  <div v-show="show"
       class="absolute right-0 top-0 w-screen h-screen z-10 bg-gray-700 opacity-40 md:hidden"
       @click.stop="switchTool"/>
  <z-header-button v-show="!show" @click="switchTool">工具</z-header-button>
  <transition name="aside">
    <div v-show="show"
         class="absolute flex flex-col gap-6 pt-4 px-2 w-20 bg-white right-0 top-0 h-screen z-30">
      <z-header-button @click="switchTool">收起</z-header-button>
      <slot name="collapse"></slot>
    </div>
  </transition>
</template>

<script setup>
import {ref} from 'vue'
import ZHeaderButton from "@/components/ZButton";

const show = ref(false)

const switchTool = () => show.value = !show.value

</script>
<style>
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