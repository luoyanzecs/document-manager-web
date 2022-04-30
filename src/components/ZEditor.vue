<template>
    <Toolbar
        class="border-b"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        class="flex-grow overflow-y-auto border-b"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
    />
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, ref, shallowRef, defineProps, watch, defineEmits} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const props = defineProps({
  content: {type: String, default: <p>hello</p>}
});

const emit = defineEmits(['update:content'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref(props.content)
const mode = 'simple'

watch(
    () => valueHtml.value,
    (newValue) => {
      emit('update:content', newValue)
    }
)

const toolbarConfig = {
  insertKeys: {
    index: 20,
    keys: ['uploadImage']
  },
  excludeKeys: ['insertVideo', 'emoji', 'todo', 'fullScreen', 'group-image']
}
const editorConfig = { placeholder: '请输入内容...' }


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

</script>

<style scoped>
/deep/ ul {
  list-style-type: disc !important;
}
/deep/ ul li {
  list-style: disc !important;
}

/deep/ ol {
  list-style-type: decimal !important;
}

/deep/ ol li {
  list-style: decimal !important;
}

:deep(h1) { font-size: 2em; }
:deep(h2) { font-size: 1.5em; }
:deep(h3) { font-size: 1.17em; }

</style>