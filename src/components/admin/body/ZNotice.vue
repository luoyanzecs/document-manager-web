<template>
  <div class="flex flex-col gap-4">
    <div class="notice-item font-bold text-gray-600 bg-blue-400">
      <div :class="[toggleAll ? 'checkbox-check' : '', 'checkbox']" @click="toggle(-1)"></div>
      <div class="pos-center w-14 md:w-24">编号</div>
      <div class="pos-center w-14 md:w-24">对象</div>
      <div class="pos-center w-14 md:w-24">部门</div>
      <div class="pos-center w-14 md:w-24">内容</div>
      <div class="pos-center w-36 md:w-48">创建时间</div>
      <div class="pos-center w-36 md:w-48">截止时间</div>
    </div>
    <div v-for="(item, index) in notices"
         :key="index"
         @click="toggle(index)"
         class="group item-hover notice-item font-light text-black bg-gray-200">
      <div :class="[isSelect[index] ? 'checkbox-check' : '', 'checkbox']"></div>
      <div class="pos-center group-hover:font-normal w-14 md:w-24">{{ item.id }}</div>
      <div class="pos-center group-hover:font-normal w-14 md:w-24">{{ item.bu }}</div>
      <div class="pos-center group-hover:font-normal w-14 md:w-24 ">{{ item.to }}</div>
      <div class="pos-center group-hover:font-normal w-36 md:w-48 overflow-ellipsis flex-nowrap">{{ item.ctx }}</div>
      <div class="pos-center group-hover:font-normal w-36 md:w-48">{{ item.startTime }}</div>
      <div class="pos-center group-hover:font-normal w-36 md:w-48">{{ item.endTime }}</div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'

const isSelect = ref([])

onMounted(() => {
  isSelect.value = new Array(notices.value.length).fill(false)
})

const toggleAll = ref(false)

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

const notices = ref([
  {
    id: '123456',
    to: 'user',
    bu: ['开发', '开发'],
    ctx: 'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
    startTime: '2020-2-14 17:22',
    endTime: '2020-2-15 17:22'
  },
])
</script>

<style scoped>
.checkbox {
  @apply h-4 w-4 bg-white rounded-full
}
.checkbox-check {
  @apply bg-green-400
}

.notice-item {
  @apply flex gap-4 md:gap-8 items-center px-4 py-1.5 rounded-xl max-w-4xl text-xl md:tracking-wide shadow
}
</style>