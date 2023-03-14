<template>
  <div class="mb-5">
    <a-input-password
      v-if="password"
      :placeholder="text"
      v-bind:change="fieldValue"
      v-on:change="$emit('change', $event.target.value)"
    />
    <a-textarea
      v-if="textArea"
      :placeholder="text"
      v-bind:change="fieldValue"
      v-on:change="$emit('change', $event.target.value)"
    />
    <a-input
      v-if="!password && !textArea"
      :placeholder="text"
      v-bind:change="fieldValue"
      v-on:change="$emit('change', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    password: {
      type: Boolean,
      default: false,
    },
    textArea: {
      type: Boolean,
      default: false,
    },
    fieldValue: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
  },
  model: {
    prop: "fieldValue",
    event: "change",
  },
};
</script>
