<template>
  <z-tree :catalogue="items"/>
</template>

<script setup>
import ZTree from "@/components/common/ZTree";

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

<style scoped>

</style>