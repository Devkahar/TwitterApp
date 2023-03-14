<template>
  <OverlayLoading>
    <div class="page"></div>
  </OverlayLoading>
</template>
<style>
.page {
  height: 100vh;
  width: 100vw;
}
</style>
<script>
import OverlayLoading from "@/component/OverlayLoading.vue";

export default {
  name: "HomeView",
  components: {
    OverlayLoading,
  },
};
</script>
