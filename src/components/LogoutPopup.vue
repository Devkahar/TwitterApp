<template>
  <div class="lg:w-full relative">
    <button
      @click="() => (dropdown = true)"
      class="flex items-center w-full hover:bg-lightblue rounded-full p-2 focus:outline-none"
    >
      <img
        src="image-user.jpeg"
        class="w-10 h-10 rounded-full border border-lighter"
      />
      <div class="hidden lg:block ml-4">
        <p class="text-sm font-bold leading-tight">hiral</p>
        <p class="text-sm leading-tight">@hiral</p>
      </div>
      <i class="hidden lg:block fas fa-angle-down ml-auto text-lg"></i>
    </button>
    <div
      v-if="dropdown === true"
      class="absolute bottom-0 left-0 w-64 rounded-lg shadow-md border-lightest bg-white mb-16"
    >
      <button
        @click="() => (dropdown = false)"
        class="p-3 flex items-center w-full hover:bg-lightest p-2 focus:outline-none"
      >
        <img
          src="image-user.jpeg"
          class="w-10 h-10 rounded-full border border-lighter"
        />
        <div class="ml-4">
          <p class="text-sm font-bold leading-tight">hiral</p>
          <p class="text-sm leading-tight">@hiral</p>
        </div>
        <i class="fas fa-check ml-auto test-blue"></i>
      </button>
      <button
        @click="dropdown = false"
        class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none"
      >
        Add an existing account
      </button>
      <router-link to="/login">
        <button
          @click="dropdown = false"
          class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none"
        >
          Log out @hiral
        </button></router-link
      >
    </div>
  </div>
</template>
<script>
// import router from "@/router";
// import { link } from "fs";
// import { RouterLink } from "vue-router";

// import dropdown from "ant-design-vue/lib/dropdown";
export default {
  data: function () {
    return {
      dropdown: false,
    };
  },
};
</script>
