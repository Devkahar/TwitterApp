import { user_img } from "@/helper/constants";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem("userInfo"))
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
  },
  getters: {
    config: function (state) {
      return {
        headers: {
          authorization: `Bearer ${state.userInfo.token}`,
        },
      };
    },
    user_id: function (state) {
      console.log(state.userInfo?._id);
      return `${state.userInfo?._id}`;
    },
    user_name: function (state) {
      return `${state.userInfo?.name}`;
    },
    user_img: function (state) {
      if (state.userInfo.avatar) {
        return state.userInfo.avatar;
      }
      return user_img;
    },
    isUserAuth: function (state) {
      if (state.userInfo && state.userInfo._id) return true;
      return false;
    },
  },
  mutations: {
    logout(state) {
      state.userInfo = {};
    },
    setDataFromLocal(state) {
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"))
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {};
    },
  },
  actions: {
    logout(context) {
      localStorage.clear();
      context.commit("logout");
    },
    login(context) {
      context.commit("setDataFromLocal");
    },
  },
  modules: {},
});
