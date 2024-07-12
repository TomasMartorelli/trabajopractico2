import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css' // Importa el archivo CSS de Tailwind

const app = createApp(App)

app.use(router)

app.mount('#app')
