<template>
  <div class="pos-center flex-col space-y-8 w-full">
    <div class="min-h-screen max-w-screen-xl pos-center flex-col space-y-8 ">
      <div class="rounded-full h-32 w-32 flex items-center justify-center bg-gradient-to-bl from-green-400 to-blue-500 filter blur-sm"></div>
      <div>
        <span class="text-xl font-bold tracking-widest">登录</span>
      </div>
      <input class="input-home" type="text" v-model="account" spellcheck="false" placeholder="输入账号"/>
      <input class="input-home" type="password" v-model="password" placeholder="输入密码">
      <z-switch class="py-2 font-light" left="管理员" right="员工" v-model:value="switchValue"/>
      <div class="pos-center flex-col space-y-2">
        <svg :class="[loadVisible ? 'visible': 'invisible', 'animate-spin', 'h-4', 'w-4', 'text-gray-500', '-mt-2']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <home-button :class="{ 'animate-shake' : isButtonShake }" @click="loginHandler">登录</home-button>
      </div>

    </div>
    <div class="justify-center text-gray-400 py-8 ">
        <p>Copyright © 2021-2022 Yanze Luo</p>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import { useRouter } from 'vue-router'
import HomeButton from "@/components/common/ZHomeButton";
import ZSwitch from "@/components/common/ZSwitch";
import {LOGIN} from "@/api";
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()

const switchValue = ref(true)
const account = ref('')
const password = ref('')
const loadVisible = ref(false)
const loginCheck = computed(() => account.value.length >= 6 && password.value.length >= 6)
const isButtonShake = ref(false)

const loginHandler = () => {
  if (!loginCheck.value) {
    isButtonShake.value = true
    store.commit('unshiftNotice', {
      id: Date.now() + '',
      type: 2,
      message: '请输入正确的账号和密码'
    })
    setTimeout(() => isButtonShake.value = false, 700)
    return
  }
  loadVisible.value = true
  LOGIN({
    acount: account.value,
    password: password.value
  }).then(res => {
    console.log(res.data)
    loadVisible.value = false
    store.commit('updateUserInfo', res.data.userInfo)
    router.push(switchValue.value ? '/user' : '/admin')
  })
}
</script>

<style>
.input-home {
  @apply bg-gray-300 rounded-full py-3 px-6 text-gray-500 w-72 focus:border-blue-500
}
.switch-text {
  @apply font-light tracking-widest;
}

.font-blue {
  @apply text-blue-500;
}
</style>