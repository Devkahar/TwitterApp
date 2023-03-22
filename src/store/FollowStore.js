import { BASE_URL } from "@/helper/constants";
import axios from "axios";

const followStore = {
  namspace: true,
  state: () => ({
    followList: [],
    followers: 0,
    following: 0,
    currentUser: "",
    loading: false,
    isFollowing: false,
    page: 1,
    limit: false,
    error: false,
    message: "",
  }),
  mutations: {
    setFollowLoadingState: function (state) {
      state.loading = true;
      state.limit = false;
    },
    incrementFollowPage: function (state) {
      state.page++;
    },
    setFollowListLimit: function (state) {
      state.limit = true;
    },
    resetFollowList: function (state) {
      state.page = 1;
      state.followList = [];
      state.limit = false;
      state.error = false;
    },
    setFollowListError: function (state) {
      state.message = "Oops Something Went Wrong";
      state.error = true;
      state.loading = false;
      state.page--;
    },
    setFollowData: function (state, payload) {
      state.followList = [...state.followList, ...payload.data];
      state.error = false;
      state.loading = false;
    },
    followUser: function (state, payload) {
      let idx = payload.idx;
      console.log(payload.isCurrentUser);
      if (state.followList[idx].isFollowing) {
        state.followList[idx].isFollowing = false;
        if (!payload.isCurrentUser) state.followers--;
        else state.following--;
        state.isFollowing = false;
      } else {
        state.followList[idx].isFollowing = true;
        if (!payload.isCurrentUser) state.followers++;
        else state.following++;
        state.isFollowing = true;
      }
    },
    setUserFollowData: function (state, payload) {
      state.followers = payload.followers;
      state.following = payload.following;
      state.isFollowing = payload.isFollowing;
      state.currentUser = payload.currentUser;
    },
  },
  actions: {
    resetFollowList: function ({ commit }) {
      commit("resetFollowList");
    },
    suggestFollowUser: async function ({ commit, state }) {
      if (state.limit) return;
      commit("setFollowLoadingState");
      console.log("Action suggestFollowUser", this.getters.config, state.page);
      try {
        const res = await axios.post(
          `${BASE_URL}/api/user/follow/suggestion/`,
          {
            page: state.page,
          },
          this.getters.config
        );
        if (res) {
          const data = res.data.data;
          const newFollowList = data.map((el) => ({
            ...el,
            isFollowing: false,
          }));
          if (res.data === 0) {
            commit("setFollowListLimit");
          }
          commit("setFollowData", {
            data: newFollowList,
          });
          console.log("User Suggestion", data);
        }
        commit("incrementFollowPage");
      } catch (error) {
        commit("setFollowListError");
        console.log("User Suggestion Error", error);
      }
    },
    followUserHandler: function ({ commit, state }, payload) {
      const idx = state.followList.findIndex((el) => el._id === payload._id);
      console.log("followUserHandler payload", payload);
      if (idx >= 0) {
        commit("followUser", {
          idx,
          isCurrentUser: this.getters.user_id === state.currentUser,
        });
      }
    },
    setFollow: function ({ commit }, payload) {
      commit("setUserFollowData", payload);
    },
  },
};
export default followStore;
