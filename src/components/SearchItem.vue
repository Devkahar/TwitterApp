<template>
  <div class="w-full item flex flex-row p-2 border-b items-center">
    <div v-if="default_comp" class="text-center w-full">
      <h3>No Users found</h3>
    </div>
    <div v-else-if="loading" class="w-full">
      <SpinnerComponent />
    </div>
    <div v-else class="w-full flex justify-between items-center">
      <div class="flex" @click="visit_user_profile">
        <div class="h-12 w-12 rounded mr-2">
          <img :src="user_img" alt="" class="h-full w-full" />
        </div>
        <UsernameComponent
          :name="name"
          :sub-info="getUserName"
          :limitName="limitName"
          :title_basic="true"
        />
      </div>
      <slot>
        <div></div>
      </slot>
    </div>
  </div>
</template>

<script>
import { BASE_URL, user_img, userProfilePath } from "@/helper/constants";
import UsernameComponent from "@/components/UsernameComponent.vue";
import SpinnerComponent from "./SpinnerComponent.vue";
export default {
  name: "SearchitemComponent",
  data: function () {
    return {
      author_id: this.$route.params.userId,
    };
  },
  computed: {
    getUserName: function () {
      let str = this.name.split(" ").join("").toLowerCase();
      if (this.limitName && str.length >= 4) {
        return "@" + str.slice(0, 4) + "...";
      }
      return "@" + str;
    },
    user_img: function () {
      if (this.profile_url) {
        return `${BASE_URL}${this.profile_url}`;
      }
      return `${BASE_URL}${user_img}`;
    },
  },
  components: {
    UsernameComponent,
    SpinnerComponent,
  },
  methods: {
    visit_user_profile: function () {
      if (this.user_id !== this.author_id) {
        this.$router
          .push({ path: userProfilePath(this.user_id) })
          .catch(() => {});
      }
    },
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
    },
    profile_url: {
      type: String,
      required: true,
    },
    default_comp: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    limitName: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
