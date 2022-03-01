<template>
  <z-table :keys="tableProp.keys"
           :fields="tableProp.fields"
           :cols="tableProp.cols"
           :items="tableProp.items"/>
  <z-pagination class="my-4"
                :current-page="pageProp.page"
                :visible="pageProp.visible"
                :total-page="pageProp.totalPage"
                @select-page="selectPageHandler"/>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import ZTable from "@/components/ZTable";
import ZPagination from "@/components/ZPagination";
import {NOTICE_LIST} from "@/api";

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
  let selectPage = parseInt(param)
  pageProp.value.visible = true
  NOTICE_LIST({
    page: selectPage
  }).then(res => {
    pageProp.value.visible = false
    console.log(res.data)
    pageProp.value.page = selectPage
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

.notice-item {
  @apply flex gap-4 md:gap-8 items-center px-4 py-1.5 rounded-xl max-w-7xl md:tracking-wide shadow max-h-16
}
</style>