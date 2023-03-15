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
          authorization: `Bearer ${state.userInfo?.token}`,
        },
      };
    },
    user_id: function (state) {
      return `${state.userInfo?._id}`;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
