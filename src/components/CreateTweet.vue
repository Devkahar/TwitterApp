<template>
  <div>
    <div
      :class="[
        'w-full px-5 py-3 border-lighter flex justify-between',
        fullBorder ? 'border' : 'border-b',
      ]"
    >
      <div class="pr-2">
        <UserImage :url="user_img" />
      </div>
      <div class="w-full">
        <textarea
          placeholder="what's happening?"
          class="mt-3 pb-3 w-full focus:outline-none file-button"
          v-model="post_content"
        />
        <div class="mb-2">
          <SpinnerComponent v-if="img_loading" />
          <div class="post_img_box my-3" v-if="post_img">
            <img :src="postImgUrl" alt="" class="post_img" />
            <div class="text-2xl cross p-2" @click="removeImage">
              <a-button
                type="primary"
                shape="circle"
                icon="close"
                :size="'large'"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center w-full">
          <div class="">
            <i class="text-lg text-blue mr-4 far fa-image relative">
              <input
                type="file"
                accept="image/jpeg/png/jpg"
                class="file-hidden absolute"
                @change="changeFileHandler"
                id="uploadImage"
              />
            </i>

            <i class="text-lg text-blue mr-4 fas fa-film"></i>
            <i class="text-lg text-blue mr-4 far fa-chart-bar"></i>
            <i class="text-lg text-blue mr-4 far fa-smile"></i>
          </div>
          <ButtonComponent
            :click-handler="postTweetHandler"
            :loading="loading"
            >{{ editTweet ? "Edit" : "Tweet" }}</ButtonComponent
          >
        </div>
      </div>
    </div>
    <Alert v-if="error" :message="message" :title="'Oops'" />
  </div>
</template>
<script>
import Alert from "@/components/AlertComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { BASE_URL, getImgUrl } from "@/helper/constants";
import axios from "axios";
import SpinnerComponent from "./SpinnerComponent.vue";

import UserImage from "./UserImage.vue";
export default {
  name: "CreatetweetComponent",
  data() {
    return {
      post_content: this.props_text,
      loading: false,
      config: this.$store.getters.config,
      error: false,
      user_img: this.$store.getters.user_img,
      message: "Something Went Wrong",
      post_img: this.prop_post_img,
      img_loading: false,
    };
  },
  methods: {
    postTweetHandler: function () {
      if (this.editTweet) {
        this.updateTweet();
      } else {
        this.createTweet();
      }
    },
    uploadFile: function (file) {
      console.log(file);
      this.fileList[0].status = "done";
    },
    removeImage: function () {
      this.post_img = "";
      document.getElementById("uploadImage").value = "";
    },
    changeFileHandler: async function (event) {
      let img = event.target.files[0];
      if (img) {
        const formData = new FormData();
        formData.append("image", img);
        this.img_loading = true;
        try {
          const res = await axios.post(
            `${BASE_URL}/api/image/upload`,
            formData
          );
          if (res) {
            this.img_loading = false;
            this.post_img = res.data.path;
            console.log(res);
          }
        } catch (error) {
          this.img_loading = false;
        }
      }
    },
    createTweet: async function () {
      if (this.post_content !== "") {
        this.loading = true;
        this.error = false;
        try {
          console.log("config ", this.config);
          const res = await axios.post(
            `${BASE_URL}/api/post/create/`,
            {
              text: this.post_content,
              image: this.post_img !== "" ? this.post_img : null,
            },
            this.config
          );
          if (res) {
            this.loading = false;
            this.post_content = "";
            this.post_img = "";
            this.$store.dispatch("resetTweets");
            this.$store.dispatch("fetchTweets", {
              userId: null,
              tab: null,
            });
          } else {
            throw new Error("Something is wrong");
          }
        } catch (error) {
          console.log(error);
          this.loading = false;
          this.error = true;
          this.message = "Something Went Wrong";
        }
      }
    },
    updateTweet: async function () {
      if (this.post_content !== "") {
        this.loading = true;
        this.error = false;
        try {
          console.log("config ", this.config);
          const res = await axios.post(
            `${BASE_URL}/api/post/update/`,
            {
              text: this.post_content,
              image: this.post_img !== "" ? this.post_img : null,
              post_id: this.post_id,
            },
            this.config
          );
          if (res) {
            this.loading = false;
            this.post_content = "";
            this.post_img = "";
            this.$store.dispatch("resetTweets");
            this.$store.dispatch("fetchTweets", {
              userId: null,
              tab: null,
            });
            this.successHandler();
          } else {
            throw new Error("Something is wrong");
          }
        } catch (error) {
          console.log(error);
          this.loading = false;
          this.error = true;
          this.message = "Something Went Wrong";
        }
      }
    },
  },
  computed: {
    getUserImage: function () {
      return getImgUrl(this.user_img);
    },
    postImgUrl: function () {
      if (this.post_img) return getImgUrl(this.post_img);
      return getImgUrl(this.prop_post_img);
    },
  },
  props: {
    post_id: {
      type: String,
      default: "",
    },
    prop_post_img: {
      type: String,
      default: "",
    },
    props_text: {
      type: String,
      default: "",
    },
    fullBorder: {
      type: Boolean,
      default: false,
    },
    editTweet: {
      type: Boolean,
      default: false,
    },
    successHandler: {
      type: Function,
      default: () => {},
    },
  },
  components: { ButtonComponent, Alert, SpinnerComponent, UserImage },
};
</script>
<style>
.file-hidden {
  opacity: 0;
  width: 18px;
  height: 18px;
  top: 0;
  left: 0;
}
.post_img_box {
  max-width: 510px;
  max-height: 750px;
  width: max-content;
  border-radius: 18px;
  -webkit-box-shadow: -5px 6px 10px -15px rgba(0, 0, 0, 0.56);
  -moz-box-shadow: -5px 6px 10px -15px rgba(0, 0, 0, 0.56);
  box-shadow: -5px 6px 10px -15px rgba(0, 0, 0, 0.56);
  border: 0.5px solid #000;
}
.post_img {
  object-fit: contain;
  border-radius: 18px;
}
</style>
