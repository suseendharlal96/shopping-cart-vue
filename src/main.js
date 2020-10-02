import { createApp } from "vue";
import Toasted from "vue-toasted";

import App from "./App.vue";
import { router } from "./route/route";
import { store } from "./store/store";
import "./index.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toasted);
app.mount("#app");
