<template>
  <div class="pos-center flex-col gap-8 w-full">
    <div class="min-h-screen max-w-screen-xl pos-center flex-col space-y-8 ">
      <div class="rounded-full h-32 w-32 flex items-center justify-center bg-gradient-to-bl from-green-400 to-blue-500 filter blur-sm"></div>
      <div>
        <span class="text-xl font-bold tracking-widest">登录</span>
      </div>
      <input class="input-home" type="text" v-model="account" spellcheck="false" placeholder="输入账号"/>
      <input class="input-home" type="password" v-model="password" placeholder="输入密码">
      <z-switch class="py-2 font-light" left="管理员" right="员工" v-model:value="role"/>
      <div class="transform scale-110">
        <z-button fill="登录" :class="{'animate-shake' : isButtonShake}" :load-visible="loadVisible"
                  @click="loginHandler"/>
      </div>

    </div>
    <div class="justify-center text-gray-400 py-8 ">
      <p>Copyright © 2021-2022 Yanze Luo</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ZButton from "@/components/ZButton";
import ZSwitch from "@/components/ZSwitch";
import {LOGIN} from "@/api";
import {emitNotice, noticeInquiry, sleep, updateUserStore} from "@/tool/utils.ts";

const router = useRouter()

const role = ref(true)
const account = ref('')
const password = ref('')
const loadVisible = ref(false)
const loginCheck = computed(() => account.value.length >= 6 && password.value.length >= 6)
const isButtonShake = ref(false)

const loginHandler = () => {
  if (!loginCheck.value) {
    isButtonShake.value = true
    emitNotice({ id: Date.now() + '', type: 2, message: '请输入正确的账号和密码' })
    sleep(700).then(() => isButtonShake.value = false)
    return
  }
  loadVisible.value = true
  LOGIN({username: account.value, password: password.value, role: role.value ? '用户': '管理员'})
      .then(it => {
        updateUserStore(it.userInfo, it.token)
        localStorage.setItem('role', role.value ? '用户': '管理员')
        router.push(role.value ? '/user' : '/admin').then(() => noticeInquiry())
      })
      .finally(() => loadVisible.value = false)
}
</script>

<style>
.input-home {
  @apply bg-gray-300 rounded-full py-3 px-6 text-gray-500 w-72 focus:border-blue-500
}
</style>