<template>
  <div
    class="lg:275px x width-full border-b border-l border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between static h-screen"
  >
    <div>
      <button
        class="h-12 w-12 hover:bg-lightblue text-3xl rounded-full text-blue"
      >
        <i class="fab fa-twitter"></i>
      </button>
      <div>
        <button
          v-for="tab in tabs"
          v-bind:key="tab.id"
          :class="`focus:outline-none hover:text-blue flex items-center py-2 px-4 hover:bg-lightblue rounded-full mr-auto mb-5 		 ${
            id === tab.id ? 'text-blue' : ''
          }`"
          @click="() => sideRoute(tab.id)"
        >
          <i :class="`${tab.icon} text-2xl mr-4 text-left`"></i>
          <p class="text-lg font-semibold text-left hidden lg:block mb-0">
            {{ tab.title }}
          </p>
        </button>
      </div>
      <button
        class="text-white bg-blue rounded-full font-semibold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 hover:bg-darkblue"
      >
        <p class="hidden lg:block">Tweet</p>
        <i class="fas fa-plus lg:hidden"></i>
      </button>
    </div>
    <LogoutPopup v-if="isAuth" />
  </div>
</template>

<script>
import { userProfilePath } from "@/helper/constants";
import LogoutPopup from "./LogoutPopup.vue";

export default {
  data: function () {
    return {
      isAuth: this.$store.getters.isUserAuth,
      user_id: this.$store.getters.user_id,
      tabs: [
        { icon: "fas fa-home", title: "Home", id: "home", path: "/" },
        { icon: "fas fa-hashtag", title: "Explore", id: "explore" },
        { icon: "far fa-bell", title: "Notifications", id: "notifications" },
        { icon: "far fa-envelope", title: "Messages", id: "messages" },
        { icon: "far fa-bookmark", title: "Bookmarks", id: "bookmarks" },
        { icon: "fas fa-clipboard-list", title: "Lists", id: "lists" },
        {
          icon: "far fa-user",
          title: "Profile",
          id: "profile",
          path: "profile",
        },
        { icon: "fas fa-ellipsis-h", title: "More", id: "more" },
      ],
      dropdown: false,
      id: true,
    };
  },
  methods: {
    sideRoute: function (id) {
      if (id === "profile") {
        const user_id = this.$store.getters.user_id;
        console.log("User_id", user_id);
        this.$router.push(userProfilePath(user_id));
      } else {
        this.$router.push("/").catch(() => {});
      }
    },
  },
  components: { LogoutPopup },
};
</script>
