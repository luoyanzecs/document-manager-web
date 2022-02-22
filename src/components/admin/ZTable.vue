<template>
  <div class="flex flex-col gap-1.5 md:min-w-75">
    <div :class="['field-item', 'row-base', 'md:tracking-wide', gridN]">
      <div :class="[isToggleAll ? 'bg-green-400' : 'bg-white', 'col-span-1', 'h-4', 'w-4', 'rounded-full']"
           @click.stop="toggle(-1)"/>
      <div v-for="(value, index) in fields" :key="index" :class="colSpanList[index]">{{ value }}</div>
    </div>
    <div v-for="(list, i) in lists"
         :key="i"
         @click="expand(i)"
         :class="isExpand[i] ? ['expand-item']: [gridN, 'collapse-item', 'item-hover', 'item-base', 'row-base']">
      <div v-show="!isExpand[i]"
          :class="[isSelect[i] ? 'bg-green-400' : 'bg-white', 'col-span-1', 'h-4', 'w-4', 'rounded-full']"
           @click.stop="toggle(i)"/>
      <div v-show="isExpand[i]" class="font-normal w-20">
        <span class="text-blue-500 cursor-pointer" @click.stop="switchToCollapse(i)">关闭</span>
      </div>
      <div v-for="(key, keyIndex) in keys"
           :key="keyIndex"
           :class="[isExpand[i] ? 'flex' : '',  colSpanList[keyIndex]]">
        <div v-if="isExpand[i]" class="font-normal w-20 grid flex-shrink-0"><span>{{ fields[keyIndex] }} </span></div>
        <div class="max-h-12 text-sm md:text-base">
          <p :class="{'truncate' : !isExpand[i]}">{{ list[key] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup >
import {ref, defineProps, computed, onBeforeMount} from 'vue'

const props = defineProps({
  cols: {
    type: Array,
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
const lists = computed(() => props.items)
const fields = computed(() => props.fields)
const cols = computed(() => props.cols)
const isSelect = ref([])
const isToggleAll = ref(false)
const isExpand = ref([])
const gridN = ref('')
const colSpanList = ref([])

onBeforeMount(() => {
  let count = 1, i = 0
  for (let k in cols.value) {
    count += cols.value[k]
    colSpanList.value[i++] = `col-span-${cols.value[k]}`
  }
  gridN.value = `grid-cols-${count > 24 ? 24 : count}`
  isSelect.value = new Array(lists.value.length).fill(false)
  isExpand.value = new Array(lists.value.length).fill(false)
})

const expand = (index) => isExpand.value[index] = true
const switchToCollapse = (index) => isExpand.value[index] = false

const toggle = (index) => {
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
.item-base {
  @apply cursor-pointer
}

.row-base {
  @apply grid items-center gap-2 px-4 py-0.5 rounded-lg max-w-5xl
}

.field-item {
  @apply font-bold text-gray-700 bg-gray-400 text-xl
}

.collapse-item {
  @apply overflow-ellipsis items-center group font-light text-black bg-gray-200
}

.item-hover {
  @apply hover:ring-2 hover:bg-green-500 hover:my-0.5 hover:ring-green-500 hover:ring-offset-2
}

.expand-item {
  @apply bg-gray-200 font-light max-w-5xl rounded-xl p-4
}


</style>