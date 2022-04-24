<template>
  <div :class="[{'ml-2': !isTop}, 'flex', 'flex-col', 'gap-1']">
    <div class="flex">
      <div v-if="!isTop" class="w-4 h-4 border-l-2 border-b-2 rounded-bl-lg border-blue-300 py-1 flex-shrink-0"></div>
      <z-select class="border rounded-lg px-2 w-full" v-model:value="dirId" :options="dirs"/>
    </div>
    <template v-if="subDirs.length !== 0" >
      <z-location-select :items="subDirs" :level="level + 1" @select-dir="selectDirHandler"/>
    </template>
  </div>
</template>

<script setup>
import {computed, defineProps, ref, defineEmits, watch} from "vue";
import ZSelect from "@/components/ZSelect";

const emit = defineEmits(['selectDir'])

const dirId = ref('')
const dirs = computed(
    () => props.items.filter(it => it.isDir).map(it => {
      return {
        value: it.id,
        name: it.title
      }
    }))
const subDirs = computed(() => {
  let dir = props.items.find(it => it.id === dirId.value);
  if (dir === undefined) {
    return new Array(0)
  }
  return dir.children.filter(it => it.isDir)
})
const isTop = computed(() => props.level === 0)

const props = defineProps({
  items: {
    type: Array,
    default: new Array(0),
    required: true
  },
  level: {
    type: Number,
    default: 0,
    required: false
  }
})

watch(
    () => dirId.value,
    () => {
      emit('selectDir', dirId.value)
    }
)

function selectDirHandler(id) {
  emit('selectDir', id)
}

</script>

<style scoped>

</style>