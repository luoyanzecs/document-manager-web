<template>
  <tool>
    <template #tools>
      <z-head-button fill="筛选" @click="click(0)"/>
      <z-head-button fill="删除" @click="click(1)"/>
      <z-head-button fill="所有" @click="click(2)"/>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/ZHeadMenu";
import {defineEmits} from "vue";
import ZHeadButton from "@/components/common/ZButton";

const emit = defineEmits(['behavior-button'])
const click = (index) => {
  emit('behavior-button', index)
}
</script>

<style scoped>

</style>