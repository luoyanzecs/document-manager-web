<template>
  <z-aside>
      <template v-slot:right>
        <z-header-button type="primary">部门</z-header-button>
      </template>
      <template v-slot:context>
<!--        TODO: 树状目录样式和admin的边栏保持相似-->
        <div>
          <el-scrollbar>
            <el-tree :data="data"
                     :props="defaultProps"
                     @node-click="handleNodeClick" />
          </el-scrollbar>
        </div>
<!--        -->
      </template>
  </z-aside>
  <div class="h-screen flex-grow">
      <Header>
          <template v-slot:tools>
            <head-tool :banners="banners"
                       @editor="click"/>
          </template>
          <template v-slot:avatar>
            <el-popover placement="bottom" :width="200" trigger="hover">
              <template #reference>
                <el-avatar :icon="UserFilled"></el-avatar>
              </template>
<!--              TODO：头像悬浮的组件 建议抽离出来-->
              <h1>hello</h1>
<!--              -->
            </el-popover>
          </template>
        </Header>
      <div>
        <Editor ref="editor"/>
        <!--          TODO: 评论区， 显示时间， 内容， user 注意字体颜色和对齐方式-->
        <el-divider content-position="left">
          <el-icon color="#909399" :size="30"><comment/></el-icon>
        </el-divider>
      </div>
    </div>
</template>

<style>
</style>

<script setup>
import Editor from "@/components/ZEditor";
import { ElDivider } from 'element-plus'
import { ref, reactive } from 'vue'
import { Comment, UserFilled } from "@element-plus/icons-vue"
import Header from "@/components/common/ZHeader";
import HeadTool from "@/components/user/HeadTool";
import ZAside from "@/components/common/ZAside";
import ZHeaderButton from "@/components/common/head/ZHeaderButton";

const editor = ref()

const banners = reactive({
  editorBtn: '编辑'
})

const click = () => {
  if (banners.editorBtn === '编辑') {
    banners.editorBtn = '更新'
    editor.value.disable()
  } else {
    banners.editorBtn = '编辑'
    editor.value.enable()
  }
}
const data = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  }
]

const handleNodeClick = (data) => {
  console.log(data)
}

</script>