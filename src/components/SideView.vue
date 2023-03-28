<template>
  <div
    class="lg:275px x width-full border-b border-l border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between static h-screen"
  >
    <div>
      <button
        class="h-12 w-12 hover:bg-lightblue text-3xl rounded-full text-blue"
      >
        <!-- <font-awesome-icon :icon="['fab', 'twitter']" /> -->
        <!-- <font-awesome-icon icon="fa-solid fa-twitter" /> -->
        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
          />
        </svg> -->
        <font-awesome-icon icon="fa-brands fa-twitter" style="color: #606060" />
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
          <font-awesome-icon :icon="tab.icon" class="text-2xl mr-4 text-left" />
          <p class="text-lg font-semibold text-left hidden lg:block mb-0">
            {{ tab.title }}
          </p>
        </button>
      </div>
      <button
        class="text-white bg-blue rounded-full font-semibold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 hover:bg-darkblue"
      >
        <p class="hidden lg:block">Tweet</p>
        <font-awesome-icon icon class="fas fa-plus lg:hidden" />
      </button>
    </div>
    <LogoutPopup v-if="isAuth" />
    <p v-else>
      <router-link to="/signup"
        ><ButtonComponent :clickHandler="loginHandler" :loading="loading"
          >Create an account</ButtonComponent
        ></router-link
      >
    </p>
  </div>
</template>

<script>
import { userProfilePath } from "@/helper/constants";
import ButtonComponent from "./ButtonComponent.vue";
import LogoutPopup from "./LogoutPopup.vue";

export default {
  name: "SideView",
  data: function () {
    return {
      isAuth: this.$store.getters.isUserAuth,
      user_id: this.$store.getters.user_id,
      tabs: [
        { icon: "fas fa-house", title: "Home", id: "home", path: "/" },
        { icon: "fas fa-hashtag", title: "Explore", id: "explore" },
        { icon: "fas fa-bell", title: "Notifications", id: "notifications" },
        { icon: "fas fa-envelope", title: "Messages", id: "messages" },
        { icon: "fas fa-book-bookmark", title: "Bookmarks", id: "bookmarks" },
        { icon: "fas fa-list", title: "Lists", id: "lists" },
        {
          icon: "fa-solid fa-circle-user",
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
  components: { LogoutPopup, ButtonComponent },
};
</script>
<style scoped>
.svg {
  size: "sm";
  color: #606060;
}
</style>
