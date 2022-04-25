<template v-if="catalogue.length !== 0">
  <ul class="overflow-x-visible select-none">
    <li v-for="(item, index) in catalogue" :key="item.id" :ref="treeItemRef" :class="[{'border-l' : level !== 0}, 'border-gray-300', 'ml-1', 'pl-1']">
      <div v-if="!item.isDir" @click.stop="fileClickHandler(item)" :class="['cata-link', {'bg-blue-200': item.id === chooseId}]">{{ item.title }}</div>
      <div v-else @click.stop="folderClickHandler(index)" class="catalogue-base text-gray-500">{{ item.title }}</div>
      <transition name="scrollin" v-if="item.isDir">
        <z-tree v-show="isShow[index]" @select-file="fileClickHandler"
                :catalogue="item.children" :level="level + 1" :choose-id="chooseId" :is-show-componet="isShow[index]" />
      </transition>
    </li>
  </ul>
</template>

<script setup>
import {defineProps, defineEmits, ref, watch, onBeforeUpdate} from "vue";
import {sleep} from "@/tool/utils";

const props = defineProps({
  catalogue: {type: Array, required: true},
  chooseId: {type: String || Number, required: false},
  level: {type: Number, default: 0, required: false},
  isShowComponet: {type: Boolean, default: false, required: false},
})

const emit = defineEmits(['selectFile'])
const isShow = ref([])

let treeItemRefs = []
const treeItemRef = el => el && treeItemRefs.push(el)
onBeforeUpdate(() => treeItemRefs = [])

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
      subCtx.style = `height: 0; transition: all .2s ease-in-out overflow: hidden;`
      subCtx.style = `height: ${treeItemRefs[index].clientHeight * (subCtx.childElementCount)}px; transition: all .2s ease-in-out; overflow: hidden;`
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