<template>
  <div class="flex flex-row w-full justify-evenly border-bottom">
    <TabItem
      v-for="item in items"
      v-bind:key="item.id"
      :name="item.name"
      :is-active="curr_tab === item.url"
      :click="item.onClick"
    />
  </div>
</template>
<script>
import TabItem from "./TabItem.vue";
import { uuid } from "vue-uuid";
export default {
  name: "TabComponent",
  data: function () {
    return {
      items: [
        {
          id: uuid.v4(),
          name: "Tweets",
          url: "tweets",
          onClick: () => {
            this.change_tab("tweets");
          },
        },
        {
          id: uuid.v4(),
          name: "Replies",
          url: "replies",
          onClick: () => {
            this.change_tab("replies");
          },
        },
        {
          id: uuid.v4(),
          name: "Likes",
          url: "likes",
          onClick: () => {
            this.change_tab("likes");
          },
        },
      ],
    };
  },
  created: function () {
    // console.log("created", this.$route.path.split("/")[2]);
  },
  components: {
    TabItem,
  },
  props: {
    change_tab: {
      type: Function,
      required: true,
    },
    curr_tab: {
      type: String,
      required: true,
    },
  },
};
</script>
