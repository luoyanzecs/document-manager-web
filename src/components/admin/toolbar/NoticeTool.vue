<template>
  <tool>
    <template #tools>
      <el-button type="primary" @click="click(0)">新增</el-button>
      <el-button type="primary" @click="click(1)">所有</el-button>
      <el-button type="primary" @click="click(2)">筛选</el-button>
      <el-button type="primary" @click="click(3)">删除</el-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/Tool";
import {defineEmits} from "vue";

const emit = defineEmits(['notice-button'])
const click = (index) => {
  emit('notice-button', index)
}

</script>

<style scoped>

</style>