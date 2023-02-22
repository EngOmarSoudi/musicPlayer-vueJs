import { createApp } from "vue";
import { createPinia } from "pinia";
import { registerSW } from "virtual:pwa-register";
import progressbar from "./includes/progressbar";
import App from "./App.vue";
import router from "./router";

import "./assets/base.css";
import "./assets/main.css";
import "nprogress/nprogress.css";
import veeValidatePlugin from "./includes/validation.js";

import { auth } from "./includes/firebase";
import Icon from "@/directives/icon";
import Iconsecondry from "@/directives/icon-secondry";
import i18n from "./includes/i18n";
registerSW( { immediate: true } );
progressbar(router);
let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.use(veeValidatePlugin);
    app.use(i18n);
    app.directive("icon", Icon);
    app.directive("icon-secondry", Iconsecondry);
    app.mount("#app");
  }
});
