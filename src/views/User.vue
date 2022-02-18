<template>
  <div class="container max-w-screen-2xl flex">
    <Aside>
      <template v-slot:right>
        <header-button type="primary">部门</header-button>
      </template>
      <template v-slot:context>
        <div>
          <el-scrollbar>
            <el-tree :data="data"
                     :props="defaultProps"
                     @node-click="handleNodeClick" />
          </el-scrollbar>
        </div>
      </template>

    </Aside>

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
              <h1>hello</h1>
            </el-popover>
          </template>
        </Header>
      <div>
        <Editor ref="editor"/>
        <el-divider content-position="left">
          <el-icon color="#909399" :size="30"><comment/></el-icon>
        </el-divider>
      </div>
    </div>
  </div>
</template>

<style>
.el-header {
  background-color: #FFFFFF;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #eee;
}

</style>

<script setup>
import Editor from "@/components/Editor";
import { ElDivider } from 'element-plus'
import { ref, reactive } from 'vue'
import { Comment, UserFilled } from "@element-plus/icons-vue"
import Aside from "@/components/common/Aside";
import Header from "@/components/common/Header";
import HeadTool from "@/components/user/HeadTool";
import HeaderButton from "@/components/common/HeaderButton";

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