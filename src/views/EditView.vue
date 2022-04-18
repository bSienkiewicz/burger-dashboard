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
        <h5 v-for="pozycja in this.oPoz" :key="pozycja"></h5>
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
      apiURL: "https://projectburger.herokuapp.com",
      //   apiURL: "http://localhost:3000",
      oPoz: "",
      oKwota: "",
      oStatus: "",
      oDataZ: "",
      oDataW: "",
      oCzasZam: 0.0,
      oMP: "",
      oRodzaj: "",
    };
  },
  mounted() {
    const orderID = this.$route.query.id;
    this.id = orderID;
    this.getOrderData(orderID);
  },
  methods: {
    getOrderData(id) {
      axios.get(`${this.apiURL}/api/v1/get/zamowienia/${id}`).then((res) => {
        const zam = res.data.data[0];
        console.log(zam);
        this.oPoz = zam.pozycje.split(",");
        console.log(this.$store.state.podsumowanie.menu);
      });
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
