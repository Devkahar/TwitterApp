<template>
  <div class="">
    <h1 class="text-5xl">Sign Up</h1>
    <a-form :form="form" @submit="handleSubmit">
      <div v-for="input in signUpFormInput" v-bind:key="input.id">
        <a-form-item
          :label="input.label"
          v-bind="formItemLayout"
          :class="input.type === 'upload' ? 'upload-item' : ''"
        >
          <div class="mb-1">
            <a-input-password
              v-if="input.type === 'password'"
              :placeholder="input.placeholder"
              v-decorator="input.decorator"
            />
            <a-textarea
              v-else-if="input.type === 'textarea'"
              :placeholder="input.placeholder"
              v-decorator="input.decorator"
            />
            <div class="ml-5" v-else-if="input.type === 'upload'">
              <input
                type="file"
                accept="image/jpeg/png/jpg"
                @change="changeFileHandler"
                id="uploadImage"
              />
            </div>
            <a-input
              v-else
              :placeholder="input.placeholder"
              v-decorator="input.decorator"
            />
          </div>
        </a-form-item>
        <div class="mb-2" v-if="input.type === 'upload' && userImg">
          <SpinnerComponent v-if="img_loading" />
          <div
            class="post_img_box post_img_box_small mt-5 my-3"
            v-if="post_img"
          >
            <img :src="getUserImage" alt="" class="post_img" />
            <div class="text-2xl cross" @click="removeImage">
              <a-button
                type="primary"
                shape="circle"
                icon="close"
                :size="'large'"
              />
            </div>
          </div>
        </div>
      </div>
      <Alert v-if="error" title="Invalid Details" :message="message" />
      <Button :clickHandler="handleSubmit" :loading="loading">SignUp</Button>
      <p class="mt-2">
        <router-link to="/login">Already have an account? login!</router-link>
      </p>
    </a-form>
  </div>
</template>
<script>
import { checkBio, checkName, checkPassword } from "@/helper/validation";
import { uuid } from "vue-uuid";
import Button from "@/components/ButtonComponent.vue";
import Alert from "@/components/AlertComponent.vue";
import axios from "axios";
import { BASE_URL, getImgUrl } from "@/helper/constants";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
export default {
  data: function () {
    return {
      error: false,
      message: "",
      loading: false,
      userImg: false,
      img_loading: false,
      post_img: "",
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
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    removeImage: function () {
      this.userImg = "";
      this.post_img = "";
      document.getElementById("uploadImage").value = "";
    },
    changeFileHandler: async function (event) {
      let img = event.target.files[0];
      if (img) {
        this.userImg = true;
        this.img_loading = true;

        const formData = new FormData();
        formData.append("image", img);
        try {
          const res = await axios.post(
            `${BASE_URL}/api/image/upload`,
            formData
          );
          if (res) {
            this.img_loading = false;
            this.post_img = res.data.path;
            console.log(res);
          }
        } catch (error) {
          this.img_loading = false;
        }
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          try {
            this.loading = true;
            const res = await axios.post(`${BASE_URL}/api/user/signup`, {
              name: values.username,
              password: values.password,
              email: values.email,
              image: this.post_img,
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
        }
      });
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
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
  },
  components: { Button, Alert, SpinnerComponent },
  computed: {
    getUserImage: function () {
      return getImgUrl(this.post_img);
    },
  },
};
</script>

<style>
.form-box {
  border: 5px solid lightblue;
  border-radius: 10px;
}
.upload-item {
  margin-left: 60px;
  margin-bottom: 60px;
}
</style>
