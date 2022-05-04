import {StorageSerializers, useStorage} from '@vueuse/core';
import {GET_BU} from "@/api";
import {useUser} from "./useUser";
import {computed} from 'vue';


const { loadUserWithCheck } = useUser()

const user = loadUserWithCheck()

const buModels = useStorage('bus', [], undefined, {
  serializer: StorageSerializers.object
})

export const useBu = () => {

  const userBuModel = () => {
    return computed(() => buModels.value.find(it => it.buId = user.value.bu))
  }

  const initBu = () => {
    return GET_BU().then(it => buModels.value = it.buList)
  }

  return {
    initBu,
    buModels,
    userBuModel
  }
}