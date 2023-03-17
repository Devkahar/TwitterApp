<template>
  <div class="container px-28 mx-auto">
    <div class="flex">
      <!-- side nav -->
      <div class="w-3/12">
        <SideView />
      </div>
      <!-- tweets -->
      <div
        class="w-6/12 h-full tweet-container hide-scroll"
        id="tweetContainer"
      >
        <slot></slot>
      </div>
      <div class="w-3/12 tweet-container hide-scroll">
        <Trending />
      </div>
    </div>
  </div>
</template>
<script>
import SideView from "@/components/SideView.vue";
import Trending from "@/components/TrendingComponent.vue";
export default {
  name: "MainLayout",
  components: {
    SideView,
    Trending,
  },
};
</script>
