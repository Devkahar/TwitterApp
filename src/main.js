import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import { Icon, Input } from "ant-design-vue/lib";
Vue.config.productionTip = false;
Vue.component(Icon.name, Icon);
Vue.component(Input.name, Input);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
