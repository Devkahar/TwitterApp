<template>
  <div class="lg:w-full relative">
    <button
      @click="() => (dropdown = true)"
      class="flex items-center w-full hover:bg-lightblue rounded-full p-2 focus:outline-none"
    >
      <SearchItem :name="user_name" :profile_url="user_img" :border="false" />
      <i class="hidden lg:block fas fa-angle-down ml-auto text-lg"></i>
    </button>
    <div
      v-if="dropdown === true"
      class="absolute bottom-0 left-0 w-64 rounded-lg shadow-md border-lightest bg-white mb-16"
    >
      <button
        @click="() => (dropdown = false)"
        class="p-3 flex items-center w-full hover:bg-lightest p-2 focus:outline-none"
      >
        <SearchItem :name="user_name" :profile_url="user_img" :border="false" />
        <i class="fas fa-check ml-auto test-blue"></i>
      </button>
      <button
        @click="editProfile"
        class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none"
      >
        Edit Profile
      </button>
      <button
        @click="editPassword"
        class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none"
      >
        Change Password
      </button>
      <button
        @click="logoutUser"
        class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none"
      >
        Log out {{ user_name }}
      </button>
    </div>
  </div>
</template>
<script>
import { ROUTES_CONSTANTS } from "@/helper/constants";
import SearchItem from "./SearchItem.vue";

export default {
  name: "LogoutComponent",
  data: function () {
    return {
      dropdown: false,
      name: this.$store.getters.user_name,
      user_name: this.$store.getters.user_name,
    };
  },
  methods: {
    logoutUser: function () {
      this.$store.dispatch({ type: "logout" });
      this.$router.push({ name: ROUTES_CONSTANTS.LOGIN_PAGE });
    },
    editProfile: function () {
      this.$router.push({ name: ROUTES_CONSTANTS.EDIT_PAGE });
    },
    editPassword: function () {
      this.$router.push({ name: ROUTES_CONSTANTS.EDIT_PASSWORD_PAGE });
    },
  },
  computed: {
    user_img: function () {
      return this.$store.getters.user_img;
    },
  },
  components: { SearchItem },
};
</script>
