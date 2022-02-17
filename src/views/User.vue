<template>
  <el-container
      style="height: 100vh; width:100vw; overflow: hidden"
  >
    <Aside>
      <template v-slot:right>
        <el-button type="primary">部门</el-button>
      </template>
      <template v-slot:context>
        <div>
          <el-scrollbar>
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
          </el-scrollbar>
        </div>
      </template>

    </Aside>

    <el-container>
      <el-header>
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
      </el-header>
      <el-main style="overflow: scroll; padding: 0">
        <Editor ref="editor"/>
        <el-divider content-position="left">
          <el-icon color="#909399" :size="30"><comment/></el-icon>
        </el-divider>
      </el-main>
    </el-container>
  </el-container>
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