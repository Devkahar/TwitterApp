<template>
  <div class="post_img_box my-3">
    <img :src="postImgUrl" alt="" class="post_img" />
  </div>
</template>
<script>
import { getImgUrl } from "@/helper/constants";

export default {
  name: "PostImage",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    postImgUrl: function () {
      return getImgUrl(this.url);
    },
  },
};
</script>
<style>
.post_img_box {
  max-width: 30em;
  max-height: 46.875em;
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
