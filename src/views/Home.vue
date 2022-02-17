<template>
  <el-container>
    <el-main style="min-height:88vh; display: flex; flex-flow: column; justify-content: center;">
      <el-row :gutter="20">
          <el-col :span="10" :offset="2">
            <div class="bg-purple">
              <h1>Cras ultricies ligula sed magna dictum porta.</h1>
              <p>
                Nulla quis lorem ut libero malesuada feugiat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Cras ultricies ligula sed magna dictum porta.
              </p>
              <p>
                Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
              </p>
              <p>
                Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
              </p>
            </div>
          </el-col>
          <el-col :span="6"
                  :offset="2"
                  style="display: flex; flex-flow: column; justify-content: center"
          ><el-card class="box-card">
              <div>
                <h1>login</h1>
              </div>
              <div class="card-item"><span class="ml-3 w-35"
              >账号</span>
                <el-input v-model="acount"
                          placeholder="输入账号"
                /></div>
              <div class="card-item"><span class="ml-3 w-35"
              >密码</span>
                <el-input v-model="password"
                          placeholder="输入密码"
                /></div>
              <div class="card-item"><el-switch
                  v-model="switchValue"
                  size="large"
                  active-text="用户"
                  inactive-text="管理员"
              /></div>
              <div class="card-item">
                <el-button type="primary" @click="loginHandler">登录</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
    </el-main>
    <el-footer>
      <el-divider style="margin-bottom: 8px"></el-divider>
      <el-row justify="center">
        <p>Copyright © 2021-2022 Yanze Luo</p>
      </el-row>
    </el-footer>
  </el-container>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const switchValue = ref(true)
const acount = ref('')
const password = ref('')

const loginHandler = () => {
  if (switchValue.value) {
    router.push('/user')
  } else {
    router.push('/admin')
  }
}
</script>

<style>
.box-card {
  height: 380px;
}

.card-item {
  margin-bottom: 16px;
}

.el-footer {
  color: #909399;
}

.bg-purple {
  border-radius: 4px;
  background: #d3dce6;
  padding: 8px;
}
</style>