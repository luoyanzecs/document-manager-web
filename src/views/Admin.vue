<template>
  <el-container
      class="layout-container-demo"
      style="height: 100vh; width:100vw;"
  >
    <Aside>
      <template v-slot:context>
        <h1 class="mb-2">管理员界面</h1>
        <el-menu
            default-active="1"
            style="border-right: none; width: 200px; margin-top: 32px"
        >
          <el-menu-item index="1" @click="menuSelect(1)">
            <h1>用户管理</h1>
          </el-menu-item>
          <el-menu-item index="2" @click="menuSelect(2)">
            <h1>记录管理</h1>
          </el-menu-item>
          <el-menu-item index="3" @click="menuSelect(3)">
            <h1>文件管理</h1>
          </el-menu-item>
          <el-menu-item index="4" @click="menuSelect(4)">
            <h1>发布通知</h1>
          </el-menu-item>
        </el-menu>
      </template>
    </Aside>
    <el-container>
      <el-header>
        <Header>
          <template v-slot:tools>
            <keep-alive>
              <component :is="headComponent[headType]"/>
            </keep-alive>
          </template>
          <template v-slot:avatar>
            <el-popover placement="bottom" :width="200" trigger="hover">
              <template #reference>
                <el-avatar>admin</el-avatar>
              </template>
              <h1>hello</h1>
            </el-popover>
          </template>
        </Header>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #FFFFFF;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #eee;
}
</style>

<script setup>
import {ref, reactive} from "vue";
import router from "@/router";
import UserTool from "@/components/admin/toolbar/UserTool.vue"
import BehaviorTool from "@/components/admin/toolbar/BehaviorTool.vue"
import NoticeTool from "@/components/admin/toolbar/NoticeTool.vue"
import FileTool from "@/components/admin/toolbar/FileTool.vue"
import Aside from "@/components/common/Aside";
import Header from "@/components/common/Header";

const headType = ref(1)

const headComponent = reactive({
  1: UserTool,
  2: BehaviorTool,
  3: FileTool,
  4: NoticeTool
})

const menuSelect = (index) => {
  let root = '/admin'
  switch (index) {
    case 1:
      headType.value = 1
      router.push(`${root}/userManage`)
      break
    case 2:
      headType.value = 2
      router.push(`${root}/behaviorManage`)
      break
    case 3:
      headType.value = 3
      router.push(`${root}/fileManage`)
      break
    case 4:
      headType.value = 4
      router.push(`${root}/noticeManage`)
      break
  }
}

</script>