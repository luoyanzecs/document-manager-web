<template>
  <div v-if="props.fields.length === 0" class="pos-center mt-60">
    <svg class="text-gray-400 w-20 h-20 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
  <div v-else class="flex flex-col min-w-85 xl:min-w-75">
    <div class="flex gap-2 w-full items-center px-2 border-b sticky top-0 bg-white">
      <div @click.stop="toggle(-1)" :class="[isToggleAll ? 'bg-blue-500' : 'bg-white', 'choose-box']"/>
      <div :class="['field-item', 'row-base',  gridN]">
        <div v-for="(value, index) in fields" :key="index" :class="['pos-center', colSpanList[index]]">
          <span class="truncate">{{ value }}</span>
        </div>
      </div>
      <div class="w-5 h-5"/>
    </div>
    <div v-for="(list, i) in items" :key="list.id" class="flex gap-2 w-full items-center pl-2 pr-4 border-b hover:border-blue-300">
      <div v-show="!isExpand[i]" @click.stop="toggle(i)" :class="[isSelect[i] ? 'bg-blue-500' : 'bg-white', 'choose-box']"/>
      <div :class="isExpand[i] ? ['expand-item']: [gridN, 'collapse-item', 'row-base']">
          <span v-show="isExpand[i]" class="text-blue-500 cursor-pointer w-20" @click.stop="switchToCollapse(i)">关闭</span>
          <div v-for="(key, keyIndex) in keys" :key="list.id + keyIndex" :class="[isExpand[i] ? 'flex' : 'pos-center',  colSpanList[keyIndex]]">
            <span v-if="isExpand[i]" class="w-20 grid flex-shrink-0">{{ fields[keyIndex] }}</span>
            <span :class="!isExpand[i] ? ['text-sm', 'md:text-base', 'truncate'] :''">{{ list[key] }}</span>
          </div>
        </div>
      <svg v-if="!isExpand[i]" @click="expand(i)" class="text-gray-200 cursor-pointer w-5 h-5 items-end" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774="">
        <path fill="currentColor" d="M104.704 338.752a64 64 0 0190.496 0l316.8 316.8 316.8-316.8a64 64 0 0190.496 90.496L557.248 791.296a64 64 0 01-90.496 0L104.704 429.248a64 64 0 010-90.496z"></path>
      </svg>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref, defineProps, onBeforeMount, watch, Ref, PropType} from 'vue'

const props = defineProps({
  cols: {
    type: Array as PropType<Array<number>>,
    default: (): Array<number> => [],
    required: false
  },
  items: {
    type: Array,
    required: true
  },
  fields: {
    type: Array,
    required: true
  },
  keys: {
    type: Array,
    required: true
  }
})
const isSelect: Ref<boolean[]> = ref([])
const isToggleAll = ref(false)
const isExpand: Ref<boolean[]> = ref([])
const gridN: Ref<string> = ref('')
const colSpanList: Ref<string[]> = ref([])

onBeforeMount(() => {
  isSelect.value = new Array(25).fill(false)
  isExpand.value = new Array(25).fill(false)
})

watch(
    () => props.fields,
    () => {
      colSpanList.value.splice(0, colSpanList.value.length)
      let count = 0
      for (let k of props.cols) {
        count += k
        colSpanList.value.push(`col-span-${k}`)
      }
      gridN.value = `grid-cols-${count > 24 ? 24 : count}`
    }
)

watch(
    () => props.items,
    () => isSelect.value.fill(isToggleAll.value)
)

const expand = (index: number) => isExpand.value[index] = true
const switchToCollapse = (index: number) => isExpand.value[index] = false

const toggle = (index: number) => {
  if (index === -1) {
    isToggleAll.value = !isToggleAll.value
    for (let i = 0; i < isSelect.value.length; i++) {
      isSelect.value[i] = isToggleAll.value
    }
  } else {
    isSelect.value[index] = !isSelect.value[index]
  }
}
</script>

<style scoped>
.choose-box {
  @apply w-4 h-4 rounded-full border
}

.row-base {
  @apply grid items-center gap-2 px-4 py-1 max-w-5xl w-full
}

.field-item {
  @apply font-bold text-gray-700 text-base md:text-lg
}

.collapse-item {
  @apply items-center group text-black
}

.expand-item {
  @apply max-w-5xl p-4 w-full bg-gray-200 my-1 rounded
}
</style>