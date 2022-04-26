<template>
  <div class="w-12 h-12 rounded-full bg-gray-300 pos-center relative" @mouseenter="isPopOver = isPopOverProp">
    <img v-if="image.trim() !== ''"
         :src="image"
         alt=""
         class="rounded-full w-12 h-12"
    />
    <svg v-else class="text-gray-100 m-2" viewBox="0 0 1024 1024"><path fill="currentColor" d="M288 320a224 224 0 10448 0 224 224 0 10-448 0zm544 608H160a32 32 0 01-32-32v-96a160 160 0 01160-160h448a160 160 0 01160 160v96a32 32 0 01-32 32z"></path></svg>
    <transition-group name="fade">
      <div v-show="isPopOver" :key="1" class="absolute top-full right-3 h-6 w-6 transform rotate-45 bg-gray-100 rounded z-30"/>
      <div v-show="isPopOver" :key="2" @click.stop @mouseleave="isPopOver = false"
           class="absolute top-full -right-2 bg-gray-200 z-40 rounded-md mt-2 p-4 space-y-4 select-none">
        <table class="table-auto text-gray-700">
          <tr class="border-b border-gray-400">
            <td class="p-2 whitespace-nowrap">用户名</td>
            <td>:</td>
            <td class="p-2 whitespace-nowrap">{{ myInfo.name }}</td>
          </tr>
          <tr class="border-b border-gray-400">
            <td class="p-2 whitespace-nowrap">部门</td>
            <td>:</td>
            <td class="p-2 whitespace-nowrap">{{ myInfo.bu }}</td>
          </tr>
          <tr class="border-b border-gray-400">
            <td class="p-2 whitespace-nowrap">角色</td>
            <td>:</td>
            <td class="p-2 whitespace-nowrap" >{{ myInfo.role }}</td>
          </tr>
        </table>
        <div class="flex justify-end">
          <z-button fill="登出" class="transform scale-90" @click="logoutHandler"/>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup >
import {computed, defineProps, ref} from "vue";
import {useStore} from "vuex";
import ZButton from "@/components/ZButton";
import {useRouter} from "vue-router";

defineProps({
  image: {
    type: String,
    default: '',
    required: false
  },
  isPopOverProp: {
    type: Boolean,
    default: true,
    required: false
  }
});
const isPopOver = ref(false)
const router = useRouter()
const myInfo = computed(() => useStore().state.userInfo)

function logoutHandler() {
  localStorage.clear()
  router.push('/')
}

</script>

<style scoped>
.fade-leave-active {
  animation: fade ease-in-out .2s reverse;
}

.fade-enter-active {
  animation: fade ease-in-out .2s;
}

@keyframes fade {
  from {
    @apply opacity-0
  }
  to {
    @apply opacity-100
  }
}
</style>