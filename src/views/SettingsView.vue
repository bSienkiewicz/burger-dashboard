<template>
  <div id="CONTENT-CONTAINER">
    <div
      class=""
      style="
        height: 100%;
        overflow-y: auto;
        padding: 40px;
        font-size: 1.1rem;
        border: 1px solid var(--basic-red);
      "
    >
      <h1 class="m-0 titleUni">Profil</h1>
      <form
        class="pt-5"
        style="width: 600px; font-size: 0.9rem"
        @submit="changeUserPassword()"
      >
        <div class="row">
          <div class="col-6 d-flex align-items-center">Imię</div>
          <input
            class="col-6 input-pb"
            disabled
            :value="this.$store.state.user.imie"
          />
        </div>
        <div class="row pt-3">
          <div class="col-6 d-flex align-items-center">Nazwisko</div>
          <input
            class="col-6 input-pb"
            disabled
            :value="this.$store.state.user.nazwisko"
          />
        </div>

        <div class="row pt-3">
          <div class="col-6 d-flex align-items-center">Adres e-mail</div>
          <input
            class="col-6 input-pb"
            disabled
            :value="this.$store.state.user.email"
          />
        </div>
        <div class="row pt-3">
          <div class="col-6 d-flex align-items-center">Nowe hasło</div>
          <input
            class="col-6 input-pb"
            type="password"
            v-model="this.password"
          />
        </div>
        <div class="row pt-3">
          <div class="col-6 d-flex align-items-center">Powtórz hasło</div>
          <input
            class="col-6 input-pb"
            type="password"
            v-model="this.confirmPassword"
          />
        </div>
        <button type="submit" class="button-pb mt-4">
          <i class="fa-solid fa-save"></i> Zapisz
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SettingsView",
  data() {
    return {
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    changeUserPassword() {
      console.log(this.password + " " + this.confirmPassword);
      if (this.password === this.confirmPassword) {
        axios
          .put(
            `${process.env.VUE_APP_API_URL}/users/changePassword/${this.$store.state.user.user_id}`,
            {
              password: this.password,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.password = "";
            this.confirmPassword = "";
            alert("Hasło zostało zmienione");
          })
          .catch((error) => {
            console.log(error);
            alert("Wystąpił błąd!");
          });
      } else {
        alert("Hasła nie są identyczne!");
      }
    },
  },
};
</script>

<style scoped>
input:disabled {
  color: rgb(120, 120, 120) !important;
}
</style>
