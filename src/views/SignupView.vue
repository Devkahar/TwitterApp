<template>
  <div class="">
    <h1 class="text-5xl">Sign Up</h1>
    <FormComonent
      :formInputs="signUpFormInput"
      :loading="loading"
      :message="message"
      :successHandler="signupUser"
      :error="error"
      :buttonName="'Sign Up'"
      :getContext="setFormContext"
    />
    <p>
      <router-link to="/login">Already have an account? Sign In</router-link>
    </p>
  </div>
</template>
<script>
import { checkBio, checkName, checkPassword } from "@/helper/validation";
import { uuid } from "vue-uuid";
import axios from "axios";
import { BASE_URL, getImgUrl } from "@/helper/constants";
import FormComonent from "@/components/FormComonent.vue";
export default {
  data: function () {
    return {
      error: false,
      message: "",
      loading: false,
      signUpFormInput: [
        {
          id: uuid.v4(),
          label: "User Name",
          placeholder: "Enter User Name",
          decorator: [
            "username",
            {
              rules: [
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true,
                },
                {
                  validator: this.validateUserName,
                },
              ],
            },
          ],
          type: "text",
        },
        {
          id: uuid.v4(),
          label: "Email Address",
          placeholder: "Enter Email Address",
          type: "email",
          decorator: [
            "email",
            {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ],
            },
          ],
        },
        {
          id: uuid.v4(),
          label: "Password",
          placeholder: "Enter Password",
          type: "password",
          decorator: [
            "password",
            {
              rules: [
                {
                  required: true,
                  message: "Please Enter your password!",
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            },
          ],
        },
        {
          id: uuid.v4(),
          label: "Confirm Password: ",
          placeholder: "Confirm Password",
          decorator: [
            "confirm",
            {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            },
          ],
          type: "password",
        },
        { type: "upload" },
        {
          id: uuid.v4(),
          label: "Bio",
          placeholder: "Enter Something about you",
          decorator: [
            "bio",
            {
              rules: [
                {
                  required: true,
                  message: "Please Enter Something",
                },
                {
                  validator: this.validBio,
                },
              ],
            },
          ],
          type: "textarea",
        },
      ],
      form: null,
    };
  },
  methods: {
    signupUser: async function (values) {
      console.log(values);
      try {
        this.loading = true;
        const res = await axios.post(`${BASE_URL}/api/user/signup`, {
          name: values.username,
          password: values.password,
          email: values.email,
          image: values.post_img,
          bio: values.bio,
        });
        if (res.status === 201) {
          console.log(res);
          window.localStorage.setItem("userInfo", JSON.stringify(res.data));
          this.$store.dispatch({ type: "signup" });
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
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      console.log(form.getFieldValue("password"));
      if (value && value !== form.getFieldValue("password")) {
        callback("Password does'nt match with provious one.");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const validPassword = checkPassword(value ?? "");
      if (validPassword.isValid) {
        callback();
      } else {
        callback(validPassword.error);
      }
    },
    validateUserName(rule, value, callback) {
      const validName = checkName(value ?? "");
      if (validName.isValid) {
        callback();
      } else {
        callback(validName.error);
      }
    },
    validateBio(rule, value, callback) {
      const validBio = checkBio(value ?? "");
      if (validBio.isValid) {
        callback();
      } else {
        callback(validBio.error);
      }
    },
    setFormContext: function (ctx) {
      this.form = ctx;
    },
  },
  components: { FormComonent },
  computed: {
    getUserImage: function () {
      return getImgUrl(this.post_img);
    },
  },
};
</script>
