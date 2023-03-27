<template>
  <div class="">
    <div class="">
      <div class="px-5 py-3 mb-5 border-b border-lighter">
        <h1 class="text-xl font-bold">Home</h1>
        <i class="far fa-star text-xl text-blue"></i>
      </div>
      <div class="createTweet">
        <CreateTweet v-if="isAuth" />
      </div>
    </div>
    <div class="mt-40"><FetchTweets /></div>
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
<style scoped>
.createTweet {
  background-color: white;
  overflow-y: hidden;
  position: fixed;
  z-index: 1000;
  width: inherit;
}
/* .home {
  padding: 5px 3px;
  margin-bottom: 5px;
  box-sizing: border-box;
  border: whitesmoke;
  -ms-flex-item-align: center;
  flex-basis: justify-between;
  position: fixed;
  top: 5px;
  width: inherit;
  z-index: 1000;
  overflow-y: hidden;
} */
</style>
<!-- bg-white overflow-y-hidden position-fixed h-full margin-0 -->
<!-- -->
