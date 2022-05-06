<template>
  <div id="CONTENT-CONTAINER">
    <div
      class=""
      style="height: 100%; overflow-y: auto; padding: 40px; font-size: 1.1rem"
    >
      <h1 class="m-0 titleUni">Menu</h1>
      <p class="text-muted" v-if="this.$store.state.updated">
        Wynik filtrowania:
        {{ this.$store.state.podsumowanie.menu.length }} pozycji
      </p>
      <div class="d-flex">
        <div class="flex-grow-1"></div>
        <router-link :to="{ name: 'Dodaj Menu' }" class="button-pb" style="">
          <i class="fa-solid fa-square-plus"></i> Dodaj pozycję
        </router-link>
      </div>

      <div
        class="row mt-3 g-0 px-3"
        style="
          color: #b0b0b0;
          font-weight: bold;
          border-bottom: 1px solid #b0b0b0;
          font-size: 0.9rem;
        "
      >
        <div class="col-1">ID</div>
        <div class="col-1">Wygląd</div>
        <div class="col-1">Kategoria</div>
        <div class="col-2">Nazwa</div>
        <div class="col-4">Skład</div>
        <div class="col-1">Cena</div>
        <div class="col-1">Gramatura</div>
        <div class="col-1">Opcje</div>
      </div>
      <div class="order-section">
        <div v-for="item in this.$store.state.podsumowanie.menu" :key="item.id">
          <div class="pt-3">
            <div
              class="row g-0 order-item px-3 d-flex align-items-center"
              style="background: var(--dark-black)"
            >
              <div class="col-1">{{ item.id }}</div>
              <div class="col-1">
                <img
                  loading="lazy"
                  :src="item.miniatura"
                  class="mini-img"
                  alt=""
                  width="100"
                />
              </div>
              <div class="col-1">{{ item.rodzaj }}</div>
              <div class="col-2 fw-bold">{{ item.nazwa }}</div>
              <div class="col-4 d-flex flex-wrap align-items-center">
                <!-- TODO: Wyrównać składniki -->
                <p
                  class="ser"
                  v-for="skladnik in item.skladniki"
                  :key="skladnik"
                >
                  {{ skladnik }}
                </p>
              </div>
              <div class="col-1">
                <span class="fw-bold text-red">{{ item.cena.toFixed(2) }}</span
                >zł
              </div>
              <div class="col-1">{{ item.waga }}</div>
              <div
                class="col-1 d-flex align-items-center justify-content-center"
              >
                <div class="btn-group">
                  <button
                    class="btn btn-secondary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Opcje
                  </button>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <router-link
                      :to="{ name: 'Szczegóły', query: { id: item.id } }"
                      class="dropdown-item"
                      >Edytuj</router-link
                    >
                    <div
                      class="dropdown-item bg-danger"
                      @click="sendAlert('Usuwanie wpisów wyłączone')"
                    >
                      Usuń
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    const date = ref();

    // Listener uruchamiający się przy zmianie okresu filtrowania
    const handleDate = (modelData) => {
      if (modelData[1] == null) modelData[1] = modelData[0]; // ustaw drugą datę taką samą jeśli druga pusta
      date.value = modelData;
      localStorage.setItem("filteredData", modelData); // ustaw localStorage
      this.refreshState(); // odśwież stan aplikacji
    };

    return {
      sortingTab: "",
      iloscZamowien: 0,
      dateFilteringStart: [],
      dateFilteringEnd: [],
      sumaZamowien: 0,
      srIloscPoz: 0,
      zamowieniaPods: [0, 0, 0, 0],
      zamowienia: [],
      getterArray: [],
      update: true,
      stateUpdating: false,
      error: false,
      date,
      handleDate,
    };
  },
  methods: {
    getLocalStorage() {
      // sprawdź czy localStorage puste
      if (localStorage.getItem("filteredData") === null) {
        return false;
      } else return true;
    },
  },
};
</script>

<style scoped>
#STATS-BAR {
  background: white;
  border-radius: 15px;
  @media only screen and (max-width: 1200px) {
    display: none !important;
  }
}

.greyed {
  background: rgb(234, 234, 234);
}

.ser::after {
  content: ",\00a0";
}
.ser:last-child::after {
  content: "";
}
.order-section {
  height: 75%;
  overflow-y: auto;
  font-size: 1rem;
}
.order-item {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
