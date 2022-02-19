<template>
  <tool>
    <template #tools>
      <z-head-button @click="click(0)">新增</z-head-button>
      <z-head-button @click="click(1)">删除</z-head-button>
      <z-head-button @click="click(2)">保存</z-head-button>
      <z-head-button @click="click(3)">记录</z-head-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/ZHeadMenu";

import {defineEmits} from "vue";
import ZHeadButton from "@/components/common/ZButton";

const emit = defineEmits(['user-button'])
const click = (index) => {
  emit('user-button', index)
}
</script>

<style scoped>

</style>