<template>
  <header-button v-show="!show" @click="switchTool">工具</header-button>
  <div v-show="show"
      class="flex flex-col gap-6 pt-4 px-3 absolute bg-gray-100 absolute right-0 top-0 h-screen z-10">
    <header-button @click="switchTool">收起</header-button>
    <slot name="collapse"></slot>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import HeaderButton from "@/components/common/HeaderButton";

const show = ref(false)

const switchTool = () => {
  show.value = !show.value
}

</script>
<style>
</style>