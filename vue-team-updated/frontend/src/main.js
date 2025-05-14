import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import route  from "../routes/route.js";
const app = createApp(App);
app.use(route);
app.use(createPinia());
app.mount("#app");
