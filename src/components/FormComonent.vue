<template>
  <a-form :form="form" @submit="handleSubmit">
    <div v-for="input in fieldArray" v-bind:key="input.id">
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
      <div
        class="mb-2 w-full flex justify-center"
        v-if="input.type === 'upload'"
      >
        <SpinnerComponent v-if="img_loading" />
        <div
          class="post_img_box post_img_box_small mt-5 my-3 mb-2"
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
    <Alert v-if="getError" title="Invalid Details" :message="getMessage" />
    <Button :clickHandler="handleSubmit" :loading="getLoading">{{
      this.buttonName
    }}</Button>
  </a-form>
</template>
<script>
import Button from "@/components/ButtonComponent.vue";
import Alert from "@/components/AlertComponent.vue";
import axios from "axios";
import { BASE_URL, getImgUrl } from "@/helper/constants";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
export default {
  name: "FormComponent",
  data: function () {
    return {
      img_loading: false,
      post_img: this.postImage,
      fieldArray: this.formInputs,
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
  created() {
    this.getContext(this.form);
  },
  methods: {
    removeImage: function () {
      this.post_img = "";
      document.getElementById("uploadImage").value = "";
    },
    changeFileHandler: async function (event) {
      let img = event.target.files[0];
      if (img) {
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
    handleSubmit: function (e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          // Success Submit Handler;
          this.successHandler({ ...values, post_img: this.post_img });
        }
      });
    },
  },
  components: { Button, Alert, SpinnerComponent },
  computed: {
    getUserImage: function () {
      return getImgUrl(this.post_img);
    },
    getError: function () {
      return this.error;
    },
    getMessage: function () {
      return this.message;
    },
    getLoading: function () {
      return this.loading;
    },
  },
  props: {
    formInputs: {
      type: Array,
      required: true,
    },
    error: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    successHandler: {
      type: Function,
      required: true,
    },
    buttonName: {
      type: String,
      required: true,
    },
    getContext: {
      type: Function,
      default: () => {},
    },
    postImage: {
      type: String,
      default: "",
    },
  },
  mounted: function () {
    // document.getElementById("uploadImage").value = this.postImage;
  },
};
</script>

<style>
.upload-item {
  margin-left: 60px;
}
</style>
