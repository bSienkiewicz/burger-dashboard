<template>
  <div id="CONTENT-CONTAINER">
    <div
      class=""
      style="height: 100%; overflow-y: auto; padding: 40px; font-size: 1.1rem"
    >
      <h1 class="m-0 titleUni">Zamówienia</h1>
      <p class="text-muted" v-if="this.$store.state.updated">
        Wynik filtrowania:
        {{ this.$store.state.podsumowanie.zamowienia.length }} zamówień
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
        <div class="col-2">Status</div>
        <div class="col-2">Pozycje</div>
        <div class="col-2">Data zamówienia</div>
        <div class="col-2">Data wykonania</div>
        <div class="col-1">Czas</div>
        <div class="col-1">Rodzaj</div>
        <div class="col-1">?</div>
      </div>
      <div class="order-section">
        <div
          v-for="item in reverseArray(
            this.$store.state.podsumowanie.zamowienia
          )"
          :key="item.id"
        >
          <div class="pt-3">
            <router-link
              :to="{ name: 'Szczegóły', query: { id: item.id } }"
              style="text-decoration: none; color: inherit"
            >
              <div
                class="row g-0 order-item px-3"
                style="background: var(--dark-black)"
              >
                <div
                  class="col-1 d-flex align-items-center"
                  style="color: #b0b0b0"
                >
                  #{{ item.id }}
                </div>
                <div class="col-2 fw-bold d-flex">
                  <div class="d-flex align-items-center">
                    <i
                      v-if="item.status == 'W trakcie'"
                      style="color: #d000ff; font-size: 0.7rem"
                      class="fa-solid fa-square pe-2"
                    ></i>
                    <i
                      v-else-if="item.status == 'Anulowane'"
                      style="color: #d11; font-size: 0.7rem"
                      class="fa-solid fa-square pe-2"
                    ></i
                    ><i
                      v-else-if="item.status == 'Gotowe'"
                      style="color: #ffae00; font-size: 0.7rem"
                      class="fa-solid fa-square pe-2"
                    ></i
                    ><i
                      v-else-if="item.status == 'Odebrane'"
                      style="color: #3eb000; font-size: 0.7rem"
                      class="fa-solid fa-square pe-2"
                    ></i>
                    <p class="m-0">{{ item.status }}</p>
                  </div>
                </div>
                <div class="col-2 d-flex align-items-center">
                  {{ item.pozycje }}
                </div>
                <div
                  class="col-2 d-flex flex-column flex-wrap justify-content-center"
                >
                  <p class="m-0">{{ item.data_zamowienia.split("T")[0] }}</p>

                  <p class="fw-bold m-0" style="color: var(--basic-red)">
                    {{ item.data_zamowienia.split("T")[1].split(".")[0] }}
                  </p>
                </div>
                <div
                  class="col-2 d-flex flex-column flex-wrap justify-content-center"
                  v-if="item.data_wykonania"
                >
                  <p class="m-0">{{ item.data_wykonania.split("T")[0] }}</p>

                  <p class="fw-bold m-0" style="color: var(--basic-red)">
                    {{ item.data_wykonania.split("T")[1].split(".")[0] }}
                  </p>
                </div>
                <div class="col-2 d-flex align-items-center" v-else>
                  W trakcie
                </div>
                <div class="col-1 d-flex align-items-center">
                  {{ Math.floor((item.czas_zamowienia / 60) % 60) }}m
                  {{ Math.floor(item.czas_zamowienia % 60) }}s
                </div>
                <div class="col-1 d-flex align-items-center">
                  {{ item.take_away }}
                </div>
                <div
                  class="col-1 d-flex align-items-center justify-content-center"
                >
                  ?
                </div>
              </div></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    sendAlert(msg) {
      alert(msg);
    },
    getItemData(pos) {
      let item = this.$store.state.podsumowanie.menu.find(
        (pozycja) => pozycja.id == pos
      );
      return item;
    },
    reverseArray(array) {
      if (localStorage.getItem("filteredData") === null) {
        console.log("Null localstorage");
      } else return array.slice().reverse();
    },
  },
  computed: {},
};
</script>

<style>
/* * {
  border: 1px solid red;
} */

.greyed {
  background: rgb(234, 234, 234);
}

.order-item {
  padding-top: 20px;
  padding-bottom: 20px;
}

.order-section {
  height: 80%;
  overflow-y: auto;
  font-size: 0.9rem;
}
</style>
