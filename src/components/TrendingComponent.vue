<template>
  <div class="h-full border-l border-lighter py-2 px-3 scroll hide-scroll">
    <SearchTweet />
    <div class="w-full rounded-lg bg-lightest">
      <div class="flex items-center justify-between p-3">
        <p class="text-lg font-bold">Trends for You</p>
        <font-awesome-icon icon="fa-solid fa-gear" />
      </div>
      <button
        v-for="trend in trending"
        v-bind:key="trend.id"
        @click="() => (id = tab.id)"
        class="w-full flex justify-between hover:bg-lighter p-3 border-t border-lighter"
      >
        <div>
          <p class="text-xs text-left leading-tight text-dark">
            {{ trend.top }}
          </p>
          <p class="font-semibold text-sm text-left leading-tight">
            {{ trend.title }}
          </p>
          <p class="text-left text-sm leading-tight text-dark">
            {{ trend.bottom }}
          </p>
        </div>
        <font-awesome-icon icon class="fas fa-angle-down text-lg text-dark" />
      </button>
      <button
        class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter"
      >
        Show More
      </button>
    </div>
    <FollowList />
  </div>
</template>

<script>
import FollowList from "./FollowList.vue";
import SearchTweet from "./SearchTweet.vue";
export default {
  name: "TrendingComponent",
  data: function () {
    return {
      trending: [
        { top: "Trending", title: "Beyonce", bottom: "25.4k tweets" },
        { top: "Trending", title: "Beyonce", bottom: "25.4k tweets" },
        { top: "Trending", title: "Beyonce", bottom: "25.4k tweets" },
      ],
    };
  },
  components: {
    SearchTweet,
    FollowList,
  },
};
</script>
