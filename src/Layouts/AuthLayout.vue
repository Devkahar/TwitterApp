<template>
  <div class="container mx-auto flex justify-center items-center h-screen">
    <div class="form-box p-16 w-5/12 text-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>
<style>
.form-box {
  border: 5px solid lightblue;
  border-radius: 10px;
}
</style>
