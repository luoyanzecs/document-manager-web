<template>
  <tool>
    <template #tools>
      <z-header-button fill="新增" @click="click(0)"/>
      <z-header-button fill="所有" @click="click(1)"/>
      <z-header-button fill="筛选" @click="click(2)"/>
      <z-header-button fill="删除" @click="click(3)"/>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/ZHeadMenu";
import {defineEmits} from "vue";
import ZHeaderButton from "@/components/common/ZButton";

const emit = defineEmits(['notice-button'])
const click = (index) => {
  emit('notice-button', index)
}

</script>

<style scoped>

</style>