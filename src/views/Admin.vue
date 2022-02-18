<template>
  <div class="container max-w-screen-2xl flex">
    <Aside>
      <template v-slot:context>
        <div class="my-4 text-lg tracking-wide font-medium text-gray-800 dark:text-white">管理员界面</div>
        <div class="flex flex-col gap-2 text-xl font-light tracking-widest mt-4">
          <div v-for="(item, index) in menu"
               :key="index"
               @click="menuSelect(index)"
               :class="{'select-menu': index === currentIndex, 'menu-base': true}"
          >{{ item }}
          </div>
        </div>
      </template>
    </Aside>
    <div class="h-screen flex-grow overflow-scroll">
      <Header>
        <template v-slot:tools>
          <keep-alive>
            <component :is="headComponent[headType]"/>
          </keep-alive>
        </template>
        <template v-slot:avatar>
          <el-popover placement="bottom"
                      :width="200"
                      trigger="hover">
            <template #reference>
              <el-avatar :icon="UserFilled"></el-avatar>
            </template>
            <h1>hello</h1>
          </el-popover>
        </template>
      </Header>
      <div class="m-4">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style>
.menu-base {
  @apply hover:text-blue-500 rounded-md px-2 py-1.5 cursor-pointer text-gray-700
}

.select-menu {
  @apply bg-blue-200 text-blue-500 italic;
}
</style>

<script setup>
import {ref, reactive} from "vue";
import router from "@/router";
import { UserFilled } from "@element-plus/icons-vue"
import UserTool from "@/components/admin/toolbar/UserTool.vue"
import BehaviorTool from "@/components/admin/toolbar/BehaviorTool.vue"
import NoticeTool from "@/components/admin/toolbar/NoticeTool.vue"
import FileTool from "@/components/admin/toolbar/FileTool.vue"
import Aside from "@/components/common/Aside";
import Header from "@/components/common/Header";

const headType = ref(1)
const headComponent = reactive({
  0: UserTool,
  1: BehaviorTool,
  2: FileTool,
  3: NoticeTool
})
const currentIndex = ref(0)

const menu = ['用户管理', '记录管理', '文件管理', '发布通知']
const routes = ['user', 'behavior', 'file', 'notice']

const menuSelect = (index) => {
  currentIndex.value = index
  headType.value = index
  router.push(`/admin/${routes[index]}`)
}

</script>