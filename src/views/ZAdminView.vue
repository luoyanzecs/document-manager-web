<template>
  <z-aside>
      <template v-slot:context>
        <div class="m-4 text-lg tracking-wide font-medium text-gray-800 dark:text-white">管理员界面</div>
        <div class="mx-4 flex flex-col gap-2 text-xl font-light tracking-widest mt-4">
          <div v-for="(item, index) in menu"
               :key="index"
               @click="menuSelect(index)"
               :class="{'select-menu': index === currentIndex, 'menu-base': true}"
          >{{ item }}
          </div>
        </div>
      </template>
    </z-aside>
  <div class="h-screen flex-grow overflow-scroll">
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
      <div class="py-4 px-8 flex flex-col justify-center items-center">
        <router-view/>
      </div>
    </div>
</template>

<script setup>
import {computed, ref} from "vue";
import router from "@/router";
import UserTool from "@/components/admin/toolbar/ZUserTool.vue"
import RecordTool from "@/components/admin/toolbar/ZRecordTool.vue"
import NoticeTool from "@/components/admin/toolbar/ZNoticeTool.vue"
import FileTool from "@/components/admin/toolbar/ZFileTool.vue"
import ZAside from "@/components/common/ZAside";
import ZHeader from "@/components/common/ZHeader";
import ZAvatar from "@/components/ZAvatar";
import {useStore} from "vuex";

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
const routes = ['user', 'behavior', 'file', 'notice']

const menuSelect = (index) => {
  currentIndex.value = index
  headType.value = index
  router.push(`/admin/${routes[index]}`)
}

</script>

<style>
.menu-base {
  @apply hover:text-blue-500 rounded-md px-2 py-1.5 cursor-pointer text-gray-700
}

.select-menu {
  @apply bg-blue-200 text-blue-500 italic;
}
</style>