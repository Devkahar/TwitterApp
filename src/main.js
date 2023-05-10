import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import "./assets/css/main.css";
import registerComponents from "./helper/utilComponentRegister";
registerComponents(Vue);
Vue.config.productionTip = false;

let app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
console.log(app);
