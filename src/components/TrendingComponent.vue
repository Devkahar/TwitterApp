<template>
  <div class="h-full border-l border-lighter py-2 px-6 scroll hide-scroll">
    <SearchTweet />
    <div class="w-full rounded-lg bg-lightest">
      <div class="flex items-center justify-between p-3">
        <p class="text-lg font-bold">Trends for You</p>
        <i class="fas fa-cog text-lg text-blue"></i>
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
        <i class="fas fa-angle-down text-lg text-dark"></i>
      </button>
      <button
        class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter"
      >
        Show More
      </button>
    </div>
    <div class="w-full rounded-lg bg-lightest my-4">
      <div class="p-3">
        <p class="text-lg font-bold">Who to Follow</p>
      </div>
      <button
        v-for="friend in friends"
        v-bind:key="friend.id"
        @click="() => (id = tab.id)"
        class="w-full flex hover:bg-lighter p-3 border-t border-lighter"
      >
        <img
          :src="`${friend.src}`"
          class="w-12 h-12 rounded-full border border-lighter"
        />
        <div class="hidden lg:block ml-4">
          <p class="text-sm font-bold leading-tight">{{ friend.name }}</p>
          <p class="text-sm leading-tight">{{ friend.handle }}</p>
        </div>
        <button
          class="ml-auto text-sm text-blue py-1 px-4 rounded-full border-2 border-blue"
        >
          Follow
        </button>
      </button>
      <button
        class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter"
      >
        Show More
      </button>
    </div>
  </div>
</template>

<script>
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

      friends: [
        { src: "image-user.jpeg", name: " hiral", handle: "@hiral" },
        { src: "image-user.jpeg", name: " hiral", handle: "@hiral" },
        { src: "image-user.jpeg", name: " hiral", handle: "@hiral" },
      ],
      following: [
        {
          src: "image-user.jpg",
          name: "Elon Musk",
          handle: "@elon",
          time: "20 min",
          tweet: "going to mars 🚀",
          comments: "1,000",
          retweets: "550",
          like: "1,000,003",
        },
        {
          src: "image-user.jpg",
          name: "hiral",
          handle: "@hiral",
          time: "20 min",
          tweet: "setting up twitter ",
          comments: "1,000",
          retweets: "550",
          like: "1,000,003",
        },
        {
          src: "image-user.jpg",
          name: "hiral",
          handle: "@hiral",
          time: "20 min",
          tweet: "twit 🤖",
          comments: "1,000",
          retweets: "550",
          like: "1,000,003",
        },
      ],
      tweets: [{ content: "tweeted!" }],
      tweet: { content: "" },
    };
  },
  components: {
    SearchTweet,
  },
};
</script>
