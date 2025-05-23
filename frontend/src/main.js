import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize cart state from localStorage
import { useCartStore } from './stores/cart'
const cartStore = useCartStore(pinia)
cartStore.loadCart()

app.mount('#app')
