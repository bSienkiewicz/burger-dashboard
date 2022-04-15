<template>
  <div id="CONTENT-CONTAINER">
    <div
      class=""
      style="height: 100%; overflow-y: auto; padding: 50px; font-size: 1.1rem"
    >
      <h1 class="m-0">Zamówienia</h1>
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
        "
      >
        <div class="col-1">ID</div>
        <div class="col-2">Status</div>
        <div class="col-1">Pozycje</div>
        <div class="col-2">Metoda płatności</div>
        <div class="col-2">Data zamówienia</div>
        <div class="col-2">Data wykonania</div>
        <div class="col-1">Czas</div>
        <div class="col-1">Rodzaj</div>
      </div>
      <div class="order-section">
        <div
          class=""
          v-for="(
            item, idx
          ) in this.$store.state.podsumowanie.zamowienia.reverse()"
          :key="item.id"
        >
          <div
            class="row g-0 order-item px-3"
            :class="idx % 2 == 0 ? 'greyed' : ''"
          >
            <div class="col-1 d-flex align-items-center" style="color: #b0b0b0">
              #{{ item.id }}
            </div>
            <div class="col-2 fw-bold d-flex">
              <div
                class="d-flex align-items-center"
                style="
                  background: #dedede;
                  padding-left: 16px;
                  padding-right: 16px;
                  padding-top: 3px;
                  padding-bottom: 3px;
                  border-radius: 999px;
                "
              >
                <i
                  v-if="item.status == 'W trakcie'"
                  style="color: #d000ff; font-size: 0.7rem"
                  class="fa-solid fa-square pe-4"
                ></i>
                <i
                  v-else-if="item.status == 'Anulowane'"
                  style="color: #d11; font-size: 0.7rem"
                  class="fa-solid fa-square pe-4"
                ></i
                ><i
                  v-else-if="item.status == 'Gotowe'"
                  style="color: #ffae00; font-size: 0.7rem"
                  class="fa-solid fa-square pe-4"
                ></i
                ><i
                  v-else-if="item.status == 'Odebrane'"
                  style="color: #3eb000; font-size: 0.7rem"
                  class="fa-solid fa-square pe-4"
                ></i>
                <p class="m-0">{{ item.status }}</p>
              </div>
            </div>
            <div class="col-1 d-flex align-items-center">
              {{ item.pozycje.split(",").length }}
            </div>
            <div class="col-2 d-flex align-items-center">
              <i
                class="fa-solid fa-money-bill-1 pe-2"
                v-if="item.metoda_platnosci == 'Gotówka'"
              ></i
              ><i class="fa-solid fa-credit-card pe-2" v-else></i
              >{{ item.metoda_platnosci }}
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
            <div class="col-2 d-flex align-items-center" v-else>W trakcie</div>
            <div class="col-1 d-flex align-items-center">
              {{ Math.floor((item.czas_zamowienia / 60) % 60) }}m
              {{ Math.floor(item.czas_zamowienia % 60) }}s
            </div>
            <div class="col-1 d-flex align-items-center">
              {{ item.take_away }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
}
</style>
