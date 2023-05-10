<template>
  <div class="">
    <h1 class="text-5xl">Change Password</h1>
    <FormComonent
      :formInputs="passwordFormInput"
      :loading="loading"
      :message="message"
      :successHandler="changePassword"
      :error="error"
      :buttonName="'Change Password'"
      :getContext="setFormContext"
    />
  </div>
</template>
<script>
import { checkPassword } from "@/helper/validation";
import { uuid } from "vue-uuid";
import axios from "axios";
import { BASE_URL, ROUTES_CONSTANTS } from "@/helper/constants";
import FormComonent from "@/components/FormComonent.vue";
export default {
  name: "ChangePassword",
  data: function () {
    return {
      error: false,
      message: "",
      loading: false,
      config: this.$store.getters.config,
      passwordFormInput: [
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
      ],
      form: null,
    };
  },
  methods: {
    changePassword: async function (values) {
      console.log(values);
      try {
        this.loading = true;
        const res = await axios.post(
          `${BASE_URL}/api/user/change/password`,
          {
            password: values.password,
          },
          this.config
        );
        if (res) {
          console.log(res);
          this.$store.dispatch("logout");
          this.error = false;
          this.message = "";
          this.loading = false;
          console.log("Password Changed");
          this.$router.push({ name: ROUTES_CONSTANTS.LOGIN_PAGE });
        }
      } catch (error) {
        this.error = true;
        this.message = "Something went wrong";
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
    setFormContext: function (ctx) {
      this.form = ctx;
    },
  },
  components: { FormComonent },
};
</script>
