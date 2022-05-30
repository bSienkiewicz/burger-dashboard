<template>
  <div id="kitchen-container">
    <div class="k-container" style="border-bottom: 3px solid #ccc">
      <div class="k-wrapper">
        <div
          v-for="i in Object.values(this.zamowieniaAkt).filter(
            (z) => z.status === 'W trakcie'
          )"
          :key="i"
          class="o-item"
        >
          <h5 style="font-size: 1rem">
            #<span class="fw-bold">{{ i.id }}</span
            ><span
              style="
                background-color: #e50f33;
                margin-left: 1rem;
                padding: 3px;
                padding-top: 1px;
                color: white;
                font-weight: bold;
                border-radius: 3px;
                font-size: 0.8rem;
              "
              ><i class="fa-solid fa-stopwatch"></i> 01:22</span
            ><span style="float: right; color: #4f5356; font-size: 0.8rem">{{
              i.data_zamowienia.split("T")[1].split(".")[0]
            }}</span>
          </h5>
          <hr />
          <div class="o-pozycje">
            <h1 v-for="item in getOrderData(i.id)" :key="item">
              asd {{ item.menu_id }}
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div class="k-container">
      <h6>XD</h6>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      zamowieniaAkt: {},
    };
  },
  mounted() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    };
    var today = new Date();
    this.$store.commit("setKitchenActive", true);
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/all?dateStart=${
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate()
        }&dateEnd=${
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate()
        }`,
        {
          headers: headers,
        }
      )
      .then((res) => {
        this.zamowieniaAkt = res.data.zamowienia;
      });
  },
  computed: {},
  methods: {
    zamowieniaWTrakcie() {
      let zam = this.$store.getters.getZamowienia;
      if (Object.keys(zam).length === 0) {
        return zam.filter((z) => z.status === "W trakcie");
      } else return [];
    },
    getOrderData(id) {
      let pozycje;
      axios.get(`${process.env.VUE_APP_API_URL}/pozycje/${id}`).then((res) => {
        return (pozycje = res.data.data);
      });
      console.log(pozycje);
      return pozycje;
    },
  },
};
</script>

<style>
#kitchen-container {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  position: absolute;
  overflow: hidden;
}

.k-container {
  height: 50%;
  width: 100%;
}

.k-wrapper {
  height: 100%;
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;
}

.o-item {
  width: 300px;
  background-color: #9ba4a9;
  margin: 20px;
  padding: 8px;
  color: black;
}
</style>
