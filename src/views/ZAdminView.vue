<template>
  <div class="flex w-full overflow-hidden h-screen">
    <z-aside>
      <template v-slot:context>
        <div class="m-4 text-lg tracking-wide font-medium text-gray-800 dark:text-white">管理员界面</div>
        <div class="ml-4 mt-4 mr-2 flex flex-col gap-2 text-xl font-normal tracking-widest ">
          <div v-for="(item, index) in menu" :key="index" @click="menuSelect(index)"
               :class="{'select-menu': index === SEARCH_PARAMS.menuIndex, 'menu-base': true}"
          >{{ item }}
          </div>
        </div>
      </template>
    </z-aside>
    <div class="flex-auto relative h-screen min-w-0">
      <z-header>
        <template v-slot:tools>
          <z-head-menu>
            <template v-if="SEARCH_PARAMS.menuIndex === 0">
              <z-button fill="新增" @click="headButtonHandler('10')" :load-visible="BUTTON_LOADER._10"/>
              <z-button fill="部门" @click="headButtonHandler('00')" :load-visible="BUTTON_LOADER._00"/>
              <z-button fill="删除" @click="headButtonHandler('01')" :load-visible="BUTTON_LOADER._01"/>
              <z-button fill="所有" @click="headButtonHandler('22')" :load-visible="BUTTON_LOADER._02"/>
            </template>
            <template v-if="SEARCH_PARAMS.menuIndex === 1">
              <z-button fill="部门" @click="headButtonHandler('00')" :load-visible="BUTTON_LOADER._00"/>
              <z-button fill="删除" @click="headButtonHandler('01')" :load-visible="BUTTON_LOADER._01"/>
              <z-button fill="所有" @click="headButtonHandler('22')" :load-visible="BUTTON_LOADER._02"/>
            </template>
            <template v-if="SEARCH_PARAMS.menuIndex === 2">
              <z-button fill="部门" @click="headButtonHandler('00')" :load-visible="BUTTON_LOADER._00"/>
              <z-button fill="删除" @click="headButtonHandler('01')" :load-visible="BUTTON_LOADER._01"/>
              <z-button fill="所有" @click="headButtonHandler('22')" :load-visible="BUTTON_LOADER._02"/>
            </template>
            <template v-if="SEARCH_PARAMS.menuIndex === 3">
              <z-button fill="新增" @click="headButtonHandler('30')" :load-visible="BUTTON_LOADER._30"/>
              <z-button fill="删除" @click="headButtonHandler('01')" :load-visible="BUTTON_LOADER._01"/>
              <z-button fill="记录" @click="headButtonHandler('33')" :load-visible="BUTTON_LOADER._33"/>
            </template>
          </z-head-menu>
        </template>
        <template v-slot:avatar>
          <z-avatar :image="userInfo.avatar"/>
        </template>
      </z-header>
      <div class="h-screen overflow-auto">
        <div v-if="tableProp.pairs.length === 0" class="pos-center mt-60">
          <svg class="text-gray-400 w-20 h-20 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <template v-else>
          <z-table ref="table" v-bind="tableProp" class="mb-32"/>
          <div class="w-full mx-auto bg-white py-4 absolute z-10 bottom-0">
            <z-pagination v-bind="pageProp" @select-page="selectPageHandler"/>
          </div>
        </template>
      </div>
    </div>
  </div>
  <transition-group name="fade">
    <z-dailog :key="1" v-show="BUTTON_LOADER.isDeleteDailogShow" v-model:click-toggle="BUTTON_LOADER.isDeleteDailogShow">
      <template #title>确认您的操作</template>
      <template #bottom>
        <z-button fill="确认" @click="deleteItemHandler" :load-visible="BUTTON_LOADER.deleteConfirmBtn"/>
        <z-button fill="取消" @click="BUTTON_LOADER.isDeleteDailogShow = !BUTTON_LOADER.isDeleteDailogShow"/>
      </template>
    </z-dailog>
    <z-dailog :key="2" v-show="BUTTON_LOADER.isBuSelectDailogShow" v-model:click-toggle="BUTTON_LOADER.isBuSelectDailogShow">
      <template #title>选择筛选的部门</template>
      <template #body>
        <div class="flex gap-2 mb-6">
          <div v-for="bu in buList" :key="bu.name" @click="bu.checked = !bu.checked"
               :class="[{'bg-yellow-500 bg-opacity-30': bu.checked}, 'px-3', 'py-0.5', 'border', 'rounded-2xl', 'cursor-pointer']">
            <span class="whitespace-nowrap text-gray-500 text-sm">{{ bu.name }}</span>
          </div>
        </div>
      </template>>
      <template #bottom>
        <z-button fill="确认" @click="buSelectHandler" :load-visible="BUTTON_LOADER.buSelectConfirmBtn"/>
        <z-button fill="取消" @click="BUTTON_LOADER.isBuSelectDailogShow = !BUTTON_LOADER.isBuSelectDailogShow"/>
      </template>
    </z-dailog>
  </transition-group>
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
import {DELETE_TABLE_ITEMS, GET_BU, ADMIN_SEARCH_ALL_IN_ONE} from "@/api";
import ZDailog from "@/components/ZDailog";

const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const table = ref()
const buList = ref([])
const menu = ['用户管理', '记录管理', '文件管理', '发布通知']

const SEARCH_PARAMS = reactive({
  menuIndex: 0,
  page: 1,
  pageSize: 20,
  bu: computed(() => buList.value.filter(it => it.checked)),
  userids: []
})

const pageProp = reactive({
  currentPage: 1,
  visible: false,
  totalPage: 0
})

const tableProp = reactive({
  pairs: [],
  items: []
})

const BUTTON_LOADER = reactive({
  _00: false, _01: false, _02: false,
  _10: false,
  _30: false, _31: false, _32: false, _33: false,
  isDeleteDailogShow: false, deleteConfirmBtn: false,
  isBuSelectDailogShow: false, buSelectConfirmBtn: false
})

const setProps = (res, selectPage) => {
  pageProp.currentPage = selectPage
  pageProp.totalPage = res.totalPage
  tableProp.pairs = res.pairs
  tableProp.items = res.items
}

const selectPageHandler = (page=SEARCH_PARAMS.page, paginationDisplay=true) => {
  SEARCH_PARAMS.page = parseInt(page)
  if (paginationDisplay) {
    pageProp.visible = true
  }
  selectHandler().finally(() => pageProp.visible = false)
}

const menuSelect = (index) => {
  SEARCH_PARAMS.menuIndex = index
  selectPageHandler()
}

function deleteItemHandler() {
  const params = {
    type: SEARCH_PARAMS.menuIndex,
    ids: tableProp.items.filter((it, idx) => table.value.isSelect[idx]).map(it => it.id)
  }
  BUTTON_LOADER.deleteConfirmBtn = true
  DELETE_TABLE_ITEMS(params).then(() => {
    selectPageHandler(SEARCH_PARAMS.page, false)
  }).finally(() => {
    BUTTON_LOADER.deleteConfirmBtn = false
    BUTTON_LOADER.isDeleteDailogShow = !BUTTON_LOADER.isDeleteDailogShow
  })
}

function buSelectHandler() {
  BUTTON_LOADER.buSelectConfirmBtn = true
  selectHandler().finally(() => {
    BUTTON_LOADER.buSelectConfirmBtn = false
    BUTTON_LOADER.isBuSelectDailogShow = false
  })
}

function selectHandler() {
  return ADMIN_SEARCH_ALL_IN_ONE(SEARCH_PARAMS).then(it => setProps(it, SEARCH_PARAMS.page))
}

function headButtonHandler(index) {
  switch (index) {
    case '00':
      BUTTON_LOADER.isBuSelectDailogShow = !BUTTON_LOADER.isBuSelectDailogShow
      break
    case '01':
      BUTTON_LOADER.isDeleteDailogShow = !BUTTON_LOADER.isDeleteDailogShow
      break;
    case '10':
    case '12':
    case '20':
    case '22':
    case '30':
    case '32':
    case '33':
  }
}

onMounted(() => {
  selectPageHandler()
  GET_BU({}).then(it => {
    buList.value = it.buList.map(it => {
      return {
        name: it,
        checked: false
      }
    })
  })
})

watch(
    () => SEARCH_PARAMS.menuIndex,
    () => {
      SEARCH_PARAMS.page = 1
      tableProp.pairs.splice(0, tableProp.pairs.length)
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

.fade-leave-active {
  animation: fade ease-in-out .2s reverse;
}

.fade-enter-active {
  animation: fade ease-in-out .2s;
}

@keyframes fade {
  from {
    @apply opacity-0
  }
  to {
    @apply opacity-100
  }
}
</style>