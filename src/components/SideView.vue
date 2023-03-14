<template>
  <div class="flex container">
    <div class="logo" />
    <a-menu v-model="svNav" theme="dark" mode="inline">
      <a-menu-item key="1">
        <user-outlined />
        <span class="nav-text"><twitter-outlined />home</span>
      </a-menu-item>
      <a-menu-item key="2">
        <video-camera-outlined />
        <span class="nav-text"><message-outlined />messages</span>
      </a-menu-item>
      <a-menu-item key="3">
        <upload-outlined />
        <span class="nav-text"><number-outlined />explore</span>
      </a-menu-item>
      <a-menu-item key="4">
        <bar-chart-outlined />
        <span class="nav-text"><bell-outlined />notifications</span>
      </a-menu-item>
      <a-menu-item key="5">
        <cloud-outlined />
        <span class="nav-text"><book-outlined />bookmarks</span>
      </a-menu-item>
      <a-menu-item key="6">
        <appstore-outlined />
        <span class="nav-text"><bars-outlined />lists</span>
      </a-menu-item>
      <a-menu-item key="7">
        <team-outlined />
        <span class="nav-text"><user-outlined />profile</span>
      </a-menu-item>
      <a-menu-item key="8">
        <shop-outlined />
        <span class="nav-text"><more-outlined />more</span>
      </a-menu-item>
    </a-menu>

    <a-layout-sider>
      <a-layout :style="{ marginLeft: '200px' }">
        <a-layout-header :style="{ background: '#fff', padding: 0 }" />
        <a-layout-content
          :style="{ margin: '24px 16px 0', overflow: 'initial' }"
        >
          <div
            :style="{
              padding: '24px',
              background: '#fff',
              textAlign: 'center',
            }"
          ></div>
        </a-layout-content>
        <a-layout :style="{ marginLeft: '200px' }">
          <a-layout-header :style="{ background: '#fff', padding: 0 }" />
          <a-layout-content
            :style="{ margin: '24px 16px 0', overflow: 'initial' }"
          >
            <div
              :style="{
                padding: '24px',
                background: '#fff',
                textAlign: 'center',
              }"
            ></div>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout-sider>

    <div class="sv1">
      <div>
        <button class="sv2">
          <i class="fab fa-twitter"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script></script>
<style scoped>
* {
  marginleft: "200px";
}
.flex-container {
  display: flex;
  flex-direction: column;
  flex: 0.9;
  padding: 10px 20px 10px 20px;
}
.sv2 {
  height: -12;
  width: -12;
  hover: lightblue;
  text: 3xl;
  text: blue;
}
#components-layout-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
