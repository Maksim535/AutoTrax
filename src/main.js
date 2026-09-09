import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

const pinia = createPinia()

app.use(router)
app.use(pinia)

const authStore = useAuthStore(pinia)

authStore.listenToAuthChanges()

app.mount('#app')