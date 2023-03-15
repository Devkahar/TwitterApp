<template>
  <div class="container mx-auto flex justify-center items-center h-screen">
    <div class="form-box p-16 w-4/12 text-center">
      <h1 class="text-5xl">login</h1>
      <!-- <Input text="User Name" v-model="name" /> -->
      <Input text="User Email" v-model="email" />
      <Input text="Enter Password" v-model="password" :password="true" />
      <Alert v-if="error" title="Invalid Details" :message="message" />
      <Button :clickHandler="loginHandler" :loading="loading">login!</Button>
      <p>
        <router-link to="/signup">Don't have an account? sign up</router-link>
        <!-- <router-link tag="" active-class="active" to="SignupView" exact
          ><a></a></router-link
        > -->
      </p>
    </div>
  </div>
</template>

<script>
import Input from "@/component/InputComponent.vue";
import Button from "@/component/ButtonComponent.vue";
import Alert from "@/component/AlertComponent.vue";
import axios from "axios";
import { BASE_URL } from "@/helper/constants";
// order Of variable name and Method Validating them should be same.
// const fieldStrings = ["email", "password"];
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
        const res = await axios.post(`${BASE_URL}/api/user/login`, {
          name: this.name,
          password: this.password,
          email: this.email,
          bio: this.bio,
        });
        if (res.status === 201) {
          console.log(res);
          window.localStorage.setItem("userInfo", JSON.stringify(res.data));
          this.error = false;
          this.message = "";
          this.loading = false;
          console.log("Form Accepeted");
          this.$router.push("/");
        }
      } catch (error) {
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
