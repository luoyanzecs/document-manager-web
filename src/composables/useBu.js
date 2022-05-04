import {StorageSerializers, useStorage} from '@vueuse/core';
import {GET_BU} from "@/api";
import {useUser} from "./useUser";
import {computed, ref} from 'vue';


const { loadUserWithCheck } = useUser()

const user = loadUserWithCheck()

const buModels = useStorage('bus', [], undefined, {
  serializer: StorageSerializers.object
})


export const useBu = () => {

  const userBuModel = () => {
    return computed(() => buModels.value.find(it => it.buId = user.value.bu))
  }

  const userBuIdRef = () => {
    return ref(userBuModel.value.buId)
  }


  const initBu = () => {
    return GET_BU().then(it => buModels.value = it.buList)
  }


  return {
    initBu,
    buModels,
    userBuModel,
    userBuIdRef
  }
}