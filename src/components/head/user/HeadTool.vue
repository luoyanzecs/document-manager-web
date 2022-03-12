<template>
  <tool>
    <z-button fill="搜索"/>
    <z-button fill="新建"/>
    <z-button fill="附件"/>
    <z-button :fill="editorStatus" @click="click"/>
  </tool>
</template>

<script setup>
import Tool from "@/components/head/ZHeadMenu";
import {defineEmits, ref} from "vue";
import ZButton from "@/components/ZButton";

const emit = defineEmits(['editor'])
const editorStatus = ref('编辑')

const click = () => {
  editorStatus.value = editorStatus.value === '编辑' ? '更新' : '编辑'
  emit('editor')
}
</script>

<style scoped>

</style>