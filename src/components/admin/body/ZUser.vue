<template>
  <z-table :fields="fields" :items="users" :keys="keys"/>
</template>

<script setup>
import {ref} from 'vue'
import ZTable from "@/components/admin/ZTable";

const fields = ref(['编号', '姓名', '部门', '电话'])
const keys = ref(['id', 'name', 'bu', 'tel'])

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

</style>