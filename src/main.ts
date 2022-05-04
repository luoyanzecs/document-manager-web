import { createApp } from 'vue'
import App from './App.vue'
// import App from './Test.vue'
import router from './router'
import './api/index'
// import './mock/index'
import {store} from "@/store"
import './assets/index.css'

interface ResponseHead {
    status: string,
    statusCode: number,
    message: string,
    timestamp: number
}

export interface BaseResponse {
    head?: ResponseHead
}

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
