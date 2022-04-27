<template>
  <div id="CONTENT-CONTAINER">
    <div
      style="height: 100%; overflow-y: auto; padding: 40px; font-size: 1.1rem"
    >
      <h1 class="m-0 titleUni">Witaj, {{ getImie() }}</h1>
      <h5 class="pt-5 text-muted">Przegląd</h5>
      <div class="d-flex justify-content-middle flex-gap">
        <router-link to="/stats" class="p-4 home-item">
          <h4 class="pt-3">
            <i class="fa-solid fa-chart-pie text-red pe-3"></i> Statystyki
          </h4>
          <h5 style="font-family: PhysisThin" class="pt-4">
            Przeglądaj statystyki zamówień z wybranego przedziału
          </h5>
        </router-link>
        <router-link to="/orders" class="p-4 home-item">
          <h4 class="pt-3">
            <i class="fa-solid fa-burger text-red pe-3"></i> Zamówienia
          </h4>
          <h5 style="font-family: PhysisThin" class="pt-4">
            Sprawdź ostatnie zamówienia, edytuj oraz wprowadzaj zmiany
          </h5>
        </router-link>
      </div>

      <h5 class="pt-5 text-muted category-text">Zarządzanie</h5>
      <div class="d-flex justify-content-between flex-gap">
        <router-link to="/menu" class="p-4 home-item">
          <h4 class="pt-3">
            <i class="fa-solid fa-utensils text-red pe-3"></i> Menu
          </h4>
          <h5 style="font-family: PhysisThin" class="pt-4">
            Sprawdź ostatnie zamówienia, edytuj oraz wprowadzaj zmiany
          </h5>
        </router-link>
        <router-link to="/storage" class="p-4 home-item">
          <h4 class="pt-3">
            <i class="fa-solid fa-boxes-stacked text-red pe-3"></i> Magazyn
          </h4>
          <h5 style="font-family: PhysisThin" class="pt-4">
            Sprawdź ostatnie zamówienia, edytuj oraz wprowadzaj zmiany
          </h5>
        </router-link>
        <router-link to="/orderpanel" class="p-4 home-item">
          <h4 class="pt-3">
            <i class="fa-solid fa-tv text-red pe-3"></i> Order Panel
          </h4>
          <h5 style="font-family: PhysisThin" class="pt-4">
            Sprawdź ostatnie zamówienia, edytuj oraz wprowadzaj zmiany
          </h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    getImie() {
      if (this.$store.state.user != null) return this.$store.state.user.imie;
    },
  },
};
</script>

<style lang="scss">
a {
  color: white;
  text-decoration: none;
}
.home-item {
  background: var(--dark-black);
  // border-radius: 5px;
  transition: 200ms all ease;
  &:hover {
    background: #e50f33;
  }
  &:hover * {
    color: white;
  }
  border-top: 2px solid #e50f33;
}

.flex-gap {
  gap: 10px;
  @media only screen and (max-width: 1180px) {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
