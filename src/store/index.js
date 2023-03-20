import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import { user_img, BASE_URL } from "@/helper/constants";
import { uuid } from "vue-uuid";
import axios from "axios";

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem("userInfo"))
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
    tweetList: [],
    loading: false,
    limit: false,
    error: false,
    message: "",
    page: 1,
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
      if (state.userInfo.image) {
        return state.userInfo.image;
      }
      return user_img;
    },
    isUserAuth: function (state) {
      if (state.userInfo && state.userInfo._id) return true;
      return false;
    },
    tweetList: function (state) {
      return state.tweetList;
    },
    error: function (state) {
      return state.error;
    },
    loading: function (state) {
      return state.loading;
    },
    message: function (state) {
      return state.message;
    },
    limit: function (state) {
      return state.limit;
    },
  },
  mutations: {
    logout: function (state) {
      state.userInfo = {};
    },
    setDataFromLocal: function (state) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      state.userInfo = userInfo ? userInfo : {};
    },
    setLoadingState: function (state) {
      state.loading = true;
      state.limit = false;
    },
    incrementPage: function (state) {
      state.page++;
    },
    resetTweets: function (state) {
      state.page = 1;
      state.tweetList = [];
      state.limit = false;
      state.error = false;
    },
    tweetsError: function (state) {
      state.message = "Oops Something Went Wrong";
      state.error = true;
      state.loading = false;
      state.page--;
    },
    setTweetData: function (state, payload) {
      state.tweetList = [...state.tweetList, ...payload.data];
      state.error = false;
      state.loading = false;
    },
    editTweetData: function (state, payload) {
      state.tweetList = [...payload.data];
    },
    postLiked: function (state, payload) {
      state.tweetList[payload.idx].like = true;
      state.tweetList[payload.idx].like_count++;
    },
    postUnliked: function (state, payload) {
      state.tweetList[payload.idx].like = false;
      state.tweetList[payload.idx].like_count--;
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
    signup(context) {
      context.commit("setDataFromLocal");
    },
    resetTweets: function ({ commit }) {
      commit("resetTweets");
    },
    setLoading: function ({ commit }) {
      commit("setLoadingState");
    },
    fetchTweets: async function ({ commit, state }, payload) {
      if (state.limit) return;
      commit("setLoadingState");
      try {
        const res = await axios.post(
          `${BASE_URL}/api/post/tweets/${state.page}`,
          {
            user_id: payload.userId,
            like: payload.tab === "likes",
            replies: payload.tab === "replies",
          },
          this.getters.config
        );
        if (res.data && res.data.tweets) {
          console.log(res.data.tweets);
          if (res.data.tweets.length === 0) {
            state.limit = true;
          }
          let res_data = res.data.tweets.map((el) => {
            return {
              ...el,
              uuid: uuid.v4(),
            };
          });
          commit("setTweetData", {
            data: res_data,
          });
        } else {
          throw new Error("Cannot Fetch Data");
        }
      } catch (error) {
        commit("tweetsError");
      }
      commit("incrementPage");
    },
    likeTweet: function ({ commit, state }, payload) {
      const idx = state.tweetList.findIndex((el) => el._id === payload._id);
      console.log(idx);
      if (state.tweetList[idx].like) {
        commit("postUnliked", { idx });
        this.dispatch("unLikePost", { _id: payload._id });
      } else {
        commit("postLiked", { idx });
        this.dispatch("likePost", { _id: payload._id });
      }
    },

    likePost: async function (context, payload) {
      console.log("postliked");
      console.log();
      console.log(
        await axios.post(
          `${BASE_URL}/api/post/like/`,
          {
            post_id: payload._id,
          },
          this.getters.config
        )
      );
    },
    unLikePost: async function (context, payload) {
      await axios.post(
        `${BASE_URL}/api/post/unlike/`,
        {
          post_id: payload._id,
        },
        this.getters.config
      );
    },
    deleteTweet: async function ({ commit, state }, payload) {
      let newList = state.tweetList.filter((el) => el._id !== payload._id);
      commit("editTweetData", {
        data: newList,
      });
      try {
        const res = await axios.post(
          `${BASE_URL}/api/post/delete/`,
          {
            post_id: payload._id,
          },
          this.getters.config
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    editTweet: function () {},
  },
  modules: {},
});
