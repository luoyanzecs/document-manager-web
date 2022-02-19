<template>
  <div class="flex flex-col gap-4">
    <div class="record-item font-bold text-gray-600 bg-blue-400 text-lg">
      <div :class="[toggleAll ? 'checkbox-check' : '', 'checkbox']" @click="toggle(-1)"></div>
      <div class="pos-center w-14 md:w-24 ">uid</div>
      <div class="pos-center w-14 md:w-24 ">操作</div>
      <div class="pos-center w-14 md:w-24 ">部门</div>
      <div class="pos-center w-24 md:w-48 ">fid</div>
      <div class="pos-center w-24 md:w-48 ">时间</div>
    </div>
    <div v-for="(item, index) in records"
         :key="index"
         @click="toggle(index)"
         class="group item-hover record-item font-light text-black bg-gray-200">
      <div :class="[isSelect[index] ? 'checkbox-check' : '', 'checkbox']"></div>
      <div class="pos-center group-hover:font-normal text-lg w-14 md:w-24 ">{{ item.id }}</div>
      <div class="pos-center group-hover:font-normal text-lg w-14 md:w-24 ">{{ item.oprate }}</div>
      <div class="pos-center group-hover:font-normal text-lg w-14 md:w-24 ">{{ item.bu }}</div>
      <div class="pos-center group-hover:font-normal text-base w-24 md:w-48 ">{{ item.fid }}</div>
      <div class="pos-center group-hover:font-normal text-base w-24 md:w-48 ">{{ item.oprateTime }}</div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'

const isSelect = ref([])

onMounted(() => {
  isSelect.value = new Array(records.value.length).fill(false)
})

const records = ref([
  {
    id: '123456',
    fid: 'ADSASFWWE',
    bu: '开发',
    oprateTime: '2020-01-02: 17:45',
    oprate: 'update'
  },{
    id: '123456',
    fid: 'ADSASFWWE',
    bu: '开发',
    oprateTime: '2020-01-02: 17:45',
    oprate: 'update'
  },
  {
    id: '123456',
    fid: 'ADSASFWWE',
    bu: '开发',
    oprateTime: '2020-01-02: 17:45',
    oprate: 'update'
  },
  {
    id: '123456',
    fid: 'ADSASFWWE',
    bu: '开发',
    oprateTime: '2020-01-02: 17:45',
    oprate: 'update'
  },
  {
    id: '123456',
    fid: 'ADSASFWWE',
    bu: '开发',
    oprateTime: '2020-01-02: 17:45',
    oprate: 'update'
  },
  {
    id: '123456',
    fid: 'ADSASFWWE',
    bu: '开发',
    oprateTime: '2020-01-02: 17:45',
    oprate: 'update'
  },
  {
    id: '123456',
    fid: 'ADSASFWWE',
    bu: '开发',
    oprateTime: '2020-01-02: 17:45',
    oprate: 'update'
  },
  {
    id: '123456',
    fid: 'ADSASFWWE',
    bu: '开发',
    oprateTime: '2020-01-02: 17:45',
    oprate: 'update'
  },
  {
    id: '123456',
    fid: 'ADSASFWWE',
    bu: '开发',
    oprateTime: '2020-01-02: 17:45',
    oprate: 'update'
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

.record-item {
  @apply flex gap-2 md:gap-4 items-center px-4 py-1.5 rounded-xl max-w-4xl md:tracking-wide shadow
}
</style>