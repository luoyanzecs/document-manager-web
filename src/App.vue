<template>
  <div class="relative">
    <div class="container max-w-screen-2xl overflow-hidden flex">
      <router-view/>
    </div>
    <div class="absolute w-full flex flex-col items-center top-0 sm:right-4 sm:top-4 sm:w-80 z-40 max-h-screen overflow-scroll">
      <z-notifacation v-for="notice in notifications"
                      :key="notice.id"
                      :message="notice.message"
                      :type="notice.type"
                      :delay="notice.delay"
                      :id="notice.id"
                      @close="noticeCloseHandler"
      />
    </div>
  </div>
</template>


<script setup>
import {computed, onMounted} from "vue";
import { useStore } from 'vuex'
import ZNotifacation from "@/components/common/ZNotifacation";
import {NOTICE_GLOBAL} from "@/api";

const store = useStore()
const notifications = computed(() => store.state.notificationQuene)

onMounted(() => {
  function interval() {
    NOTICE_GLOBAL({}).then(res => {
      console.log(res.data)
      res.data.notices.forEach(notice => store.commit('unshiftNotice', notice))
    })
    return interval
  }
  setInterval(interval(), 30000)
})

const noticeCloseHandler = (id) => store.commit('removeNotice', id)

</script>
<style>

:root {
  font-family: Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
}
</style>
