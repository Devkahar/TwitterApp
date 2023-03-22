import { BASE_URL } from "@/helper/constants";
import { uuid } from "vue-uuid";
import axios from "axios";

const tweetStore = {
  state: () => ({
    tweetList: [],
    loading: false,
    limit: false,
    error: false,
    message: "",
    page: 1,
  }),
  mutations: {
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
    setLimit: function (state) {
      state.limit = false;
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
    resetTweets: function ({ commit }) {
      console.log("resetTweetCalled");
      commit("resetTweets");
    },
    setLoading: function ({ commit }) {
      commit("setLoadingState");
    },
    fetchTweets: async function ({ commit, state }, payload) {
      console.log("setLoading tweet called");
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
            commit("setLimit");
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
        commit("incrementPage");
      } catch (error) {
        commit("tweetsError");
      }
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

      const res = await axios.post(
        `${BASE_URL}/api/post/like/`,
        {
          post_id: payload._id,
        },
        this.getters.config
      );
      console.log(res);
    },
    unLikePost: async function (context, payload) {
      const res = await axios.post(
        `${BASE_URL}/api/post/unlike/`,
        {
          post_id: payload._id,
        },
        this.getters.config
      );
      console.log(res);
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
};
export default tweetStore;
