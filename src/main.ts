import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(WaveUI, {})
app.use(createPinia())
app.use(router)

app.mount('#app')
