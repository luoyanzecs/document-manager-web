<template>
  <tool>
    <template #tools>
      <el-button type="primary" @click="click(1)">筛选</el-button>
      <el-button type="primary" @click="click(2)">删除</el-button>
      <el-button type="primary" @click="click(3)">所有</el-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/Tool";
import {defineEmits} from "vue";

const emit = defineEmits(['click:button'])
const click = (index) => {
  emit('click:button', index)
}
</script>

<style scoped>

</style>