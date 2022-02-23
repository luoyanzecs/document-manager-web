import { createApp } from 'vue'
// import App from './App.vue'
import App from './Test.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/index.css'

createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
