<template>
  <div
    class="flex flex-col items-center justify-items-center cursor-pointer tab-links w-full"
    @click="click"
  >
    <div class="h-full w-max">
      <span class="text-lg text-center font-semibold">{{ name }}</span>
      <div class="active-link" v-if="isActive"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabItemComponent",
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    click: {
      type: Function,
      required: true,
    },
  },
};
</script>
<style>
.active-link {
  display: block;
  height: 5px;
  width: 100%;
  background-color: #1da1f2;
  border-radius: 10px;
}
.tab-links {
  padding: 10px 10px 0 10px;
}
.tab-links:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
