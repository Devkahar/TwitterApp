<template>
  <button
    class="btn font-semibold mb-0 text-sm"
    @mouseover="mouseOvertext"
    @mouseout="mouseOutText"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  data: function () {
    return {
      text: "Following",
    };
  },
  methods: {
    mouseOvertext: function () {
      this.text = "Unfollow";
    },
    mouseOutText: function () {
      this.text = "Following";
    },
  },
};
</script>

<style>
.btn {
  padding: 8px 15px;
  border: 0.5px solid rgb(218, 218, 218) !important;
  border-radius: 50px;
  color: #000;
  width: 100px;
}
.btn:hover {
  background-color: rgba(244, 33, 46, 0.2);
  color: rgb(240, 57, 69);
  border: 0.5px solid rgb(253, 201, 206);
}
.btn-hover-red {
}
</style>
