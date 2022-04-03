<template>
  <div class="d-flex">
    <SidebarPanel />
    <router-view />
  </div>
</template>

<script>
import SidebarPanel from "./components/SidebarPanel.vue";

export default {
  components: {
    SidebarPanel,
  },
  setup() {},
};
</script>

<style lang="scss">
* {
  // outline: 2px solid red;
}

:root {
  --basic-red: #e50f33;
}

@font-face {
  font-family: PhysisMedium;
  src: url("@/assets/fonts/RNSPhysis-Medium.ttf");
}

@font-face {
  font-family: PhysisBold;
  src: url("@/assets/fonts/RNSPhysis-Bold.ttf");
}

@font-face {
  font-family: PhysisThin;
  src: url("@/assets/fonts/RNSPhysis-Light.ttf");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: PhysisMedium;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
