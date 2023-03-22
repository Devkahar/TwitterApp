<template>
  <div class="">
    <h1 class="text-5xl">Edit User Info</h1>
    <FormComonent
      :formInputs="userInfoFormInput"
      :loading="loading"
      :message="message"
      :successHandler="editUserInfo"
      :error="error"
      :buttonName="'Edit Info'"
      :getContext="setFormContext"
      :postImage="image"
    />
  </div>
</template>
<script>
import { checkBio, checkName } from "@/helper/validation";
import { uuid } from "vue-uuid";
import axios from "axios";
import { BASE_URL } from "@/helper/constants";
import FormComonent from "@/components/FormComonent.vue";
export default {
  name: "EditProfile",
  data: function () {
    return {
      error: false,
      message: "",
      loading: false,
      config: this.$store.getters.config,
      image: this.$store.state.userState.userInfo.image,
      userInfoFormInput: [
        {
          id: uuid.v4(),
          label: "User Name",
          placeholder: "Enter User Name",
          decorator: [
            "username",
            {
              initialValue: this.$store.state.userState.userInfo.name,
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
              initialValue: this.$store.state.userState.userInfo.email,
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
        { type: "upload" },
        {
          id: uuid.v4(),
          label: "Bio",
          placeholder: "Enter Something about you",
          decorator: [
            "bio",
            {
              initialValue: this.$store.state.userState.userInfo.bio,
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
    editUserInfo: async function (values) {
      console.log(values);
      try {
        this.loading = true;
        const res = await axios.post(
          `${BASE_URL}/api/user/change/info`,
          {
            name: values.username,
            email: values.email,
            image: values.post_img,
            bio: values.bio,
          },
          this.config
        );
        if (res.status === 201) {
          console.log(res);
          const data = {
            ...res.data,
            token: this.$store.state.userState.userInfo.token,
          };
          window.localStorage.setItem("userInfo", JSON.stringify(data));
          this.$store.dispatch("updateUserInfo");
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
};
</script>
