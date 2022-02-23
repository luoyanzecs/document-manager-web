<template>
  <div ref="toolbarContainer" style="height: 35px;"></div>
  <el-row justify="start">
    <p style="color: #C0C4CC; padding-left: 16px;">{{ banners.lastEditor }}</p>
  </el-row>
  <div ref="textContainer" style="margin: 16px 40px"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, reactive, defineExpose} from 'vue';
import WangEditor from 'wangeditor';

const toolbarContainer = ref();
const textContainer = ref();
const banners = reactive({
  lastEditor: `last edit by luoyanze at 2022-2-6 19:30`
})
let o;
onMounted(() => {
  o = new WangEditor(toolbarContainer.value, textContainer.value);
  o.config.menus = [
    "head", "bold", "fontSize", "fontName", "italic", "underline", "strikeThrough",
    "table", "lineHeight", "foreColor", "backColor", "link", "list", "justify",
    "quote", "image", "code", "splitLine", "undo", "redo"]

  o.config.zIndex = 0
  o.config.onchange = () => {
    console.log('change');
  }
  o.create();
  o.txt.setJSON([
    {
      "tag": "p",
      "attrs": [],
      "children": [
        "欢迎使用 ",
        {
          "tag": "b",
          "attrs": [],
          "children": [ "wangEditor" ]
        },
        " 富文本编辑器"
      ]
    },
    {
      "tag": "p",
      "attrs": [],
      "children": [
        {
          "tag": "img",
          "attrs": [
            { "name": "src", "value": "https://cn.vuejs.org/images/logo.svg" },
            { "name": "style", "value": "width:320px;" }
          ]
        }
      ]
    }
  ])
});

onBeforeUnmount(() => {
  o.destroy();
  o = null;
});

const disable = () => {
  o.disable()
}

defineExpose({ disable })
</script>

<style scoped>

</style>