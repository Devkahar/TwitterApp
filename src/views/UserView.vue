<template>
  <div class="2xl:container px-40 mx-auto">
    <div class="flex">
      <div class="w-3/12">
        <div class="w-full"><SideView /></div>
      </div>
      <div class="w-6/12 profile-container">
        <div class="w-full">
          <ProfileHeader :user_id="userId" />
        </div>
      </div>
      <div class="w-3/12">
        <div class="w-full">
          <div class="p-5">
            <SearchTweet />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileHeader from "@/components/ProfileHeader.vue";
import SearchTweet from "@/components/SearchTweet.vue";
import SideView from "@/components/SideView.vue";
export default {
  data: function () {
    return {
      userId: this.$route.params.userId,
    };
  },
  created: function () {
    this.$watch(
      () => this.$route.params,
      (toParams) => {
        if (this.id !== toParams.userId) {
          this.userId = toParams.userId;
        }
      }
    );
  },
  components: { ProfileHeader, SideView, SearchTweet },
};
</script>

<style>
.profile-container {
  border: 1px solid #eee;
}
</style>
