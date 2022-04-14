<template>
  <div class="absolute z-30 left-0 top-0 w-screen h-screen bg-black bg-opacity-25 pt-24"
       @click.stop="$emit('update:clickToggle', !clickToggle)">
    <div class="bg-white rounded-xl p-4 mx-auto w-35" @click.stop>
      <div ref="title" :class="[{'spacer-b': showSpacer}, 'text-2xl', 'text-gray-700']">
        <slot name="title"></slot>
      </div>
      <slot name="body"></slot>
      <div ref="buttom" class="space-x-4">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, onMounted, ref} from "vue";

defineEmits(['update:clickToggle'])
defineProps({
  clickToggle: {
    type: Boolean,
    default: false,
    required: false
  }
})

const title = ref()
const buttom = ref()
const showSpacer = ref(false)

onMounted(() => {
  showSpacer.value = title.value.innerHTML.trim() !== ''
})

</script>

<style scoped>
.spacer-b {
  @apply mb-4
}
</style>