<template>
  <div class="relative">
    <div class="container max-w-screen-2xl overflow-hidden flex">
      <router-view/>
    </div>
    <div class="absolute notice-right-top z-40 max-h-screen overflow-scroll">
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

.notice-right-top {
  @apply right-4 top-4
}

.notice-top {
  @apply top-4 left-2/4 transform translate-x-2/4
}
</style>
