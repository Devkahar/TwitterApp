<template>
  <div class="id">
    <twitter-outlined />
    <!-- <h1>Home</h1> -->
    <HomeComponent />
    <SearchView />
    <LayoutView />
    <SideView />
    <TweetList />
    <TrendView />
    <PostTweet />
    <TabList />
    <UploadImages />
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
import SearchView from "@/components/SearchView.vue";
import LayoutView from "@/components/LayoutView.vue";
import SideView from "@/components/SideView.vue";
import TweetList from "@/components/TweetList.vue";
import TrendView from "@/components/TrendView.vue";
import PostTweet from "@/components/PostTweet.vue";
import TabList from "@/components/TabList.vue";
import UploadImages from "@/components/UploadImages.vue";
// import HomeComponent from "@/components/HomeComponent.vue";
//import { HomeView } from "vue";
export default {
  name: "HomeView",
  components: {
    HomeComponent,
    SearchView,
    LayoutView,
    SideView,
    TweetList,
    TrendView,
    PostTweet,
    TabList,
    UploadImages,
  },
};
</script>
