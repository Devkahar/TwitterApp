<!-- <template slot="tweetList">-->
<!-- <template>
  <div class="tweet-header">
    <img src="image-user.jpg" alt="" class="avator" />
    <span class="tweet-header-info">
      user1 <span>@user1</span><span>march 13</span>
      <p>this is a tweet post.</p>
    </span>
    <!-- <span class="tweet-img-wrap">
      <img src="" alt="" class="tweet-img" />
    </span>
  </div> -->
<!-- <slot>
    <div class="tweet-info-counts">
      <div class="comments">
        <small class="<comment-outlined />"></small>
        <div class="comment-count">33</div>
      </div>
    </div>
  </slot> -->
<!-- <div v-for="retweet in retweets" v-bind:key="addTweet.id" />
  <div class="retweets">
    <small> class="<retweet-outlined />" </small>
    <div class="retweet-count">397</div>
  </div> -->

<!-- <v-if like in likes>
    <div class="likes">
      <small> class="<heart-outlined />" </small>
      <div class="likes-count">2.6k</div>
    </div></v-if -->
<!-- </div>
  > -->
<!-- 
  <div class="messages">
    <small class="<comment-outlined />"></small>
  </div> -->
<!-- </template>  -->
<script></script>
<style scoped>
.img {
  max-width: 100%;
}
.avator {
  border-radius: 100px;
  width: 48px;
  margin-right: 15px;
}

.tweet-wrap {
  max-width: 490px;
  background: #fff;
  margin: 0 auto;
  margin-top: 50px;
  border-radius: 3px;
  padding: 30px;
  border-bottom: 1px solid #e6ecf0;
  border-top: 1px solid #e6ecf0;
}

.tweet-header {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
}
.tweet-header-info {
  font-weight: bold;
}
.tweet-header-info span {
  color: #657786;
  font-weight: normal;
  margin-left: 5px;
}
.tweet-header-info p {
  font-weight: normal;
  margin-top: 5px;
}
.tweet-img-wrap {
  padding-left: 60px;
}

.tweet-info-counts {
  display: flex;
  margin-left: 60px;
  margin-top: 10px;
}
.tweet-info-counts div {
  display: flex;
  margin-right: 20px;
}
.tweet-info-counts div svg {
  color: #657786;
  margin-right: 10px;
}
@media screen and (max-width: 430px) {
  body {
    padding-left: 20px;
    padding-right: 20px;
  }
  .tweet-header {
    flex-direction: column;
  }
  .tweet-header img {
    margin-bottom: 20px;
  }
  .tweet-header-info p {
    margin-bottom: 30px;
  }
  .tweet-img-wrap {
    padding-left: 0;
  }
  .tweet-info-counts {
    display: flex;
    margin-left: 0;
  }
  .tweet-info-counts div {
    margin-right: 10px;
  }
}
</style>
