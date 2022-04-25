<template>
  <toast-message tytul="XD" />
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
      <h3 class="pt-3">Dodaj nową pozycję</h3>

      <div class="left-options p-3 bg-dblack">
        <form action="" class="">
          <div class="mb-4">
            <label for="menuRodzaj" class="form-label m-0">Rodzaj</label>
            <select
              required
              id="menuRodzaj"
              class="form-select bg-lblack shadow-none"
              name="rodzaj"
              ref="rodzaj"
              v-model="this.rodzaj"
            >
              <option value="Burger" selected>Burger</option>
              <option value="Sałatka">Sałatka</option>
              <option value="Dodatek">Dodatek</option>
              <option value="Napój">Napój</option>
              <option value="Alkohol">Alkohol</option>
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
              placeholder="300"
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
              placeholder="29.90"
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
            />
          </div>
          <p class="m-0">
            Składniki
            <span
              style="float: right"
              v-if="this.skladnikiArr.length == 0"
              class="text-red"
              >Dodaj przynajmniej jeden składnik</span
            >
          </p>
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
            @click.prevent="printTable()"
            class="bg-red px-3 py-2"
            style="border: 0; margin-left: auto; margin-right: 0"
          >
            Dodaj
          </button>
        </form>
      </div>
      <div class="right-podglad" style="">
        <h5 class="ps-4">Podgląd</h5>
        <recipe-bar
          :rodzaj="this.rodzaj"
          :nazwa="this.nazwa"
          :cena="this.cena.toFixed(2)"
          :skladniki="this.skladnikiArr"
          :waga="this.waga"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ToastMessage from "@/components/ToastMessage.vue";
import RecipeBar from "@/components/RecipeBar.vue";
export default {
  components: {
    ToastMessage,
    RecipeBar,
  },
  data() {
    return {
      nazwa: "Nazwa",
      rodzaj: "Burger",
      cena: 0,
      waga: 0,
      status: "W ofercie",
      skladnikiArr: [],
      completeOrder: false,
    };
  },
  methods: {
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
    },
    printTable() {
      this.nazwa = this.$refs.nazwa.value;
      this.status = this.$refs.status.value;
      this.rodzaj = this.$refs.rodzaj.value;
      this.cena = this.$refs.cena.value;
      this.waga = this.$refs.waga.value;

      console.log([
        this.nazwa,
        this.status,
        this.rodzaj,
        this.cena,
        this.waga,
        this.skladnikiArr.join(","),
      ]);
    },
  },
};
</script>

<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
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

.left-options {
  width: 50%;
  @media only screen and (max-width: 1480px) {
    width: 100%;
  }
}

.right-podglad {
  position: fixed;
  right: 100px;
  top: 100px;
  @media only screen and (max-width: 1480px) {
    position: relative;
    right: 0px;
    top: 0px;
    padding-top: 20px;
  }
}
</style>
