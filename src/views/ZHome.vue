<template>
  <div class="flex flex-col space-y-8 justify-center items-center w-full">
    <div class="container min-h-screen max-w-screen-xl flex flex-col items-center space-y-8 justify-center ">
      <div class="rounded-full h-32 w-32 flex items-center justify-center bg-gradient-to-bl from-green-400 to-blue-500 filter blur-sm"></div>
      <div>
        <span class="text-xl font-bold tracking-widest">登录</span>
      </div>
      <input class="input-home"
             type="text"
             v-model="acount"
             spellcheck="false"
             placeholder="输入账号"/>
      <input class="input-home"
             type="password"
             v-model="password"
             placeholder="输入密码">
      <div class="flex gap-x-4 h-10 items-center pl-5">
        <div :class="{'switch-text': true, 'font-blue': !switchValue}">员工</div>
        <el-switch width="40"
                   v-model="switchValue"
                   size="large"
                   active-color="#3B82F6"
                   inactive-color="#3B82F6"
        />
        <div :class="{'switch-text': true, 'font-blue': switchValue}">管理员</div>
      </div>

      <div>
        <home-button @click="loginHandler">登录</home-button>
      </div>
    </div>
    <div class="justify-center text-gray-400 py-8 ">
        <p>Copyright © 2021-2022 Yanze Luo</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HomeButton from "@/components/common/ZHomeButton";

const router = useRouter()
const switchValue = ref(true)
const acount = ref('')
const password = ref('')

const loginHandler = () => {
  if (switchValue.value) {
    router.push('/admin')
  } else {
    router.push('/user')
  }
}
</script>

<style>
.input-home {
  @apply bg-gray-300 rounded-full py-3 px-6 text-gray-500 w-72 focus:border-blue-500 tracking-widest
}
.switch-text {
  @apply font-light tracking-widest;
}

.font-blue {
  @apply text-blue-500;
}
</style>