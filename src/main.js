import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router/router.js'
import {createPinia} from'pinia'

// css materialize
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
