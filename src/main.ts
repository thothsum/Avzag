import "./registerServiceWorker";
import { createApp } from "vue";
import router from "./router";

import App from "./App.vue";
import Btn from "./components/Btn.vue";
import Toggle from "./components/Toggle.vue";

const app = createApp(App);
app.component("Btn", Btn);
app.component("Toggle", Toggle);
app.use(router);
router.isReady().then(() => app.mount("#app"));
