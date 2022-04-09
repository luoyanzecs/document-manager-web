<template>
  <p v-if="fileInfo" class="mb-1.5 text-gray-400">上次编辑于 {{ fileInfo.lastEditTime }} by {{ fileInfo.editor }}</p>
  <div v-html="ctx"></div>
</template>

<script setup>
import {computed, defineProps, watch} from "vue";

const props = defineProps({
  ctx: { type: String, default: '', required: true},
  fileInfo: { type: Object, required: true}
})

const ctx = computed(() => props.ctx)

watch(
    () => ctx,
    (newValue) => {
      console.log(newValue);
    }
)
</script>

<style scoped>

</style>