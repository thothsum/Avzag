import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './registerServiceWorker'
import store from './store'

import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-icon', LIcon);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
