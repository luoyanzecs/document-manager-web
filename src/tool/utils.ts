import {Ref} from "vue";

export const sleep = (time: number, callback?: Function) => {
  if (callback) { callback() }
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}

export const revert = (bool:Ref<boolean>) => {
  bool.value = !bool.value
}

export const revertArray= (...values:Ref<boolean>[]) => {
  values.forEach(revert)
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