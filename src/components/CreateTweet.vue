<template>
  <div>
    <div
      class="w-full px-5 py-3 border-b border-lighter flex items-center justify-between"
    >
      <div class="h-20 w-20 rounded-full mr-10">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          class="flex-none w-full h-full rounded-full border border-lighter"
        />
      </div>
      <div class="w-full">
        <textarea
          placeholder="what's happening?"
          class="mt-3 pb-3 w-full focus:outline-none file-button"
          v-model="text"
        />
        <div class="flex justify-between items-center w-full">
          <div class="">
            <i class="text-lg text-blue mr-4 far fa-image relative">
              <input
                type="file"
                accept="image/jpeg"
                @change="uploadImage"
                class="file-hidden absolute"
              />
            </i>

            <i class="text-lg text-blue mr-4 fas fa-film"></i>
            <i class="text-lg text-blue mr-4 far fa-chart-bar"></i>
            <i class="text-lg text-blue mr-4 far fa-smile"></i>
          </div>
          <ButtonComponent :click-handler="createTweet" :loading="loading"
            >Tweet</ButtonComponent
          >
        </div>
      </div>
    </div>
    <Alert v-if="error" :message="message" :title="'Oops'" />
  </div>
</template>
<script>
import Alert from "@/component/AlertComponent.vue";
import ButtonComponent from "@/component/ButtonComponent.vue";
import { BASE_URL } from "@/helper/constants";
import axios from "axios";

export default {
  data() {
    return {
      text: "",
      image: "",
      loading: false,
      config: this.$store.getters.config,
      error: false,
      message: "Something Went Wrong",
    };
  },
  methods: {
    createTweet: async function () {
      this.loading = true;
      this.error = false;
      try {
        console.log("config ", this.config);
        const res = await axios.post(
          `${BASE_URL}/api/post/create/`,
          {
            text: this.text,
          },
          this.config
        );
        if (res) {
          this.loading = false;
          this.text = "";
        } else {
          throw new Error("Something is wrong");
        }
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.message = "Something Went Wrong";
      }
    },
  },
  components: { ButtonComponent, Alert },
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
</style>
