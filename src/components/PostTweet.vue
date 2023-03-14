<template>
  <div class="Post">
    <addTweet />
    {{ addTweet }}
    <plus-outlined />"
    <!-- <textarea>what's happening?</textarea> -->
    <p style="white-space: pre-line">{{ message }}</p>
    <br />
    <textarea v-model="message" placeholder="what's happening?"></textarea>

    <button
      type="submit"
      class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full absolute bottom-0 right-0"
    >
      Tweet
    </button>
  </div>
</template>
<script>
//addTweet();
export default {
  name: "PostTweet",
  props: ["tweet"],
  data() {
    return {
      tweetData: this.tweet,
    };
  },
  computed: {
    me() {
      return this.$store.getters.me;
    },
  },
  methods: {
    addTweet() {
      let temp = {
        text: this.tweet.text,
      };
      this.tweetList.push(temp);
      this.$emit("tweet", "text");
    },
  },
};
</script>
