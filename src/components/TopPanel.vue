<template>
  <div
    id="top-bar"
    class="px-5 py-4"
    :show="getLocalStorageJWT() && !this.$store.state.kitchenActive"
    v-if="this.$store.state.user != null"
  >
    <div
      class="d-flex align-items-center justify-content-start row w-100"
      v-if="this.update"
    >
      <div class="col d-flex align-items-center">
        <div class="me-3" :style="styles"></div>
        <p class="m-0 fw-bold">
          {{ this.$store.state.user.imie }}
          {{ this.$store.state.user.nazwisko }}
        </p>
        <div
          class="fw-bold py-1 px-3 ms-3 text-uppercase"
          style="background-color: var(--basic-red)"
        >
          {{ this.$store.state.user.rola }}
        </div>
      </div>
      <div class="col-xl-3 col-md-6">
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
          dark
        >
          <template #trigger>
            <p
              class="m-0 fw-bold align-self-middle"
              style="
                color: white;
                padding: 8px;
                background: var(--light-black);
                border-radius: 10px;
                cursor: pointer;
              "
            >
              <i
                class="fa-regular fa-calendar px-2"
                style="color: var(--basic-red)"
              ></i
              >{{ dateFilteringStart[2] }} {{ dateFilteringStart[1] }}
              {{ dateFilteringStart[0] }} - {{ dateFilteringEnd[2] }}
              {{ dateFilteringEnd[1] }} {{ dateFilteringEnd[0] }}
            </p>
          </template>
        </Datepicker>
      </div>
      <div class="col-2 d-flex justify-content-end">
        <p
          style="color: black"
          class="m-0 fw-bold"
          id="refresh-status"
          v-if="this.stateUpdating && !this.error"
        >
          Odświeżanie ...
        </p>
        <p
          style="cursor: pointer"
          class="text-danger m-0"
          id="refresh-status"
          @click.self="refreshState()"
          v-else-if="this.stateUpdating && this.error"
        ></p>
        <p
          style=""
          class="red-href m-0 fw-bold"
          id="refresh-status"
          @click.self="refreshState()"
          v-else
        >
          Zaktualizowano
        </p>
      </div>
    </div>
    <div class="" v-else>
      <p class="m-0 fw-bold" style="color: red">Aktualizacje wyłączone</p>
    </div>
  </div>
</template>

<script>
import Mixins from "@/Mixins";
import { ref } from "vue";
import axios from "axios";
export default {
  mixins: [Mixins],
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
      dateFilteringStart: [],
      dateFilteringEnd: [],
      date,
      handleDate,
      update: true,
      stateUpdating: false,
    };
  },
  mounted() {
    this.refreshState(); // odśwież stan aplikacji po zamontowaniu komponentu
  },
  computed: {
    styles() {
      return {
        height: `30px`,
        width: `30px`,
        "border-radius": "90px",
        "background-image": `url(https://avatars.dicebear.com/api/jdenticon/${this.$store.state.user.username}.svg)`,
      };
    },
  },
  methods: {
    updateStateDates() {
      let dateStart = new Date(
        localStorage.getItem("filteredData").split(",")[0]
      )
        .toISOString()
        .split("T")[0];
      let dateEnd = new Date(localStorage.getItem("filteredData").split(",")[1])
        .toISOString()
        .split("T")[0];

      this.dateFilteringStart = dateStart.split("-");
      this.dateFilteringEnd = dateEnd.split("-");
      this.$store.commit("setFilterDates", {
        dateStart: dateStart,
        dateEnd: dateEnd,
      });
    },
    refreshState() {
      // zaktualizuj stan tylko jeśli localStorage nie jest pusty
      if (
        !this.update ||
        localStorage.getItem("filteredData") == null ||
        localStorage.getItem("jwt") == null ||
        this.$store.state.kitchenActive
      )
        return;

      this.stateUpdating = true;
      this.updateStateDates();
      Mixins.methods.showSpinner(true);
      this.$store.commit("setUpdated", false);

      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      };

      axios
        .get(
          `${process.env.VUE_APP_API_URL}/all?dateStart=${this.$store.state.podsumowanie.filterDateStart}&dateEnd=${this.$store.state.podsumowanie.filterDateEnd}`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          // zaktualizuj zmienne w store
          this.$store.commit("setAllFresh", res);
          this.$store.commit("setTopStats");
          this.$store.commit("setUpdated", true);
        })
        .then(() => {
          // przypisz do zmiennych lokalnych wartości ze $store
          this.stateUpdating = false;
          Mixins.methods.showSpinner(false);
          setTimeout(() => {
            document.getElementById("refresh-status").innerHTML = "Odśwież";
          }, 3000);
        })
        .catch((err) => {
          // jeśli jwt się nie zgadza
          if (err.response == undefined) {
            console.log("???");
          } else if (err.response.status == 403 || err.response.status == 401) {
            this.$store.state.user = null;
            localStorage.removeItem("jwt");
            window.location.reload();
          }
          // wyłącz spinner i powiadom o błędzie
          this.stateUpdating = false;
          this.showSpinner(false);
          setTimeout(() => {
            document.getElementById("refresh-status").innerHTML =
              "BŁĄD ODŚWIEŻANIA";
          }, 500);
          this.error = true;
        });
    },

    refreshPage() {
      // odśwież stronę
      window.location.reload(true);
    },

    getLocalStorageJWT() {
      // sprawdź czy localStorage puste
      if (localStorage.getItem("jwt") === null) {
        return false;
      } else return true;
    },

    showSpinner(show) {
      let spinner = document.getElementById("SPINNER");
      let topbar = document.getElementById("top-bar");
      if (show) {
        spinner.classList.add("--shown");
        topbar.classList.add("--loading");
        // setInterval(() => topbar.classList.add("--loading"), 300);
      } else {
        spinner.classList.remove("--shown");
        spinner.classList.add("--hidden");
        topbar.classList.remove("--loading");
      }
    },
  },
};
</script>

<style lang="scss">
#top-bar {
  z-index: 10;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  background-color: var(--dark-black);
  transition: 1s all ease;
}

.--loading {
  background-color: #e50f33 !important;
}

div[show="false"] {
  top: -50px !important;
  display: none !important;
}

.tb-hidden {
  display: none !important;
}
</style>
