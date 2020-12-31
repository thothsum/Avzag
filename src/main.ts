import { createApp } from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";

import "./registerServiceWorker";

const app = createApp(App);
app.use(router);
app.use(store);
router.isReady().then(() => app.mount("#app"));
