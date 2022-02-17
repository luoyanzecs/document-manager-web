<template>
  <tool>
    <template #tools>
      <el-button type="primary" @click="click(0)">部门</el-button>
      <el-button type="primary" @click="click(1)">删除</el-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/Tool";

import {defineEmits} from "vue";

const emit = defineEmits(['file-button'])
const click = (index) => {
  emit('file-button', index)
}


</script>

<style scoped>

</style>