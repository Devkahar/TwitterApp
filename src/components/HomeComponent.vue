<template>
  <div class="">
    <div
      class="px-5 py-3 border-b border-lighter flex items-center justify-between"
    >
      <h1 class="text-xl font-bold">Home</h1>
      <i class="far fa-star text-xl text-blue"></i>
    </div>
    <div class="bg-white">
      <CreateTweet v-if="isAuth" />
    </div>
    <FetchTweets />
  </div>
</template>
<script>
import FetchTweets from "@/components/FetchTweets.vue";
import CreateTweet from "@/components/CreateTweet.vue";
export default {
  name: "HomeComponent",
  components: {
    FetchTweets,
    CreateTweet,
  },
  data() {
    return {
      isAuth: this.$store.getters.isUserAuth,
    };
  },
};
</script>
