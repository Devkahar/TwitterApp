<template>
  <div class="container px-40 mx-auto">
    <div class="flex">
      <div class="w-2/12">
        <div class="w-full">Sidebar</div>
      </div>
      <div class="w-7/12 profile-container">
        <div class="w-full">
          <ProfileHeader :user_id="userId" />
        </div>
      </div>
      <div class="w-3/12"><div class="w-full">Sidebar</div></div>
    </div>
  </div>
</template>

<script>
import ProfileHeader from "@/component/ProfileHeader.vue";
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
