import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import "./assets/css/main.css";
Vue.config.productionTip = false;
import {
  Button,
  Spin,
  Input,
  Alert,
  Icon,
  Tabs,
  Dropdown,
  Upload,
} from "ant-design-vue/lib";
import UUID from "vue-uuid";
Vue.component(Button.name, Button);
Vue.component(Spin.name, Spin);
Vue.component(Input.name, Input);
Vue.component(Input.Password.name, Input.Password);
Vue.component(Input.TextArea.name, Input.TextArea);
Vue.component(Alert.name, Alert);
Vue.component(Icon.name, Icon);
Vue.component(Tabs.name, Tabs);
Vue.component(Tabs.TabPane.name, Tabs.TabPane);
Vue.component(Dropdown.name, Dropdown);
Vue.component(Upload.name, Upload);
Vue.config.productionTip = false;
Vue.use(UUID);
Vue.mixin({
  created() {
    console.log("[created] " + this.$options.name);
  },
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
