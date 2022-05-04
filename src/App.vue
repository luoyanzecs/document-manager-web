<template>
  <div class="relative max-w-screen-2xl h-screen flex overflow-auto container">
    <router-view/>
    <div class="absolute w-screen flex flex-col items-center top-0 sm:w-auto sm:right-2 pt-2 sm:items-end z-40 max-h-screen overflow-y-auto">
      <z-notifacation v-for="notice in store.state.notificationQuene" v-bind="notice" :key="notice.id" @close="noticeCloseHandler"/>
    </div>
  </div>
</template>


<script setup>
// import { onMounted } from "vue";
import { useStore } from 'vuex'
import ZNotifacation from "@/components/ZNotifacation.vue";
// import { useUser } from "./composables/useUser";

const store = useStore()
// const { loadUserWithCheck } = useUser()

const noticeCloseHandler = id => store.commit('removeNotice', id)

// onMounted(() => loadUserWithCheck())

</script>
<style>

:root {
  font-family: Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
}
</style>
