<template>
  <z-table :fields="tableProp.fields"
           :cols="tableProp.cols"
           :items="tableProp.items"
           :keys="tableProp.keys"/>
  <z-pagination class="my-4"
                :current-page="pageProp.page"
                :visible="pageProp.visible"
                :total-page="pageProp.totalPage"
                @select-page="selectPageHandler"/>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import ZTable from "@/components/admin/ZTable";
import ZPagination from "@/components/ZPagination";
import {USER_LIST} from "@/api";

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
  USER_LIST({
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

</style>