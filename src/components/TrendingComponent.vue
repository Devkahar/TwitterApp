<template>
  <div class="h-full border-l border-lighter py-2 px-3 scroll hide-scroll">
    <SearchTweet />
    <div class="w-full rounded-lg bg-lightest">
      <div class="flex items-center justify-between p-3">
        <p class="text-lg font-bold">Trends for You</p>
        <i class="fas fa-cog text-lg text-blue"></i>
      </div>
      <button
        v-for="trend in trending"
        v-bind:key="trend.id"
        @click="() => (id = tab.id)"
        class="w-full flex justify-between hover:bg-lighter p-3 border-t border-lighter"
      >
        <div>
          <p class="text-xs text-left leading-tight text-dark">
            {{ trend.top }}
          </p>
          <p class="font-semibold text-sm text-left leading-tight">
            {{ trend.title }}
          </p>
          <p class="text-left text-sm leading-tight text-dark">
            {{ trend.bottom }}
          </p>
        </div>
        <i class="fas fa-angle-down text-lg text-dark"></i>
      </button>
      <button
        class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter"
      >
        Show More
      </button>
    </div>
    <div class="w-full rounded-lg bg-lightest my-4">
      <!-- <SearchItem :name="''" :profile_url="''" /> -->
      <div class="p-3">
        <p class="text-lg font-bold">Who to Follow</p>
      </div>

      <!-- <div class="w-full flex hover:bg-lighter p-3 border-t border-lighter"> -->
      <!-- v-for="friend in friends"
        v-bind:key="friend.id"
        @click="() => (id = _userid.id)" -->

      <!-- <img
          :src="`${friend.src}`"
          class="w-12 h-12 rounded-full border border-lighter"
        /> -->
      <div v-for="user in userList" v-bind:key="user._id" class="flex flex-col">
        <SearchItem
          :name="user.name ?? ''"
          :profile_url="user.image ?? ''"
          :user_id="user._id"
          :limitName="false"
        >
          <FollowingButtonComponent
            :is_following="false"
            :click_handler="() => {}"
          />
        </SearchItem>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import SearchTweet from "./SearchTweet.vue";
import { BASE_URL } from "@/helper/constants";
import { ROUTES_CONSTANTS } from "@/helper/constants";
import axios from "axios";
import SearchItem from "./SearchItem.vue";
// import ButtonComponent from "./ButtonComponent.vue";
import FollowingButtonComponent from "./FollowingButtonComponent.vue";
export default {
  name: "TrendingComponent",
  data: function () {
    return {
      loading: false,
      userid: true,
      error: false,
      config: this.$store.getters.config,
      isAuth: this.$store.getters.isUserAuth,
      id: this.userId,

      userList: [],

      trending: [
        { top: "Trending", title: "Beyonce", bottom: "25.4k tweets" },
        { top: "Trending", title: "Beyonce", bottom: "25.4k tweets" },
        { top: "Trending", title: "Beyonce", bottom: "25.4k tweets" },
      ],

      // friends: [
      //   { src: "image-user.jpeg", name: " hiral", handle: "@hiral" },
      //   { src: "image-user.jpeg", name: " hiral", handle: "@hiral" },
      //   { src: "image-user.jpeg", name: " hiral", handle: "@hiral" },
      // ],
      following: [
        {
          src: "image-user.jpg",
          name: "Elon Musk",
          handle: "@elon",
          time: "20 min",
          tweet: "going to mars 🚀",
          comments: "1,000",
          retweets: "550",
          like: "1,000,003",
        },
        {
          src: "image-user.jpg",
          name: "hiral",
          handle: "@hiral",
          time: "20 min",
          tweet: "setting up twitter ",
          comments: "1,000",
          retweets: "550",
          like: "1,000,003",
        },
        {
          src: "image-user.jpg",
          name: "hiral",
          handle: "@hiral",
          time: "20 min",
          tweet: "twit 🤖",
          comments: "1,000",
          retweets: "550",
          like: "1,000,003",
        },
      ],
      tweets: [{ content: "tweeted!" }],
      tweet: { content: "" },
    };
  },
  computed: {
    getUserId: function () {
      return this.userId ?? null;
    },
  },
  methods: {
    suggestUser: async function () {
      try {
        this.error = false;
        const res = await axios.post(
          `${BASE_URL}/api/user/follow/suggestion/`,
          {},
          this.config
        );
        if (res) {
          const data = res.data.data;
          this.userList = data;
          this.loading = false;
          console.log(data);
          console.log("User Suggestion", res);
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
        console.log("Query User Error", error);
      }
    },
    suggestFollow: function () {
      if (!this.isAuth) {
        this.$router.push({ name: ROUTES_CONSTANTS.SIGNUP_PAGE });
        return;
      }
      // this.$store.dispatch("followSuggestion", { _id });
    },
  },
  created: function () {
    this.suggestUser();
  },
  components: {
    SearchTweet,
    SearchItem,
    // ButtonComponent,
    FollowingButtonComponent,
  },
};
</script>
