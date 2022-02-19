<template>
  <z-table :keys="keys" :fields="fields" :items="notices"/>
</template>

<script setup>
import {ref} from 'vue'

import ZTable from "@/components/admin/ZTable";

const fields = ref(['编号', '对象', '部门', '内容', '创建时间', '结束时间'])
const keys = ref(['id', 'to', 'bu', 'ctx', 'startTime', 'endTime'])

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
  @apply flex gap-4 md:gap-8 items-center px-4 py-1.5 rounded-xl max-w-7xl md:tracking-wide shadow max-h-16
}
</style>