<template>
  <component :is="componentItem[type]">
    <slot></slot>
  </component>
</template>

<script setup>
import Collapse from "@/components/head/ZCollapse"
import Expand from "@/components/head/ZExpand"
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