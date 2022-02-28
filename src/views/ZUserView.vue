<template>
  <z-aside>
    <template #right>
      <z-button type="primary">部门</z-button>
    </template>
    <template #context>
      <div class="m-2 text-lg tracking-wide font-medium text-gray-800 dark:text-white">文件目录</div>
      <div class="overflow-scroll flex-grow">
        <z-tree :catalogue="items" :is-menu-load="isMenuLoad" @select-file="selectFileHandler"/>
      </div>
    </template>
  </z-aside>
  <div class="h-screen flex-grow overflow-scroll">
    <Header>
      <template #tools>
        <head-tool :banner="banner" @editor="click"/>
      </template>
      <template #avatar>
        <!--              TODO：头像悬浮的组件 建议抽离出来-->
        <z-avatar :image="userInfo.avatar"/>
        <!--              -->
      </template>
    </Header>
    <div class>
      <Editor ref="editor"/>
      <hr class="my-4">
      <z-comment :info="myInfo" :comments-list="comments"/>
    </div>
  </div>
</template>


<style>
</style>

<script setup>
import Editor from "@/components/ZEditor";
import {computed, onMounted, ref} from 'vue'
import Header from "@/components/common/ZHeader";
import HeadTool from "@/components/user/HeadTool";
import ZAside from "@/components/common/ZAside";
import ZButton from "@/components/common/ZButton";
import ZAvatar from "@/components/ZAvatar";
import ZTree from "@/components/common/ZTree";
import ZComment from "@/components/common/ZComment";
import { FILE_MENU, COMMENT } from "@/api";
import {useStore} from "vuex";

const store = useStore()
const userInfo = computed(() => store.state.userInfo)

const editor = ref()
const banner = ref('编辑')
const items = ref([])
const comments = ref([])
const isMenuLoad = ref(true)

onMounted(() => {
  FILE_MENU({}).then(res => {
    console.log(res.data);
    isMenuLoad.value = false
    res.data.items.forEach(item => items.value.push(item))
  })
  COMMENT({}).then(res => {
    console.log(res.data)
    res.data.comments.forEach(comment => comments.value.push(comment))
  })
})

const selectFileHandler = (param) => {
  console.log(param)
}

const click = () => {
  if (banner.value === '编辑') {
    banner.value = '更新'
    editor.value.disable()
  } else {
    banner.value = '编辑'
    editor.value.enable()
  }
}

const myInfo = ref({
  name: 'Lana Del Rey',
  avatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
  id: 19870621,
})

</script>