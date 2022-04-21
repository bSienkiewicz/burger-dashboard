<template>
  <div id="app-interface" class="d-flex">
    <SidebarPanel />
    <div class="d-flex flex-column flex-grow-1" style="position: relative">
      <SpinnerComponent />
      <div id="right">
        <top-panel />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarPanel from "./components/SidebarPanel.vue";
import SpinnerComponent from "./components/SpinnerComponent.vue";
import TopPanel from "./components/TopPanel.vue";

export default {
  components: {
    SidebarPanel,
    SpinnerComponent,
    TopPanel,
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
  --dark-black: #121418;
  --light-black: #1d1f24;
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

@font-face {
  font-family: UniSans;
  src: url("@/assets/fonts/UniSansHeavyIt.otf");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  color: white;
  font-family: PhysisMedium;
  // background: #f7f7f7;
  background: #1b1f24;
}

#CONTENT-CONTAINER {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.titleUni {
  font-family: UniSans;
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

#right {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.red-href {
  border-bottom: 2px solid #e50f33;
  color: #e50f33;
  cursor: pointer;
}

.text-red {
  color: #e50f33;
}
.bg-red {
  background: #e50f33;
}
</style>
