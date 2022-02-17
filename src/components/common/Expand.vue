<template>
  <el-space :size="size" :spacer="spacer">
    <slot name="expand"></slot>
  </el-space>
</template>

<script setup>
import { ElDivider } from "element-plus";
import {h, ref} from "vue";

const spacer = h(ElDivider, { direction: 'vertical' })
const size = ref(4)
</script>

<style scoped>

</style>