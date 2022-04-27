<template>
  <div class="login-container">
    <div class="d-flex h-100 w-100" style="">
      <div
        class="login-left w-50"
        :class="
          password != '' && username != ''
            ? 'bw0'
            : username != ''
            ? 'bw50'
            : password != ''
            ? 'bw50'
            : ''
        "
        v-if="this.windowWidth > 1100"
        style="background-color: red"
      ></div>
      <div class="login-right w-50" style="">
        <img class="logo-head" src="@/assets/images/logo_long.png" />
        <div class="flex-grow-1 py-5" style="width: 50%">
          <h5 class="fw-bold pb-5">Zaloguj się</h5>
          <form action="" @submit.prevent="authorize()">
            <p class="pt-5 mb-2 fw-bold">LOGIN</p>
            <input
              id="loginInput"
              class="input-pb"
              type="text"
              style="width: 100%"
              v-model="username"
            />

            <p class="pt-5 mb-2 fw-bold">HASŁO</p>
            <input
              id="passwordInput"
              class="input-pb"
              type="password"
              style="width: 100%"
              v-model="password"
            />
            <button
              type="submit"
              class="button-pb mt-4"
              style="margin-left: auto; margin-right: 0"
            >
              Zaloguj
            </button>
            <p class="mb-0 mt-1 text-red" v-if="this.error">
              Użytkownik nie istnieje.
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      windowWidth: window.innerWidth,
      username: "",
      password: "",
      error: false,
    };
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  },
  methods: {
    authorize() {
      const data = {
        username: this.username,
        password: this.password,
      };
      const headers = {
        "Content-Type": "application/json",
      };

      axios
        .post("http://localhost:3000/login", data, {
          headers: headers,
        })
        .then((response) => {
          if (response.status == 200) {
            localStorage.setItem("jwt", response.data.accessToken);
            this.$store.commit("setUser", response.data.user);
            this.$store.state.isAuthenticated = true;
            this.error = false;
            this.$router.push("/");
            window.location.reload();
            console.log(response);
          }
        })
        .catch((error) => {
          throw error;
          // window.location.reload();
        });
    },
  },
};
</script>

<style scoped>
.login-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
}

.login-left {
  background-image: url("@/assets/images/burger_gloves.jpg");
  background-size: cover;
  background-position: center;
  filter: grayscale(100%);
  transition: all 0.4s ease;
}

.bw50 {
  filter: grayscale(50%) !important;
}

.bw0 {
  filter: grayscale(0%) !important;
}

.login-right {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-head {
  width: 220px;
  height: auto;
}
</style>
