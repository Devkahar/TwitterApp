<template>
  <div>
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
export default {
  name: "HomeView",
  components: {
    HomeComponent,
    // CreateTweet,
  },
};
</script>
