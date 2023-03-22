import Vue from "vue";
import Vuex from "vuex";
import followStore from "./FollowStore";
Vue.use(Vuex);
import tweetStore from "./tweetStore";
import userStore from "./userStore";

export default new Vuex.Store({
  modules: {
    tweetState: tweetStore,
    userState: userStore,
    followState: followStore,
  },
});
