const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": " #00acee ",
            "link-color": " #00acee ",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
});
