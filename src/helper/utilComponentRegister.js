import {
  Button,
  Spin,
  Input,
  Alert,
  Icon,
  Tabs,
  Dropdown,
  Upload,
  Form,
  Modal,
  Result,
} from "ant-design-vue/lib";
import UUID from "vue-uuid";
const registerComponnet = function (Vue) {
  Vue.component(Button.name, Button);
  Vue.component(Spin.name, Spin);
  Vue.component(Input.name, Input);
  Vue.component(Input.Password.name, Input.Password);
  Vue.component(Input.TextArea.name, Input.TextArea);
  Vue.component(Alert.name, Alert);
  Vue.component(Icon.name, Icon);
  Vue.component(Tabs.name, Tabs);
  Vue.component(Tabs.TabPane.name, Tabs.TabPane);
  Vue.component(Dropdown.name, Dropdown);
  Vue.component(Upload.name, Upload);
  Vue.component(Form.name, Form);
  Vue.component(Form.Item.name, Form.Item);
  Vue.component(Modal.name, Modal);
  Vue.component(Result.name, Result);
  Vue.use(UUID);
  Vue.mixin({
    created() {
      console.log("[created] " + this.$options.name);
    },
  });
};
export default registerComponnet;
