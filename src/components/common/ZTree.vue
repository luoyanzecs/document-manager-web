<template>
    <ul v-for="(catalogue, index) in catalogueList"
        :key="catalogue.id"
        :class="[{'border-l' : level !== 0}, 'border-gray-300', 'pl-2']"
    >
      <li v-if="catalogue.children.length === 0" @click.stop="fileClickHandler(catalogue)">
        <span class="catalogue-base hover:bg-blue-200 text-blue-500">{{ catalogue.title }}</span>
      </li>
      <li v-else>
        <span class="catalogue-base text-gray-500" @click.stop="folderClickHandler(index)">
          {{ catalogue.title }}
        </span>
        <transition name="scrollin">
          <div v-show="isShow[index]">
            <z-tree :catalogue="catalogue.children"
                    :level="level + 1"
                    :is-show-componet="isShow[index]"
                    @select-file="fileClickHandler"/>
          </div>
        </transition>
      </li>
    </ul>
</template>

<script setup>
import {defineProps, defineEmits, computed, onMounted, ref, watch} from "vue";

const props = defineProps({
  catalogue: {
    type: Array,
    required: true
  },
  level: {
    type: Number,
    default: 0,
    required: false
  },
  isShowComponet: {
    type: Boolean,
    default: false,
    required: false
  }
})

const emit = defineEmits(['selectFile'])
const catalogueList = computed(() => props.catalogue)
const isShow = ref([])

onMounted(() => {
  isShow.value = new Array(catalogueList.value.length).fill(props.isShowComponet)
})

watch(
    () => props.isShowComponet,
    () => isShow.value.fill(false)
)

const fileClickHandler = (item) => emit('selectFile', item)
const folderClickHandler = (index) => isShow.value[index] = !isShow.value[index]
</script>

<style scoped>
.catalogue-base {
  @apply cursor-pointer px-1 py-1 rounded text-sm whitespace-nowrap
}

.scrollin-enter-active {
  animation: scrollin ease-in-out .4s;
}

.scrollin-leave-active {
  animation: scrollin ease-in-out .4s reverse;
}

@keyframes scrollin {
  from {
    @apply max-h-0 opacity-0
  }
  80% {
    @apply max-h-screen opacity-0
  }
  to {
    @apply max-h-screen opacity-100
  }
}

</style>