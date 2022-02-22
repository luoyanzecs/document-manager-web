<template>
  <z-switch left="管理员" right="员工" v-model:value="value"/>
</template>

<script setup>
import ZSwitch from "@/components/common/ZSwitch";
import {ref} from "vue";

const value = ref(false)
</script>

<style scoped>

</style>