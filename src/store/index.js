import { createStore } from "vuex";

const store = createStore({
  state: {
    updated: false,
    user:
      localStorage.getItem("jwt") != null
        ? JSON.parse(window.atob(localStorage.getItem("jwt").split(".")[1]))
        : null,
    apiURL: "https://projectburger.herokuapp.com/api/v1",
    // apiURL: "http://localhost:3000/api/v1",
    podsumowanie: {
      skladniki: {},
      menu: {},
      zamowienia: {},
      filterDateStart: "",
      filterDateEnd: "",
      stats: [0, 0, [0, 0, 0, 0]],
      role: {},
      users: {},
    },
    kitchenActive: false,
  },
  getters: {
    getZamowienia(state) {
      return state.podsumowanie.zamowienia;
    },
    getUpdated(state) {
      return state.updated;
    },
  },
  mutations: {
    setAllFresh(state, res) {
      state.podsumowanie.skladniki = res.data.skladniki;
      console.log("[INFO] Zaktualizowano skladniki...");
      state.podsumowanie.menu = res.data.menu;

      res.data.menu.forEach((menuElement) => {
        try {
          var skl = menuElement.skladniki.split(",");
          menuElement.skladniki = [];
          skl.forEach((skladnikElement) => {
            menuElement.skladniki.push(
              state.podsumowanie.skladniki.find(
                (o) => o.id === parseInt(skladnikElement)
              ).nazwa
            );
          });
        } catch (e) {
          menuElement.skladniki = [];
        }
      });
      console.log("[INFO] Zaktualizowano menu...");
      state.podsumowanie.zamowienia = res.data.zamowienia;
      console.log("[INFO] Zaktualizowano zamowienia...");
      console.log(res.data);
      state.podsumowanie.role = res.data.role;
      console.log("[INFO] Zaktualizowano role...");
      state.podsumowanie.users = res.data.users;
      console.log("[INFO] Zaktualizowano users...");
    },

    setUpdated(state) {
      state.updated = state;
    },

    setFilterDates(state, payload) {
      state.podsumowanie.filterDateStart = payload.dateStart;
      state.podsumowanie.filterDateEnd = payload.dateEnd;
      console.log("[INFO] Zaktualizowano filtry...");
    },

    setTopStats(state) {
      let wartoscZamowien = 0;
      let srIloscPozycji = 0;
      let zamowienia = [0, 0, 0, 0];
      console.log(state.podsumowanie.zamowienia);
      state.podsumowanie.zamowienia.forEach((element) => {
        wartoscZamowien += element.kwota;
        srIloscPozycji += element.pozycje.split(",").length;
        if (element.status == "W trakcie") zamowienia[0] += 1;
        else if (element.status == "Gotowe") zamowienia[1] += 1;
        else if (element.status == "Odebrane") zamowienia[2] += 1;
        else zamowienia[3] += 1;
      });

      srIloscPozycji /= state.podsumowanie.zamowienia.length;
      state.podsumowanie.stats = [
        wartoscZamowien.toFixed(2),
        srIloscPozycji.toFixed(1),
        zamowienia,
      ];
    },

    setKitchenActive(state, payload) {
      state.kitchenActive = payload;
      console.log(state.kitchenActive);
    },

    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
  modules: {},
});

export default store;
