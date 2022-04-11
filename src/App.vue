<template>
  <SpinnerComponent />
  <orders-app-component />
  <div id="app-interface" class="d-flex">
    <SidebarPanel />
    <router-view />
  </div>
</template>

<script>
import SidebarPanel from "./components/SidebarPanel.vue";
import OrdersAppComponent from "./components/OrdersAppComponent.vue";
import SpinnerComponent from "./components/SpinnerComponent.vue";

export default {
  components: {
    SidebarPanel,
    OrdersAppComponent,
    SpinnerComponent,
  },
  setup() {},
  mounted() {
    window.onload = () => {
      // document.getElementById("LOADER-COMPONENT").classList.add("d-none");
    };
  },
};
</script>

<style lang="scss">
* {
  // outline: 2px solid red;
}

[v-cloak] {
  display: none;
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

#CONTENT-CONTAINER {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  overflow-y: auto;
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
