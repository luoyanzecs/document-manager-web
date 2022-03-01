<template>
  <tool>
    <template #tools>
      <z-head-button fill="新增" @click="click(0)"/>
      <z-head-button fill="删除" @click="click(1)"/>
      <z-head-button fill="保存" @click="click(2)"/>
      <z-head-button fill="记录" @click="click(3)"/>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/head/ZHeadMenu";

import {defineEmits} from "vue";
import ZHeadButton from "@/components/ZButton";

const emit = defineEmits(['user-button'])
const click = (index) => {
  emit('user-button', index)
}
</script>

<style scoped>

</style>