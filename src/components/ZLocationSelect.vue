<template>
  <div class="flex flex-col gap-1 flex-grow ml-2">
    <div class="flex">
      <div v-if="!isTop" class="w-4 h-4 border-l-2 border-b-2 rounded-bl-lg border-blue-300"></div>
      <select class="focus:outline-none border rounded-lg p-0.5 flex-1" v-model="dirId">
        <option v-for="dir in dirs" :key="dir.id" :value="dir.id"> {{ dir.title }}</option>
      </select>
    </div>
    <template v-if="subDirs.length !== 0" >
      <z-location-select :items="subDirs" :level="level + 1"/>
    </template>
  </div>
</template>

<script setup>
import {computed, defineProps, ref} from "vue";

const dirId = ref('')
const dirs = computed(() => props.items.filter(it => it.isDir))
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

</script>

<style scoped>

</style>