<template>
  <z-table :fields="tableProp.fields"
           :cols="tableProp.cols"
           :items="tableProp.items"
           :keys="tableProp.keys"/>
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
  page: 8,
  visible: false,
  totalPage: 20
})

const tableProp = ref({
  fields: ['编号', '姓名', '部门', '电话'],
  keys: ['id', 'name', 'bu', 'tel'],
  cols: [4, 4, 4, 4],
  items: [
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
  ]
})
</script>

<style scoped>

</style>