import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")),
  },
  getters: {
    config: function (state) {
      return {
        headers: {
          authorization: `Bearer ${state.userInfo.token}`,
        },
      };
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
