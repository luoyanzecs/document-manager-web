<template>
  <div class="flex gap-3 items-center px-2 mr-2">
    <z-avatar :image="myInfo.myHeader"/>
    <input class="flex-grow focus:border-blue-500 bg-gray-200 rounded-xl h-10 px-2"
           @focus="isBtnShow = !isBtnShow"
           @blur="isBtnShow = !isBtnShow"
    />
    <z-button :class="[isBtnShow ? 'visible' : 'invisible']" fill="发表"/>
  </div>

  <div v-for="(comment, index) in comments"
       :key="`${index}1`"
       class="my-2 flex gap-3 w-full px-2">
    <z-avatar :image="comment.headImg"/>
    <div class="flex-grow flex flex-col gap-2.5">
      <div>
        <p class="font-bold text-lg">{{ comment.name }}</p>
        <p class="text-gray-500 text-sm">{{ comment.time }}</p>
        <p>{{ comment.comment }}</p>
      </div>
      <div class="bg-gray-400 py-1.5 px-2.5 rounded-xl"
           v-if="comment.reply.length !== 0">
        <div v-for="(reply, replyIndex) in comment.reply"
             :key="`${replyIndex}2`"
             class="my-3 flex gap-2 w-full">
          <z-avatar :image="reply.fromHeadImg"/>
          <div class="flex-grow">
            <p class="font-bold text-base">{{ reply.from }}</p>
            <p class="text-gray-700 text-xs">{{ reply.time }}</p>
            <p>{{reply.comment}}</p>
          </div>
        </div>

      </div>
      <p v-show="!isRepleyShow[index]"
         class="text-blue-500 cursor-pointer"
         @click="replyButtonClick(index)">回复</p>
      <div class="flex gap-3 items-center" v-show="isRepleyShow[index]">
        <z-avatar :image="myInfo.myHeader"/>
        <input class="flex-grow focus:border-blue-500 bg-gray-200 rounded-xl h-10 px-2"/>
        <z-button fill="发表" @click="replyButtonClick(index)"/>
      </div>
      <hr>
    </div>
  </div>

</template>

<script setup>
import ZAvatar from "@/components/ZAvatar";
import {onBeforeMount, ref} from "vue";
import ZButton from "@/components/common/ZButton";

const isRepleyShow = ref([])
const isBtnShow = ref(false)
const myInfo = ref({
  myName: 'Lana Del Rey',
  myHeader: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
  myId: 19870621,
})
const comments = [
  {
    name: 'Lana Del Rey',
    id: 19870621,
    headImg: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
    comment: '我发布一张新专辑Norman Fucking Rockwell,大家快来听啊',
    time: '2019年9月16日 18:43',
    commentNum: 2,
    inputShow: false,
    reply: [
      {
        from: 'Taylor Swift',
        fromId: 19891221,
        fromHeadImg: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
        to: 'Lana Del Rey',
        toId: 19870621,
        comment: '我很喜欢你的新专辑！！',
        time: '2019年9月16日 18:43',
        commentNum: 1,
        inputShow: false
      },
      {
        from: 'Ariana Grande',
        fromId: 1123,
        fromHeadImg: 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
        to: 'Lana Del Rey',
        toId: 19870621,
        comment: '别忘记宣传我们的合作单曲啊',
        time: '2019年9月16日 18:43',
        commentNum: 0,
        inputShow: false

      }
    ]
  },
  {
    name: 'Taylor Swift',
    id: 19891221,
    headImg: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
    comment: '我发行了我的新专辑Lover',
    time: '2019年9月16日 18:43',
    commentNum: 1,
    inputShow: false,
    reply: [
      {
        from: 'Lana Del Rey',
        fromId: 19870621,
        fromHeadImg: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
        to: 'Taylor Swift',
        toId: 19891221,
        comment: '新专辑和speak now 一样棒！',
        time: '2019年9月16日 18:43',
        commentNum: 25,
        inputShow: false

      }
    ]
  },
  {
    name: 'Norman Fucking Rockwell',
    id: 20190830,
    headImg: 'https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg',
    comment: 'Plz buy Norman Fucking Rockwell on everywhere',
    time: '2019年9月16日 18:43',
    commentNum: 0,
    inputShow: false,
    reply: []
  },
]

const replyButtonClick = (index) => {
  isRepleyShow.value[index] = !isRepleyShow.value[index]
}

onBeforeMount(() => {
  isRepleyShow.value = new Array(comments.length).fill(false)
})

</script>

<style scoped>

</style>