<template>
  <a-button
    type="primary"
    shape="round"
    @click="onClickHandler"
    :loading="loading"
    :size="size"
  >
    <slot> </slot>
  </a-button>
</template>

<script>
export default {
  name: "ButtonComponent",
  methods: {
    onClickHandler(event) {
      this.clickHandler(event);
    },
  },
  props: {
    clickHandler: {
      type: Function,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "large",
    },
  },
};
</script>
