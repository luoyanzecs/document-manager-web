<template>
  <tool>
    <template #tools>
      <my-button type="primary" @click="click(0)">新增</my-button>
      <my-button type="primary" @click="click(1)">所有</my-button>
      <my-button type="primary" @click="click(2)">筛选</my-button>
      <my-button type="primary" @click="click(3)">删除</my-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/Tool";
import {defineEmits} from "vue";
import MyButton from "@/components/common/HeaderButton";

const emit = defineEmits(['notice-button'])
const click = (index) => {
  emit('notice-button', index)
}

</script>

<style scoped>

</style>