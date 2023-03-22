<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <Button :click-handler="redirectToHomePage"> Go To Home </Button>
    </template>
  </a-result>
</template>

<script>
import { ROUTES_CONSTANTS } from "@/helper/constants";
import Button from "../components/ButtonComponent.vue";

export default {
  name: "PageNotFound",
  components: { Button },
  methods: {
    redirectToHomePage: function () {
      this.$router.push({ name: ROUTES_CONSTANTS.HOME_PAGE });
    },
  },
};
</script>
