<template>
  <div id="CONTENT-CONTAINER">
    <div
      style="height: 100%; overflow-y: auto; padding: 50px; font-size: 1.1rem"
    >
      <h1>Home</h1>
      <h5 class="pt-5 text-muted">Przegląd</h5>
      <div class="d-flex justify-content-between flex-gap">
        <router-link to="/stats" class="p-4 home-item">
          <h4><i class="fa-solid fa-chart-pie text-red"></i> Statystyki</h4>
          <h5>Przeglądaj statystyki zamówień z wybranego przedziału</h5>
        </router-link>
        <router-link to="/orders" class="p-4 home-item">
          <h4><i class="fa-solid fa-burger text-red"></i> Zamówienia</h4>
          <h5>Sprawdź ostatnie zamówienia, edytuj oraz wprowadzaj zmiany</h5>
        </router-link>
      </div>

      <h5 class="pt-5 text-muted category-text">Zarządzanie</h5>
      <div class="d-flex justify-content-between flex-gap">
        <router-link to="/menu" class="p-4 home-item">
          <h4><i class="fa-solid fa-utensils text-red"></i> Menu</h4>
          <h5>Sprawdź ostatnie zamówienia, edytuj oraz wprowadzaj zmiany</h5>
        </router-link>
        <router-link to="/storage" class="p-4 home-item">
          <h4><i class="fa-solid fa-boxes-stacked text-red"></i> Magazyn</h4>
          <h5>Sprawdź ostatnie zamówienia, edytuj oraz wprowadzaj zmiany</h5>
        </router-link>
        <router-link to="/orderpanel" class="p-4 home-item">
          <h4><i class="fa-solid fa-tv text-red"></i> Order Panel</h4>
          <h5>Sprawdź ostatnie zamówienia, edytuj oraz wprowadzaj zmiany</h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style lang="scss">
a {
  color: black;
  text-decoration: none;
}
.home-item {
  background: #e8e8e8;
  border-radius: 5px;
  transition: 200ms all ease;
  &:hover {
    background: #e50f33;
  }
  &:hover * {
    color: white;
  }
  border-top: 8px solid #e50f33;
}

.flex-gap {
  gap: 10px;
  @media only screen and (max-width: 1180px) {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
