<style scoped>
.spin-content {
  border: 1px solid #74caff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>
<template>
  <div class="">
    <a-spin>
      <div class="spin-content">
        <a-button type="primary">Button></a-button>
        <slot></slot>
      </div>
    </a-spin>
  </div>
</template>
