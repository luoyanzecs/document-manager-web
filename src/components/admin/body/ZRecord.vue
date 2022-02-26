<template>
  <z-table :fields="tableProp.fields"
           :keys="tableProp.keys"
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
  fields: ['uid', '操作', '部门', 'fid', '时间'],
  keys: ['id', 'oprate', 'bu', 'fid', 'oprateTime'],
  cols: [3, 3, 3, 4, 7],
  items: [
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

.record-item {
  @apply flex gap-2 md:gap-4 items-center px-4 py-1.5 rounded-xl max-w-5xl md:tracking-wide shadow
}
</style>