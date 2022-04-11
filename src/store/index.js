import { createStore } from "vuex";

export default createStore({
  state: {
    skladniki: {},
    menu: {},
    zamowienia: {},
    filterDateStart: {},
    filterDateEnd: {},
  },
  getters: {
    getTopStats(state) {
      let wartoscZamowien = 0;
      let srIloscPozycji = 0;
      let zamowienia = [0, 0, 0, 0];
      state.zamowienia.forEach((element) => {
        wartoscZamowien += element.kwota;
        srIloscPozycji += element.pozycje.split(",").length;
        if (element.status == "W trakcie") zamowienia[0] += 1;
        else if (element.status == "Gotowe") zamowienia[1] += 1;
        else if (element.status == "Odebrane") zamowienia[2] += 1;
        else zamowienia[3] += 1;
      });

      srIloscPozycji /= state.zamowienia.length;
      return [wartoscZamowien, srIloscPozycji, zamowienia];
    },
  },
  mutations: {
    setAllFresh(state, res) {
      state.skladniki = res.data.skladniki;
      console.log("[INFO] Zaktualizowano skladniki...");

      state.menu = res.data.menu;
      state.menu.forEach((menuElement) => {
        try {
          var skl = menuElement.skladniki.split(",");
          menuElement.skladniki = [];
          skl.forEach((skladnikElement) => {
            menuElement.skladniki.push(
              state.skladniki.find((o) => o.id === parseInt(skladnikElement))
                .nazwa
            );
          });
        } catch (e) {
          menuElement.skladniki = [];
        }
      });
      console.log("[INFO] Zaktualizowano menu...");
      state.zamowienia = res.data.zamowienia;
      console.log("[INFO] Zaktualizowano zamowienia...");
      console.log(state.zamowienia);
    },

    setFilterDates(state, startDate, endDate) {
      state.filterDateStart = startDate;
      state.filterDateEnd = endDate;
      console.log("[INFO] Zaktualizowano filtry...");
      console.log(state.filterDateStart + " " + state.filterDateEnd);
    },
  },
  actions: {},
  modules: {},
});
