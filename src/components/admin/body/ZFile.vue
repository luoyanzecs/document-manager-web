<template>
  <z-table :keys="keys"
           :cols="cols"
           :fields="fields"
           :items="files"/>
</template>

<script setup>
import {ref} from 'vue'

import ZTable from "@/components/admin/ZTable";

const fields = ref(['编号', '作者', '部门', '标题', '创建时间'])
const keys = ref(['id', 'owner', 'bu', 'title', 'createTime'])
const cols = ref([2, 2, 2, 8, 4])

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