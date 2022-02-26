<template>
  <z-table :keys="tableProp.keys"
           :fields="tableProp.fields"
           :cols="tableProp.cols"
           :items="tableProp.items"/>
  <z-pagination class="my-4"
                :current-page="pageProp.page"
                :visible="pageProp.visible"
                :total-page="pageProp.totalPage"/>
</template>

<script setup>
import {ref} from 'vue'

import ZTable from "@/components/admin/ZTable";
import ZPagination from "@/components/ZPagination";

const pageProp = ref({
  page: 1,
  visible: false,
  totalPage: 20
})

const tableProp = ref({
  fields: ['编号', '对象', '部门', '内容', '创建时间', '结束时间'],
  keys: ['id', 'to', 'bu', 'ctx', 'startTime', 'endTime'],
  cols: [2, 2, 2, 7, 4, 4],
  items: [
    {
      id: '123456',
      to: 'user',
      bu: ['开发', '开发'],
      ctx: 'Nulla quis lorem ut libero malesuada feugiat. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.',
      startTime: '2020-2-14 17:22',
      endTime: '2020-2-15 17:22'
    },
  ]
})
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