<template>
  <div class="flex flex-col gap-4">
    <div class="file-item font-bold text-gray-600 bg-blue-400 text-lg">
      <div :class="[toggleAll ? 'checkbox-check' : '', 'checkbox']" @click="toggle(-1)"></div>
      <div class="item-col w-14 md:w-24 ">编号</div>
      <div class="item-col w-14 md:w-24 ">创建人</div>
      <div class="item-col w-14 md:w-24 ">部门</div>
      <div class="item-col w-36 md:w-64 ">标题</div>
      <div class="item-col w-24 md:w-48 ">创建时间</div>
    </div>
    <div v-for="(item, index) in files"
         :key="index"
         @click="toggle(index)"
         class="group item-hover file-item font-light text-black bg-gray-200">
      <div :class="[isSelect[index] ? 'checkbox-check' : '', 'checkbox']"></div>
      <div class="item-col group-hover:font-normal text-lg w-14 md:w-24 ">{{ item.id }}</div>
      <div class="item-col group-hover:font-normal text-lg w-14 md:w-24 ">{{ item.owner }}</div>
      <div class="item-col group-hover:font-normal text-lg w-14 md:w-24 ">{{ item.bu }}</div>
      <div class="item-col group-hover:font-normal text-base w-36 md:w-64 ">{{ item.title }}</div>
      <div class="item-col group-hover:font-normal text-base w-24 md:w-48 ">{{ item.createTime }}</div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'

const isSelect = ref([])

onMounted(() => {
  isSelect.value = new Array(files.value.length).fill(false)
})

const files = ref([
  {
    id: '123456',
    owner: 'user',
    title: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
    bu: '开发',
    createTime: '2020-01-02: 17:45'
  },
  {
    id: '123456',
    owner: 'user',
    title: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
    bu: '开发',
    createTime: '2020-01-02: 17:45'
  },
  {
    id: '123456',
    owner: 'user',
    title: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
    bu: '开发',
    createTime: '2020-01-02: 17:45'
  },
  {
    id: '123456',
    owner: 'user',
    title: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
    bu: '开发',
    createTime: '2020-01-02: 17:45'
  },
  {
    id: '123456',
    owner: 'user',
    title: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
    bu: '开发',
    createTime: '2020-01-02: 17:45'
  },
  {
    id: '123456',
    owner: 'user',
    title: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
    bu: '开发',
    createTime: '2020-01-02: 17:45'
  },
  {
    id: '123456',
    owner: 'user',
    title: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
    bu: '开发',
    createTime: '2020-01-02: 17:45'
  },
  {
    id: '123456',
    owner: 'user',
    title: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
    bu: '开发',
    createTime: '2020-01-02: 17:45'
  },
  {
    id: '123456',
    owner: 'user',
    title: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
    bu: '开发',
    createTime: '2020-01-02: 17:45'
  },
  {
    id: '123456',
    owner: 'user',
    title: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
    bu: '开发',
    createTime: '2020-01-02: 17:45'
  },
])

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

</script>

<style scoped>
.checkbox {
  @apply h-4 w-4 bg-white rounded-full
}
.checkbox-check {
  @apply bg-green-400
}

.file-item {
  @apply flex gap-2 md:gap-4 items-center px-4 py-1.5 rounded-xl max-w-4xl md:tracking-wide shadow
}

.item-col {
  @apply flex items-center justify-center
}
</style>