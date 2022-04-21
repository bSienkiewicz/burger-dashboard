<template>
  <div id="sidebar-container">
    <div class="logo d-flex justify-content-center logo-head">
      <div
        v-if="windowWidth > 1480"
        class="d-flex justify-content-evenly align-items-center w-100"
      >
        <img src="@/assets/pics/logo_min.png" width="40" alt="" />
        <!-- <h5 class="m-0 px-3 py-2 fs-6 admin-flare">Admin</h5> -->
      </div>

      <img v-else src="@/assets/pics/logo_min.png" width="40" alt="" />
    </div>

    <div class="navigation d-flex flex-column flex-grow-1">
      <router-link
        :to="{ name: 'Dashboard' }"
        class="d-flex align-items-center routerlink"
        style="width: 50px; height: 50px"
        ><i class="fa-solid fa-house"></i>
        <!-- <p class="m-0">Home</p> -->
      </router-link>
      <!-- <h5 class="cat-separator">Przegląd</h5> -->
      <router-link
        :to="{ name: 'Statystyki' }"
        class="d-flex align-items-center routerlink"
        style="width: 50px; height: 50px"
        ><i class="fa-solid fa-chart-pie"></i>
        <!-- <p class="m-0">Statystyki</p> -->
      </router-link>
      <router-link
        :to="{ name: 'Zamówienia' }"
        class="d-flex align-items-center routerlink"
        style="width: 50px; height: 50px"
        ><i class="fa-solid fa-burger"></i>
        <!-- <p class="m-0">Zamówienia</p> -->
      </router-link>
      <!-- <h5 class="cat-separator">Zarządzanie</h5> -->
      <router-link
        :to="{ name: 'Menu' }"
        class="d-flex align-items-center routerlink"
        style="width: 50px; height: 50px"
        ><i class="fa-solid fa-utensils"></i>
        <!-- <p class="m-0">Menu</p> -->
      </router-link>
      <router-link :to="{}" class="d-flex align-items-center routerlink"
        ><i class="fa-solid fa-boxes-stacked"></i>
        <!-- <p class="m-0">Magazyn</p> -->
      </router-link>
      <router-link
        :to="{ name: 'Panel pracowniczy' }"
        class="d-flex align-items-center routerlink"
        style="width: 50px; height: 50px"
        ><i class="fa-solid fa-tv"></i>
        <!-- <p class="m-0">Order Panel</p> -->
      </router-link>
      <!-- <h5 class="cat-separator">Category 3</h5> -->
      <router-link
        :to="{ name: 'Panel pracowniczy' }"
        class="d-flex align-items-center routerlink"
        style="width: 50px; height: 50px"
        ><i class="fa-solid fa-question"></i>
        <!-- <p class="m-0">Block</p> -->
      </router-link>
    </div>
    <div
      class="text-start d-flex align-items-center justify-content-center p-4 logout-section"
    >
      <h5><i class="fa-solid fa-right-from-bracket"></i></h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  },
  methods: {
    isMediumScreen() {
      if (this.windowWidth < 1480) return true;
      else return false;
    },
  },
};
</script>

<style lang="scss">
#sidebar-container {
  height: 100vh;
  // min-width: 300px;
  min-width: 100px;
  width: 100px;
  background: #121418;
  color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 10 !important;
  // @media only screen and (max-width: 1480px) {
  //   min-width: 120px;
  //   width: 120px;
  // }

  // animation: 1s slide-in-left ease;
}

.logo-head {
  padding-top: 50px;
  padding-bottom: 50px;
}

.admin-flare {
  background: #e50f33;
  font-family: PhysisThin;
}

.navigation {
  overflow-y: auto;
  align-items: center;
  // padding-left: 50px;
  a {
    text-decoration: none;
    color: white;
    font-size: 1.2rem;
    transition: all 0.2s ease;
    &:hover {
      color: #e50f33 !important;
    }
  }

  .router-link-active {
    * {
      color: #e50f33;
    }

    // &::after {
    //   content: "|||";
    //   color: #e50f33;
    //   padding-left: 19px;
    // }
  }

  > * {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

.routerlink {
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: center;
}

.cat-separator {
  font-size: 1rem;
  margin-bottom: 0;
  margin-top: 30px;
  color: gray;
  @media only screen and (max-width: 1480px) {
    display: none;
  }
}

.logout-section {
  background: #272928;
  transition: 200ms all ease;
  cursor: pointer;
  > * {
    margin: 0;
  }
  &:hover {
    background: #e50f33;
  }
}

@keyframes slide-in-left {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
