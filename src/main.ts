import { createApp } from "vue";
import router from "./router";

import App from "./App.vue";
import Control from "./components/Control.vue";
import Toggle from "./components/Toggle.vue";

import "./registerServiceWorker";

const app = createApp(App);
app.component("Control", Control);
app.component("Toggle", Toggle);
app.use(router);
router.isReady().then(() => app.mount("#app"));
