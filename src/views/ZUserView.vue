<template>
  <z-aside>
    <template #right>
      <z-button fill="部门" @click="selectBuHandler"/>
    </template>
    <template #context>
      <div class="m-4 text-lg tracking-wide font-medium text-gray-800 dark:text-white">文件目录</div>
      <div class="overflow-auto">
        <z-tree :catalogue="APIRES.menuItems" :choose-id="chooseFileId" :is-menu-load="LOADER.isMenuLoad" @select-file="selectFileHandler"/>
      </div>
    </template>
  </z-aside>
  <div class="h-screen flex-grow flex flex-col">
    <Header>
      <template #tools>
        <z-head-menu>
          <z-button fill="搜索"/>
          <z-button fill="新建"/>
          <z-button fill="附件"/>
          <z-button :fill="editorStatus" @click="buttonStatusClickHandler"/>
        </z-head-menu>
      </template>
      <template #avatar>
        <z-avatar :image="userInfo.avatar"/>
      </template>
    </Header>
    <div class="overflow-auto flex-grow flex flex-col items-stretch">
      <template v-if="LOADER.isEditorShow">
        <z-editor ref="editor" v-model:content="content"/>
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
import {FILE_MENU, COMMENT, GET_FILE} from "@/api";
import {useStore} from "vuex";
import ZEditor from "@/components/ZEditor";

const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const editor = ref()

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
  isCommentLoad: false
})
const chooseFileId = ref('')
const editorStatus = ref('编辑')

onMounted(() => {
  FILE_MENU({bu: store.state.userInfo.bu}).then(it => {
    LOADER.isMenuLoad = false
    it.items.forEach(item => APIRES.menuItems.push(item))
  })
})

const buttonStatusClickHandler = () => {
  editorStatus.value = editorStatus.value === '编辑' ? '更新' : '编辑'
  LOADER.isEditorShow = !LOADER.isEditorShow
}

const selectFileHandler = (param) => {
  LOADER.isEditorShow = false
  LOADER.isCtxLoad = true
  LOADER.isCommentLoad = true
  chooseFileId.value = param.id
  GET_FILE({id: param.id})
      .then(it => {
        LOADER.isCtxLoad = false
        APIRES.fileInfo = it.fileInfo
        content.value = APIRES.fileInfo.fileContent
      }).catch(() => LOADER.isCtxLoad = false)

  COMMENT({id: param.id})
      .then(it => {
        LOADER.isCommentLoad = false
        APIRES.comments.splice(0, APIRES.comments.length)
        it.comments.forEach((comment) => APIRES.comments.push(comment))
      }).catch(() => LOADER.isCommentLoad = false)
}

const selectBuHandler = () => {

}
</script>

<style scoped>
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