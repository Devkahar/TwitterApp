<template>
  <div class="head-back px-6 cursor-pointer" @click="navBack">
    <a-icon type="arrow-left" :style="{ color: '#000' }" />
  </div>
</template>

<script>
export default {
  name: "BackComponent",
  methods: {
    navBack: function () {
      this.$router.go(-1);
    },
  },
};
</script>
