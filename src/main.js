import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import "./assets/css/main.css";
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
/* import specific icons */
import {
  // faTwitter,
  faCircleUser,
  faEllipsisH,
  faBookBookmark,
  faEnvelope,
  faFlag,
  faHouse,
  faHashtag,
  faHeart,
  faList,
  faBell,
  faGear,
  faRetweet,
  faFilm,
  faSmile,
  faReply,
  faStar,
  faAngleDown,
  faChartBar,
  faPlus,
  faCheck,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
/* add icons to the library */
library.add(
  faTwitter,
  faCircleUser,
  faEllipsisH,
  faBell,
  faGear,
  faHouse,
  faBookBookmark,
  faEnvelope,
  faFlag,
  faHashtag,
  faHeart,
  faList,
  faRetweet,
  faReply,
  faChartBar,
  faFilm,
  faSmile,
  faStar,
  faAngleDown,
  faPlus,
  faCheck,
  faImage
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

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
  Form,
  Modal,
  Result,
} from "ant-design-vue/lib";
import UUID from "vue-uuid";
Vue.component("font-awesome-icon", FontAwesomeIcon);
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
Vue.component(Form.name, Form);
Vue.component(Form.Item.name, Form.Item);
Vue.component(Modal.name, Modal);
Vue.component(Result.name, Result);
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
