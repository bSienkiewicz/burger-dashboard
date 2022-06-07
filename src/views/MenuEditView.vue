<template>
  <transition name="slide">
    <div id="CONTENT-CONTAINER">
      <div
        id="saved"
        style="
          height: 100%;
          overflow-y: auto;
          padding: 40px;
          font-size: 1.1rem;
          position: relative;
        "
      >
        <h4
          style="
            position: absolute;
            top: 0;
            right: 0;
            color: var(--basic-red);
            margin: 20px 20px 0 0;
            cursor: pointer;
          "
          v-if="this.updated"
        >
          Zapisano zmiany
        </h4>
        <a
          class="text-red"
          @click="$router.go(-1)"
          style="text-decoration: none; cursor: pointer"
        >
          <i class="fa-solid fa-chevron-left"></i> Powrót
        </a>

        <h3 class="pt-3">Edycja pozycji #{{ this.id }}</h3>

        <div class="pt-5 w-50">
          <div class="p-4" style="background: var(--dark-black)">
            <form action="" class="" @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label for="menuRodzaj" class="form-label m-0">Rodzaj</label>
                <select
                  required
                  id="menuRodzaj"
                  class="form-select bg-lblack shadow-none"
                  name="rodzaj"
                  ref="rodzaj"
                  :disabled="this.updating"
                  v-model="this.rodzaj"
                >
                  <option
                    :selected="this.menu.rodzaj === 'Burger'"
                    value="Burger"
                  >
                    Burger
                  </option>
                  <option
                    :selected="this.menu.rodzaj === 'Sałatka'"
                    value="Sałatka"
                  >
                    Sałatka
                  </option>
                  <option
                    :selected="this.menu.rodzaj === 'Dodatek'"
                    value="Dodatek"
                  >
                    Dodatek
                  </option>
                  <option
                    :selected="this.menu.rodzaj === 'Napój'"
                    value="Napój"
                  >
                    Napój
                  </option>
                  <option
                    :selected="this.menu.rodzaj === 'Alkohol'"
                    value="Alkohol"
                  >
                    Alkohol
                  </option>
                </select>
              </div>
              <div class="mb-4">
                <label for="menuNazwa" class="form-label m-0">Nazwa</label>
                <input
                  name="nazwa"
                  ref="nazwa"
                  required
                  type="text"
                  class="form-control bg-lblack"
                  id="menuNazwa"
                  v-model="this.nazwa"
                />
              </div>
              <div class="mb-4">
                <label for="menuWaga" class="form-label m-0">Waga (g)</label>
                <input
                  name="waga"
                  ref="waga"
                  required
                  type="number"
                  class="form-control bg-lblack"
                  id="menuWaga"
                  v-model="this.waga"
                />
              </div>
              <div class="mb-4">
                <label for="menuCena" class="form-label m-0">Cena</label>
                <input
                  name="cena"
                  ref="cena"
                  type="number"
                  class="form-control bg-lblack"
                  id="menuCena"
                  step="0.01"
                  required
                  v-model="this.cena"
                />
              </div>

              <div class="mb-4">
                <label for="menuStatus" class="form-label m-0">Status</label>
                <select
                  name="status"
                  ref="status"
                  id="menuStatus"
                  class="form-select bg-lblack shadow-none"
                  required
                  v-model="this.status"
                >
                  <option value="W ofercie" selected>W ofercie</option>
                  <option value="Wycofane">Wycofane</option>
                  <option value="Promocja">Promocja</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="form-label">Miniatura</label>
                <input
                  class="form-control bg-lblack text-muted"
                  type="file"
                  disabled
                  @change="handleFileChange($event)"
                />
              </div>
              <p class="m-0">Składniki</p>
              <div class="d-flex flex-wrap pt-2" id="menuSkladniki">
                <div
                  v-for="skladnik in this.$store.state.podsumowanie.skladniki"
                  :key="skladnik.id"
                  @click="toggleSkladnik(skladnik.id)"
                >
                  <div
                    class="skladnik-option py-2 px-3"
                    :class="
                      this.skladnikiArr.includes(skladnik.id)
                        ? 'skladnik-active'
                        : ''
                    "
                  >
                    <p class="m-0">{{ skladnik.nazwa }}</p>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="button-pb px-3 py-2"
                @click="scrollTop"
              >
                Edytuj
              </button>
            </form>
          </div>
        </div>
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
      menu: {},
      nazwa: "",
      rodzaj: "",
      cena: "",
      waga: "",
      status: "",
      skladnikiArr: [],
      completeOrder: false,
      previewSource: "",
      updating: true,
      updated: false,
    };
  },
  mounted() {
    const orderID = this.$route.query.id;
    this.id = orderID;
    this.getOrderData(orderID);
    console.log(this.$store.state.podsumowanie);
  },
  methods: {
    getMenuDetails() {
      let n = this.menu.nazwa;
      return [n];
    },
    getOrderData(id) {
      this.updating = true;
      Mixins.methods.showSpinner(true);
      axios
        .get(`${process.env.VUE_APP_API_URL}/menu/${id}`)
        .then((res) => {
          const zam = res.data.data[0];
          this.menu = zam;
          console.log(zam);
          return axios.get(`${process.env.VUE_APP_API_URL}/pozycje/${id}`);
        })
        .then((res) => {
          this.oPozycje = res.data.data;
          this.nazwa = this.menu.nazwa;
          this.rodzaj = this.menu.rodzaj;
          this.waga = this.menu.waga;
          this.cena = this.menu.cena;
          this.status = this.menu.status;
          let a = this.menu.skladniki.split(",");
          this.skladnikiArr = a.map(function (x) {
            return parseInt(x, 10);
          });
          console.log(this.skladnikiArr);
          this.updating = false;
          Mixins.methods.showSpinner(false);
        });
    },
    convertMenuItem(id) {
      let obj = this.$store.state.podsumowanie.menu.find(
        (o) => o.id === parseInt(id)
      );
      return [obj.nazwa, obj.cena, obj.rodzaj, obj.cena];
    },
    toggleSkladnik(id) {
      if (this.skladnikiArr.includes(id)) {
        this.skladnikiArr = this.skladnikiArr.filter((e) => {
          return e != id;
        });
      } else if (this.skladnikiArr.includes(1) && id == 2) {
        this.skladnikiArr = this.skladnikiArr.filter((e) => {
          return e != 1;
        });
        this.skladnikiArr.push(id);
      } else if (this.skladnikiArr.includes(2) && id == 1) {
        this.skladnikiArr = this.skladnikiArr.filter((e) => {
          return e != 2;
        });
        this.skladnikiArr.push(id);
      } else this.skladnikiArr.push(id);
      console.log(this.skladnikiArr);
    },
    handleSubmit() {
      this.updating = true;
      Mixins.methods.showSpinner(true);
      axios
        .post(`${process.env.VUE_APP_API_URL}/menu/${this.id}`, {
          id: this.id,
          nazwa: this.nazwa,
          rodzaj: this.rodzaj,
          waga: this.waga,
          cena: this.cena,
          status: this.status,
          skladniki: this.skladnikiArr.join(","),
        })
        .then(() => {
          this.updating = false;
          this.updated = true;
          Mixins.methods.showSpinner(false);
          setInterval(() => {
            this.updated = false;
          }, 3000);
        });
    },
    scrollTop() {
      window.scrollTo(0, 0);
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

.skladnik-option {
  background: var(--light-black);
  margin-right: 15px;
  margin-bottom: 15px;
  user-select: none;
  border-radius: 99px;
  transition: all 0.2s ease;
}
.skladnik-active {
  background: #1bd11b !important;
  box-shadow: 0px 0px 7px 0px #149f14;
  color: #000;
}

select:disabled {
  color: rgb(101, 101, 101) !important;
}
</style>
