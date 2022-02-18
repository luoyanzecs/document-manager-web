<template>
  <tool>
    <template #tools>
      <my-button @click="click(0)">新增</my-button>
      <my-button @click="click(1)">删除</my-button>
      <my-button @click="click(2)">保存</my-button>
      <my-button @click="click(3)">记录</my-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/Tool";

import {defineEmits} from "vue";
import MyButton from "@/components/common/HeaderButton";

const emit = defineEmits(['user-button'])
const click = (index) => {
  emit('user-button', index)
}
</script>

<style scoped>

</style>