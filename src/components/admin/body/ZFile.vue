<template>
  <z-table :keys="tableProp.keys"
           :cols="tableProp.cols"
           :fields="tableProp.fields"
           :items="tableProp.items"/>
  <z-pagination class="my-4"
                :visible="pageProp.visible"
                :current-page="pageProp.page"
                :total-page="pageProp.totalPage"
                @select-page="selectPageHandler"/>
</template>

<script setup>
import {onMounted, ref} from 'vue'

import ZTable from "@/components/admin/ZTable";
import ZPagination from "@/components/ZPagination";
import {FILE_LIST} from "@/api";

const pageProp = ref({
  page: 0,
  visible: false,
  totalPage: 0
})

const tableProp = ref({
  fields: [],
  keys: [],
  cols: [],
  items: []
})

onMounted(() => {
  selectPageHandler(1)
})

const selectPageHandler = (param) => {
  pageProp.value.visible = true
  FILE_LIST({
    page: param
  }).then(res => {
    pageProp.value.visible = false
    console.log(res.data)
    pageProp.value.page = param
    pageProp.value.totalPage = res.data.totalPage
    tableProp.value = res.data
  })
}
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