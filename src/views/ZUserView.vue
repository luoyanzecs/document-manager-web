<template>
  <z-aside>
    <template #right>
      <z-button type="primary">部门</z-button>
    </template>
    <template #context>
      <div class="m-2 text-lg tracking-wide font-medium text-gray-800 dark:text-white">文件目录</div>
      <div class="overflow-scroll flex-grow">
        <z-tree :catalogue="items" @select-file="selectFileHandler"/>
      </div>
    </template>
  </z-aside>
  <div class="h-screen flex-grow overflow-scroll">
    <Header>
      <template #tools>
        <head-tool :banner="banner" @editor="click"/>
      </template>
      <template #avatar>
        <!--              TODO：头像悬浮的组件 建议抽离出来-->
        <z-avatar/>
        <!--              -->
      </template>
    </Header>
    <div class>
      <Editor ref="editor"/>
      <hr class="my-4">
      <z-comment :info="myInfo" :comments-list="comments"/>
    </div>
  </div>
</template>


<style>
</style>

<script setup>
import Editor from "@/components/ZEditor";
import {ref} from 'vue'
import Header from "@/components/common/ZHeader";
import HeadTool from "@/components/user/HeadTool";
import ZAside from "@/components/common/ZAside";
import ZButton from "@/components/common/ZButton";
import ZAvatar from "@/components/ZAvatar";
import ZTree from "@/components/common/ZTree";
import ZComment from "@/components/common/ZComment";

const editor = ref()

const banner = ref('编辑')

const selectFileHandler = (param) => {
  console.log(param)
}

const click = () => {
  if (banner.value === '编辑') {
    banner.value = '更新'
    editor.value.disable()
  } else {
    banner.value = '编辑'
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
            children: []
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
            title: 'Level three 2-1-1--------- aaa bbb ccc',
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

const myInfo = ref({
  name: 'Lana Del Rey',
  header: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
  id: 19870621,
})
const comments = [
  {
    commentId: '0001',
    name: 'Lana Del Rey',
    id: 19870621,
    headImg: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
    comment: '我发布一张新专辑Norman Fucking Rockwell,大家快来听啊',
    time: '2019年9月16日 18:43',
    reply: [
      {
        commentId: '0002',
        name: 'Taylor Swift',
        id: 19891221,
        headImg: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
        comment: '我很喜欢你的新专辑！！',
        time: '2019年9月16日 18:43',
      },
      {
        commentId: '0003',
        name: 'Ariana Grande',
        id: 1123,
        headImg: 'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
        comment: '别忘记宣传我们的合作单曲啊',
        time: '2019年9月16日 18:43',
      }
    ]
  },
  {
    commentId: '0004',
    name: 'Taylor Swift',
    id: 19891221,
    headImg: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
    comment: '我发行了我的新专辑Lover',
    time: '2019年9月16日 18:43',
    reply: [
      {
        commentId: '0005',
        name: 'Lana Del Rey',
        id: 19870621,
        HeadImg: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
        comment: '新专辑和speak now 一样棒！',
        time: '2019年9月16日 18:43',
      }
    ]
  },
  {
    commentId: '0006',
    name: 'Norman Fucking Rockwell',
    id: 20190830,
    headImg: 'https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg',
    comment: 'Plz buy Norman Fucking Rockwell on everywhere',
    time: '2019年9月16日 18:43',
    reply: []
  },
]

</script>