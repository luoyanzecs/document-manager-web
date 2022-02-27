<template>
  <div class="relative">
    <div class="container max-w-screen-2xl overflow-hidden flex">
      <router-view/>
    </div>
    <div class="absolute notice-right-top flex flex-col">
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
import {onMounted, ref} from "vue";
import ZNotifacation from "@/components/common/ZNotifacation";
import {NOTICE_GLOBAL} from "@/api";

let lastNoticeStartTime = 0 // ms
let lastDelay = 0
const noticeAliveTime = 7000 // ms
const animationTime = 700 // ms

const notifications = ref([])

onMounted(() => {
  function interval() {
    NOTICE_GLOBAL({}).then(res => {
      console.log(res.data)
      res.data.notices.forEach(notice => {
        notice.delay = getDelay()
        notifications.value.unshift(notice)
      })
    })
    return interval
  }
  setInterval(interval(), 15000)
})

const noticeCloseHandler = (id) => notifications.value = notifications.value.filter(notice => notice.id !== id)

const getDelay = () => {
  let now = Date.now(), delay = 0
  if (lastNoticeStartTime === 0 || now - lastNoticeStartTime > animationTime) {
    delay = noticeAliveTime + animationTime
  }
  if (now - lastNoticeStartTime <=  animationTime ) {
    delay = lastDelay + animationTime
  }
  lastDelay = delay
  lastNoticeStartTime = now
  return delay
}

onMounted(() => {
})

</script>
<style>

.notice-right-top {
  @apply right-4 top-4
}

.notice-top {
  @apply top-4 left-2/4 transform translate-x-2/4
}
</style>
