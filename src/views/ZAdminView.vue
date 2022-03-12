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
        <keep-alive>
          <component :is="headComponent[headType]"/>
        </keep-alive>
      </template>
      <template v-slot:avatar>
        <z-avatar :image="userInfo.avatar"/>
      </template>
    </z-header>
    <div class="flex flex-col items-center overflow-auto gap-4 pb-16" >
      <z-table :keys="tableProp.keys"
               :cols="tableProp.cols"
               :fields="tableProp.fields"
               :items="tableProp.items"/>
      <z-pagination v-show="tableProp.fields.length !== 0"
                    :visible="pageProp.visible"
                    :current-page="pageProp.page"
                    :total-page="pageProp.totalPage"
                    @select-page="selectPageHandler"/>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import UserTool from "@/components/head/admin/ZUserTool.vue"
import RecordTool from "@/components/head/admin/ZRecordTool.vue"
import NoticeTool from "@/components/head/admin/ZNoticeTool.vue"
import FileTool from "@/components/head/admin/ZFileTool.vue"
import ZAside from "@/components/ZAside";
import ZHeader from "@/components/ZHeader";
import ZAvatar from "@/components/ZAvatar";
import ZPagination from "@/components/ZPagination"
import {useStore} from "vuex";
import ZTable from "@/components/ZTable";
import {FILE_LIST, NOTICE_LIST, RECORD_LIST, USER_LIST} from "@/api";

const store = useStore()
const userInfo = computed(() => store.state.userInfo)

const headType = ref(1)
const headComponent = ref({
  0: UserTool,
  1: RecordTool,
  2: FileTool,
  3: NoticeTool
})
const currentIndex = ref(0)

const menu = ['用户管理', '记录管理', '文件管理', '发布通知']

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

const setProps = (res, selectPage) => {
  pageProp.value.visible = false
  console.log(res.data)
  pageProp.value.page = selectPage
  pageProp.value.totalPage = res.data.totalPage
  tableProp.value = res.data
}

const selectPageHandler = (page) => {
  const selectPage = parseInt(page)
  pageProp.value.visible = true
  switch (currentIndex.value) {
    case 0:
      USER_LIST({page: selectPage}).then(r => setProps(r, selectPage))
      break
    case 1:
      RECORD_LIST({page: selectPage}).then(r => setProps(r, selectPage))
      break
    case 2:
      FILE_LIST({page: selectPage}).then(r => setProps(r, selectPage))
      break
    case 3:
      NOTICE_LIST({page: selectPage}).then(r => setProps(r, selectPage))
  }
}


const menuSelect = (index) => {
  currentIndex.value = index
  headType.value = index
  selectPageHandler(1)
}

onMounted(() => {
  selectPageHandler(1)
})

watch(
    () => currentIndex.value,
    () => {
      tableProp.value.cols.splice(0, tableProp.value.cols.length)
      tableProp.value.fields.splice(0, tableProp.value.fields.length)
      tableProp.value.keys.splice(0, tableProp.value.keys.length)
      tableProp.value.items.splice(0, tableProp.value.items.length)
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