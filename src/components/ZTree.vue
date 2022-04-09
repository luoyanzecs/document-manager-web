<template>
  <template v-if="level === 0 && isMenuLoad">
    <div v-for="i of 3" :key="i" class="animate-pulse flex flex-col space-y-1 m-2">
      <div class="bg-gray-300 h-4 rounded"/>
      <div class="bg-gray-300 h-4 rounded ml-4"/>
      <div class="bg-gray-300 h-4 rounded ml-4"/>
      <div class="bg-gray-300 h-4 rounded ml-4"/>
    </div>
  </template>
  <template v-if="catalogue.length !== 0">
    <ul v-for="(item, index) in catalogue" :key="item.id" :class="[{'border-l' : level !== 0}, 'border-gray-300', 'ml-1', 'pl-1']">
      <li :ref="treeItemRef" v-if="!item.isDir" @click.stop="fileClickHandler(item)">
        <span :class="['cata-link', {'bg-blue-200': item.id === chooseId}]">{{ item.title }}</span>
      </li>
      <li v-else :ref="treeItemRef" >
        <span class="catalogue-base text-gray-500" @click.stop="folderClickHandler(index)">{{ item.title }}</span>
        <transition name="scrollin">
          <div v-show="isShow[index]"  style="height: 0; transition: all .3s ease-in-out;">
            <z-tree :catalogue="item.children" :level="level + 1" :choose-id=chooseId :is-show-componet="isShow[index]" @select-file="fileClickHandler"/>
          </div>
        </transition>
      </li>
    </ul>
  </template>
</template>

<script setup>
import {defineProps, defineEmits, onMounted, ref, watch, onBeforeUpdate} from "vue";
import {sleep} from "@/tool/utils";

const props = defineProps({
  catalogue: {type: Array, required: true},
  chooseId: {type: String, required: false},
  level: {type: Number, default: 0, required: false},
  isShowComponet: {type: Boolean, default: false, required: false},
  isMenuLoad: {type: Boolean, default: false, required: false}
})

const emit = defineEmits(['selectFile', 'update:chooseId'])
const isShow = ref([])

let treeItemRefs = []

const treeItemRef = el => el && treeItemRefs.push(el)

onBeforeUpdate(() => treeItemRefs = [])

onMounted(() => {
})

watch(
    () => props.isShowComponet,
    () => isShow.value.fill(false)
)

const fileClickHandler = (item) => {
  if (props.chooseId === item.id) return
  emit('selectFile', item)
}

let lastClickFolderTime = 0
const folderClickHandler = (index) => {
  if (Date.now() - lastClickFolderTime > 350 && treeItemRefs[index].childNodes[1]) {
    let subCtx = treeItemRefs[index].childNodes[1];
    if (isShow.value[index]) {
      subCtx.style = `height: ${treeItemRefs[index].childNodes[1].clientHeight}px; transition: all .2s ease-in-out;`
      sleep(10).then(() => {
        subCtx.style = `height: 0; transition: all .2s ease-in-out;`
        isShow.value[index] = false
      })
    } else {
      subCtx.style = `height: 0; transition: all .2s ease-in-out;`
      subCtx.style = `height: ${treeItemRefs[index].clientHeight * (subCtx.childElementCount)}px; transition: all .2s ease-in-out;`
      isShow.value[index] = true
      sleep(300).then(() => subCtx.style = '')
    }
    lastClickFolderTime = Date.now()
  }
}
</script>

<style scoped>
.catalogue-base {
  @apply cursor-pointer px-1 py-1 rounded text-sm whitespace-nowrap
}

.cata-link {
  @apply catalogue-base hover:underline text-blue-500
}

.scrollin-enter-active {
  animation: scrollin ease-in-out .2s;
}

.scrollin-leave-active {
  animation: scrollin ease-in-out .2s reverse;
}

@keyframes scrollin {
  from {
    @apply opacity-0
  }
  to {
    @apply opacity-100
  }
}

</style>