<template>
  <div section="main">
    <div class="flex margin:auto h-screen w-full">
      <router view />
      <!-- side nav -->
      <div
        class="w-3/12 lg:275px x 464px border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between"
      >
        <div>
          <button
            class="h-12 w-12 hover:bg-lightblue text-3xl rounded-full text-blue"
          >
            <i class="fab fa-twitter"></i>
          </button>
          <div>
            <button
              v-for="tab in tabs"
              v-bind:key="tab.id"
              :class="`focus:outline-none hover:text-blue flex items-center py-2 px-4 hover:bg-lightblue rounded-full mr-auto mb-3 ${
                id === tab.id ? 'text-blue' : ''
              }`"
            >
              <i :class="`${tab.icon} text-2xl mr-4 text-left`"></i>
              <p class="text-lg font-semibold text-left hidden lg:block">
                {{ tab.title }}
              </p>
            </button>
          </div>
          <button
            class="text-white bg-blue rounded-full font-semibold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 hover:bg-darkblue"
          >
            <p class="hidden lg:block">Tweet</p>
            <i class="fas fa-plus lg:hidden"></i>
          </button>
          <LogoutPopup />
        </div>
      </div>

      <!-- tweets -->
      <div class="w-6/12 md:w-o.5 h-full overflow-y-scroll">
        <div
          class="px-5 py-3 border-b border-lighter flex items-center justify-between"
        >
          <h1 class="text-xl font-bold">Home</h1>
          <i class="far fa-star text-xl text-blue"></i>
        </div>
        <CreateTweet />
        <FetchTweets />
      </div>
      <!-- trending -->
      <div
        class="md:block hidden w-3/12 h-full border-l border-lighter py-2 px-6 overflow-y-scroll"
      >
        <input
          class="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4"
          placeholder="Search Twitter"
        />
        <i
          class="fas fa-search absolute left-70 top-0 mt-5 ml-70rem text-sm text-light"
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
  </div>
</template>

<script>
import FetchTweets from "@/component/FetchTweets.vue";
import LogoutPopup from "@/components/LogoutPopup.vue";
import CreateTweet from "@/components/CreateTweet.vue";
export default {
  name: "app",
  components: {
    FetchTweets,
    LogoutPopup,
    CreateTweet,
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
