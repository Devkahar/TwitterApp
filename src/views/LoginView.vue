<template>
  <div>
    <h1 class="text-5xl">login</h1>
    <Input text="User Email" v-model="email" />
    <Input text="Enter Password" v-model="password" :password="true" />
    <Alert v-if="error" title="Invalid Details" :message="message" />
    <Button :clickHandler="loginHandler" :loading="loading">login!</Button>
    <p>
      <router-link to="/signup">Don't have an account? sign up</router-link>
    </p>
  </div>
</template>

<script>
import Input from "@/components/InputComponent.vue";
import Button from "@/components/ButtonComponent.vue";
import Alert from "@/components/AlertComponent.vue";
import axios from "axios";
import { BASE_URL } from "@/helper/constants";
export default {
  data: function () {
    return {
      email: "",
      password: "",
      error: false,
      loading: false,
    };
  },
  components: {
    Input,
    Button,
    Alert,
  },
  methods: {
    loginHandler: async function () {
      try {
        this.loading = true;
        const res = await axios.post(`${BASE_URL}/api/user/signin/`, {
          password: this.password,
          email: this.email,
        });
        if (res) {
          console.log(res);
          window.localStorage.setItem("userInfo", JSON.stringify(res.data));
          this.error = false;
          this.message = "";
          this.loading = false;
          console.log("Form Accepeted");
          this.$store.dispatch({ type: "login" });
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error.message);
        this.error = true;
        this.message = "Invalid Email";
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.form-box {
  border: 5px solid lightblue;
  border-radius: 10px;
}
</style>
