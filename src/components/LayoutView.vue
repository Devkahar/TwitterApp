<template>
  <div class="flex container h-screen w-full">
    <div class="">
      <div>
        <button class="">
          <i class="twitter-outlined />"></i>
        </button>
        <div>
          <button v-for="(tab, index) in tabs" :key="index" @click="click" }>
            <i :class="tab"></i>
            <p class="">
              {{ tab.title }}
            </p>
          </button>
        </div>
        <button class="tweet">
          <p class="hidden lg:block">Tweet</p>
          <i class="<twitter-outlined />:hidden"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
//import{ SideView }from "vue";

// import SideView from "@/components/SideView";
// export default {
//   components: {
//     SideView,
//   },
//   computed: {},
// };
</script>
<style scoped>
.div {
  display: flexbox;
  align-content: center;
  justify-content: space-between;
}
.search-wrapper {
  position: center;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  width: 85%;
  margin: 0 auto;
}
</style>
