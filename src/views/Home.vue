<template>
  <el-container>
    <el-main class="container min-h-screen max-w-screen-xl flex flex-col items-center space-y-8 justify-center ">
      <div class="rounded-full h-32 w-32 flex items-center justify-center bg-gray-700">头像</div>
      <div>
        <span class="text-xl font-bold tracking-widest">登录</span>
      </div>
      <input class="bg-gray-300 rounded-full py-3 px-6 text-gray-500 w-72"
             v-model="acount"
             placeholder="输入账号"/>
      <input class="bg-gray-300 rounded-full py-3 px-6 text-gray-500 w-72"
             v-model="password"
             placeholder="输入密码">
      <div class="flex gap-x-3 h-10 items-center">
        <div class="font-light tracking-widest">管理员</div>
        <el-switch class=""
                   width="40"
                   v-model="switchValue"
                   size="large"
                   active-color="#3B82F6"
                   inactive-color="#3B82F6"
        />
        <div class="font-light tracking-widest">员工</div>
      </div>

      <div>
        <home-button @click="loginHandler">登录</home-button>
      </div>
    </el-main>
    <el-footer>
      <el-row class="justify-center text-gray-400">
        <p>Copyright © 2021-2022 Yanze Luo</p>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HomeButton from "@/components/common/HomeButton";

const router = useRouter()
const switchValue = ref(true)
const acount = ref('')
const password = ref('')

const loginHandler = () => {
  if (switchValue.value) {
    router.push('/user')
  } else {
    router.push('/admin')
  }
}
</script>

<style>
</style>