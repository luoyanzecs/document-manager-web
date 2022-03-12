<template>
  <z-aside>
    <template #right>
      <z-button fill="部门" @click="selectBuHandler"/>
    </template>
    <template #context>
      <div class="m-4 text-lg tracking-wide font-medium text-gray-800 dark:text-white">文件目录</div>
      <div class="overflow-auto">
        <z-tree :catalogue="items" :is-menu-load="isMenuLoad" @select-file="selectFileHandler"/>
      </div>
    </template>
  </z-aside>
  <div class="h-screen flex-grow flex flex-col ">
    <Header ref="head">
      <template #tools>
        <head-tool @editor="click"/>
      </template>
      <template #avatar>
        <z-avatar :image="userInfo.avatar"/>
      </template>
    </Header>
    <div class="overflow-auto flex-grow flex flex-col items-stretc pb-16" ref="son">
      <z-tinymce v-if="isEditorShow" v-model:model-value="content" :height="height"/>
      <template v-else>
        <div v-if="isCtxLoad" class="animate-pulse flex flex-col gap-2 p-4 min-h-30">
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
        <div v-if="isPageShow">
          <hr class="my-4">
          <z-comment :info="userInfo" :comments-list="comments" :is-comment-load="isCommentLoad"/>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
</style>

<script setup>
import {computed, onMounted, ref} from 'vue'
import Header from "@/components/ZHeader.vue";
import HeadTool from "@/components/head/user/HeadTool.vue";
import ZAside from "@/components/ZAside.vue";
import ZButton from "@/components/ZButton.vue";
import ZAvatar from "@/components/ZAvatar.vue";
import ZTree from "@/components/ZTree.vue";
import ZComment from "@/components/ZComment.vue";
import {FILE_MENU, COMMENT, GET_FILE} from "@/api";
import {useStore} from "vuex";
import ZTinymce from "@/components/ZTinymce.vue";
import ZContext from "@/components/ZContext";
import {refineHtml, revert} from "@/tool/utils.ts";

const store = useStore()
const userInfo = computed(() => store.state.userInfo)

const content = ref('')
const fileInfo = ref(undefined)
const items = ref([])
const comments = ref([])
const isMenuLoad = ref(true)
const isEditorShow = ref(false)
const height = ref(0)
const head = ref()
const isCtxLoad = ref(false)
const isCommentLoad = ref(false)
const isPageShow = ref(false)
const son = ref()

onMounted(() => {
  FILE_MENU({}).then(res => {
    console.log(res.data);
    isMenuLoad.value = false
    res.data.items.forEach(item => items.value.push(item))
  })
})

const selectFileHandler = (param) => {
  isEditorShow.value = false
  isCtxLoad.value = true
  isCommentLoad.value = true
  isPageShow.value = true
  GET_FILE({}).then(res => {
    isCtxLoad.value = false
    content.value = res.data.fileContent
    fileInfo.value = res.data.fileInfo
  })

  COMMENT({}).then(res => {
    isCommentLoad.value = false
    console.log(res.data)
    comments.value.splice(0, comments.value.length)
    res.data.comments.forEach((comment) => comments.value.push(comment))
  })
  console.log(param)
}

const click = () => {
  revert(isEditorShow)
  height.value = document.body.clientHeight - 64
  content.value = refineHtml(content.value)
}

const selectBuHandler = () => {

}
</script>