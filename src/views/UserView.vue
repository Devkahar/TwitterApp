<template>
  <div class="profile-container">
    <div class="w-full">
      <ProfileHeader :user_id="userId" />
    </div>
  </div>
</template>

<script>
import ProfileHeader from "@/components/ProfileHeader.vue";
export default {
  data: function () {
    return {
      userId: this.$route.params.userId,
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
