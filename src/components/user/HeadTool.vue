<template>
  <tool>
    <template #tools>
      <header-button>
        <span>搜索</span>
      </header-button>
      <header-button type="primary">新建</header-button>
      <header-button type="primary">附件</header-button>
      <header-button type="primary" @click="click">{{ editorStatus }}</header-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/head/ZHeadMenu";
import {defineEmits, ref} from "vue";
import HeaderButton from "@/components/ZButton";

const emit = defineEmits(['editor'])
const editorStatus = ref('编辑')

const click = () => {
  editorStatus.value = editorStatus.value === '编辑' ? '更新' : '编辑'
  emit('editor')
}
</script>

<style scoped>

</style>