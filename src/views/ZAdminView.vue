<template>
  <z-aside>
    <template v-slot:context>
      <div class="m-4 text-lg tracking-wide font-medium text-gray-800 dark:text-white">管理员界面</div>
      <div class="ml-4 mt-4 mr-2 flex flex-col gap-2 text-xl font-normal tracking-widest ">
        <div v-for="(item, index) in menu"
             :key="index"
             @click="menuSelect(index)"
             :class="{'select-menu': index === currentIndex, 'menu-base': true}"
        >{{ item }}
        </div>
      </div>
    </template>
  </z-aside>
  <div class="h-screen flex-grow flex flex-col">
    <z-header>
      <template v-slot:tools>
        <z-head-menu>
          <template v-if="currentIndex === 0">
            <z-button fill="部门" @click="headButtonHandler('00')"/>
            <z-button fill="删除" @click="headButtonHandler('01')"/>
          </template>
          <template v-if="currentIndex === 1">
            <z-button fill="新增" @click="headButtonHandler('10')"/>
            <z-button fill="所有" @click="headButtonHandler('11')"/>
            <z-button fill="筛选" @click="headButtonHandler('12')"/>
            <z-button fill="删除" @click="headButtonHandler('13')"/>
          </template>
          <template v-if="currentIndex === 2">
            <z-button fill="筛选" @click="headButtonHandler('20')"/>
            <z-button fill="删除" @click="headButtonHandler('21')"/>
            <z-button fill="所有" @click="headButtonHandler('22')"/>
          </template>
          <template v-if="currentIndex === 3">
            <z-button fill="新增" @click="headButtonHandler('30')"/>
            <z-button fill="删除" @click="headButtonHandler('31')"/>
            <z-button fill="保存" @click="headButtonHandler('32')"/>
            <z-button fill="记录" @click="headButtonHandler('33')"/>
          </template>
        </z-head-menu>
      </template>
      <template v-slot:avatar>
        <z-avatar :image="userInfo.avatar"/>
      </template>
    </z-header>
    <div class="flex flex-col items-center overflow-auto gap-4 pb-16">
      <z-table v-bind="tableProp"/>
      <z-pagination v-show="tableProp.fields.length !== 0" v-bind="pageProp" @select-page="selectPageHandler"/>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import ZHeadMenu from "@/components/ZHeadMenu";
import ZButton from "@/components/ZButton";
import ZAside from "@/components/ZAside";
import ZHeader from "@/components/ZHeader";
import ZAvatar from "@/components/ZAvatar";
import ZPagination from "@/components/ZPagination"
import {useStore} from "vuex";
import ZTable from "@/components/ZTable";
import {FILE_LIST, NOTICE_LIST, RECORD_LIST, USER_LIST} from "@/api";

const store = useStore()
const userInfo = computed(() => store.state.userInfo)

const currentIndex = ref(0)
const menu = ['用户管理', '记录管理', '文件管理', '发布通知']

const pageProp = reactive({
  currentPage: 0,
  visible: false,
  totalPage: 0
})

const tableProp = reactive({
  fields: [],
  keys: [],
  cols: [],
  items: []
})

const setProps = (res, selectPage) => {
  pageProp.visible = false
  pageProp.currentPage = selectPage
  pageProp.totalPage = res.totalPage
  Object.assign(tableProp, res)
}
const APIS = [USER_LIST, RECORD_LIST, FILE_LIST, NOTICE_LIST]
const selectPageHandler = (page) => {
  const selectPage = parseInt(page)
  pageProp.visible = true
  APIS[currentIndex.value]({page: selectPage, size: 20})
      .then(it => setProps(it, selectPage))
      .catch(() => pageProp.visible = false)
}

const menuSelect = (index) => {
  currentIndex.value = index
  selectPageHandler(1)
}

onMounted(() => {
  selectPageHandler(1)
})

const headButtonHandler = index => {
  switch (index) {
    case '00':
    case '01':
    case '10':
    case '12':
    case '13':
    case '20':
    case '21':
    case '22':
    case '30':
    case '31':
    case '32':
    case '33':
  }
  console.log(index)
}

watch(
    () => currentIndex.value,
    () => {
      tableProp.cols.splice(0, tableProp.cols.length)
      tableProp.fields.splice(0, tableProp.fields.length)
      tableProp.keys.splice(0, tableProp.keys.length)
      tableProp.items.splice(0, tableProp.items.length)
    }
)

</script>

<style>
.menu-base {
  @apply hover:text-blue-500 rounded-md px-2 py-1.5 cursor-pointer text-gray-700
}

.select-menu {
  @apply bg-blue-200 text-blue-500 italic;
}
</style>