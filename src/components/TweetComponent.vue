<template>
  <div class="p-5 flex border-bottom">
    <div class="h-12 w-12 rounded">
      <img :src="user_img" alt="" class="h-full w-full" />
    </div>
    <div class="ml-2 w-full">
      <UserName
        :name="name"
        :subInfo="`@${getUserName}`"
        :small="true"
        :handle_click="visit_user_profile"
      />
      <p>{{ text }}</p>
      <div class="post_img_box my-3" v-if="post_img !== null">
        <img :src="`${BASE_URL}/${post_img}`" alt="" class="post_img" />
      </div>
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
  </div>
</template>

<script>
import UserName from "./UsernameComponent.vue";
import ReplyButton from "./ReplyButton.vue";
import RetweetButton from "./RetweetButton.vue";
import LikeButton from "./LikeButton.vue";
import {
  BASE_URL,
  userProfilePath,
  user_img as dummy_img,
} from "@/helper/constants";
export default {
  data: function () {
    return {
      BASE_URL: BASE_URL,
      user_id: this.$store.getters.user_id,
    };
  },
  methods: {
    visit_user_profile: function () {
      if (this.user_id !== this.author_id) {
        this.$router.push({ path: userProfilePath(this.user_id) });
      }
    },
  },
  computed: {
    getUserName: function () {
      return this.name.split(" ").join("").toLowerCase();
    },
    user_img: function () {
      if (this.profile_url) {
        return `${BASE_URL}${this.profile_url}`;
      }
      return `${BASE_URL}${dummy_img}`;
    },
  },
  props: {
    text: {
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
    author_id: {
      type: String,
      required: true,
    },
  },
  components: {
    UserName,
    ReplyButton,
    RetweetButton,
    LikeButton,
  },
};
</script>

<style scoped>
.post_img_box {
  max-width: 510px;
  max-height: 750px;
  width: max-content;
  border-radius: 18px;
  -webkit-box-shadow: -5px 6px 10px -15px rgba(0, 0, 0, 0.56);
  -moz-box-shadow: -5px 6px 10px -15px rgba(0, 0, 0, 0.56);
  box-shadow: -5px 6px 10px -15px rgba(0, 0, 0, 0.56);
  border: 0.5px solid #000;
}
.post_img {
  object-fit: contain;
  border-radius: 18px;
}
</style>
