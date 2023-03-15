import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
const pinia = createPinia()
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
createApp(App).use(router).use(pinia).use(VueSweetalert2).mount('#app')
