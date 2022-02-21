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

let lastNoticeStartTime = 0 // ms
let lastDelay = 0
const noticeAliveTime = 7000 // ms
const animationTime = 700 // ms

const notifications = ref([])
const notifications1 = [
  {
    message: 'Vivamus suscipit tortor eget felis porttitor volutpat.',
    type: 1,
    id: '0001'
  },
  {
    message: 'Vivamus suscipit tortor eget felis porttitor volutpat.',
    type: 2,
    id: '0002'
  },
  {
    message: 'Vivamus suscipit tortor eget felis porttitor volutpat.',
    type: 3,
    id: '0003'
  }
]

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
  notifications1.forEach(item => {
    item.delay = getDelay()
    notifications.value.unshift(item)
  })

  setTimeout(() => notifications.value.unshift({
    message: 'Vivamus suscipit tortor eget felis porttitor volutpat.',
    type: 1,
    id: '0004',
    delay: getDelay()
  }), 3000)
})

const noticeCloseHandler = (id) => notifications.value = notifications.value.filter(item => item.id !== id)

onMounted(() => {
})

</script>
<style>
:root {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.notice-right-top {
  @apply right-4 top-4
}

.notice-top {
  @apply top-4 left-2/4 transform translate-x-2/4
}
</style>
