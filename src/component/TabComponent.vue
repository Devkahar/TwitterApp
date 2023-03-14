<template>
  <div class="flex flex-row w-full justify-evenly border-bottom">
    <TabItem
      v-for="item in items"
      v-bind:key="item.id"
      :name="item.name"
      :is-active="currTab === item.url"
      :click="item.onClick"
    />
  </div>
</template>
<script>
import TabItem from "./TabItem.vue";
import { uuid } from "vue-uuid";
export default {
  data: function () {
    return {
      base_path: "/" + this.$route.params.userId,
      currTab: this.$route.path.split("/")[2]
        ? this.$route.path.split("/")[2]
        : "tweets",
      items: [
        {
          id: uuid.v4(),
          name: "Tweets",
          url: "tweets",
          isActive: true,
          onClick: () => {
            if (this.$route.path !== this.base_path + "/tweets") {
              this.$router.push(`${this.base_path}/tweets`);
              this.currTab = "tweets";
            }
          },
        },
        {
          id: uuid.v4(),
          name: "Replies",
          isActive: false,
          url: "replies",
          onClick: () => {
            if (this.$route.path !== this.base_path + "/replies") {
              this.$router.push(`${this.base_path}/replies`);
              this.currTab = "replies";
            }
          },
        },
        {
          id: uuid.v4(),
          name: "Likes",
          isActive: false,
          url: "likes",
          onClick: () => {
            if (this.$route.path !== this.base_path + "/likes") {
              this.$router.push(`${this.base_path}/likes`);
              this.currTab = "likes";
            }
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
  watch: {},
};
</script>
