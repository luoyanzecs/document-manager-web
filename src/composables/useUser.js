import { emitNotice } from '@/tool/utils';
import { noticeInquiry } from '@/tool/utils';
import { LOGIN } from '@/api';
import { StorageSerializers, useStorage } from '@vueuse/core';
import { reactive } from 'vue';
import router from "@/router";


const user = useStorage('user', {}, undefined, {
  serializer: StorageSerializers.object
})

export const useUser = () => {

  const loginForm = reactive({
    username: '',
    password: '',
    role: true
  })

  const loadUserWithCheck = () => {
    if (user.value === undefined || user.value === null || user.value.userId === undefined) {
      router.push("/")
        .then(() => emitNotice({ message: '身份过期， 请重新登录', type: 0 }))
    }

    return user
  }


  const login = () => {
    return LOGIN({ username: loginForm.username, password: loginForm.password, role: loginForm.role ? '用户' : '管理员' })
      .then(it => {
        user.value = { token: it.token, ...it.userInfo }

        router.push(loginForm.role ? '/user' : '/admin').then(() => noticeInquiry())
      })
  }

  const logout = () => {
    user.value = null
    router.push("/")
  }


  return {
    login,
    logout,
    loadUserWithCheck,
    loginForm
  }
}