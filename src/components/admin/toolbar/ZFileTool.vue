<template>
  <tool>
    <template #tools>
      <z-header-button  @click="click(0)">部门</z-header-button>
      <z-header-button  @click="click(1)">删除</z-header-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/ZHeadMenu";

import {defineEmits} from "vue";
import ZHeaderButton from "@/components/common/head/ZHeaderButton";

const emit = defineEmits(['file-button'])
const click = (index) => {
  emit('file-button', index)
}


</script>

<style scoped>

</style>