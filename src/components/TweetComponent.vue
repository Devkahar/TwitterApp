<template>
  <div>
    <div class="pt-4 pl-10 w-full" v-if="retwtted">
      <h1>Dev Kahar Retweeted</h1>
    </div>
    <div class="p-5 flex border_bottom">
      <div class="w-1/12 pr-1">
        <UserImage :url="profile_url" />
      </div>
      <div class="w-10/12">
        <UserName
          :name="name"
          :subInfo="`@${getUserName} ${getDate}`"
          :small="true"
          :handle_click="visit_user_profile"
        />
        <p>{{ tweet_content }}</p>
        <PostImage :url="post_img" v-if="post_img" />
        <div class="w-100 flex justify-between pr-24 pl-12">
          <div class="flex items-center">
            <ReplyButton />
            <span class="ml-1">{{ reply_count }}</span>
          </div>
          <div class="flex items-center">
            <RetweetButton />
            <span class="ml-1">{{ retweet_count }}</span>
          </div>
          <div class="flex items-center">
            <LikeButton :click="() => post_like_handler(_id)" :active="liked" />
            <span class="ml-1">{{ like_count }}</span>
          </div>
        </div>
      </div>
      <div class="relative w-1/12" v-if="performAction">
        <div class="cursor-pointer" @click="toggleSuggestion">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
            height="16px"
            width="16px"
          >
            <g>
              <path
                d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
              ></path>
            </g>
          </svg>
        </div>
        <div class="w-12">
          <div class="action-buttons-box" v-if="showSuggestion">
            <div
              class="p-2 cursor-pointer border_bottom"
              @click="editTweetHandler"
            >
              <h1 class="T-base">Edit</h1>
            </div>
            <div class="p-2 cursor-pointer" @click="deleteTweetHandler">
              <h1 class="T-base">Delete</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserName from "@/components/UsernameComponent.vue";
import ReplyButton from "@/components/ReplyButton.vue";
import RetweetButton from "@/components/RetweetButton.vue";
import LikeButton from "@/components/LikeButton.vue";
import { BASE_URL, userProfilePath, getImgUrl } from "@/helper/constants";
import UserImage from "@/components/UserImage.vue";
import PostImage from "./PostImage.vue";
import { getCreatedDate } from "@/helper/util";
export default {
  name: "TweetComponent",
  data: function () {
    return {
      BASE_URL: BASE_URL,
      user_id: this.$store.getters.user_id,
      showSuggestion: false,
      performAction: this.author_id === this.$store.getters.user_id,
    };
  },
  methods: {
    visit_user_profile: function () {
      if (this.user_id !== this.author_id) {
        this.$router.push({ path: userProfilePath(this.author_id) });
      }
    },
    toggleSuggestion: function () {
      this.showSuggestion = !this.showSuggestion;
    },
    editTweetHandler: function () {
      this.edit_tweet(this._id);
      this.showSuggestion = false;
    },
    deleteTweetHandler: function () {
      this.delete_tweet(this._id);
    },
  },
  computed: {
    getUserName: function () {
      return this.name.split(" ").join("").toLowerCase();
    },
    postImgUrl: function () {
      return getImgUrl(this.post_img);
    },
    getDate: function () {
      return getCreatedDate(this.createdAt, this.edited);
    },
  },
  props: {
    tweet_content: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
      required: true,
    },
    profile_url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    liked: {
      type: Boolean,
      required: true,
    },
    like_count: {
      type: Number,
      required: true,
    },
    retweet_count: {
      type: Number,
      required: true,
    },
    reply_count: {
      type: Number,
      required: true,
    },
    post_img: {
      type: String,
      default: null,
    },
    post_like_handler: {
      type: Function,
      required: true,
    },
    delete_tweet: {
      type: Function,
    },
    edit_tweet: {
      type: Function,
    },
    author_id: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    edited: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    UserName,
    ReplyButton,
    RetweetButton,
    LikeButton,
    UserImage,
    PostImage,
  },
};
</script>

<style scoped>
.border_bottom {
  border-bottom: 0.5px solid #eee;
}
.action-buttons-box {
  border: 1px solid #eee;
  position: absolute;
  top: 1%;
  left: -290%;
  z-index: 10;
  background-color: #fff;
  width: 120px;
  border-radius: 10px;
}
.retweet_active {
  color: #007cba;
}
</style>
