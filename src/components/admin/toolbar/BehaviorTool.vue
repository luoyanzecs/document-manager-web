<template>
  <tool>
    <template #tools>
      <el-button type="primary" @click="click(0)">筛选</el-button>
      <el-button type="primary" @click="click(1)">删除</el-button>
      <el-button type="primary" @click="click(2)">所有</el-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/Tool";
import {defineEmits} from "vue";

const emit = defineEmits(['behavior-button'])
const click = (index) => {
  emit('behavior-button', index)
}
</script>

<style scoped>

</style>