<template>
  <div id="CONTENT-CONTAINER">
    <div
        class=""
        style="height: 100%; overflow-y: auto; padding: 50px; font-size: 1.1rem"
    >
      <h1 class="m-0">Menu</h1>
      <!--      ja tu wrócę-->
      <div
          class="d-flex w-100 px-5 py-2 mt-4 justify-content-between align-items-center"
          style=""
          id="STATS-BAR"
      >
        <div
            class="d-flex w-75 justify-content-between align-items-center"
            v-if="getLocalStorage()"
        >
          <div class="d-flex align-items-center">
            <div class="icon-wrapper">
              <i class="fa-regular fa-chart-bar"></i>
            </div>
            <div class="d-flex flex-column ps-3">
              <h2 class="fw-bold m-0">
                {{ this.$store.state.podsumowanie.zamowienia.length }}
              </h2>
              <p class="m-0 pt-1">Ilość zamówień</p>
              <p style="color: gray; font-size: 0.8rem">
                <i
                    class="fa-solid fa-arrow-trend-up pe-1"
                    style="color: #1d1"
                ></i
                >4% (30 dni)
              </p>
            </div>
          </div>

          <div class="d-flex align-items-center">
            <div class="icon-wrapper">
              <i class="fa-solid fa-dollar-sign"></i>
            </div>
            <div class="d-flex flex-column ps-3">
              <h2 class="fw-bold m-0">
                {{ this.$store.state.podsumowanie.stats[0]
                }}<span class="fs-5 ps-2">zł</span>
              </h2>
              <p class="m-0 pt-1">Wartość paragonów</p>
              <p style="color: gray; font-size: 0.8rem">
                <i
                    class="fa-solid fa-arrow-trend-down pe-1"
                    style="color: #d11"
                ></i
                >1% (30 dni)
              </p>
            </div>
          </div>

          <div class="d-flex align-items-center">
            <div class="icon-wrapper">
              <i class="fa-regular fa-rectangle-list"></i>
            </div>
            <div class="d-flex flex-column ps-3">
              <h2 class="fw-bold m-0">
                {{ this.$store.state.podsumowanie.stats[1] }}
              </h2>
              <p class="m-0 pt-1">Ilość pozycji</p>
              <p style="color: gray; font-size: 0.8rem">
                Średnio na zamówienie
              </p>
            </div>
          </div>
        </div>
      </div>
<!--      ja tu wrócę-->
      <p class="text-muted" v-if="this.$store.state.updated">
        Wynik filtrowania:
        {{ this.$store.state.podsumowanie.menu.length }} pozycji
      </p>

      <div
          class="row mt-5 g-0 px-3"
          style="
          color: #b0b0b0;
          font-weight: bold;
          border-bottom: 1px solid #b0b0b0;
          font-size: 0.9rem;
        "
      >
        <div class="col-1">ID</div>
        <div class="col-1">Wygląd</div>
        <div class="col-2">Nazwa</div>
        <div class="col-1">Kategoria</div>
        <div class="col-1">Cena</div>
        <div class="col-4">Skład</div>
        <div class="col-1">Gramatura</div>
        <div class="col-1">Opcje</div>

      </div>
      <div class="order-section">
        <div
            v-for="(item, idx) in this.$store.state.podsumowanie.menu"
            :key="item.id"
        >
          <div
              class="row g-0 order-item px-3 py-2"
              :class="idx % 2 == 0 ? 'greyed' : ''"
          >
            <div class="col-1"> {{item.id}} </div>
            <div class="col-1"></div>
            <div class="col-2"> {{item.nazwa}} </div>
            <div class="col-1"> {{item.rodzaj}} </div>
            <div class="col-1"> {{item.cena.toFixed(2)}}zł </div>
            <div class="col-4 d-flex flex-wrap">
              <p class="ser" v-for="skladnik in item.skladniki" :key="skladnik">
              <span v-if="item.skladniki !== null">{{skladnik}}</span>
              <span v-else>JA TU WRÓCĘ!!!!!!</span>
              </p>
            </div>
            <div class="col-1"> {{item.waga}} </div>
            <div class="col-1 d-flex align-items-center justify-content-center">
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
                      :to="{ name: 'edit', query: { id: item.id } }"
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
      apiURL: "https://projectburger.herokuapp.com",
      date,
      handleDate,
    };
  },
  name: "PodsumowanieView",
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

<style>

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

.ser::after{
  content: ",\00a0";
}
.ser:last-child::after{
  content: "";
}
</style>