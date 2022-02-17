<template>
  <el-button class="menu-btn"
             type="primary"
             @click="clickHandler"
  ><el-icon size="20px">
    <CollectionTag/>
  </el-icon></el-button>
  <el-aside width="200px"
            v-show="isAsideShow"
            style="height:100vh; color: #333; border-right: 1px solid #eee;">
    <div style="margin-left: 16px">
      <el-row justify="end"
              style="height: 60px; box-sizing: border-box; padding: 14px 14px 0 14px; margin-bottom: 16px">
        <slot name="right"></slot>
      </el-row>
      <slot name="context"></slot>
    </div>
  </el-aside>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {CollectionTag} from "@element-plus/icons-vue";
const isAsideShow = ref(true)

onMounted(() => {
  let lastWidth = window.innerWidth
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768 && lastWidth >= 768) {
      isAsideShow.value = false
    }
    if (window.innerWidth >= 768 && lastWidth < 768) {
      isAsideShow.value = true
    }
    lastWidth = window.innerWidth
  })
})

const clickHandler = () => {
  isAsideShow.value = !isAsideShow.value
}

</script>
<style scoped>
.menu-btn {
  position: absolute;
  left: 16px;
  top: 14px;
  z-index: 2
}
</style>