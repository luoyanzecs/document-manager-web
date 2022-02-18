<template>
  <component :is="componentItem[type]">
    <template #collapse>
      <slot name="tools"></slot>
    </template>
    <template #expand>
      <slot name="tools"></slot>
    </template>
  </component>
</template>

<script setup>
import Collapse from "@/components/common/Collapse"
import Expand from "@/components/common/Expand"
import { ref, onBeforeMount, onMounted } from "vue";

const type = ref(1)
const componentItem = {
  1: Collapse,
  2: Expand
}
onBeforeMount(() => type.value = window.innerWidth > 768 ? 2 : 1)

onMounted(() => {
  window.addEventListener("resize", () => type.value = window.innerWidth <= 768 ? 1 : 2)
})

</script>

<style scoped>

</style>