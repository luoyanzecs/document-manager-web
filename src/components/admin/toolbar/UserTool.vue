<template>
  <tool>
    <template #tools>
      <el-button type="primary" @click="click(0)">新增</el-button>
      <el-button type="primary" @click="click(1)">删除</el-button>
      <el-button type="primary" @click="click(2)">保存</el-button>
      <el-button type="primary" @click="click(3)">记录</el-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/Tool";

import {defineEmits} from "vue";

const emit = defineEmits(['user-button'])
const click = (index) => {
  emit('user-button', index)
}
</script>

<style scoped>

</style>