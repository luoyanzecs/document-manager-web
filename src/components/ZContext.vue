<template>
  <template v-if="fileInfo">
    <p class="mb-1.5 text-gray-400">上次编辑于 {{ fileInfo.lastEditTime }} by {{ fileInfo.editor }}</p>
  </template>
  <div ref="rootCtx"></div>
</template>

<script setup lang="ts">
import {computed, defineProps, onMounted, ref, watch} from "vue";

const props = defineProps({
  ctx: {
    type: String,
    default: (): string => '',
    required: true
  },
  fileInfo: {
    type: Object,
    required: true
  }
})

const rootCtx = ref()
const ctx = computed(() => props.ctx)
onMounted(() => {
  rootCtx.value.innerHTML = props.ctx
})

watch(
    () => ctx,
    (newValue) => {
      rootCtx.value.innerHTML = newValue
      let el = rootCtx.value.getElementsByTagName('table');
      console.log('---------------')
      console.log(el);
    }
)
</script>

<style scoped>

</style>