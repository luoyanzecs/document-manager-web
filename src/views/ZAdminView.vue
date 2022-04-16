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
              <z-button fill="删除" @click="headButtonHandler('01')" :load-visible="BUTTON_LOADER._01" :deny-animation="BUTTON_LOADER.isDeleteBtnShake"/>
              <z-button fill="所有" @click="headButtonHandler('22')" :load-visible="BUTTON_LOADER._22"/>
            </template>
            <template v-if="SEARCH_PARAMS.menuIndex === 1">
              <z-button fill="部门" @click="headButtonHandler('00')" :load-visible="BUTTON_LOADER._00" />
              <z-button fill="删除" @click="headButtonHandler('01')" :load-visible="BUTTON_LOADER._01" :deny-animation="BUTTON_LOADER.isDeleteBtnShake"/>
              <z-button fill="所有" @click="headButtonHandler('22')" :load-visible="BUTTON_LOADER._22"/>
            </template>
            <template v-if="SEARCH_PARAMS.menuIndex === 2">
              <z-button fill="部门" @click="headButtonHandler('00')" :load-visible="BUTTON_LOADER._00"/>
              <z-button fill="删除" @click="headButtonHandler('01')" :load-visible="BUTTON_LOADER._01" :deny-animation="BUTTON_LOADER.isDeleteBtnShake"/>
              <z-button fill="所有" @click="headButtonHandler('22')" :load-visible="BUTTON_LOADER._22"/>
            </template>
            <template v-if="SEARCH_PARAMS.menuIndex === 3">
              <z-button fill="部门" @click="headButtonHandler('00')" :load-visible="BUTTON_LOADER._00"/>
              <z-button fill="新增" @click="headButtonHandler('30')" :load-visible="BUTTON_LOADER._30"/>
              <z-button fill="删除" @click="headButtonHandler('01')" :load-visible="BUTTON_LOADER._01" :deny-animation="BUTTON_LOADER.isDeleteBtnShake"/>
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
    <z-dailog :key="1" v-show="BUTTON_LOADER.isDeleteDailogShow">
      <template #title>确认您的操作</template>
      <template #bottom>
        <z-button fill="确认" @click="deleteItemHandler" :load-visible="BUTTON_LOADER.deleteConfirmBtn"/>
        <z-button fill="取消" @click="BUTTON_LOADER.isDeleteDailogShow = false"/>
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
        <z-button fill="取消" @click="BUTTON_LOADER.isBuSelectDailogShow = false"/>
      </template>
    </z-dailog>
    <z-dailog :key="3" v-if="BUTTON_LOADER.isAddUserDailogShow">
      <template #title>输入新用户信息</template>
      <template #body>
          <ul class="space-y-1">
            <li><p class="text-gray-400 text-xs">* 当新建对象为管理员时，无需输入等级，等级输入框处于禁用态。</p></li>
            <li><p class="text-gray-400 text-xs">* 账号和密码6至16位英文字符及".@"被允许。</p></li>
            <li><p class="text-gray-400 text-xs">* 用户等级范围为0-10。</p></li>
          </ul>
        <form class="mb-4">
          <table class="table-fixed text-gray-500 border-separate" style="border-spacing: 1rem 1rem">
            <tr>
              <td class="border-r-2 pr-2">用户名</td>
              <td>
                <input type="text" class="new-user-input" spellcheck="false" @input="$event.target.required='required'"
                       pattern="[a-z|A-Z|.|0-9|@]{6,16}" placeholder="请输入用户名" v-model="NEW_USER_PARAMS.name"></td>
            </tr>
            <tr>
              <td class="border-r-2 pr-2">密码</td>
              <td><input type="text" class="new-user-input" spellcheck="false" @input="$event.target.required='required'"
                       pattern="[a-z|A-Z|.|0-9|@]{6,16}" placeholder="请输入新用户密码" v-model="NEW_USER_PARAMS.password"></td>
            </tr>
            <tr>
              <td class="border-r-2 pr-2">部门</td>
              <td class="space-x-2">
              <span v-for="bu in buList" :key="bu" @click="NEW_USER_PARAMS.bu = bu.name"
                    :class="[{'selected-item': NEW_USER_PARAMS.bu === bu.name}, 'select-item']">{{ bu.name }}</span>
              </td>
            </tr>
            <tr>
              <td class="border-r-2 pr-2">角色</td>
              <td class="space-x-2">
                <span :class="[{'selected-item': !NEW_USER_PARAMS.isAdmin}, 'select-item']" @click="NEW_USER_PARAMS.isAdmin = false">用户</span>
                <span :class="[{'selected-item': NEW_USER_PARAMS.isAdmin}, 'select-item']" @click="NEW_USER_PARAMS.isAdmin = true">管理员</span>
              </td>
            </tr>
            <tr>
              <td class="border-r-2 pr-2">等级</td>
              <td><input type="number" class="new-user-input" min="0" max="10" v-model="NEW_USER_PARAMS.rank" :disabled="NEW_USER_PARAMS.isAdmin"></td>
            </tr>
          </table>
        </form>
      </template>
      <template #bottom>
        <z-button fill="确认" @click="addUserHandler" :load-visible="BUTTON_LOADER.isAddUserConfirmBtn" :deny-animation="BUTTON_LOADER.isAddUserConfirmBtnShake"/>
        <z-button fill="取消" @click="BUTTON_LOADER.isAddUserDailogShow = false"/>
      </template>
    </z-dailog>
    <z-dailog :key="4" v-if="BUTTON_LOADER.isAddNoticeDailogShow">
      <template #title>请确认你的新通知信息</template>
      <template #body>
        <ul class="space-y-1">
          <li><p class="text-gray-400 text-xs">* 新通知的内容最多60字。</p></li>
          <li><p class="text-gray-400 text-xs">* 日期范围为今天 至 2030-12-31。</p></li>
        </ul>
        <form class="mb-4 select-none">
          <table class="table-fixed text-gray-500 border-separate" style="border-spacing: 1rem 1rem">
            <tr>
              <td class="border-r-2 pr-2 whitespace-nowrap">所有人?</td>
              <td><span :class="[{'selected-item': NEW_NOTICE_PARAMS.isGlobal}, 'select-item']"
                        @click="NEW_NOTICE_PARAMS.isGlobal = !NEW_NOTICE_PARAMS.isGlobal"
              >是</span></td>
            </tr>
            <tr>
              <td class="border-r-2 pr-2 whitespace-nowrap">部门</td>
              <td class="space-x-2">
              <span v-for="bu in buList" :key="bu"
                    @click="NEW_NOTICE_PARAMS.bu.includes(bu.name)
                            ? NEW_NOTICE_PARAMS.bu.splice(NEW_NOTICE_PARAMS.bu.indexOf(bu.name), 1)
                            : NEW_NOTICE_PARAMS.bu.unshift(bu.name)"
                    :class="[{'selected-item': NEW_NOTICE_PARAMS.bu.includes(bu.name)}, 'select-item']">{{ bu.name }}</span>
              </td>
            </tr>
            <tr>
              <td class="border-r-2 pr-2 whitespace-nowrap">开始日期</td>
              <td class="font-mono">
                <input class="focus:outline-none border rounded-lg px-2" max="2030-12-31" :min="transformTimeShort()"
                       type="date" v-model="NEW_NOTICE_PARAMS.startTime" pattern="yyyy-mm-dd" @input="$event.target.required='required'">
              </td>
            </tr>
            <tr>
              <td class="border-r-2 pr-2 whitespace-nowrap">结束日期</td>
              <td class="font-mono select-none">
                <input class="focus:outline-none border rounded-lg px-2 " max="2030-12-31" :min="transformTimeShort()"
                       type="date" v-model="NEW_NOTICE_PARAMS.expiredTime" @input="$event.target.required='required'">
              </td>
            </tr>
            <tr>
              <td class="border-r-2 pr-2 whitespace-nowrap">通知内容</td>
              <td class="w-full">
                <textarea class="focus:outline-none border rounded-lg px-2 py-2 resize-none"
                          spellcheck="false" @input="$event.target.required='required'" rows="2" cols="30"
                          minlength="5" maxlength="60" placeholder="请输入通知内容" v-model="NEW_NOTICE_PARAMS.text"/>
              </td>
            </tr>
          </table>
        </form>
      </template>
      <template #bottom>
        <z-button fill="确认" @click="addNoticeHandler" :load-visible="BUTTON_LOADER.isAddNoticeConfirmBtn"
                  :deny-animation="BUTTON_LOADER.isAddNoticeConfirmBtnShake"/>
        <z-button fill="取消" @click="BUTTON_LOADER.isAddNoticeDailogShow = false"/>
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
import {DELETE_TABLE_ITEMS, GET_BU, ADMIN_SEARCH_ALL_IN_ONE, ADD_NEW_USER, ADD_NEW_NOTICE} from "@/api";
import ZDailog from "@/components/ZDailog";
import {sleep, transformTimeShort} from "@/tool/utils";

const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const table = ref()
const buList = ref([])
const menu = ['用户管理', '记录管理', '文件管理', '发布通知']

const NEW_USER_PARAMS = reactive({
  name: '',
  password: '',
  bu: '',
  isAdmin: false,
  rank: 1,
  clearAll: function () {
    this.bu = buList.value.length === 0 ? '' : buList.value[0].name
    this.name = ''
    this.password = ''
    this.isAdmin = false
    this.rank = 1
  },
  get: function () {
    return {
      name: this.name,
      password: this.password,
      isAdmin: this.isAdmin,
      bu: this.bu,
      rank: this.rank
    }
  }
})

const NEW_NOTICE_PARAMS = reactive({
  text: '',
  bu: [],
  isGlobal: false,
  expiredTime: '',
  startTime: transformTimeShort(),
  clearAll: function () {
    this.text = ''
    this.bu = []
    this.isGlobal= false
    this.expiredTime= ''
    this.startTime=  transformTimeShort()
  },
  get: function () {
    return {
      text: this.text,
      bu: this.bu,
      isGlobal: this.isGlobal,
      expiredTime: this.expiredTime,
      startTime: this.startTime,
    }
  }
})

const SEARCH_PARAMS = reactive({
  menuIndex: 0,
  page: 1,
  pageSize: 20,
  bu: computed(() => buList.value.filter(it => it.checked)),
  userids: [],
  clearAll: function () {
    this.page = 1
    this.userids = []
    buList.value.forEach(it => it.checked = false)
  }
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
  _00: false, _01: false, _10: false, _22: false, _30: false,
  isDeleteBtnShake: false, isDeleteDailogShow: false, deleteConfirmBtn: false,
  isBuSelectDailogShow: false, buSelectConfirmBtn: false,
  isAddUserDailogShow: false, isAddUserConfirmBtn: false, isAddUserConfirmBtnShake: false,
  isAddNoticeDailogShow: true, isAddNoticeConfirmBtn: false, isAddNoticeConfirmBtnShake: false
})

const setProps = (res, selectPage) => {
  pageProp.currentPage = selectPage
  pageProp.totalPage = res.totalPage
  tableProp.pairs = res.pairs
  tableProp.items = res.items
}

const selectPageHandler = (page=SEARCH_PARAMS.page, paginationDisplay=true) => {
  SEARCH_PARAMS.page = parseInt(page)
  pageProp.visible = paginationDisplay
  selectHandler().finally(() => pageProp.visible = false)
}

const menuSelect = (index) => {
  if (index === SEARCH_PARAMS.menuIndex) {
    return
  }
  SEARCH_PARAMS.menuIndex = index
  SEARCH_PARAMS.clearAll()
  selectPageHandler()
}

function addUserHandler() {
  const regExp = new RegExp("([a-z|A-Z]|[.|@]|[0-9]){6,16}");
  if ( !regExp.test(NEW_USER_PARAMS.name) || !regExp.test(NEW_USER_PARAMS.password) || NEW_USER_PARAMS.bu === '') {
    sleep(800, () => {
      BUTTON_LOADER.isAddUserConfirmBtnShake = true
      store.commit('unshiftNotice', {type: 2, message: '输入必要字段'})
    }).then(() => BUTTON_LOADER.isAddUserConfirmBtnShake = false)
    return
  }
  BUTTON_LOADER.isAddUserConfirmBtn = true
  ADD_NEW_USER(NEW_USER_PARAMS.get())
      .then(() => store.commit('unshiftNotice', {type: 1, message: '新用户已添加'}))
      .finally(() => {
        BUTTON_LOADER.isAddUserConfirmBtn = false
        BUTTON_LOADER.isAddUserDailogShow = false
      })
}

function addNoticeHandler() {
  if (NEW_NOTICE_PARAMS.text.length < 5 || NEW_NOTICE_PARAMS.text.length > 60 || NEW_NOTICE_PARAMS.expiredTime === '') {
    sleep(800, () => {
      BUTTON_LOADER.isAddNoticeConfirmBtnShake = true
      store.commit('unshiftNotice', {type: 2, message: '输入必要字段'})
    }).then(() => BUTTON_LOADER.isAddNoticeConfirmBtnShake = false)
    return
  }
  BUTTON_LOADER.isAddNoticeConfirmBtn = true
  ADD_NEW_NOTICE(NEW_NOTICE_PARAMS.get())
      .then(() => store.commit('unshiftNotice', {type: 1, message: '新通知已添加'}))
      .finally(() => {
        BUTTON_LOADER.isAddNoticeConfirmBtn = false
        BUTTON_LOADER.isAddNoticeDailogShow = false
      })
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
    BUTTON_LOADER.isDeleteDailogShow = false
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
    case '00': // 打开部门选择对话框
      BUTTON_LOADER.isBuSelectDailogShow = true
      break
    case '01': {// 打开删除确认对话框
      if (table.value.isSelect.filter(it => it).length === 0) {
        sleep(800,
            () => BUTTON_LOADER.isDeleteBtnShake = true)
            .then(() => BUTTON_LOADER.isDeleteBtnShake = false)
        break
      }
      BUTTON_LOADER.isDeleteDailogShow = true
      break;
    }
    case '10': { // 新增用户对话框
      NEW_USER_PARAMS.clearAll()
      BUTTON_LOADER.isAddUserDailogShow = true
      break
    }
    case '22': { // 清除所有筛选条件
      SEARCH_PARAMS.clearAll()
      BUTTON_LOADER._22 = true
      selectHandler().finally(() => BUTTON_LOADER._22 = false)
      break
    }
    case '30': {
      NEW_NOTICE_PARAMS.clearAll()
      BUTTON_LOADER.isAddNoticeDailogShow = true
      break
    }
  }
}

onMounted(() => {
  selectPageHandler()
  GET_BU({}).then(it => {
    buList.value = it.buList.map(it => {
      return {name: it, checked: false}
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
textarea:invalid,
input:invalid {
  @apply border-dashed border-red-600
}
.selected-item {
  @apply border-indigo-500 bg-indigo-500 text-white select-none
}
.new-user-input {
  @apply focus:outline-none border rounded-lg px-2 py-0.5 select-none
}
.select-item {
  @apply px-3 py-0.5 border rounded-2xl cursor-pointer
}
.menu-base {
  @apply hover:text-blue-500 rounded-md px-2 py-1.5 cursor-pointer text-gray-700 select-none
}
.select-menu {
  @apply bg-blue-200 text-blue-500 italic;
}
.fade-leave-active {
  animation: fade ease-in-out .15s reverse;
}
.fade-enter-active {
  animation: fade ease-in-out .15s;
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