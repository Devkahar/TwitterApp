<template>
  <button
    :class="['btn font-semibold mb-0 text-sm', is_following ? 'following' : '']"
    @mouseover="mouseOvertext"
    @mouseout="mouseOutText"
    @click="click_handler"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "FollowbuttonComponent",
  data: function () {
    return {
      text: this.is_following ? "Following" : "Follow",
    };
  },
  computed: {},
  methods: {
    mouseOvertext: function () {
      if (this.is_following) {
        this.text = "Unfollow";
      } else {
        this.text = "Follow";
      }
    },
    mouseOutText: function () {
      if (this.is_following) {
        this.text = "Following";
      } else {
        this.text = "Follow";
      }
    },
  },
  props: {
    is_following: {
      type: Boolean,
      default: false,
    },
    click_handler: {
      type: Function,
      default: () => {},
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
.following:hover {
  background-color: rgba(244, 33, 46, 0.2);
  color: rgb(240, 57, 69);
  border: 0.5px solid rgb(253, 201, 206);
}
</style>
