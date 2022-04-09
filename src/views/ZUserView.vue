<template>
  <z-aside>
    <template #right>
      <z-button :fill="bu" @click="buttonClickHandler('selectBu')"/>
    </template>
    <template #context>
      <div class="m-4 text-lg tracking-wide font-medium text-gray-800 dark:text-white">文件目录</div>
      <div class="overflow-auto">
        <z-tree :catalogue="APIRES.menuItems" :choose-id="chooseFileId" :is-menu-load="LOADER.isMenuLoad"
                @select-file="selectFileHandler"/>
      </div>
    </template>
  </z-aside>
  <div class="h-screen flex-grow flex flex-col">
    <Header>
      <template #tools>
        <z-head-menu>
          <z-button fill="搜索" @click="buttonClickHandler('search')"/>
          <z-button fill="新建" @click="buttonClickHandler('newFile')"/>
          <z-button v-show="LOADER.isEditorShow" fill="附件" @click="buttonClickHandler('attach')"/>
          <z-button :fill="editorStatus" @click="buttonClickHandler('edit')" :load-visible="LOADER.isUpdateFileLoad"/>
        </z-head-menu>
      </template>
      <template #avatar>
        <z-avatar :image="userInfo.avatar"/>
      </template>
    </Header>
    <div class="overflow-auto flex-grow flex flex-col items-stretch">
      <template v-if="LOADER.isEditorShow">
        <z-editor v-model:content="content"/>
        <div class="flex p-4 items-center gap-2">
          <div class="border rounded-lg h-24 w-20 bg-gray-50 shadow pos-center">
            <span class="text-sm text-gray-500 cursor-pointer">附件1</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div v-if="LOADER.isCtxLoad" class="animate-pulse flex flex-col gap-2 p-4 min-h-30">
          <p class="h-4 bg-gray-300 w-5/12 rounded-lg"></p>
          <template v-for="i in 4" :key="i">
            <p class="h-4 bg-gray-300 w-full rounded-lg"></p>
            <p class="h-4 bg-gray-300 w-full rounded-lg"></p>
            <p class="h-4 bg-gray-300 w-full rounded-lg"></p>
            <p class="h-4 bg-gray-300 w-7/12 rounded-lg"></p>
          </template>
        </div>
        <div v-if="APIRES.fileInfo && !LOADER.isCtxLoad" class="p-4 min-h-30 wrap">
          <p class="mb-1.5 text-gray-400 text-sm">上次编辑于 {{ APIRES.fileInfo.lastEditTime }} by {{APIRES.fileInfo.editor }}</p>
          <div v-html="content"></div>
          <div class="flex py-8 items-center gap-2">
            <div class="border rounded-lg h-24 w-20 bg-gray-50 shadow pos-center">
              <span class="text-sm text-gray-500 cursor-pointer">附件1</span>
            </div>
          </div>
        </div>
        <div v-if="APIRES.fileInfo" class="pb-16">
          <hr class="my-4">
          <z-comment :info="userInfo" :comments-list="APIRES.comments" :is-comment-load="LOADER.isCommentLoad"/>
        </div>
      </template>
    </div>
  </div>
  <transition-group name="fade">
    <div v-show="LOADER.isShowCreateBtnDailog" :key="1"
         class="absolute z-30 left-0 top-0 w-screen h-screen pos-center bg-black bg-opacity-50" @click.stop>
      <div class="w-7/12 bg-white rounded-xl p-4 flex flex-col gap-4">
        <p class="text-2xl text-gray-700">请确认您的信息</p>
        <hr>
        <div class="space-x-4 flex items-center text-gray-500">
          <p class="w-24 border-r-2 px-2">当前部门</p>
          <p>{{ bu }}</p>
        </div>
        <div class="space-x-4 flex items-center text-gray-500">
          <p class="w-24 border-r-2 px-2 flex-shrink-0">文件位置</p>

          <z-location-select :items="APIRES.menuItems"/>
        </div>
        <div class="space-x-4 flex items-center text-gray-500">
          <label class="w-24 border-r-2 px-2" for="createFileName">文件名</label>
          <input type="text" v-model="newFile.name" class="border rounded-lg px-2 py-1 w-72 focus:outline-none" id="createFileName"
                 placeholder="输入文件名" spellcheck="false">
        </div>
        <div class="space-x-4 flex items-center text-gray-500">
          <p class="w-24 border-r-2 px-2">文件夹？</p>
          <p class="cursor-pointer text-blue-500" @click="newFile.isDir = !newFile.isDir">{{ newFile.isDir ? '是' : '否' }}</p>
        </div>
        <div class="space-x-4 py-2">
          <z-button @click="buttonClickHandler('newFileConfirm')" :load-visible="LOADER.isCreateFileLoad">确认</z-button>
          <z-button @click="LOADER.isShowCreateBtnDailog = !LOADER.isShowCreateBtnDailog">取消</z-button>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from 'vue'
import Header from "@/components/ZHeader.vue";
import ZHeadMenu from "@/components/ZHeadMenu";
import ZButton from "@/components/ZButton";
import ZAside from "@/components/ZAside.vue";
import ZAvatar from "@/components/ZAvatar.vue";
import ZTree from "@/components/ZTree.vue";
import ZComment from "@/components/ZComment.vue";
import {FILE_MENU, COMMENT, GET_FILE, UPDATE_FILE, CREATE_FILE} from "@/api";
import {useStore} from "vuex";
import ZEditor from "@/components/ZEditor";
import { html2json } from "html2json"
import ZLocationSelect from "@/components/ZLocationSelect";

const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const bu = ref(userInfo.value.bu.length === 0 ? '部门' : userInfo.value.bu)
const content = ref('')
const APIRES = reactive({
  fileInfo: undefined,
  menuItems: [],
  comments: []
})
const LOADER = reactive({
  isMenuLoad: true,
  isEditorShow: false,
  isCtxLoad: false,
  isCommentLoad: false,
  isShowCreateBtnDailog: false,
  isUpdateFileLoad: false,
  isCreateFileLoad: false
})
const chooseFileId = ref('')
const editorStatus = computed(() => LOADER.isEditorShow ? '更新' : '编辑')
const newFile = reactive({
  isDir: false,
  name: '',
  parentDirId: ''
})

onMounted(() => {
  FILE_MENU({bu: store.state.userInfo.bu}).then(it => {
    LOADER.isMenuLoad = false
    it.items.forEach(item => APIRES.menuItems.push(item))
  })
})

const buttonClickHandler = (index) => {
  switch (index) {
    case 'search':
      break
    case 'newFile':
      LOADER.isShowCreateBtnDailog = true
      break
    case 'attach':
      break
    case 'edit': {
      if (APIRES.fileInfo === undefined) {
        store.commit('unshiftNotice', {type: 3, message: '当前没有可编辑的文件'})
        return
      }
      if (LOADER.isEditorShow) {
        let json = html2json(content.value);
        LOADER.isUpdateFileLoad = true
        const params = {
          fileId: chooseFileId.value,
          jsonValue: json
        }
        UPDATE_FILE(params).then(it => {
          console.log(it);
          LOADER.isEditorShow = false
          LOADER.isUpdateFileLoad = false
          store.commit('unshiftNotice', {type: 1, message: '更新成功'})
        }).catch(() => {
          LOADER.isUpdateFileLoad = false
          LOADER.isEditorShow = false
        })
      } else {
        LOADER.isEditorShow = true
      }
      break
    }
    case 'newFileConfirm':{
      LOADER.isCreateFileLoad = true
      const params = {
        title: newFile.name,
        bu: bu.value,
        userid: userInfo.value.id,
        isDir: newFile.isDir,
        parentId: newFile.parentDirId
      }
      CREATE_FILE(params).then(it => {
        console.log(it)
        LOADER.isCreateFileLoad = false
        LOADER.isShowCreateBtnDailog = false
        store.commit('unshiftNotice', {type: 1, message: '创建成功'})
      }).catch(() => {
        LOADER.isCreateFileLoad = false
        LOADER.isShowCreateBtnDailog = false
      })
      break
    }
    case 'selectBu':
      break
  }
}

const selectFileHandler = (param) => {
  LOADER.isEditorShow = false
  LOADER.isCtxLoad = true
  LOADER.isCommentLoad = true
  chooseFileId.value = param.id
  GET_FILE({id: param.id}).then(it => {
    LOADER.isCtxLoad = false
    APIRES.fileInfo = it.fileInfo
    content.value = APIRES.fileInfo.fileContent
  }).catch(() => LOADER.isCtxLoad = false)

  COMMENT({id: param.id}).then(it => {
    LOADER.isCommentLoad = false
    APIRES.comments.splice(0, APIRES.comments.length)
    it.comments.forEach((comment) => APIRES.comments.push(comment))
  }).catch(() => LOADER.isCommentLoad = false)
}

</script>

<style scoped>
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

/deep/ .wrap ul {
  list-style-type: disc !important;
  margin-left: 1rem;
}

/deep/ .wrap ul li {
  list-style: disc !important;
}

/deep/ .wrap ol {
  list-style-type: decimal !important;
  margin-left: 1rem;
}

/deep/ .wrap ol li {
  list-style: decimal !important;
}

/deep/ .wrap th {
  @apply border border-gray-300 px-2 py-1 bg-gray-100
}

/deep/ .wrap td {
  @apply border border-gray-300 px-4 py-1
}
</style>