<template>
    <TrendingComponent />
      <button 
      v-for="users in userList"
        v-bind:key="userList"
        @click="() => suggestUser"
      class="ml-auto text-sm text-blue py-1 px-4 rounded-full border-2 border-blue"
  >
  follow
  </button>
</template>
<script>
import TrendingComponent from './TrendingComponent.vue';
import TrendingComponent from './TrendingComponent.vue';
</script>