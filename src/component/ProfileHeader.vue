<template>
  <div class="">
    <Spinner v-if="loading" />
    <div class="" v-if="data">
      <div class="head flex items-center">
        <BackButton />
        <UserName :name="data.name" sub-info="11.4k Tweets" />
      </div>
      <div class="img-content">
        <div class="back-cover">
          <img class="fit-img" :src="backUrl" alt="" />
        </div>
        <div class="profile-img">
          <div class="img-round h-36 w-36 rounded">
            <img :src="`${BASE_URL}${userImage}`" alt="" class="img-fit" />
          </div>
        </div>
        <div class="profile-img-mask h-36 w-36"></div>
      </div>
      <div class="w-full profile-actions mt-6 p-4 flex flex-col items-end">
        <FollowingButton />
      </div>
      <div class="my-4 px-4">
        <UserName :name="data.name" :sub-info="userName" />
      </div>
      <div class="description px-4">
        <p>{{ data.bio }}</p>
      </div>
      <div class="px-4 flex flex-row">
        <p class="color-light mr-5"><strong>800</strong> Following</p>
        <p class="color-light"><strong>19.K</strong> Followers</p>
      </div>
      <Tab></Tab>
      <router-view :key="$route.path" />
    </div>
    <Alert v-if="!error && !loading" title="Invalid User" :message="message" />
  </div>
</template>

<script>
import BackCover from "@/assets/bg-cover.jpeg";
import Profile from "@/assets/profile.jpg";
import UserName from "@/component/UsernameComponent.vue";
import BackButton from "./BackComponent.vue";
import FollowingButton from "./FollowingButtonComponent.vue";
import Location from "@/assets/location.svg";
import Tab from "@/component/TabComponent.vue";
import axios from "axios";
import { BASE_URL, user_img } from "@/helper/constants";
import Spinner from "@/component/SpinnerComponent.vue";
export default {
  data: function () {
    return {
      backUrl: BackCover,
      profileUrl: Profile,
      locationUrl: Location,
      loading: false,
      data: null,
      error: false,
      message: "",
      BASE_URL: BASE_URL,
    };
  },
  components: {
    UserName,
    BackButton,
    FollowingButton,
    Tab,
    Spinner,
  },
  methods: {
    getUserInfo: async function () {
      try {
        this.loading = true;
        const res = await axios.get(
          `${BASE_URL}/api/user/info/${this.user_id}`
        );
        if (res) {
          this.data = { ...res.data.userDetails };
          this.loading = false;
          this.error = false;
        } else {
          throw new Error("User Cannot Be found");
        }
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.message = error.message;
      }
    },
  },
  computed: {
    userName: function () {
      return `@${this.data.name.split(" ").join("").toLowerCase()}`;
    },
    userImage: function () {
      if (this.data.image) {
        console.log(this.data.image);
        return this.data.image;
      }
      return user_img;
    },
  },
  created: function () {
    console.log(this.$route);
  },
  props: {
    user_id: {
      type: String,
      required: true,
    },
  },
  mounted: function () {
    this.getUserInfo();
  },
};
</script>

<style>
.tweet-count {
  color: rgb(83, 100, 113);
}
.rounded {
  clip-path: circle(48%);
}
.back-cover {
  z-index: 0;
}
.img-content {
  position: relative;
}
.profile-img,
.profile-img-mask {
  position: absolute;
  top: 150px;
  left: 15px;
  z-index: 100;
}
.profile-img-mask {
  border-radius: 500px;
  border: 4px solid #fff;
}
</style>
