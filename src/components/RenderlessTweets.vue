<script>
import { ROUTES_CONSTANTS } from "@/helper/constants";

export default {
  name: "RenderlessTweets",
  data: function () {
    return {
      config: this.$store.getters.config,
      isAuth: this.$store.getters.isUserAuth,
      tb: this.tab,
      id: this.userId,
      visible: false,
      edit_id: "",
      edit_content: "",
      edit_post_url: "",
    };
  },
  computed: {
    tweetList: function () {
      return this.$store.state.tweetState.tweetList;
    },
    error: function () {
      return this.$store.state.tweetState.error;
    },
    loading: function () {
      return this.$store.state.tweetState.loading;
    },
    message: function () {
      return this.$store.state.tweetState.message;
    },
    getTab: function () {
      return this.tab;
    },
    getUserId: function () {
      return this.userId ?? null;
    },
    limit: function () {
      return this.$store.state.tweetState.limit;
    },
    getEditPostUrl: function () {
      return this.edit_post_url;
    },
    getEditPostId: function () {
      return this.edit_id;
    },
    getEditedContent: function () {
      return this.edit_content;
    },
  },
  props: {
    tab: {
      type: String,
      default: "tweets",
    },
    userId: {
      type: String,
    },
  },
  methods: {
    reloadTweets: function () {
      this.$store.dispatch("resetTweets");
      this.$store.dispatch("fetchTweets", {
        userId: this.getUserId,
        tab: this.getTab,
      });
    },
    fetchTweets: function () {
      this.$store.dispatch("fetchTweets", {
        userId: this.userId,
        tab: this.getTab,
      });
    },
    scrollFetchTweets: function () {
      let ctx = this;
      let time;
      document
        .getElementById("tweetContainer")
        .addEventListener("scroll", function () {
          let scroll =
            document.documentElement.scrollTop +
              document.documentElement.offsetHeight >=
            document.body.scrollHeight - 500;
          if (scroll && !ctx.limit) {
            if (time) clearTimeout(time);
            ctx.$store.dispatch("setLoading");
            time = setTimeout(() => {
              ctx.fetchTweets(ctx);
            }, 1000);
          }
        });
    },
    likePostHandler: function (_id) {
      if (!this.isAuth) {
        this.$router.push({ name: ROUTES_CONSTANTS.SIGNUP_PAGE });
        return;
      }
      this.$store.dispatch("likeTweet", { _id });
    },
    deleteTweet: function (_id) {
      this.$store.dispatch("deleteTweet", { _id });
    },
    editTweet: function (_id) {
      const tweet = this.tweetList.find((el) => el._id === _id);
      this.edit_id = tweet._id;
      this.edit_content = tweet.text;
      this.edit_post_url = tweet.image;
      this.visible = true;
    },
    closeModal: function () {
      console.log("Model Close");
      this.visible = false;
    },
    editTweetSuccessHandler: function () {
      this.closeModal();
      this.reloadTweets();
    },
  },
  created: function () {
    this.reloadTweets();
  },
  mounted: function () {
    this.scrollFetchTweets();
  },
  watch: {
    getTab: function (newTab) {
      if (this.tb !== newTab) {
        this.tb = newTab;
        this.reloadTweets();
      }
    },
    getUserId: function (newId) {
      if (this.id !== newId) {
        this.id = newId;
        this.reloadTweets();
      }
    },
  },
  render: function () {
    return this.$scopedSlots.default({
      visible: this.visible,
      closeModal: this.closeModal,
      getEditPostId: this.getEditPostId,
      getEditedContent: this.getEditedContent,
      getEditPostUrl: this.getEditPostUrl,
      editTweetSuccessHandler: this.editTweetSuccessHandler,
      tweetList: this.tweetList,
      tab: this.tab,
      error: this.error,
      loading: this.loading,
      message: this.message,
      likePostHandler: this.likePostHandler,
      deleteTweet: this.deleteTweet,
      editTweet: this.editTweet,
    });
  },
};
</script>
