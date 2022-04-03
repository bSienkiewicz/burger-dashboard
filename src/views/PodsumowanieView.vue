<template>
  <div id="CONTENT-CONTAINER">
    <div class="header-container">
      <h1 class="m-0">Podsumowanie</h1>
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
          <h2 class="fw-bold m-0">13</h2>
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
          <h2 class="fw-bold m-0">507.42<span class="fs-5 ps-2">zł</span></h2>
          <p class="m-0 pt-1">Wartość paragonów</p>
          <p style="color: gray; font-size: 0.8rem">
            <i class="fa-solid fa-arrow-trend-down pe-1" style="color: #d11"></i
            >1% (30 dni)
          </p>
        </div>
      </div>

      <div class="d-flex align-items-center">
        <div class="icon-wrapper">
          <i class="fa-regular fa-rectangle-list"></i>
        </div>
        <div class="d-flex flex-column ps-3">
          <h2 class="fw-bold m-0">1.43</h2>
          <p class="m-0 pt-1">Ilość pozycji</p>
          <p style="color: gray; font-size: 0.8rem">Średnio na zamówienie</p>
        </div>
      </div>

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
        <p class="m-0">01.04.2022 - 03.04.2022</p>
      </div>
    </div>

    <div class="overflow-hidden">
      <div class="row pt-4">
        <div class="col-xl-6 p-4" style="background: #fff; border-radius: 10px">
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
            <div class="col-1" style="color: #a4a4a4">#</div>
            <div class="col-1" style="color: #a4a4a4">ID</div>
            <div class="col-2" style="color: #a4a4a4">Pozycje</div>
            <div class="col-2" style="color: #a4a4a4">Status</div>
            <div class="col-2" style="color: #a4a4a4">Kwota</div>
            <div class="col-2" style="color: #a4a4a4">Płatność</div>
            <div class="col-2" style="color: #a4a4a4">Rodzaj</div>
          </div>
          <div class="row py-3" style="border-bottom: 1px #d1d1d1 solid">
            <div class="col-1">1</div>
            <div class="col-1">751</div>
            <div class="col-2">2</div>
            <div class="col-2">W trakcie</div>
            <div class="col-2">31.90zł</div>
            <div class="col-2">Gotówka</div>
            <div class="col-2">Na miejscu</div>
          </div>
          <div class="row py-3" style="border-bottom: 1px #d1d1d1 solid">
            <div class="col-1">2</div>
            <div class="col-1">752</div>
            <div class="col-2">2</div>
            <div class="col-2">W trakcie</div>
            <div class="col-2">32.80zł</div>
            <div class="col-2">Gotówka</div>
            <div class="col-2">Na miejscu</div>
          </div>
          <div class="row py-3" style="border-bottom: 1px #d1d1d1 solid">
            <div class="col-1">3</div>
            <div class="col-1">753</div>
            <div class="col-2">1</div>
            <div class="col-2">W trakcie</div>
            <div class="col-2">21.90zł</div>
            <div class="col-2">Karta</div>
            <div class="col-2">Na wynos</div>
          </div>
        </div>

        <div class="col-xl-6 p-4" style="background: #fff; border-radius: 10px">
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
</template>

<script>
export default {
  name: "DashboardHome",
  components: {},
};
</script>

<style lang="scss">
#CONTENT-CONTAINER {
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 50px;
  flex-direction: column;
  background: #f7f7f7;
  overflow-y: auto;
}

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
</style>
