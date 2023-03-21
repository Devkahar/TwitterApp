<template>
  <div
    :class="['user-head-content cursor-pointer', small && 'flex items-center']"
    @click="handle_click"
  >
    <div :class="['head-name flex items-center mb-0.5', small && 'mr-2']">
      <div
        :class="['font-bold mb-0 mr-1', small || title_basic ? '' : 'text-2xl']"
      >
        {{ limitName ? getName : name }}
      </div>
      <Badge />
    </div>
    <div class="tweet-count">{{ subInfo }}</div>
  </div>
</template>
<script>
import Badge from "@/components/BadgeComponent.vue";
import { getDottedString } from "@/helper/util";

export default {
  name: "UserNameComponent",
  components: {
    Badge,
  },
  computed: {
    getName: function () {
      return getDottedString(this.name);
    },
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
    handle_click: {
      type: Function,
      default: () => {},
    },
    title_basic: {
      type: Boolean,
      default: false,
    },
    limitName: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
