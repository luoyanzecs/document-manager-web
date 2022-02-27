import { createApp } from 'vue'
import App from './App.vue'
// import App from './Test.vue'
import router from './router'
import './api/index'
import './mock/index'
import './assets/index.css'

createApp(App)
    .use(router)
    .mount('#app')
