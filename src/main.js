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
createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
