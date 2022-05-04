import { emitNotice } from '@/tool/utils';
import { noticeInquiry } from '@/tool/utils';
import { LOGIN } from '@/api';
import { StorageSerializers, useStorage } from '@vueuse/core';
import {reactive, Ref} from 'vue';
import router from "@/router";

interface UserModel {
  userId?: number,
  bu?: number,
  role?: number,
  avatar?: string,
  rank?: number,
  name?: string,
  token?: string
}


const user: Pick<Ref<UserModel | null>, any> = useStorage('user', {}, undefined, {
  serializer: StorageSerializers.object
})

export const useUser = () => {

  const loginForm = reactive({
    username: '',
    password: '',
    role: true
  })

  const loadUserWithCheck = (): Pick<Ref<UserModel | null>, 'value'> => {
    if (user.value === undefined || user.value === null || user.value.userId === undefined) {
      router.push("/")
        .then(() => emitNotice({ message: '身份过期， 请重新登录', type: 0 }))
    }

    return user
  }


  const login = (): Promise<any> => {
    return LOGIN({ username: loginForm.username, password: loginForm.password, role: loginForm.role ? '用户' : '管理员' })
      .then((it: { token: string, userInfo: UserModel }) => {
        user.value = { token: it.token, ...it.userInfo }

        router.push(loginForm.role ? '/user' : '/admin').then(() => noticeInquiry())
      })
  }

  const logout = (): void => {
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