<template>
  <div class="flex gap-3 items-center px-2 md:w-11/12">
    <z-avatar :image="myInfo.avatar"/>
    <input spellcheck="false" v-model="msgInput.aboveCtx" class="flex-grow bg-gray-200 bg-opacity-70 rounded-xl h-10 px-2 focus:outline-none "/>
    <z-button fill="发表" :load-visible="msgInput.inputLoadAboue" @click="buttonClickHandler('fileComment', fileId)"/>
  </div>

  <div v-if="isCommentLoad" class="pos-center mt-10">
    <svg class="text-gray-400 w-10 h-10 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
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
        <ul class="border-l-2 px-2 ml-1 flex flex-col gap-1" v-if="comment.reply.length !== 0">
          <li v-for="reply in comment.reply" :key="reply.id" class="w-full flex-grow">
            <p class="font-bold text-sm">{{ reply.name }}</p>
            <p class="text-gray-700 text-xs">{{ reply.time }}</p>
            <p class="text-sm">{{ reply.comment }}</p>
          </li>
        </ul>
        <p class="text-blue-500 cursor-pointer text-sm" @click="showReplyClick(index, $event)">回复</p>
        <transition name="reply">
          <div class="flex gap-3 items-center overflow-y-hidden" v-show="isRepleyShow[index]">
            <input spellcheck="false" v-model="msgInput.singleCtx" class="flex-grow bg-gray-200 rounded-xl h-10 px-2 focus:outline-none "/>
            <z-button fill="发表" :load-visible="msgInput.inputLoadSingle[index]" @click="buttonClickHandler('reply', {id: comment.id, index: index})"/>
          </div>
        </transition>
        <hr>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import ZAvatar from "@/components/ZAvatar.vue";
import {computed, onBeforeMount, ref, defineProps, PropType, Ref, reactive} from "vue";
import ZButton from "@/components/ZButton.vue";
import {useStore} from "vuex";
import {LEAVE_MESSAGE} from "@/api";
import {transformTime} from "@/tool/utils";

interface Comment {
  id: string,
  commentId: string,
  name: string,
  comment?: string,
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
  },
  fileId: {
    type: String,
    required: true
  }
})

const store = useStore()

const myInfo = computed(() => store.state.userInfo)
const comments = ref(props.commentsList)
const isRepleyShow: Ref<boolean[]> = ref([])

const msgInput = reactive({
  aboveCtx: '',
  singleCtx: '',
  inputLoadAboue: false,
  inputLoadSingle: new Array(comments.value.length).fill(false)
})


const showReplyClick = (index: number, event: any) => {
  event.target.innerHTML = isRepleyShow.value[index] ? "回复" : "收起"
  if (isRepleyShow.value[index]) {
    isRepleyShow.value[index] = false
  } else {
    isRepleyShow.value.fill(false)
    isRepleyShow.value[index] = true
  }
  msgInput.singleCtx = ''
}

onBeforeMount(() => {
  isRepleyShow.value = new Array(props.commentsList.length).fill(false)
})

function buttonClickHandler(fun: String, param?: any) {
  const commentWrapper: Comment = {
    id: myInfo.value.id,
    commentId: transformTime(),
    name: myInfo.value.name,
    avatar: myInfo.value.avatar,
    time: transformTime(),
    reply: new Array(0)
  }
  switch (fun) {
    case 'fileComment': {
      if (msgInput.aboveCtx === '') {
        return
      }
      msgInput.inputLoadAboue = !msgInput.inputLoadAboue
      const params = {
        userid: myInfo.value.id,
        fileId: param,
        ctx: msgInput.aboveCtx
      }
      LEAVE_MESSAGE(params).then(() => {
        msgInput.inputLoadAboue = !msgInput.inputLoadAboue
        commentWrapper.comment = msgInput.aboveCtx
        msgInput.inputLoadSingle.unshift(false)
        comments.value.unshift(commentWrapper)
      }).catch(() => msgInput.inputLoadAboue = !msgInput.inputLoadAboue)
      break
    }
    case 'reply': {
      if (msgInput.singleCtx === '') {
        return
      }
      msgInput.inputLoadSingle[param.index] = true
      const params = {
        userid: myInfo.value.id,
        parentCommentId: param.id,
        ctx: msgInput.aboveCtx
      }
      LEAVE_MESSAGE(params).then(() => {
        msgInput.inputLoadSingle[param.index] = false
        commentWrapper.comment = msgInput.singleCtx
        comments.value.find(it => it.id === param.id)?.reply.unshift(commentWrapper)
      }).catch(() => msgInput.inputLoadSingle[param.index] = false)
      break
    }
  }
}

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