<template>
  <a-button
    type="primary"
    shape="round"
    @click="onClickHandler"
    :loading="loading"
    size="large"
  >
    <slot> </slot>
  </a-button>
</template>

<script>
export default {
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
  },
};
</script>
