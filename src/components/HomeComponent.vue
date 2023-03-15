<template>
  <div class="flex container h-screen w-full">
    <router view />
    <!-- side nav -->
    <SideView />
    <!-- tweets -->
    <div class="w-full md:w-o.5 h-full overflow-y-scroll">
      <div
        class="px-5 py-3 border-b border-lighter flex items-center justify-between"
      >
        <h1 class="text-xl font-bold">Home</h1>
        <i class="far fa-star text-xl text-blue"></i>
      </div>
      <div class="566px x 48px border-b-8 border-lighter flex">
        <div class="flex-none">
          <img
            src="image-user.jpeg"
            class="flex-none w-12 h-12 rounded-full border border-lighter"
          />
        </div>
        <form v-on:submit.prevent="addNewTweet" class="w-full px-4 relative">
          <textarea
            v-model="tweet.content"
            placeholder="what's happening?"
            class="mt-3 pb-3 w-full focus:outline-none"
          />
          <div class="flex items-center">
            <i class="text-lg text-blue mr-4 far fa-image"></i>
            <i class="text-lg text-blue mr-4 fas fa-film"></i>
            <i class="text-lg text-blue mr-4 far fa-chart-bar"></i>
            <i class="text-lg text-blue mr-4 far fa-smile"></i>
          </div>
          <button
            type="submit"
            class="h-10 px-4 text-blue font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full absolute bottom-0 right-0"
          >
            Tweet
          </button>
        </form>
      </div>
      <div class="flex flex-col-reverse">
        <div
          v-for="tweet in tweets"
          v-bind:key="tweet.id"
          @click="() => (id = tab.id)"
          class="w-full p-4 border-b hover:bg-lighter flex"
        >
          <div class="flex-none mr-4">
            <img
              src="image-user.jpeg"
              class="h-12 w-12 rounded-full flex-none"
            />
          </div>
          <div class="w-full">
            <div class="flex items-center w-full">
              <p class="font-semibold">hiral</p>
              <p class="text-sm text-dark ml-2">@hiral</p>
              <p class="text-sm text-dark ml-2">1 sec</p>
              <i class="fas fa-angle-down text-dark ml-auto"></i>
            </div>
            <p class="py-2">
              {{ tweet.content }}
            </p>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center text-sm text-dark">
                <i class="far fa-comment mr-3"></i>
                <p>0</p>
              </div>
              <div class="flex items-center text-sm text-dark">
                <i class="fas fa-retweet mr-3"></i>
                <p>0</p>
              </div>
              <div class="flex items-center text-sm text-dark">
                <i class="fas fa-heart mr-3"></i>
                <p>1</p>
              </div>
              <div class="flex items-center text-sm text-dark">
                <i class="fas fa-share-square mr-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="follow in following"
        v-bind:key="follow.id"
        @click="() => (id = tab.id)"
        class="w-full p-4 border-b hover:bg-lighter flex"
      >
        <div class="flex-none mr-4">
          <img
            :src="`${follow.src}`"
            class="h-12 w-12 rounded-full flex-none"
          />
        </div>
        <div class="w-full">
          <div class="flex items-center w-full">
            <p class="font-semibold">{{ follow.name }}</p>
            <p class="text-sm text-dark ml-2">{{ follow.handle }}</p>
            <p class="text-sm text-dark ml-2">{{ follow.time }}</p>
            <i class="fas fa-angle-down text-dark ml-auto"></i>
          </div>
          <p class="py-2">
            {{ follow.tweet }}
          </p>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center text-sm text-dark">
              <i class="far fa-comment mr-3"></i>
              <p>{{ follow.comments }}</p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-retweet mr-3"></i>
              <p>{{ follow.retweets }}</p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-heart mr-3"></i>
              <p>{{ follow.like }}</p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-share-square mr-3"></i>
            </div>
          </div>
        </div>
      </div>
      <FetchTweets />
    </div>
    <!-- trending -->
    <div
      class="md:block hidden w-1/3 h-full border-l border-lighter py-2 px-6 overflow-y-scroll relative"
    >
      <input
        class="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4"
        placeholder="Search Twitter"
      />
      <i
        class="fas fa-search absolute left-0 top-0 mt-5 ml-12 text-sm text-light"
      ></i>
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
  </div>
</template>

<script>
import FetchTweets from "@/components/FetchTweets.vue";
import SideView from "@/components/SideView.vue";
export default {
  name: "app",
  components: {
    FetchTweets,
    SideView,
  },
  data() {
    return {
      tabs: [
        { icon: "fas fa-home", title: "Home", id: "home" },
        { icon: "fas fa-hashtag", title: "Explore", id: "explore" },
        { icon: "far fa-bell", title: "Notifications", id: "notifications" },
        { icon: "far fa-envelope", title: "Messages", id: "messages" },
        { icon: "far fa-bookmark", title: "Bookmarks", id: "bookmarks" },
        { icon: "fas fa-clipboard-list", title: "Lists", id: "lists" },
        { icon: "far fa-user", title: "Profile", id: "profile" },
        { icon: "fas fa-ellipsis-h", title: "More", id: "more" },
      ],
      id: "home",
      dropdown: false,
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
          tweet: "setting up twitter ",
          comments: "1,000",
          retweets: "550",
          like: "1,000,003",
        },
        {
          src: "image-user.jpg",
          name: "Elon Musk",
          handle: "@elon",
          time: "20 min",
          tweet: "setting up twitter ",
          comments: "1,000",
          retweets: "550",
          like: "1,000,003",
        },
        {
          src: "image-user.jpg",
          name: "Elon Musk",
          handle: "@elon",
          time: "20 min",
          tweet: "setting up twitter ",
          comments: "1,000",
          retweets: "550",
          like: "1,000,003",
        },
      ],
      tweets: [{ content: "tweeted!" }],
      tweet: { content: "" },
    };
  },
  methods: {
    addNewTweet() {
      let newTweet = {
        content: this.tweet.content,
      };
      this.tweets.push(newTweet);
    },
  },
};
</script>
