<template>
  <z-aside>
    <template #right>
      <z-button type="primary">部门</z-button>
    </template>
    <template #context>
      <div class="m-4 text-lg tracking-wide font-medium text-gray-800 dark:text-white">文件目录</div>
      <z-tree :catalogue="items" @select-file="selectFileHandler"/>
    </template>
  </z-aside>
  <div class="h-screen flex-grow overflow-scroll">
      <Header>
          <template v-slot:tools>
            <head-tool :banners="banners"
                       @editor="click"/>
          </template>
          <template v-slot:avatar>
            <el-popover placement="bottom" :width="200" trigger="hover">
              <template #reference>
                <z-avatar :icon="UserFilled"/>
              </template>
<!--              TODO：头像悬浮的组件 建议抽离出来-->
              <h1>hello</h1>
<!--              -->
            </el-popover>
          </template>
        </Header>
      <div class >
        <Editor ref="editor"/>
        <!--          TODO: 评论区， 显示时间， 内容， user 注意字体颜色和对齐方式-->
        <el-divider content-position="left">
          <el-icon color="#909399" :size="30"><comment/></el-icon>
        </el-divider>
        <ZComment></ZComment>
      </div>
    </div>
</template>


<style>
.el-tree-node:focus>.el-tree-node__content{
      background-color: #5daaf0;
}
.el-tree-node__content:hover
 { 
        background:#89c2f7;
}
.el-tree-node__label {
width: auto;
margin-top: 12px;
float: right;
font-family: “Trebuchet MS”, Arial, Helvetica, sans-serif;
font-size: 14px;
color: #999999;
line-height: 25px;
letter-spacing: 1px;
}
</style>

<script setup>
import Editor from "@/components/ZEditor";
import ZComment from "@/components/ZComment"
import { ElDivider } from 'element-plus'
import { ref, reactive } from 'vue'
import { Comment, UserFilled } from "@element-plus/icons-vue"
import Header from "@/components/common/ZHeader";
import HeadTool from "@/components/user/HeadTool";
import ZAside from "@/components/common/ZAside";
import ZButton from "@/components/common/ZButton";
import ZAvatar from "@/components/ZAvatar";
import ZTree from "@/components/common/ZTree";

const editor = ref()

const banners = reactive({
  editorBtn: '编辑'
})

const selectFileHandler = (param) =>{
  console.log(param)
}

const click = () => {
  if (banners.editorBtn === '编辑') {
    banners.editorBtn = '更新'
    editor.value.disable()
  } else {
    banners.editorBtn = '编辑'
    editor.value.enable()
  }
}
const items = [
  {
    id: '0001',
    title: 'Level one 1',
    children: [
      {
        id: '0002',
        title: 'Level two 1-1',
        children: [
          {
            title: 'Level three 1-1-1',
            children: [
              {
                id: '0002',
                title: 'Level two 1-1',
                children: [
                  {
                    title: 'Level three 1-1-1',
                    children: [
                      {
                        id: '0002',
                        title: 'Level two 1-1',
                        children: [
                          {
                            title: 'Level three 1-1-1',
                            children: [
                              {
                                id: '0002',
                                title: 'Level two 1-1',
                                children: [
                                  {
                                    title: 'Level three 1-1-1',
                                    children: [
                                      {
                                        id: '12313',
                                        title: 'Level two 1-1',
                                        children: [
                                          {
                                            title: 'Level three 1-1-1',
                                            children: [
                                              {
                                                id: '0002',
                                                title: 'Level two 1-1',
                                                children: [
                                                  {
                                                    title: 'Level three 1-1-1',
                                                    children: []
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '0003',
    title: 'Level one 2',
    children: [
      {
        id: '0004',
        title: 'Level two 2-1',
        children: [
          {
            id: '0005',
            title: 'Level three 2-1-1',
            children: []
          },
        ],
      },
      {
        id: '0006',
        title: 'Level two 2-2',
        children: [
          {
            id: '0007',
            title: 'Level three 2-2-1',
            children: []
          },
        ],
      },
    ],
  },
  {
    id: '0008',
    title: 'Level one 3',
    children: [
      {
        id: '0009',
        title: 'Level two 3-1',
        children: [
          {
            id: '0010',
            title: 'Level three 3-1-1',
            children: []
          },
        ],
      },
      {
        id: '0011',
        title: 'Level two 3-2',
        children: [
          {
            id: '0012',
            title: 'Level three 3-2-1',
            children: []
          },
        ],
      },
    ],
  }
]

</script>