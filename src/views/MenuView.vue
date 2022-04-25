<template>
  <div id="CONTENT-CONTAINER">
    <div
      class=""
      style="height: 100%; overflow-y: auto; padding: 40px; font-size: 1.1rem"
    >
      <h1 class="m-0 titleUni">Menu</h1>
      <p class="text-muted" v-if="this.$store.state.updated">
        Wynik filtrowania:
        {{ this.$store.state.podsumowanie.menu.length }} pozycji
      </p>


      <nav class="navbar navbar-expand-lg">
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03"
        style="display: flex;
               flex-direction: row;"
        >
          <div class="dropdown">
            <button class="btn btn-secondary p-0 shadow-none" type="button" id="filter-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-filter"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="filter-dropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>

          <form class="form-inline my-2 my-lg-0"
          style="display: flex;
                 flex-direction: row;
                 position: absolute;
                 right: 30px;
                 "
          >
            <input class="form-control me-sm-2 shadow-none" type="search" placeholder="Czego szukasz chłoptasiu" aria-label="Search"
            style="width: 20em">
            <button class="btn my-2 my-sm-0 shadow-none lupka" type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </nav>

      <div
        class="row mt-5 g-0 px-3"
        style="
          color: #b0b0b0;
          font-weight: bold;
          border-bottom: 1px solid #b0b0b0;
          font-size: 0.9rem;
        "
      >
        <div class="col-1">ID</div>
        <div class="col-1">Wygląd</div>
        <div class="col-2">Nazwa</div>
        <div class="col-1">Kategoria</div>
        <div class="col-1">Cena</div>
        <div class="col-4">Skład</div>
        <div class="col-1">Gramatura</div>
        <div class="col-1">Opcje</div>
      </div>
      <div class="order-section">
        <div v-for="item in this.$store.state.podsumowanie.menu" :key="item.id">
          <div class="pt-3">
            <div
              class="row g-0 order-item px-3 d-flex align-items-center"
              style="background: var(--dark-black)"
            >
              <div class="col-1">{{ item.id }}</div>
              <div class="col-1">
                <img
                  src="https://drive.google.com/thumbnail?id=18J2BP9cblA_xDZZG5F5yVNiInjn9AL2E"
                  class="mini-img"
                  alt=""
                  width="100"
                />
              </div>
              <div class="col-2">{{ item.nazwa }}</div>
              <div class="col-1">{{ item.rodzaj }}</div>
              <div class="col-1">{{ item.cena.toFixed(2) }}zł</div>
              <div class="col-4 d-flex flex-wrap align-items-center">
                <!-- TODO: Wyrównać składniki -->
                <p
                  class="ser"
                  v-for="skladnik in item.skladniki"
                  :key="skladnik"
                >
                  {{ skladnik }}
                </p>
              </div>
              <div class="col-1">{{ item.waga }}</div>
              <div
                class="col-1 d-flex align-items-center justify-content-center"
              >
                <div class="btn-group">
                  <button
                    class="btn btn-secondary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Opcje
                  </button>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <router-link
                      :to="{ name: 'Szczegóły', query: { id: item.id } }"
                      class="dropdown-item"
                      >Edytuj</router-link
                    >
                    <div
                      class="dropdown-item bg-danger"
                      @click="sendAlert('Usuwanie wpisów wyłączone')"
                    >
                      Usuń
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.greyed {
  background: rgb(234, 234, 234);
}

.ser::after {
  content: ",\00a0";
}

.ser:last-child::after {
  content: "";
}

.order-section {
  height: 80%;
  overflow-y: auto;
  font-size: 0.9rem;
}

.order-item {
  padding-top: 20px;
  padding-bottom: 20px;
}

.navbar{
  color: #b0b0b0 !important;
  background-color: #121418;
  font-weight: bold;
  font-size: 0.9rem;
}

.navbar a{
  color: #6c757d;
}

.lupka{
  background: var(--basic-red);
}

/*filtr*/
#filter-dropdown{
  transition: 0.5s all ease;
  font-size: 25px;
  width: 37.5px;
  border: none;
}

#filter-dropdown:hover{
  color: red;
  background: var(--dark-black);
}

</style>
