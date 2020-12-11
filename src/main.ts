import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import './registerServiceWorker'
import 'leaflet/dist/leaflet.css';

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

const app = createApp(App)

app.use(router)
app.use(store)

router.isReady()
  .then(() => {
    app.mount('#app')
  })
