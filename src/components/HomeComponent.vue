<template>
  <div class="home-container">
    <div class="home-head">
      <div
        class="px-5 py-3 border-b border-lighter flex items-center justify-between"
      >
        <h1 class="text-xl font-bold">Home</h1>
        <i class="far fa-star text-xl text-blue"></i>
      </div>
      <div class="bg-white">
        <CreateTweet v-if="isAuth" />
      </div>
    </div>
    <div class="home-head--block"></div>
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
  computed: {
    isAuth: function () {
      return this.$store.getters.isUserAuth;
    },
  },
};
</script>

<style>
.home-container {
  position: relative;
}
.home-head {
  position: fixed;
  top: 0;
  background-color: #fff;
  z-index: 1000;
  width: 40.8%;
}
.home-head--block {
  margin-bottom: 13rem;
}
</style>
