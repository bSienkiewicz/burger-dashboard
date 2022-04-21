<template>
  <div id="top-bar" class="px-5 py-4">
    <div class="row w-100" v-if="this.update">
      <div class="col"></div>
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
      <div class="col-2 d-flex align-items-center justify-content-end">
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
      if (!this.update || localStorage.getItem("filteredData") == null) return;
      this.stateUpdating = true;
      this.updateStateDates();
      Mixins.methods.showSpinner(true);
      this.$store.commit("setUpdated", false);

      axios
        .get(
          `${this.$store.state.apiURL}/get/all?dateStart=${this.$store.state.podsumowanie.filterDateStart}&dateEnd=${this.$store.state.podsumowanie.filterDateEnd}`
        )
        .then((res) => {
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
          this.stateUpdating = false;
          this.showSpinner(false);
          setTimeout(() => {
            document.getElementById("refresh-status").innerHTML =
              "BŁĄD ODŚWIEŻANIA";
          }, 500);
          this.error = true;
          throw err;
        });
    },

    refreshPage() {
      // odśwież stronę
      window.location.reload(true);
    },

    getLocalStorage() {
      // sprawdź czy localStorage puste
      if (localStorage.getItem("filteredData") === null) {
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5vh;
  width: 100%;
  background-color: var(--dark-black);
  transition: 1s all ease;
}

.--loading {
  background-color: #e50f33 !important;
}
</style>
