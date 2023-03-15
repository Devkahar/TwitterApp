<template>
  <div class="mt-5 mb-5 text-left">
    <a-alert :message="title" :description="message" type="error" show-icon />
  </div>
</template>

<script>
export default {
  name: "AlertComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
