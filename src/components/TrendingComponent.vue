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
            :is_following="user.isFollowing"
            :click_handler="() => followUserHandler(user._id)"
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
          this.userList = data.map((el) => ({
            ...el,
            isFollowing: false,
          }));
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
    followUserHandler: function (_id) {
      if (!this.isAuth) {
        this.$router.push({ name: ROUTES_CONSTANTS.SIGNUP_PAGE });
        return;
      }
      const idx = this.userList.findIndex((el) => el._id === _id);
      if (this.userList[idx].isFollowing) {
        this.userList[idx].isFollowing = false;
        this.unfollowUser(_id);
      } else {
        this.userList[idx].isFollowing = true;
        this.followUser(_id);
      }
    },
    followUser: async function (_id) {
      try {
        console.log(
          await axios.post(
            `${BASE_URL}/api/follow/`,
            {
              user_id: _id,
            },
            this.config
          )
        );
      } catch (error) {
        console.log(error);
      }
    },
    unfollowUser: async function (_id) {
      try {
        console.log(
          await axios.post(
            `${BASE_URL}/api/unfollow/`,
            {
              user_id: _id,
            },
            this.config
          )
        );
      } catch (error) {
        console.log(error);
      }
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
