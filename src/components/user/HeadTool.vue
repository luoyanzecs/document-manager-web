<template>
  <tool>
    <template #tools>
      <header-button>
        <span>搜索</span>
      </header-button>
      <header-button type="primary">新建</header-button>
      <header-button type="primary">附件</header-button>
      <header-button type="primary" @click="click">{{ banner }}</header-button>
    </template>
  </tool>
</template>

<script setup>
import Tool from "@/components/head/ZHeadMenu";
import {defineProps, defineEmits} from "vue";
import HeaderButton from "@/components/ZButton";

defineProps( {
  banner: {
    type: String,
    required: true
  }
})


const emit = defineEmits(['editor'])

const click = () => {
  emit('editor')
}
</script>

<style scoped>

</style>