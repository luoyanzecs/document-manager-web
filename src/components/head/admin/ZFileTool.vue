<template>
  <tool>
    <z-header-button fill="部门" @click="click(0)"/>
    <z-header-button fill="删除" @click="click(1)"/>
  </tool>
</template>

<script setup>
import Tool from "@/components/head/ZHeadMenu";

import {defineEmits} from "vue";
import ZHeaderButton from "@/components/ZButton";

const emit = defineEmits(['file-button'])
const click = (index) => {
  emit('file-button', index)
}


</script>

<style scoped>

</style>