import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/base.css";
import "./assets/main.css";
import veeValidatePlugin from './includes/validation.js';
import "./includes/firebase"

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use( veeValidatePlugin );
app.mount("#app");
