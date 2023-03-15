<template>
  <div class="id">
    <HomeComponent />
  </div>
</template>
<style>
.page {
  height: 100vh;
  width: 100vw;
}
</style>
<script>
import HomeComponent from "@/components/HomeComponent.vue";

import SearchView from "@/components/SearchTweet.vue";
import LayoutView from "@/components/LayoutView.vue";
import SideView from "@/components/SideView.vue";
import TweetList from "@/components/TweetList.vue";
import TrendView from "@/components/TrendView.vue";
import PostTweet from "@/components/PostTweet.vue";
import TabList from "@/components/TabList.vue";
import UploadImages from "@/components/UploadImages.vue";
export default {
  name: "HomeView",
  components: {
    HomeComponent,
    // CreateTweet,
  },
};
</script>
