<template>
  <tool>
    <template #tools>
      <my-button  @click="click(0)">部门</my-button>
      <my-button  @click="click(1)">删除</my-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/Tool";

import {defineEmits} from "vue";
import MyButton from "@/components/common/HeaderButton";

const emit = defineEmits(['file-button'])
const click = (index) => {
  emit('file-button', index)
}


</script>

<style scoped>

</style>