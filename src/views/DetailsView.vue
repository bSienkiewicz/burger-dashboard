<template>
  <transition name="slide">
    <div id="CONTENT-CONTAINER">
      <div
        class=""
        style="height: 100%; overflow-y: auto; padding: 50px; font-size: 1.1rem"
      >
        <a
          class="text-red"
          @click="$router.go(-1)"
          style="text-decoration: none; cursor: pointer"
        >
          <i class="fa-solid fa-chevron-left"></i> Powrót
        </a>
        <h3 class="pt-3">Edycja zamówienia #{{ this.id }}</h3>

        <h5 class="pt-5">Pozycje na zamówieniu:</h5>
        <div class="bg-white" style="width: 50vw">
          <div
            class="row px-3 text-muted fw-bold py-2"
            style="border-bottom: 2px #ddd solid"
          >
            <div class="col-1">ID</div>
            <div class="col-4">Nazwa</div>
            <div class="col-1">Ilość</div>
            <div class="col-1">Cena</div>
          </div>
          <div
            class="w-100"
            v-for="(pozycja, idx) in this.oPozycje"
            :key="pozycja"
          >
            <div class="row fw-bold py-3 px-3" :class="idx % 2 ? 'greyed' : ''">
              <div class="col-1" style="border-right: 2px #ddd solid">
                #{{ idx + 1 }}
              </div>
              <div class="col-4">
                {{ convertMenuItem(pozycja.menu_id)[0] }}
              </div>
              <div class="col-1">{{ pozycja.ilosc }}</div>
              <div class="col-1">{{ convertMenuItem(pozycja.menu_id)[1] }}</div>
            </div>
          </div>
          <div class="row" style="">
            <div class="col-8"></div>
            <div
              class="col-4 fw-bold py-2"
              style="
                background: #8f8;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
              "
            >
              <i class="fa-solid fa-circle-plus"></i> Dodaj pozycję
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: 0,
      oPoz: "",
      oKwota: "",
      oStatus: "",
      oDataZ: "",
      oDataW: "",
      oCzasZam: 0.0,
      oMP: "",
      oRodzaj: "",
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
      axios
        .get(`${this.$store.state.apiURL}/get/zamowienia/${id}`)
        .then((res) => {
          const zam = res.data.data[0];
          console.log(zam);
          this.oPoz = zam.pozycje.split(",");
          console.log(this.$store.state.podsumowanie.menu);
          return axios.get(`${this.$store.state.apiURL}/get/pozycje/${id}`);
        })
        .then((res) => {
          this.oPozycje = res.data.data;
        });
    },
    convertMenuItem(id) {
      let obj = this.$store.state.podsumowanie.menu.find(
        (o) => o.id === parseInt(id)
      );
      return [obj.nazwa, obj.cena];
    },
  },
};
</script>

<style>
.greyed {
  background: rgb(234, 234, 234);
}
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
