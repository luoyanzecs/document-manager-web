<template>
  <tool>
    <template #tools>
      <z-header-button type="primary" @click="click(0)">新增</z-header-button>
      <z-header-button type="primary" @click="click(1)">所有</z-header-button>
      <z-header-button type="primary" @click="click(2)">筛选</z-header-button>
      <z-header-button type="primary" @click="click(3)">删除</z-header-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/ZHeadMenu";
import {defineEmits} from "vue";
import ZHeaderButton from "@/components/common/head/ZHeaderButton";

const emit = defineEmits(['notice-button'])
const click = (index) => {
  emit('notice-button', index)
}

</script>

<style scoped>

</style>