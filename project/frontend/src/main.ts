import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./validate/index";
import "@mdi/font/css/materialdesignicons.css";

import axiosInterceptor from "@/plugins/axiosInterceptor";
axiosInterceptor();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
