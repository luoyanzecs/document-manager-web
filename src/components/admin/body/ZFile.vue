<template>
  <z-table :keys="tableProp.keys"
           :cols="tableProp.cols"
           :fields="tableProp.fields"
           :items="tableProp.items"/>
  <z-pagination class="my-4"
                :visible="pageProp.visible"
                :current-page="pageProp.page"
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
  fields: ['编号', '作者', '部门', '标题', '创建时间'],
  keys: ['id', 'owner', 'bu', 'title', 'createTime'],
  cols: [2, 2, 2, 8, 4],
  items: [
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

.file-item {
  @apply flex gap-2 md:gap-4 items-center px-4 py-1.5 rounded-xl max-w-5xl md:tracking-wide shadow
}

.item-col {
  @apply flex items-center justify-center
}
</style>