<template>
  <div id="sidebar-container" :show="getLocalStorageJWT()">
    <div class="logo d-flex justify-content-center logo-head">
      <router-link :to="{ name: 'Dashboard' }">
        <div class="d-flex justify-content-evenly align-items-center w-100">
          <img src="@/assets/images/logo_min.png" width="40" alt="" />
          <!-- <h5 class="m-0 px-3 py-2 fs-6 admin-flare">Admin</h5> -->
        </div></router-link
      >
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
      @click="logout()"
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
    logout() {
      this.$store.state.user = null;
      localStorage.removeItem("jwt");
      window.location.reload();
    },
    getLocalStorageJWT() {
      // sprawdź czy localStorage puste
      if (localStorage.getItem("jwt") === null) {
        return false;
      } else return true;
    },
  },
};
</script>

<style lang="scss">
#sidebar-container {
  display: flex;
  position: relative;
  height: 100vh;
  min-width: 100px;
  width: 100px;
  left: 0;
  background: #121418;
  color: #fff;
  flex-direction: column;
  z-index: 10 !important;
  -webkit-animation: slide 0.5s forwards;
  -webkit-animation-delay: 2s;
  animation: slide 0.5s forwards;
  animation-delay: 2s;
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

div[show="false"] {
  left: -100px !important;
  display: none !important;
}

div[show="true"] {
  left: 0px !important;
  display: flex !important;
}
</style>
