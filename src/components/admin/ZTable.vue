<template>
  <div class="flex flex-col gap-4">
    <div class="user-item font-bold text-gray-600 bg-blue-400">
      <div :class="[toggleAll ? 'checkbox-checked' : '', 'checkbox']"
           @click="toggle(-1)"></div>
      <div v-for="(value, fieldIndex) in fields" :key="fieldIndex">{{ value }}</div>
    </div>
    <div v-for="(list, index) in lists"
         :key="index"
         @click="toggle(index)"
         class="group item-hover user-item font-light text-black bg-gray-200">
      <div :class="[{'checkbox-checked' : isSelect[index] }, 'checkbox']"></div>
      <div v-for="(key, keyIndex) in keys" :key="keyIndex">{{ list[key] }}</div>
    </div>
  </div>

</template>

<script setup>
import {onMounted, ref, defineProps, computed} from 'vue'

const props = defineProps({
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
const isSelect = ref([])
const toggleAll = ref(false)

onMounted(() => {
  console.log(lists.value)
  isSelect.value = new Array(lists.value.length).fill(false)
  console.log(isSelect.value);
})

const toggle = (index) => {
  if (index === -1) {
    toggleAll.value = !toggleAll.value
    for (let i = 0; i < isSelect.value.length; i++) {
      isSelect.value[i] = toggleAll.value
    }
  } else {
    isSelect.value[index] = !isSelect.value[index]
  }
}
</script>

<style scoped>
.checkbox {
  @apply h-4 w-4 bg-white rounded-full
}
.checkbox-checked {
  @apply bg-green-400
}

.user-item {
  @apply flex gap-4 md:gap-8 items-center px-4 py-1.5 rounded-xl max-w-5xl text-xl md:tracking-wide shadow
}

</style>