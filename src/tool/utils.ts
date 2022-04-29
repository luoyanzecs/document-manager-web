import {Ref} from "vue";
import router from "@/router";
import {store} from "@/store";
import {NOTICE_GLOBAL} from "@/api";

export interface userStore {
  username?: string,
  avatar?: string,
  userId?: number,
  bu?: number,
  rank?: number,
  role?: string,
  token?: string,
}

export interface Notice {
  delay?: number,
  id?: string,
  type: number,
  message: string
}

export const updateUserStore = (userInfo: userStore, token: string): void => {
  localStorage.setItem('name', userInfo.username ?? "")
  localStorage.setItem('avatar', userInfo.avatar ?? "")
  localStorage.setItem('userId', String(userInfo.userId ?? -1))
  localStorage.setItem('bu', String(userInfo.bu ?? -1))
  localStorage.setItem('rank', String(userInfo.rank ?? -1))
  localStorage.setItem('token', token)
}

export const emitNotice = (param: Notice): void => {
  store.commit('unshiftNotice', param)
}

export const noticeInquiry = () => NOTICE_GLOBAL({})
    .then((it: any) => {
      it.notices.forEach((notice: Notice) => emitNotice(notice))
      sleep(60 * 1000).then(() => noticeInquiry())
    })

export const loadUserStore = (): userStore  => {
  const user: userStore = {
      username: localStorage.getItem('name')!,
      avatar: localStorage.getItem('avatar')!,
      userId: parseInt(localStorage.getItem('userId')!),
      bu: parseInt(localStorage.getItem('bu')!),
      rank: parseInt(localStorage.getItem('rank')!),
      role: localStorage.getItem('role')!,
      token: localStorage.getItem('token')!
    }
    if (user.userId === null || user.username === null) {
      router.push("/")
          .then(() => emitNotice({ message: '身份过期， 请重新登录', type: 0 }))
    }
    return user

}

export const sleep = (time: number, callback?: Function) => {
  if (callback) { callback() }
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}

export const revert = (bool:Ref<boolean>) => {
  bool.value = !bool.value
}


export function transformTime(timestamp: number = +new Date()) {
  if (timestamp) {
    const time = new Date(timestamp);
    const y = time.getFullYear();
    const M = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    return y + '年' + addZero(M) + '月' + addZero(d) + '日 ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s);
  } else {
    return '';
  }
}
function addZero(m:number) {
  return m < 10 ? '0' + m : m;
}

export function transformTimeShort(timestamp: number = +new Date()) {
  if (timestamp) {
    const time = new Date(timestamp);
    const y = time.getFullYear();
    const M = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    return y + '-' + addZero(M) + '-' + addZero(d);
  } else {
    return '';
  }
}