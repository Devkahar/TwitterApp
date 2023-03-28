import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import "./assets/css/main.css";
import registerComponents from "./helper/utilComponentRegister";
registerComponents(Vue);
Vue.config.productionTip = false;
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
  faPlus,
  faCheck,
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
  faFilm,
  faSmile,
  faStar,
  faAngleDown,
  faPlus,
  faCheck
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
