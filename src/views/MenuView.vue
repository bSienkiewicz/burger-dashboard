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
      <div class="d-flex flex-wrap">
        <div class="h-100 flex-grow-1" style="position: relative">
          <div class="w-50" style="position: relative">
            <input
              type="text"
              class="input-pb w-100"
              placeholder="Sortuj"
              v-model="sortingQuery"
              id="sortingInput"
            />
            <div class="" id="shortcutTooltip" style="">
              <div
                class="px-2 fw-bold"
                style="
                  height: 100%;
                  width: 100%;
                  background-color: var(--dark-black);
                  color: #afafaf;
                  border-radius: 6px;
                "
              >
                <span class="text-red">CTRL</span> +
                <span class="text-red">X</span>
              </div>
            </div>
          </div>
        </div>
        <router-link :to="{ name: 'Dodaj Menu' }" class="button-pb" style="">
          <i class="fa-solid fa-square-plus"></i> Dodaj pozycję
        </router-link>
      </div>

      <div v-if="sortedItems.length > 0" class="show-items">
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
          <div class="col-1 text-center">Cena</div>
          <div class="col-1 text-center">Gramatura</div>
          <div class="col-1 text-center">Opcje</div>
        </div>

        <div class="order-section">
          <div v-for="item in sortedItems" :key="item.id">
            <div class="pt-3">
              <div
                class="row g-0 order-item px-3 d-flex align-items-center"
                style="background: var(--dark-black)"
                :style="
                  item.status == 'W ofercie'
                    ? 'border-left: 4px solid green; border-radius: 10px 0 0 10px'
                    : item.status == 'Promocja' ? 'border-left: 4px solid #f23103; border-radius: 10px 0 0 10px'
                    : 'border-left: 4px solid red; border-radius: 10px 0 0 10px;filter: grayscale(100%);'
                "
              >
                <div class="col-1">{{ item.id }}</div>
                <div class="col-xxl-1 col-3">
                  <img
                    loading="lazy"
                    :src="item.miniatura"
                    class="mini-img"
                    alt=""
                    width="100"
                  />
                </div>
                <div class="col-xxl-1 col-12">{{ item.rodzaj }}</div>
                <div class="col-xxl-2 col-12 fw-bold">{{ item.nazwa }}</div>
                <div
                  class="col-xxl-4 col-12 d-flex flex-wrap align-items-center"
                >
                  <!-- TODO: Wyrównać składniki -->
                  <p
                    class="ser m-0"
                    v-for="skladnik in item.skladniki"
                    :key="skladnik"
                  >
                    {{ skladnik }}
                  </p>
                </div>
                <div class="col-xxl-1 col-12 text-center">
                  <span class="fw-bold text-red">{{
                    item.cena.toFixed(2)
                  }}</span
                  >zł
                </div>
                <div class="col-xxl-1 col-12 text-center">{{ item.waga }}g</div>
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
                        :to="{ name: 'Edytuj Menu', query: { id: item.id } }"
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
      <div class="pt-5 text-center" v-else>
        <h3>Nic nie znaleziono <i class="fa-solid fa-face-frown-open"></i></h3>
        <h5>Spróbuj zawęzić kryterium wyszukiwania</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";



export default {
  data() {
    const date = ref();

    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "x") {
        document.getElementById("sortingInput").focus();
        document.getElementById("shortcutTooltip").classList.add("slide-hide");
      }
    });

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
      sortingQuery: "",
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
  computed: {
    sortedItems() {
      let menu = this.$store.state.podsumowanie.menu;
      if (this.sortingQuery === "") return menu;
      else
        return menu.filter((menuPos) => {
          console.log(menuPos.skladniki);
          return (
            menuPos.rodzaj
              .toLowerCase()
              .includes(this.sortingQuery.toLowerCase()) ||
            menuPos.nazwa
              .toLowerCase()
              .includes(this.sortingQuery.toLowerCase())
          );
        });
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

#shortcutTooltip {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding: 10px;
  visibility: visible;
  opacity: 1;
  transition: all 0.2s ease;
}

.slide-hide {
  visibility: hidden !important;
  opacity: 0 !important;
}
</style>
