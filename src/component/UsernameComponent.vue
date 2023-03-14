<template>
  <div :class="['user-head-content', small && 'flex items-center']">
    <div :class="['head-name flex items-center mb-0.5', small && 'mr-2']">
      <h1 :class="['font-bold mb-0 mr-1', small ? 'text-base' : 'text-2xl']">
        {{ name }}
      </h1>
      <Badge />
    </div>
    <div class="tweet-count">{{ subInfo }}</div>
  </div>
</template>
<script>
import Badge from "@/component/BadgeComponent.vue";

export default {
  components: {
    Badge,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    subInfo: {
      type: String,
      required: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
