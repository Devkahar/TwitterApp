<template>
  <Spinner v-if="loading" />
  <div class="" v-else>
    <div class="tweet-container hide-scroll" v-if="data" id="tweetContainer">
      <div class="head flex items-center">
        <BackButton />
        <UserName :name="data.name" sub-info="11.4k Tweets" />
      </div>
      <div class="img-content">
        <div class="back-cover w-full">
          <img
            src="https://media.licdn.com/dms/image/C4D12AQHMPBvE3avWzg/article-inline_image-shrink_1000_1488/0/1616872522462?e=1684972800&v=beta&t=6JApKuGeaiLZ0dZytB4qFSrf6Alo2GDJOJTiV7Q1-ns"
            alt=""
            class="w-full"
          />
        </div>
        <div class="profile-img">
          <UserImage :url="data.image ?? ''" :large_img="true" />
        </div>
        <div class="profile-img-mask h-36 w-36"></div>
      </div>
      <div class="w-full profile-actions mt-6 p-4 flex flex-col items-end">
        <FollowingButton
          :is_following="getIsFollowing"
          :click_handler="() => followHandler(getUserId)"
          v-if="curr_user !== getUserId"
          :_id="getUserId"
        />
      </div>
      <div class="my-4 px-4">
        <UserName :name="data.name" :sub-info="userName" />
      </div>
      <div class="description px-4">
        <p>{{ data.bio }}</p>
      </div>
      <div class="px-4 flex flex-row">
        <p class="color-light mr-5">
          <strong>{{ this.getFollowingCount }}</strong> Following
        </p>
        <p class="color-light">
          <strong>{{ this.getFollowersCount }}</strong> Followers
        </p>
      </div>
      <Tab :change_tab="changeTabHandler" :curr_tab="tab" />
      <FetchTweets :tab="tab" :userId="getUserId" />
    </div>
    <Alert v-if="error && !loading" title="Invalid User" :message="message" />
  </div>
</template>

<script>
import BackCover from "@/assets/bg-cover.jpeg";
import Profile from "@/assets/profile.jpg";
import UserName from "@/components/UsernameComponent.vue";
import BackButton from "./BackComponent.vue";
import FollowingButton from "./FollowingButtonComponent.vue";
import Location from "@/assets/location.svg";
import Tab from "@/components/TabComponent.vue";
import axios from "axios";
import { BASE_URL, getUserName } from "@/helper/constants";
import Spinner from "@/components/SpinnerComponent.vue";
import Alert from "@/components/AlertComponent.vue";
import FetchTweets from "@/components/FetchTweets.vue";
import UserImage from "./UserImage.vue";
export default {
  name: "ProfileHeadComponent",
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
      curr_user: this.$store.getters.user_id,
      config: this.$store.getters.config,
      tab: "tweets",
      id: this.context.userId,
    };
  },
  inject: ["context"],
  components: {
    UserName,
    BackButton,
    FollowingButton,
    Tab,
    Spinner,
    Alert,
    FetchTweets,
    UserImage,
  },
  methods: {
    getUserInfo: async function () {
      console.log("Info Fetched");
      try {
        this.loading = true;
        const res = await axios.post(
          `${BASE_URL}/api/user/info/${this.getUserId}`,
          {},
          this.config
        );
        if (res) {
          this.data = { ...res.data.userDetails };
          this.loading = false;
          this.error = false;
          console.log(res.data.userDetails);
          this.$store.dispatch("setFollow", {
            followers: this.data.followers,
            following: this.data.following,
            isFollowing: this.data.isFollowing,
            currentUser: this.getUserId,
          });
        } else {
          throw new Error("User Cannot Be found");
        }
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.message = error.message;
      }
    },
    followHandler: function (_id) {
      console.log("Following Action", this.getUserId === this.curr_user);
      this.$store.dispatch("followUserHandler", {
        _id,
        isCurrentUser: this.getUserId === this.curr_user,
      });
    },
    changeTabHandler: function (newtab) {
      if (newtab !== this.tab) {
        this.tab = newtab;
      }
    },
  },
  computed: {
    userName: function () {
      return getUserName(this.data.name);
    },
    getUserId: function () {
      console.log("Get UserId Changes");
      return this.context.userId ?? null;
    },
    getFollowersCount: function () {
      return this.$store.state.followState.followers;
    },
    getFollowingCount: function () {
      return this.$store.state.followState.following;
    },
    getIsFollowing: function () {
      return this.$store.state.followState.isFollowing;
    },
  },
  watch: {
    getUserId: function (newId) {
      if (this.id !== newId) {
        this.id = newId;
        this.tab = "tweets";
        this.getUserInfo();
      }
    },
  },
  created: function () {
    this.tab = "tweets";
    this.getUserInfo();
  },
  destroyed: function () {
    console.log("Profile Header Destroyed");
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
.back-cover > img {
  height: 218px;
}
.img-content {
  position: relative;
}
.profile-img,
.profile-img-mask {
  position: absolute;
  top: 60%;
  left: 15px;
  z-index: 100;
}
.profile-img-mask {
  border-radius: 500px;
  border: 4px solid #fff;
}
.tweet-container {
  height: 100vh;
  overflow: scroll;
}
.hide-scroll::-webkit-scrollbar {
  display: none;
}

.hide-scroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
