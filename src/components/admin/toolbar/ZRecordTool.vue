<template>
  <tool>
    <template #tools>
      <z-head-button @click="click(0)">筛选</z-head-button>
      <z-head-button @click="click(1)">删除</z-head-button>
      <z-head-button @click="click(2)">所有</z-head-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/ZHeadMenu";
import {defineEmits} from "vue";
import ZHeadButton from "@/components/common/ZButton";

const emit = defineEmits(['behavior-button'])
const click = (index) => {
  emit('behavior-button', index)
}
</script>

<style scoped>

</style>