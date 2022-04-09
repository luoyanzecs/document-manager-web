import {Ref} from "vue";

export const sleep = (time: number) => {
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}

export const revert = (bool:Ref<boolean>) => {
  bool.value = !bool.value
}

export const revertArray= (...values:Ref<boolean>[]) => {
  values.forEach(revert)
}