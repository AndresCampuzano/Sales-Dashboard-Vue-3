import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import clickOutsideDirective from '@/utils/ClickOutsideDirective.ts'
import ScrollDirective from '@/utils/ScrollDirective.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('click-outside', clickOutsideDirective)
app.directive('scroll-event', ScrollDirective)

app.mount('#app')
