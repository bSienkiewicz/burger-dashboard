<template>
  <transition name="slide">
    <div id="CONTENT-CONTAINER">
      <div
        class=""
        style="height: 100%; overflow-y: auto; padding: 40px; font-size: 1.1rem"
      >
        <a
          class="text-red"
          @click="$router.go(-1)"
          style="text-decoration: none; cursor: pointer"
        >
          <i class="fa-solid fa-chevron-left"></i> Powrót
        </a>
        <h3 class="pt-3">Edycja zamówienia #{{ this.id }}</h3>

        <div class="pt-5 w-50">
          <div class="p-4" style="background: var(--dark-black)">
            <h5 class="" show>Pozycje na zamówieniu:</h5>
            <div class="">
              <div
                class="row px-3 text-muted fw-bold py-2 g-0"
                style="border-bottom: 2px #ddd solid"
              >
                <div class="col-1">ID</div>
                <div class="col-2">Rodzaj</div>
                <div class="col-3">Nazwa</div>
                <div class="col-1">Ilość</div>
                <div class="col-1">Cena</div>
              </div>
            </div>
            <div
              class="w-100"
              v-for="(pozycja, idx) in this.oPozycje"
              :key="pozycja"
            >
              <div
                class="row py-3 px-3 g-0 mt-2"
                style="background: var(--light-black)"
              >
                <div class="col-1" style="">#{{ idx + 1 }}</div>
                <div class="col-2">
                  {{ convertMenuItem(pozycja.menu_id)[2] }}
                </div>
                <div class="col-3">
                  {{ convertMenuItem(pozycja.menu_id)[0] }}
                </div>
                <div class="col-1">{{ pozycja.ilosc }}</div>
                <div class="col-1">
                  {{ convertMenuItem(pozycja.menu_id)[1] }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <h5 class="pt-3">
          Łączna kwota zamówienia: {{ this.zamowienie.kwota }}
        </h5>
      </div>
    </div>
  </transition>
</template>

<script>
import Mixins from "@/Mixins";

import axios from "axios";
export default {
  mixins: [Mixins],
  data() {
    return {
      id: 0,
      zamowienie: {},
      oPozycje: [],
    };
  },
  mounted() {
    const orderID = this.$route.query.id;
    this.id = orderID;
    this.getOrderData(orderID);
  },
  methods: {
    getOrderData(id) {
      Mixins.methods.showSpinner(true);
      axios
        .get(`${this.$store.state.apiURL}/get/zamowienia/${id}`)
        .then((res) => {
          const zam = res.data.data[0];
          this.zamowienie = zam;
          console.log(zam);
          return axios.get(`${this.$store.state.apiURL}/get/pozycje/${id}`);
        })
        .then((res) => {
          this.oPozycje = res.data.data;
          Mixins.methods.showSpinner(false);
        });
    },
    convertMenuItem(id) {
      let obj = this.$store.state.podsumowanie.menu.find(
        (o) => o.id === parseInt(id)
      );
      return [obj.nazwa, obj.cena, obj.rodzaj, obj.cena];
    },
  },
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>
