<template>
  <div>
    <h1 class="text-5xl">Sign Up</h1>
    <Input text="User Name" v-model="name" />
    <Input text="User Email" v-model="email" />
    <Input text="Enter Password" v-model="password" :password="true" />
    <Input text="Tell Something About You" v-model="bio" :textArea="true" />
    <Alert v-if="error" title="Invalid Details" :message="message" />
    <Button :clickHandler="signUpHandler" :loading="loading">SignUp</Button>
    <p>
      <router-link to="/login">Already have an account? login!</router-link>
    </p>
    <!-- <a-button type="primary" @click="signUpHandler"> Sign Up </a-button> -->
  </div>
</template>

<script>
import Input from "@/components/InputComponent.vue";
import Button from "@/components/ButtonComponent.vue";
import Alert from "@/components/AlertComponent.vue";
import Validation from "@/helper/validation";
import axios from "axios";
import { BASE_URL } from "@/helper/constants";
// order Of variable name and Method Validating them should be same.
const fieldStrings = ["name", "email", "password", "bio"];
export default {
  data: function () {
    return {
      name: "",
      email: "",
      password: "",
      bio: "",
      error: false,
      message: "",
      loading: false,
    };
  },
  components: {
    Input,
    Button,
    Alert,
  },
  methods: {
    signUpHandler: async function () {
      console.log(this.name);
      for (let key in Validation.SignUpStrings) {
        const res = Validation[Validation.SignUpStrings[key]](
          this[fieldStrings[key]]
        );
        console.log(res, key);
        if (!res.isValid) {
          this.error = !res.isValid;
          this.message = res.error;
          console.log("Error Found ", res.error);
          return;
        }
      }
      try {
        this.loading = true;
        const res = await axios.post(`${BASE_URL}/api/user/signup`, {
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
        this.message = "Email Already Exist";
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.form-box {
  border: 5px solid #1da1f2;
  border-radius: 10px;
}
</style>
