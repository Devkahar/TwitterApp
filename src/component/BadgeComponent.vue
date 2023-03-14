<template>
  <div class="h-5 w-5">
    <img class="fit-img" :src="this.badgeUrl" />
  </div>
</template>

<script>
import Badge from "@/assets/twitter-verified-badge.svg";

export default {
  data: function () {
    return {
      badgeUrl: Badge,
    };
  },
};
</script>
