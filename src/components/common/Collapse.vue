<template>
  <el-button type="primary"
             @click="switchTool"
  >工具</el-button>
  <el-drawer v-model="drawer"
             direction="rtl"
             :size = "windowSize"
             :lock-scroll="false"
             :with-header="false"
  ><template #default>
      <div style="height: 60px"></div>
      <div class="collapse-tool">
        <el-button style="display: none"></el-button>
        <slot name="collapse"></slot>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import {ref} from 'vue'

const drawer = ref(false)
const windowSize = ref(82)

const switchTool = () => {
  drawer.value = !drawer.value
}

</script>
<style>
.el-drawer__body {
  padding: 0;
}

.collapse-tool {
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
}

.collapse-tool > button {
  margin-top: 24px;
}
</style>