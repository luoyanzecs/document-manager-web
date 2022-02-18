<template>
  <tool>
    <template #tools>
      <my-button @click="click(0)">筛选</my-button>
      <my-button @click="click(1)">删除</my-button>
      <my-button @click="click(2)">所有</my-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/Tool";
import {defineEmits} from "vue";
import MyButton from "@/components/common/HeaderButton";

const emit = defineEmits(['behavior-button'])
const click = (index) => {
  emit('behavior-button', index)
}
</script>

<style scoped>

</style>