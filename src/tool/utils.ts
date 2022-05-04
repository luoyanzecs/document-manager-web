import {Ref} from "vue";
import {store} from "@/store";
import {NOTICE_GLOBAL} from "@/api";

export interface Notice {
  delay?: number,
  id?: string,
  type: number,
  message: string
}

export const getUUID = (): string => {
    function S4() {
      return (((1+Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return S4() + S4() +S4() + S4() + S4()+ S4() + S4() + S4()
}

export function hashCode(str: string): string{
  let hashcode = 0;
  for(let i = 0; i < str.length; i++){
    //溢出需要每次运算后立即处理，否则可能超过js数值的表示范围。
    hashcode = hashcode*31 + str.charCodeAt(i);
    hashcode &= 0xffffffff;
  }
  return String(hashcode);
}


export const emitNotice = (param: Notice): void => {
  store.commit('unshiftNotice', param)
}

export const noticeInquiry = () => NOTICE_GLOBAL({})
    .then((it: any) => {
      it.notices.forEach((notice: Notice) => emitNotice(notice))
      sleep(60 * 1000).then(() => noticeInquiry())
    })


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