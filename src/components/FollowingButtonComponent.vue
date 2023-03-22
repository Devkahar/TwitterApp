<template>
  <button
    :class="['btn font-semibold mb-0 text-sm', is_following ? 'following' : '']"
    @click="followUserHandler"
  >
    {{ text }}
  </button>
</template>

<script>
import { BASE_URL, ROUTES_CONSTANTS } from "@/helper/constants";
import axios from "axios";
export default {
  name: "FollowButton",
  data: function () {
    return {
      config: this.$store.getters.config,
      isAuth: this.$store.getters.isUserAuth,
    };
  },
  computed: {
    text: function () {
      return this.is_following ? "Following" : "Follow";
    },
  },
  methods: {
    mouseOvertext: function () {
      if (this.is_following) {
        this.text = "Unfollow";
      } else {
        this.text = "Follow";
      }
    },
    mouseOutText: function () {
      if (this.is_following) {
        this.text = "Following";
      } else {
        this.text = "Follow";
      }
    },
    followUserHandler: function () {
      if (!this.isAuth) {
        this.$router.push({ name: ROUTES_CONSTANTS.SIGNUP_PAGE });
        return;
      }
      this.click_handler();
      if (this.is_following) {
        this.unfollowUser();
      } else {
        this.followUser();
      }
    },
    followUser: async function () {
      try {
        console.log(
          await axios.post(
            `${BASE_URL}/api/follow/`,
            {
              user_id: this._id,
            },
            this.config
          )
        );
      } catch (error) {
        console.log(error);
      }
    },
    unfollowUser: async function () {
      try {
        console.log(
          await axios.post(
            `${BASE_URL}/api/unfollow/`,
            {
              user_id: this._id,
            },
            this.config
          )
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  props: {
    _id: {
      type: String,
      required: true,
    },
    is_following: {
      type: Boolean,
      default: false,
    },
    click_handler: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style>
.btn {
  padding: 8px 10px;
  border: 0.5px solid rgb(218, 218, 218) !important;
  border-radius: 50px;
  color: #000;
  width: 100px;
}
.following:hover {
  background-color: rgba(244, 33, 46, 0.2);
  color: rgb(240, 57, 69);
  border: 0.5px solid rgb(253, 201, 206);
}
</style>

<!-- 
@mouseover="mouseOvertext"
@mouseout="mouseOutText" -->
