<template>
  <div v-if="large_img" class="img-round h-36 w-36 rounded">
    <img :src="imgUrl" alt="" class="img-fit" />
  </div>
  <div v-else-if="med_img" class="h-16 w-16 rounded">
    <img :src="imgUrl" alt="" class="h-full w-full" />
  </div>
  <div v-else class="h-12 w-12 rounded">
    <img :src="imgUrl" alt="" class="h-full w-full" />
  </div>
</template>
<script>
import { getImgUrl } from "@/helper/constants";
export default {
  name: "UserImage",
  props: {
    large_img: {
      type: Boolean,
      default: false,
    },
    base_img: {
      type: Boolean,
      default: true,
    },
    med_img: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: "",
    },
  },
  computed: {
    imgUrl: function () {
      return getImgUrl(this.url);
    },
  },
};
</script>
<style></style>
