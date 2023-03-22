<template>
  <div class="w-full rounded-lg bg-lightest my-4">
    <div class="p-3">
      <p class="text-lg font-bold">Who to Follow</p>
    </div>
    <div v-for="user in userList" v-bind:key="user._id" class="flex flex-col">
      <SearchItem
        :name="user.name ?? ''"
        :profile_url="user.image ?? ''"
        :user_id="user._id"
        :limitName="false"
      >
        <FollowingButton
          :is_following="user.isFollowing"
          :click_handler="() => followUserHandler(user._id)"
          :_id="user._id"
        />
      </SearchItem>
    </div>
    <SpinnerComponent v-if="loading" />
  </div>
</template>

<script>
import { BASE_URL } from "@/helper/constants";
import axios from "axios";
import SearchItem from "./SearchItem.vue";
import FollowingButton from "./FollowingButtonComponent.vue";
import SpinnerComponent from "./SpinnerComponent.vue";
export default {
  name: "FollowList",
  data: function () {
    return {
      config: this.$store.getters.config,
      isAuth: this.$store.getters.isUserAuth,
    };
  },
  computed: {
    userList: function () {
      return this.$store.state.followState.followList;
    },
    loading: function () {
      return this.$store.state.followState.loading;
    },
    error: function () {
      return this.$store.state.followState.error;
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
      this.$store.dispatch("followUserHandler", { _id });
    },
  },
  created: function () {
    this.$store.dispatch("resetFollowList");
    this.$store.dispatch("suggestFollowUser");
  },
  components: {
    SearchItem,
    FollowingButton,
    SpinnerComponent,
  },
};
</script>
