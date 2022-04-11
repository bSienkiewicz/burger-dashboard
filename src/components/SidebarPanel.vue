<template>
  <div id="sidebar-container">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <div class="logo d-flex justify-content-center logo-head">
      <div
        v-if="windowWidth > 1480"
        class="d-flex justify-content-evenly align-items-center w-100"
      >
        <img src="@/assets/pics/logo_long.png" width="150" alt="" />
        <h5 class="m-0 px-3 py-2 fs-6 admin-flare">Admin</h5>
      </div>

      <img v-else src="@/assets/pics/logo_min.png" width="40" alt="" />
    </div>

    <div class="navigation d-flex flex-column flex-grow-1">
      <h5 class="cat-separator">Statystyki</h5>
      <router-link to="/"
        ><i class="fa-solid fa-chart-pie pe-3"></i>Podsumowanie</router-link
      >
      <router-link to="/zamowienia"
        ><i class="fa-solid fa-burger pe-3"></i>Zamówienia</router-link
      >
      <h5 class="cat-separator">Zarządzanie</h5>
      <router-link to="/menu"
        ><i class="fa-solid fa-utensils pe-3"></i>Menu</router-link
      >
      <router-link to="/magazyn"
        ><i class="fa-solid fa-boxes-stacked pe-3"></i>Magazyn</router-link
      >
      <router-link to="/orders"
        ><i class="fa-solid fa-tv pe-3"></i>Order Panel</router-link
      >
      <h5 class="cat-separator">Category 3</h5>
      <router-link to="/d">Block 5</router-link>
    </div>
    <div class="text-start d-flex align-items-center p-4 logout-section">
      <h5>←</h5>
      <h5 class="ps-4">Wyloguj</h5>
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
};
</script>

<style lang="scss">
#sidebar-container {
  height: 100vh;
  min-width: 380px;
  background: #01110b;
  color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 10 !important;
  @media only screen and (max-width: 1480px) {
    min-width: 120px;
    width: 120px;
  }

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
  align-items: flex-start;
  padding-left: 50px;
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

    &::after {
      content: "|||";
      color: #e50f33;
      padding-left: 19px;
    }
  }

  > * {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

.cat-separator {
  font-size: 1rem;
  margin-bottom: 0;
  margin-top: 60px;
  color: gray;
  @media only screen and (max-width: 1290px) {
    display: none;
  }
}

.logout-section {
  background: #272928;
  cursor: pointer;
  > * {
    margin: 0;
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
