<template>
  <RenderlessTweets :tab="getTab" :userId="getUserId">
    <template
      v-slot:default="{
        visible,
        closeModal,
        getEditPostId,
        getEditedContent,
        getEditPostUrl,
        editTweetSuccessHandler,
        tweetList,
        tab,
        error,
        loading,
        message,
        likePostHandler,
        deleteTweet,
        editTweet,
      }"
    >
      <div class="">
        <a-modal
          :visible="visible"
          :footer="null"
          width="700px"
          @cancel="closeModal"
        >
          <div class="p-5" v-if="visible">
            <CreateTweet
              :post_id="getEditPostId"
              :props_text="getEditedContent"
              :prop_post_img="getEditPostUrl"
              :fullBorder="true"
              :editTweet="true"
              :successHandler="editTweetSuccessHandler"
            />
          </div>
        </a-modal>
        <div v-if="tweetList && tab">
          <Tweet
            v-bind:key="tweet.uuid"
            v-for="tweet in tweetList"
            :_id="tweet._id"
            :profile_url="tweet.author.image ? tweet.author.image : ''"
            :name="tweet.author.name ? tweet.author.name : 'Unknown'"
            :liked="tweet.like ? tweet.like : false"
            :like_count="tweet.like_count ? tweet.like_count : 0"
            :retweet_count="tweet.repost_count ? tweet.repost_count : 0"
            :reply_count="tweet.reply_count ? tweet.reply_count : 0"
            :post_img="tweet.image ? tweet.image : null"
            :post_like_handler="likePostHandler"
            :author_id="tweet.author._id"
            :delete_tweet="deleteTweet"
            :edit_tweet="editTweet"
            :edited="tweet.createdAt !== tweet.updatedAt"
            :createdAt="tweet.updatedAt ?? ''"
            :tweet_content="tweet.text"
          />
        </div>
        <div
          v-if="tweetList.length === 0 && !loading"
          class="w-full h-40 flex items-center justify-center"
        >
          <h1 class="text-2xl">No Tweets</h1>
        </div>
        <Spinner v-if="loading" />
        <Alert
          v-if="error && !loading"
          title="Something Went Wrong"
          :message="message"
        />
      </div>
    </template>
  </RenderlessTweets>
</template>

<script>
import RenderlessTweets from "./RenderlessTweets.vue";
import Tweet from "./TweetComponent.vue";
import Alert from "@/components/AlertComponent.vue";
import Spinner from "./SpinnerComponent.vue";
import CreateTweet from "./CreateTweet.vue";
export default {
  name: "FetchtweetComponent",
  components: {
    Tweet,
    Alert,
    Spinner,
    CreateTweet,
    RenderlessTweets,
  },
  computed: {
    getTab: function () {
      return this.tab;
    },
    getUserId: function () {
      return this.userId;
    },
  },
  props: {
    tab: {
      type: String,
      default: "tweets",
    },
    userId: {
      type: String,
    },
  },
};
</script>
