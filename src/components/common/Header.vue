<template>
  <el-row justify="end">
    <el-space :size="size" :spacer="spacer">
      <slot name="tools"></slot>
      <slot name="avatar"></slot>
    </el-space>
  </el-row>
</template>

<script setup>
import {h, ref} from "vue";
import {ElDivider} from "element-plus";

const spacer = h(ElDivider, { direction: 'vertical' })
const size = ref(2)
</script>

<style scoped>
</style>