<template>
  <div class="">
    <div v-if="data">
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
        :reply_count="tweet.like_count ? tweet.like_count : 0"
        :post_img="tweet.image ? tweet.image : null"
        :post_like_handler="likePostHandler"
        :author_id="tweet.author._id"
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
    <Alert v-if="error && !loading" title="Invalid User" :message="message" />
  </div>
</template>

<script>
import Tweet from "./TweetComponent.vue";
import { BASE_URL } from "@/helper/constants";
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
  methods: {
    getTweetsByUserId: async function () {
      try {
        this.loading = true;
        this.limit = false;
        const res = await axios.post(
          `${BASE_URL}/api/post/tweets/${this.page}`,
          {
            user_id: this.userId,
            like: this.tab === "likes",
            replies: this.tab === "replies",
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
      window.addEventListener("scroll", function () {
        let scroll =
          document.documentElement.scrollTop +
            document.documentElement.offsetHeight >=
          document.body.scrollHeight - 500;
        console.log(
          scroll,
          document.documentElement.scrollTop,
          // window.screenY,
          document.documentElement.offsetHeight,
          window.innerHeight,
          document.body.scrollHeight
          // document.body.scrollHeight
        );
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
  },

  mounted: function () {
    this.getTweetsByUserId();
    this.scrollFetchTweets();
  },
};
</script>
