<template>
  <div id="CONTENT-CONTAINER">
    <div class="" style="height: 100%; overflow-y: auto; padding: 50px">
      <div class="header-container">
        <h1 class="m-0">
          Podsumowanie
          <span
            style="float: right"
            class="fs-5"
            id="refresh-status"
            @click.self="refreshPage()"
            ><i class="fa-solid fa-spinner spinner"></i> Oświeżanie ...</span
          >
        </h1>
        <p class="m-0 text-muted">
          Podsumowanie na okres 01.04.2022 - 03.04.2022
        </p>
      </div>

      <div
        class="d-flex w-100 px-5 py-2 mt-4 justify-content-between align-items-center"
        style=""
        id="STATS-BAR"
      >
        <div class="d-flex align-items-center">
          <div class="icon-wrapper">
            <i class="fa-regular fa-chart-bar"></i>
          </div>
          <div class="d-flex flex-column ps-3">
            <h2 class="fw-bold m-0">{{ iloscZamowien }}</h2>
            <p class="m-0 pt-1">Ilość zamówień</p>
            <p style="color: gray; font-size: 0.8rem">
              <i class="fa-solid fa-arrow-trend-up pe-1" style="color: #1d1"></i
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
              {{ sumaZamowien }}<span class="fs-5 ps-2">zł</span>
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
            <h2 class="fw-bold m-0">{{ srIloscPoz }}</h2>
            <p class="m-0 pt-1">Ilość pozycji</p>
            <p style="color: gray; font-size: 0.8rem">Średnio na zamówienie</p>
          </div>
        </div>
        <Datepicker
          v-model="date"
          range
          locale="pl"
          selectText="Wybierz"
          cancelText="Zamknij"
          showNowButton
          nowButtonLabel="Teraz"
          :monthChangeOnScroll="true"
          @update:modelValue="handleDate"
        >
          <template #trigger>
            <div
              class="d-flex flex-column align-items-center text-center"
              id="FILTER-PERIOD"
              style=""
            >
              <h5 class="m-0">
                <i
                  class="fa-regular fa-calendar pe-1"
                  style="color: var(--basic-red)"
                ></i>
                Okres filtrowania
              </h5>
              <p class="m-0">{{ getFilterRange() }}</p>
            </div>
          </template>
        </Datepicker>
      </div>

      <div class="overflow-hidden">
        <div class="row pt-4 g-0">
          <div
            class="col-xl-6 p-4"
            style="background: #fff; border-radius: 10px"
          >
            <div class=""></div>
            <h5 class="fw-bold">
              Podsumowanie zamówień<span
                style="float: right; color: var(--basic-red)"
                class="fs-6"
                >Wyświetl wszystkie <i class="fa-solid fa-chevron-right"></i
              ></span>
            </h5>
            <div class="d-flex justify-content-between py-3">
              <div class="">
                <h3 class="m-0">{{ zamowieniaPods[0] }}</h3>
                <p class="text-muted m-0">W trakcie</p>
              </div>
              <div class="">
                <h3 class="m-0">{{ zamowieniaPods[1] }}</h3>
                <p class="text-muted m-0">Gotowe</p>
              </div>
              <div class="">
                <h3 class="m-0">{{ zamowieniaPods[2] }}</h3>
                <p class="text-muted m-0">Odebrane</p>
              </div>
              <div class="">
                <h3 class="m-0">{{ zamowieniaPods[3] }}</h3>
                <p class="text-muted m-0">Anulowane</p>
              </div>
            </div>
            <!-- <h5>
          Średni czas zamówienia: 7min
          <span style="color: #d11">(+40%)</span>
        </h5> -->
            <div
              class="row"
              style="
                border-bottom: 1px #d1d1d1 solid;
                padding-bottom: 10px;
                font-weight: bold;
              "
            >
              <div class="col-1" style="color: #a4a4a4">ID</div>
              <div class="col-2 text-center" style="color: #a4a4a4">
                Pozycje
              </div>
              <div class="col-3" style="color: #a4a4a4">Status</div>
              <div class="col-2" style="color: #a4a4a4">Kwota</div>
              <div class="col-2" style="color: #a4a4a4">Płatność</div>
              <div class="col-2" style="color: #a4a4a4">Rodzaj</div>
            </div>
            <div class="" v-if="zamowienia.length > 0">
              <div
                class="row py-3"
                style="border-bottom: 1px #d1d1d1 solid"
                v-for="idx in 5"
                :key="idx"
              >
                <div class="col-1">
                  <p
                    style="
                      border: 1px solid black;
                      text-align: center;
                      margin: 0;
                      border-radius: 200px;
                    "
                  >
                    {{ zamowienia.slice(-5)[5 - idx].id }}
                  </p>
                </div>
                <div class="col-2 text-center">
                  {{ zamowienia.slice(-5)[5 - idx].pozycje.split(",").length }}
                </div>
                <div class="col-3">
                  <i
                    class="fa-solid fa-square"
                    style="color: blue"
                    v-if="zamowienia.slice(-5)[5 - idx].status == 'W trakcie'"
                  ></i>
                  <i
                    class="fa-brands fa-hotjar"
                    style="color: orange"
                    v-else-if="zamowienia.slice(-5)[5 - idx].status == 'Gotowe'"
                  ></i>
                  <i
                    class="fa-solid fa-square"
                    style="color: green"
                    v-else-if="
                      zamowienia.slice(-5)[5 - idx].status == 'Odebrane'
                    "
                  ></i>
                  <i class="fa-solid fa-square" style="color: red" v-else></i>
                  {{ zamowienia.slice(-5)[5 - idx].status }}
                </div>
                <div class="col-2">
                  {{ zamowienia.slice(-5)[5 - idx].kwota.toFixed(2) }}zł
                </div>
                <div class="col-2">
                  {{ zamowienia.slice(-5)[5 - idx].metoda_platnosci }}
                </div>
                <div class="col-2">
                  {{ zamowienia.slice(-5)[5 - idx].take_away }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="col-xl-6 p-4"
            style="background: #fff; border-radius: 10px"
          >
            <h5 class="fw-bold">
              Coś innego<span
                style="float: right; color: var(--basic-red)"
                class="fs-6"
                >Wyświetl wszystkie <i class="fa-solid fa-chevron-right"></i
              ></span>
            </h5>
            <div class="d-flex justify-content-between py-3">
              <div class="">
                <h3 class="m-0">3</h3>
                <p class="text-muted m-0">W trakcie</p>
              </div>
              <div class="">
                <h3 class="m-0">2</h3>
                <p class="text-muted m-0">Gotowe</p>
              </div>
              <div class="">
                <h3 class="m-0">8</h3>
                <p class="text-muted m-0">Odebrane</p>
              </div>
              <div class="">
                <h3 class="m-0">0</h3>
                <p class="text-muted m-0">Anulowane</p>
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
import axios from "axios";
export default {
  setup() {
    const date = ref();

    const handleDate = (modelData) => {
      date.value = modelData;
      localStorage.setItem("filteredData", modelData);
    };

    return {
      date,
      handleDate,
    };
  },
  data() {
    return {
      iloscZamowien: 0,
      sumaZamowien: 0,
      srIloscPoz: 0,
      zamowieniaPods: [0, 0, 0, 0],
      zamowienia: [],
      getterArray: [],
      update: true,
    };
  },
  name: "DashboardHome",
  components: {},
  mounted() {
    if (this.update)
      axios
        .get("https://projectburger.herokuapp.com/api/get/all")
        .then((res) => {
          this.$store.commit("setAllFresh", res);
        })
        .then(() => {
          this.iloscZamowien = this.$store.state.zamowienia.length;
          this.getterArray = this.$store.getters.getTopStats;
          this.sumaZamowien = this.getterArray[0].toFixed(2);
          this.srIloscPoz = this.getterArray[1].toFixed(1);
          this.zamowieniaPods = this.getterArray[2];
          this.zamowienia = this.$store.state.zamowienia;
          console.log(this.getterArray);
        })
        .then(() => {
          let dateNow = new Date();
          let hourNow = dateNow.getHours();
          let minuteNow = dateNow.getMinutes();
          if (hourNow < 10) hourNow = "0" + hourNow;

          if (minuteNow < 10) minuteNow = "0" + minuteNow;
          let status = document.getElementById("refresh-status");

          status.innerHTML = "Zaktualizowano o " + hourNow + ":" + minuteNow;
          status.style.borderBottom = "2px solid #e50f33";
          status.style.color = "#e50f33";
          status.style.cursor = "pointer";
        });
  },
  methods: {
    refreshPage() {
      window.location.reload(true);
    },
    getFilterRange() {
      let range = localStorage.getItem("filteredData");
      let rangeArr = range.split(",");
      let dayStart = new Date(rangeArr[0]).toISOString();
      // TODO: Dodać rozeznanie na dni/miesiące/lata dla dat początkowych i końcowych
      if (rangeArr[1] != "") {
        let dayEnd = new Date(rangeArr[0]).toISOString();
        this.$store.commit("setFilterDates");
        return dayStart + " - " + dayEnd;
      } else return dayStart;
    },
  },
};
</script>

<style lang="scss">
.icon-wrapper {
  display: flex;
  height: 75px;
  width: 75px;
  align-items: center;
  justify-content: center;
  background: #fde2e7;
  border-radius: 999px;
  > * {
    color: var(--basic-red);
    font-size: 2.3rem;
  }
}

#FILTER-PERIOD {
  padding: 15px;
  background: #fde2e7;
  border-radius: 10px;
  cursor: pointer;
}

#STATS-BAR {
  background: white;
  border-radius: 15px;
  @media only screen and (max-width: 1200px) {
    display: none !important;
  }
}

.spinner {
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
