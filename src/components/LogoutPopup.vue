<template>
  <div class="lg:w-full relative">
    <button
      @click="() => (dropdown = true)"
      class="flex items-center w-full hover:bg-lightblue rounded-full p-2 focus:outline-none"
    >
      <img
        :src="user_img"
        class="rounded w-10 h-10 rounded-full border border-lighter"
      />
      <div class="hidden lg:block ml-4">
        <p class="text-sm font-bold leading-tight">{{ name }}</p>
        <p class="text-sm leading-tight">{{ user_name }}</p>
      </div>
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
        <img
          :src="user_img"
          class="w-10 h-10 rounded rounded-full border border-lighter"
        />
        <div class="ml-4">
          <p class="text-sm font-bold leading-tight">{{ name }}</p>
          <p class="text-sm leading-tight">{{ user_name }}</p>
        </div>
        <i class="fas fa-check ml-auto test-blue"></i>
      </button>
      <button
        @click="dropdown = false"
        class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none"
      >
        Add an existing account
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
import { BASE_URL, getUserName, ROUTES_CONSTANTS } from "@/helper/constants";

export default {
  data: function () {
    return {
      dropdown: false,
      name: this.$store.getters.user_name,
      user_name: getUserName(this.$store.getters.user_name),
    };
  },
  methods: {
    logoutUser: function () {
      this.$store.dispatch({ type: "logout" });
      this.$router.push({ name: ROUTES_CONSTANTS.LOGIN_PAGE });
    },
  },
  computed: {
    user_img: function () {
      return `${BASE_URL}${this.$store.getters.user_img}`;
    },
  },
};
</script>
