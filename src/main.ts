import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import App from './App.vue'
import router from './router'
import clickOutsideDirective from '@/utils/ClickOutsideDirective.ts'
import ScrollDirective from '@/utils/ScrollDirective.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('click-outside', clickOutsideDirective)
app.directive('scroll-event', ScrollDirective)
app.use(Vue3Toasity, {
  autoClose: 3000,
  theme: 'colored'
} as ToastContainerOptions)

app.mount('#app')
