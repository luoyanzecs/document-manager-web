<template>
  <tool>
    <template #tools>
      <header-button>
        <span>搜索</span>
      </header-button>
      <header-button type="primary">新建</header-button>
      <header-button type="primary">附件</header-button>
      <header-button type="primary" @click="click">{{ banners.editorBtn }}</header-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/common/ZHeadMenu";
import { defineProps, defineEmits } from "vue";
import HeaderButton from "@/components/common/head/ZHeaderButton";

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