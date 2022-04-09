<template>
  <z-aside>
    <template #right>
      <z-button fill="部门" @click="selectBuHandler"/>
    </template>
    <template #context>
      <div class="m-4 text-lg tracking-wide font-medium text-gray-800 dark:text-white">文件目录</div>
      <div class="overflow-auto">
        <z-tree :catalogue="items" :is-menu-load="LOADER.isMenuLoad" @select-file="selectFileHandler"/>
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
        <div v-else class="p-4 min-h-30">
          <z-context :ctx="content" :file-info="fileInfo"/>
        </div>
        <div v-if="LOADER.isPageShow" class="pb-16">
          <hr class="my-4">
          <z-comment :info="userInfo" :comments-list="comments" :is-comment-load="LOADER.isCommentLoad"/>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
</style>

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
import ZContext from "@/components/ZContext";
import ZEditor from "@/components/ZEditor";

const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const editor = ref()

const content = ref('')
const fileInfo = ref(undefined)
const items = ref([])
const comments = ref([])
const LOADER = reactive({
  isMenuLoad: true,
  isEditorShow: false,
  isCtxLoad: false,
  isCommentLoad: false,
  isPageShow: false
})
const editorStatus = ref('编辑')

onMounted(() => {
  FILE_MENU({bu: store.state.userInfo.bu}).then(it => {
    LOADER.isMenuLoad = false
    it.items.forEach(item => items.value.push(item))
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
  LOADER.isPageShow = true
  GET_FILE({id: param.id})
      .then(it => {
        LOADER.isCtxLoad = false
        fileInfo.value = it.fileInfo
        content.value = fileInfo.value.fileContent
      }).catch(() => LOADER.isCtxLoad = false)

  COMMENT({id: param.id})
      .then(it => {
        LOADER.isCommentLoad = false
        comments.value.splice(0, comments.value.length)
        it.comments.forEach((comment) => comments.value.push(comment))
      }).catch(() => LOADER.isCommentLoad = false)
}

const selectBuHandler = () => {

}
</script>