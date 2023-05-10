<template functional>
  <a-button
    type="primary"
    shape="round"
    @click="props.clickHandler"
    :loading="props.loading"
    size="large"
    :html-type="props.htmlType"
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
    htmlType: {
      type: String,
      default: "submit",
    },
  },
};
</script>
