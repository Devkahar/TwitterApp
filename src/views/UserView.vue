<template>
  <div class="profile-container">
    <div class="w-full">
      <ProfileHeader />
    </div>
  </div>
</template>

<script>
import ProfileHeader from "@/components/ProfileHeader.vue";
import { computed } from "vue";
export default {
  data: function () {
    return {};
  },
  computed: {
    getUserId: function () {
      return this.$route.params.userId;
    },
  },
  provide: function () {
    return {
      context: computed(() => ({
        userId: this.$route.params.userId,
      })),
    };
  },
  components: { ProfileHeader },
};
</script>

<style>
.profile-container {
  border: 1px solid #eee;
}
</style>
