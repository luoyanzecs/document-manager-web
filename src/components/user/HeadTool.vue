<template>
  <tool>
    <template #tools>
      <el-button style="padding-left: 6px" type="primary" round>
        <el-icon color="#FFFF" :size="24"><search/></el-icon>
        <span>搜索</span>
      </el-button>
      <el-button type="primary">新建</el-button>
      <el-button type="primary">附件</el-button>
      <el-button type="primary" @click="click">{{ banners.editorBtn }}</el-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/Tool";
import { defineProps, defineEmits } from "vue";
import {Search} from "@element-plus/icons-vue";

defineProps( {
  banners: Object
})

const emit = defineEmits(['editor'])

const click = () => {
  emit('editor')
}
</script>

<style scoped>

</style>