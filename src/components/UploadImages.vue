<template>
  <div class="images">
    <img src:true class="flex items-center" />
    <input type="file" accept="image/jpeg" @change="uploadImage" />
    <!-- <button @click="img"></button> -->
    <!-- <g-image
      ref="iconImage"
      alt=""
      v-if="$page.post.cover_image"
      :src="text - lg text - blue mr - 4 far fa - image"
    /> -->
  </div>
</template>
<script>
export default {
  name: "imageUpload",
  data() {
    return {
      previewImage: null,
    };
  },
  methods: {
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
    // onUpload() {
    //   axios.post("my-domain.com/file-upload", this.previewImage);
    // },
  },
};
</script>
<style scoped></style>

<!-- "text-lg text-blue mr-4 far fa-image" -->
