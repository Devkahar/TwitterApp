<template>
  <div class="">
    <div v-if="data && tab">
      <Tweet
        v-bind:key="tweet._id"
        v-for="tweet in data"
        :_id="tweet._id"
        :text="tweet.text ? tweet.text : 'Something...'"
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
      >
      </Tweet>
    </div>
    <div
      v-if="data.length === 0 && !loading"
      class="w-full h-40 flex items-center justify-center"
    >
      <h1 class="text-2xl">No Tweets</h1>
    </div>
    <Spinner v-if="loading && !limit" />
    <Alert
      v-if="error && !loading"
      title="Something Went Wrong"
      :message="message"
    />
  </div>
</template>

<script>
import Tweet from "./TweetComponent.vue";
import { BASE_URL, ROUTES_CONSTANTS } from "@/helper/constants";
import axios from "axios";
import Alert from "@/components/AlertComponent.vue";
import Spinner from "./SpinnerComponent.vue";

export default {
  data: function () {
    return {
      loading: false,
      message: "",
      error: false,
      data: [],
      page: 1,
      limit: false,
      config: this.$store.getters.config,
      tb: this.tab,
      isAuth: this.$store.getters.isUserAuth,
    };
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
  watch: {
    tab: function (newTab) {
      this.reset(newTab);
      this.getTweetsByUserId();
    },
  },
  methods: {
    reset: function (newTab) {
      this.data = [];
      this.page = 1;
      this.tb = newTab;
    },
    getTweetsByUserId: async function () {
      try {
        console.log("new Tweets");
        this.loading = true;
        this.limit = false;
        const res = await axios.post(
          `${BASE_URL}/api/post/tweets/${this.page}`,
          {
            user_id: this.userId,
            like: this.tb === "likes",
            replies: this.tb === "replies",
          },
          this.config
        );
        if (res.data && res.data.tweets) {
          console.log(res.data.tweets);
          if (res.data.tweets.length === 0) {
            this.limit = true;
          }
          this.data = [...this.data, ...res.data.tweets];
          this.error = false;
          this.loading = false;
        } else {
          throw new Error("Cannot Fetch Data");
        }
      } catch (error) {
        this.message = error.message;
        this.error = true;
        this.loading = false;
      }
      this.page++;
    },
    scrollFetchTweets: function () {
      let context = this;
      let time;
      document
        .getElementById("tweetContainer")
        .addEventListener("scroll", function () {
          let scroll =
            document.documentElement.scrollTop +
              document.documentElement.offsetHeight >=
            document.body.scrollHeight - 500;
          if (scroll && !this.limit) {
            if (time) clearTimeout(time);
            context.loading = true;
            time = setTimeout(() => {
              context.getTweetsByUserId();
            }, 2000);
          }
        });
    },
    likePostHandler: async function (_id) {
      if (!this.isAuth) {
        this.$router.push({ name: ROUTES_CONSTANTS.SIGNUP_PAGE });
        return;
      }
      const idx = this.data.findIndex((el) => el._id === _id);
      if (this.data[idx].like) {
        this.data[idx].like = false;
        this.data[idx].like_count--;
        this.unLikePost(_id);
      } else {
        this.data[idx].like = true;
        this.data[idx].like_count++;
        this.likePost(_id);
      }
    },
    likePost: async function (id) {
      console.log("postliked");
      console.log(
        await axios.post(
          `${BASE_URL}/api/post/like/`,
          {
            post_id: id,
          },
          this.config
        )
      );
    },
    unLikePost: async function (id) {
      await axios.post(
        `${BASE_URL}/api/post/unlike/`,
        {
          post_id: id,
        },
        this.config
      );
    },
    deleteTweet: async function (_id) {
      this.data = this.data.filter((el) => el._id !== _id);
      try {
        const res = await axios.post(
          `${BASE_URL}/api/post/delete/`,
          {
            post_id: _id,
          },
          this.config
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    editTweet: async function () {},
  },

  mounted: function () {
    this.data = [];
    this.getTweetsByUserId();
    this.scrollFetchTweets();
  },
};
</script>
