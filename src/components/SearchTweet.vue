<template>
  <div class="search_box">
    <input
      class="pl-12 border rounded-full w-full p-2 bg-lighter text-sm mb-4"
      placeholder="Search Twitter"
      v-model="query"
    />
    <div
      v-if="searched && query !== ''"
      class="search-item-box border w-full max-h-80 overflow-scroll"
    >
      <SearchItem
        v-if="!userList.length && !loading"
        :name="''"
        :default_comp="true"
        :profile_url="''"
      />
      <SearchItem v-if="loading" :name="''" :loading="true" :profile_url="''" />
      <SearchItem
        v-for="user in userList"
        v-bind:key="user._id"
        :name="user.name ?? ''"
        :profile_url="user.avatar ?? ''"
        :user_id="user._id"
      />
    </div>
  </div>
</template>
<script>
import SearchItem from "@/components/SearchItem.vue";
import { BASE_URL } from "@/helper/constants";
import axios from "axios";
let time;
export default {
  name: "SearchtweetComponent",
  data: function () {
    return {
      loading: false,
      error: false,
      userList: [],
      query: "",
      searched: false,
    };
  },
  watch: {
    query: function () {
      if (!this.searched) this.searched = true;
      if (!this.loading) this.loading = true;
      console.log("User Query");
      if (time) clearTimeout(time);
      let context = this;
      time = setTimeout(() => {
        context.searchUser();
      }, 2000);
    },
  },
  methods: {
    changeQueryHandler: function () {
      let context = this;
      let time;
      return function (event) {
        console.log("change");
        context.query = event.target.value;
        if (time) clearTimeout(time);
        time = setTimeout(() => {
          context.searchUser();
        }, 2000);
      };
    },
    searchUser: async function () {
      try {
        this.error = false;
        const res = await axios.get(
          `${BASE_URL}/api/user/search/${this.query}`
        );
        if (res) {
          const data = res.data.data;
          this.userList = data;
          this.loading = false;
          console.log(data);
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
        console.log("Query User Error", error);
      }
    },
  },
  components: {
    SearchItem,
  },
};
</script>
<style>
.border {
  border: 0.5px solid rgb(201, 201, 201);
  border-radius: 10px;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.search-item-box::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.search-item-box {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.search_box {
  position: relative;
}
.search-item-box {
  position: absolute;
  top: 20;
  z-index: 10;
  background-color: #fff;
}
</style>
