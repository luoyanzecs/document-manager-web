<template>
  <z-table :fields="fields"
           :keys="keys"
           :cols="cols"
           :items="records"/>
</template>

<script setup>
import {ref} from 'vue'
import ZTable from "@/components/admin/ZTable";

const fields = ref(['uid', '操作', '部门', 'fid', '时间'])
const keys = ref(['id', 'oprate', 'bu', 'fid', 'oprateTime'])
const cols = ref([3, 3, 3, 3, 8])

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