<template>
  <div class="flex gap-3 items-center px-2 md:w-11/12">
    <z-avatar :image="myInfo.avatar"/>
    <input spellcheck="false"
           class="flex-grow focus:border-blue-500 bg-gray-200 bg-opacity-70 rounded-xl h-10 px-2"/>
    <z-button fill="发表"/>
  </div>
  <div v-if="isCommentLoad" class="my-2 flex gap-3 w-full px-2 md:w-11/12 animate-pulse">
    <z-avatar/>
    <div class="flex-grow flex flex-col gap-2">
      <div class="flex flex-col gap-1">
        <p class="bg-gray-300 w-4/12 h-4 rounded"/>
        <p class="bg-gray-300 w-4/12 h-4 rounded"/>
        <p class="bg-gray-300 w-7/12 h-4 rounded"/>
      </div>
      <div class="bg-gray-300 p-2.5 rounded-lg flex flex-col gap-1">
        <p class="bg-gray-400 w-4/12 h-4 rounded"/>
        <p class="bg-gray-400 w-4/12 h-4 rounded"/>
        <p class="bg-gray-400 w-7/12 h-4 rounded"/>
      </div>
      <hr>
    </div>
  </div>

  <template v-if="comments.length !== 0 && !isCommentLoad">
    <div v-for="(comment, index) in comments" :key="comment.commentId" class="my-2 flex gap-3 w-full px-2 md:w-11/12">
      <z-avatar :image="comment.avatar"/>
      <div class="flex-grow flex flex-col gap-2">
        <div>
          <p class="font-bold">{{ comment.name }}</p>
          <p class="text-gray-500 text-xs">{{ comment.time }}</p>
          <p class="text-justify">{{ comment.comment }}</p>
        </div>
        <ul class="bg-gray-300 px-2.5 rounded-lg" v-if="comment.reply.length !== 0">
          <li v-for="reply in comment.reply" :key="reply.id" class="my-1 w-full flex-grow">
            <p class="font-bold text-sm">{{ reply.name }}</p>
            <p class="text-gray-700 text-xs">{{ reply.time }}</p>
            <p class="text-sm">{{ reply.comment }}</p>
          </li>
        </ul>
        <p class="text-blue-500 cursor-pointer text-sm" @click="showReplyClick(index, $event)">回复</p>
        <transition name="reply">
          <div class="flex gap-3 items-center overflow-y-hidden" v-show="isRepleyShow[index]">
            <input spellcheck="false"
                   class="flex-grow focus:border-blue-500 bg-gray-200 rounded-xl h-10 px-2"/>
            <z-button fill="发表" @click="replyButtonClick(index)"/>
          </div>
        </transition>
        <hr>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import ZAvatar from "@/components/ZAvatar.vue";
import {computed, onBeforeMount, ref, defineProps, PropType, Ref} from "vue";
import ZButton from "@/components/ZButton.vue";
import {useStore} from "vuex";

interface Comment {
  id: string,
  commentId: string,
  name: string,
  comment: string,
  avatar: string,
  time: string,
  reply: Comment[]
}

const props = defineProps({
  info: {
    type: Object,
    required: true
  },
  commentsList: {
    type: Array as PropType<Comment[]>,
    default: (): Array<Comment[]> => [],
    required: true
  },
  isCommentLoad: {
    type: Boolean,
    default: (): boolean => false,
    required: true
  }
})

const store = useStore()

const myInfo = computed(() => store.state.userInfo)
const comments = computed(() => props.commentsList)
const isRepleyShow: Ref<boolean[]> = ref([])

const replyButtonClick = (index: number) => {
  console.log(index)
}

const showReplyClick = (index: number, event: any) => {
  event.target.innerHTML = isRepleyShow.value[index] ? "回复" : "收起"
  isRepleyShow.value[index] = !isRepleyShow.value[index]
}

onBeforeMount(() => {
  isRepleyShow.value = new Array(props.commentsList.length).fill(false)
})

</script>

<style scoped>
.reply-enter-active {
  animation: replayshow ease-in-out .5s;
}

.reply-leave-active {
  animation: replayshow ease-in-out .5s reverse;
}

@keyframes replayshow {
  from {
    @apply opacity-0 max-h-0
  }
  60% {
    @apply opacity-0 max-h-16
  }
  to {
    @apply opacity-100 max-h-16
  }
}
</style>