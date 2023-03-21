<template>
  <div class="">
    <div v-if="tweetList && tab">
      <Tweet
        v-bind:key="tweet.uuid"
        v-for="tweet in tweetList"
        :_id="tweet._id"
        :profile_url="tweet.author.image ? tweet.author.image : ''"
        :name="tweet.author.name ? tweet.author.name : 'Unknown'"
        :liked="tweet.like ? tweet.like : false"
        :like_count="tweet.like_count ? tweet.like_count : 0"
        :retweet_count="tweet.repost_count ? tweet.repost_count : 0"
        :reply_count="tweet.reply_count ? tweet.reply_count : 0"
        :post_img="tweet.image ? tweet.image : null"
        :post_like_handler="likePostHandler"
        :author_id="tweet.author._id"
        :delete_tweet="deleteTweet"
        :edit_tweet="editTweet"
        :createdAt="tweet.createdAt"
        :tweet_content="tweet.text"
      />
    </div>
    <div
      v-if="tweetList.length === 0 && !loading"
      class="w-full h-40 flex items-center justify-center"
    >
      <h1 class="text-2xl">No Tweets</h1>
    </div>
    <Spinner v-if="loading" />
    <Alert
      v-if="error && !loading"
      title="Something Went Wrong"
      :message="message"
    />
  </div>
</template>

<script>
import Tweet from "./TweetComponent.vue";
import { ROUTES_CONSTANTS } from "@/helper/constants";
import Alert from "@/components/AlertComponent.vue";
import Spinner from "./SpinnerComponent.vue";
export default {
  name: "FetchtweetComponent",
  data: function () {
    return {
      config: this.$store.getters.config,
      isAuth: this.$store.getters.isUserAuth,
      tb: this.tab,
      id: this.userId,
    };
  },
  computed: {
    tweetList: function () {
      return this.$store.getters.tweetList;
    },
    error: function () {
      return this.$store.getters.error;
    },
    loading: function () {
      return this.$store.getters.loading;
    },
    message: function () {
      return this.$store.getters.message;
    },
    getTab: function () {
      return this.tab;
    },
    getUserId: function () {
      return this.userId ?? null;
    },
    limit: function () {
      return this.$store.getters.limit;
    },
  },
  components: {
    Tweet,
    Alert,
    Spinner,
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
              ctx.$store.dispatch("fetchTweets", {
                userId: ctx.userId,
                tab: ctx.getTab,
              });
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
    editTweet: function () {},
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
};
</script>
