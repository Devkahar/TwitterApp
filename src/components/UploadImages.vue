<template>
  <div class="images">
    <img src:true class="flex items-center" />

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
  },
  imageUpload: function () {
    this.$emit("uploadImage", this.image);
  },
};
</script>