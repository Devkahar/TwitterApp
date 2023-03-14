<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
* {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #000;
}
.color-light {
  color: #536471;
}
.fit-img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.border-bottom {
  border-bottom: 0.5px solid #eee;
}
</style>
