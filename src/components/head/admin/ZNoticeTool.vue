<template>
  <tool>
    <z-button fill="新增" @click="click(0)"/>
    <z-button fill="所有" @click="click(1)"/>
    <z-button fill="筛选" @click="click(2)"/>
    <z-button fill="删除" @click="click(3)"/>
  </tool>
</template>

<script setup>
import Tool from "@/components/head/ZHeadMenu";
import {defineEmits} from "vue";
import ZButton from "@/components/ZButton";

const emit = defineEmits(['notice-button'])
const click = (index) => {
  emit('notice-button', index)
}

</script>

<style scoped>

</style>