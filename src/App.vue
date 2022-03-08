<template>
  <div class="relative">
    <div class="container max-w-screen-2xl overflow-hidden flex">
      <router-view/>
    </div>
    <div class="absolute w-full flex flex-col items-center top-0 sm:w-auto sm:right-4 top-4 sm:items-end z-40 max-h-screen overflow-scroll">
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


<script setup lang="ts">
import {computed, onMounted} from "vue";
import { useStore } from 'vuex'
import ZNotifacation from "@/components/ZNotifacation.vue";
import {NOTICE_GLOBAL} from "@/api";
// import {sleep} from "@/tool/utils";

const store = useStore()
const notifications = computed(() => store.state.notificationQuene)

onMounted(() => {
  const noticeInquiry = (params: any) =>  NOTICE_GLOBAL(params).then(res => {
    console.log(res.data)
    res.data.notices.forEach((notice: any) => store.commit('unshiftNotice', notice))
    // sleep(30000).then(() => noticeInquiry(params))
  })

  noticeInquiry({})
})

const noticeCloseHandler = (id: string) => store.commit('removeNotice', id)

</script>
<style>

:root {
  font-family: Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
}
</style>
