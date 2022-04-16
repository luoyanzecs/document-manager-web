<template>
  <table class="table-fixed w-full">
    <thead>
    <tr class="sticky top-0 bg-white z-10">
      <th class="w-6 py-1"><div @click.stop="toggle(-1)" :class="[isToggleAll ? 'bg-blue-500' : 'bg-white', 'choose-box']"/></th>
      <th class="py-1" v-for="name in pairs.map(it => it.name)" :key="name"><span>{{ name }}</span></th>
      <th class="w-7 py-1"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(list, i) in items" :key="list.id" class="hover:border-blue-400">
      <template v-if="!isExpand[i]">
        <td class="py-1"><div @click.stop="toggle(i)" :class="[isSelect[i] ? 'bg-blue-500' : 'bg-white', 'choose-box']"/></td>
        <td class="py-1" v-for="key in pairs.map(it => it.key)" :key="list.id + key">
          <p class="text-sm md:text-base truncate">{{ list[key] }}</p>
        </td>
        <td class="py-1">
          <svg  @click="isExpand[i] = true" class="text-gray-300 cursor-pointer w-5 h-5 items-end" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774="">
            <path fill="currentColor" d="M104.704 338.752a64 64 0 0190.496 0l316.8 316.8 316.8-316.8a64 64 0 0190.496 90.496L557.248 791.296a64 64 0 01-90.496 0L104.704 429.248a64 64 0 010-90.496z"></path>
          </svg>
        </td>
      </template>
      <template v-else>
        <td :colspan="pairs.length + 2" class="">
          <div class="bg-gray-200 rounded-lg p-2">
            <div class="text-blue-500 cursor-pointer flex justify-end pr-4" @click.stop="isExpand[i] = false">
              <span>关闭</span>
            </div>
            <table class="table-fixed">
              <tr v-for="pair in pairs" :key="list.id + pair">
                <td style="text-align: left">{{ pair.name }}</td>
                <td style="text-align: left">{{ list[pair.key] }}</td>
              </tr>
            </table>
          </div>
        </td>
      </template>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">

import {ref, defineProps, watch, Ref, defineExpose, onMounted} from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  pairs: {
    type: Array,
    required: true
  }
})
const isSelect: Ref<boolean[]> = ref([])
const isToggleAll = ref(false)
const isExpand: Ref<boolean[]> = ref([])

onMounted(() => {
  isSelect.value = Array(props.items.length).fill(false)
  isExpand.value = Array(props.items.length).fill(false)
})

watch(
    () => props.items,
    () => {
      isSelect.value = Array(props.items.length).fill(false)
      isToggleAll.value = false
    }
)

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

defineExpose({
  isSelect
})
</script>

<style scoped>
.choose-box {
  @apply w-4 h-4 rounded-full border
}

table {
  border-collapse: collapse;
  border-spacing: .5rem;

}

tr {
  @apply border-b
}

th, td {
  @apply text-center px-1
}

td {
  @apply overflow-hidden
}
</style>