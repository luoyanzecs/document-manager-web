<template>
  <div v-for="(catalogue, index) in catalogueList"
       :key="catalogue.id"
       :class="[{'border-l' : level !== 0}, 'border-blue-200']"
  >
    <div v-if="catalogue.children.length === 0"
         class="ml-2 flex items-center"
         @click.stop="fileClickHandler(catalogue)"
    ><p class="catalogue-base hover:bg-blue-200 text-blue-500 underline ">
        {{ catalogue.title }}
      </p>
    </div>

    <div v-else class="ml-2">
      <div class="text-gray-500 flex items-center"
           @click.stop="folderClickHandler(index)"
      ><p class="catalogue-base">
          {{ catalogue.title }}
        </p>
      </div>

      <transition name="scrollin" mode="in-out">
        <div v-show="isShow[index]" class="overflow-x-visible overflow-y-hidden">
          <z-tree :catalogue="catalogue.children"
                  :level="level + 1"
                  :is-show-componet="childToggle"
                  @select-file="fileClickHandler"/>
        </div>
      </transition>
    </div>
  </div>
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
const childToggle = ref(false)

onMounted(() => {
  isShow.value = new Array(catalogueList.value.length).fill(props.isShowComponet)
})

watch(
    () => props.isShowComponet,
    () => {
      isShow.value.fill(false)
      childToggle.value = !childToggle.value
    }
)


const fileClickHandler = (item) => emit('selectFile', item)
const folderClickHandler = (index) => {
  childToggle.value = !childToggle.value
  isShow.value[index] = !isShow.value[index]
}

</script>

<style scoped>

.catalogue-base {
  @apply cursor-pointer px-1 py-0.5 rounded text-sm my-1 whitespace-nowrap
}

.scrollin-enter-active {
  animation: scrollin ease-in-out 1s;
}

.scrollin-leave-active {
  animation: scrollout ease-in-out .4s;
}

@keyframes scrollin {
  from {
    @apply max-h-0
  }
  to {
    @apply max-h-screen
  }
}

@keyframes scrollout {
  from {
    @apply max-h-screen
  }
  20% {
    @apply max-h-44
  }
  to {
    @apply max-h-0
  }
}

</style>