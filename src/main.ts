import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createNotivue } from 'notivue'

import App from './App.vue'
import router from './router'

import 'notivue/notification.css' // Only needed if using built-in <Notification />
import 'notivue/animations.css' // Only needed if using default animations
import 'notivue/notification-progress.css'

const notivue = createNotivue({
  position: 'top-right',
  limit: 4,
  enqueue: false,
  avoidDuplicates: true,
  animations: {
    enter: 'Notivue__enter',
    leave: 'Notivue__leave',
    clearAll: 'Notivue__clearAll',
  },
  transition: 'transform 0.35s cubic-bezier(0.5, 1, 0.25, 1)',
  notifications: {
    global: {
      duration: 5000,
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(notivue)

app.mount('#app')
