<template>
  <template v-if="level === 0 && isMenuLoad">
    <div v-for="i of 3" :key="i" class="animate-pulse flex flex-col space-y-1 m-2">
      <div class="bg-gray-300 h-4 rounded"/>
      <div class="bg-gray-300 h-4 rounded ml-4"/>
      <div class="bg-gray-300 h-4 rounded ml-4"/>
      <div class="bg-gray-300 h-4 rounded ml-4"/>
    </div>
  </template>
  <template v-if="catalogueList.length !== 0">
    <ul v-for="(item, index) in catalogueList"
        :key="item.id"
        :class="[{'border-l' : level !== 0}, 'border-gray-300', 'ml-1', 'pl-1']"
    >
      <li v-if="item.children === undefined || item.children.length === 0" @click.stop="fileClickHandler(item)">
        <span :class="['cata-link', {'bg-blue-200': item.id === chooseId}]">{{ item.title }}</span>
      </li>
      <li v-else>
        <span class="catalogue-base text-gray-500" @click.stop="folderClickHandler(index)">
          {{ item.title }}
        </span>
        <transition name="scrollin">
          <div v-show="isShow[index]">
            <z-tree :catalogue="item.children"
                    :level="level + 1"
                    :choose-id = fileClicked
                    :is-show-componet="isShow[index]"
                    @select-file="fileClickHandler"/>
          </div>
        </transition>
      </li>
    </ul>
  </template>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, computed, onMounted, ref, watch, PropType, Ref} from "vue";

interface Catalogue {
  id: string,
  title: string,
  children: Array<Catalogue>
}

const props = defineProps({
  catalogue: {
    type: Array as PropType<Array<Catalogue>>,
    default: (): Array<Catalogue> => [],
    required: true
  },
  chooseId: {
    type: String,
    default: (): string => '',
    required: false
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
  },
  isMenuLoad: {
    type: Boolean,
    default: false,
    required: false
  }
})

const emit = defineEmits(['selectFile'])
const catalogueList: Ref<Catalogue[]> = computed(() => props.catalogue)
const isShow: Ref<boolean[]> = ref([])
const fileClicked: Ref<string> = ref('')

onMounted(() => {
  isShow.value = new Array(catalogueList.value.length).fill(props.isShowComponet)
})

watch(
    () => props.isShowComponet,
    () => isShow.value.fill(false)
)

const fileClickHandler = (item: Catalogue) => {
  fileClicked.value = item.id
  emit('selectFile', item)
}
const folderClickHandler = (index: number) => isShow.value[index] = !isShow.value[index]
</script>

<style scoped>
.catalogue-base {
  @apply cursor-pointer px-1 py-1 rounded text-sm whitespace-nowrap
}

.cata-link {
  @apply catalogue-base hover:underline text-blue-500
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