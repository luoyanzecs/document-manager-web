<template>
  <div class="flex flex-col gap-4">
    <div class="user-item font-bold text-gray-600 bg-blue-400">
      <div :class="[toggleAll ? 'checkbox-check' : '', 'checkbox']" @click="toggle(-1)"></div>
      <div class="pos-center w-14 md:w-24">编号</div>
      <div class="pos-center w-14 md:w-24">姓名</div>
      <div class="pos-center w-14 md:w-24">部门</div>
      <div class="pos-center w-36 md:w-48">电话</div>
    </div>
    <div v-for="(item, index) in users"
         :key="index"
         @click="toggle(index)"
         class="group item-hover user-item font-light text-black bg-gray-200">
      <div :class="[isSelect[index] ? 'checkbox-check' : '', 'checkbox']"></div>
      <div class="pos-center group-hover:font-normal w-14 md:w-24">{{ item.id }}</div>
      <div class="pos-center group-hover:font-normal w-14 md:w-24">{{ item.name }}</div>
      <div class="pos-center group-hover:font-normal w-14 md:w-24 ">{{ item.bu }}</div>
      <div class="pos-center group-hover:font-normal w-36 md:w-48">{{ item.tel }}</div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'

const isSelect = ref([])

onMounted(() => {
  isSelect.value = new Array(users.value.length).fill(false)
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

const users = ref([
  {
    id: '123456',
    name: 'user',
    bu: '开发',
    tel: '13311112222'
  },
  {
    id: '123456',
    name: 'user',
    bu: '开发',
    tel: '13311112222'
  },
  {
    id: '123456',
    name: 'user',
    bu: '开发',
    tel: '13311112222'
  },
  {
    id: '123456',
    name: 'user',
    bu: '开发',
    tel: '13311112222'
  },
  {
    id: '123456',
    name: 'user',
    bu: '开发',
    tel: '13311112222'
  },
  {
    id: '123456',
    name: 'user',
    bu: '开发',
    tel: '13311112222'
  },
  {
    id: '123456',
    name: 'user',
    bu: '开发',
    tel: '13311112222'
  },
  {
    id: '123456',
    name: 'user',
    bu: '开发',
    tel: '13311112222'
  },
  {
    id: '123456',
    name: 'user',
    bu: '开发',
    tel: '13311112222'
  },
  {
    id: '123456',
    name: 'user',
    bu: '开发',
    tel: '13311112222'
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

.user-item {
  @apply flex gap-4 md:gap-8 items-center px-4 py-1.5 rounded-xl max-w-4xl text-xl md:tracking-wide shadow
}

</style>