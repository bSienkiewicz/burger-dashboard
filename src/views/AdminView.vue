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
      <h1 class="m-0 titleUni text-red">Admin</h1>
      <div class="row mt-5 g-0">
        <div class="col-6 p-4 me-3" style="background: var(--dark-black)">
          <h4>
            Pracownicy
            <span style="float: right"
              ><button
                class="button-pb"
                style="font-size: 0.8rem"
                @click="startAddingUser()"
              >
                Dodaj pracownika
              </button></span
            >
          </h4>
          <div
            class="row mt-3 g-0 px-3"
            style="
              color: #b0b0b0;
              font-weight: bold;
              border-bottom: 1px solid #b0b0b0;
              font-size: 0.9rem;
            "
          >
            <div class="col-1">#ID</div>
            <div class="col-2">Imię</div>
            <div class="col-2">Nazwisko</div>
            <div class="col-4">E-mail</div>
            <div class="col-2">Rola</div>
            <div class="col-1 text-center">Opcje</div>
          </div>
          <div class="" v-for="user in this.users" :key="user.user_id">
            <div
              class="row g-0 p-3 my-3 user-row"
              style="background: var(--light-black); font-size: 0.9rem"
              :style="
                user.is_active == 0
                  ? 'color:grey; border-left: 1px dashed red;'
                  : user.is_active == 2
                  ? 'color:grey; border-left: 1px dashed yellow;'
                  : ''
              "
            >
              <div class="col-1 d-flex align-items-center">
                {{ user.user_id }}
              </div>
              <div class="col-2 d-flex align-items-center">{{ user.imie }}</div>
              <div
                class="col-2 d-flex align-items-center"
                style="text-overflow: ellipsis; overflow: hidden"
              >
                {{ user.nazwisko }}
              </div>
              <div
                class="col-4 d-flex align-items-center"
                style="text-overflow: ellipsis; overflow: hidden"
              >
                {{ user.email }}
              </div>
              <div class="col-2 d-flex align-items-center">
                {{ user.nazwa }}
              </div>
              <div
                class="col-1 text-center d-flex align-items-center justify-content-center"
              >
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle button-pb shadow-none"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click="startEditingUser(user)"
                        >Edytuj dane</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        v-if="user.is_active != 2"
                        @click="resetUserPassword(user.user_id, 2)"
                        >Resetuj hasło</a
                      >
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        style="color: red"
                        v-if="user.is_active == 1"
                        @click="setUserActive(user.user_id, 0)"
                        >Deaktywuj konto</a
                      >
                      <a
                        class="dropdown-item"
                        href="#"
                        v-else
                        @click="setUserActive(user.user_id, 1)"
                        >Aktywuj konto</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-3 p-4"
          style="background: var(--dark-black)"
          v-if="this.settings === 'editUser'"
        >
          <h4>
            Edytuj pracownika
            <span
              style="float: right; color: var(--basic-red); cursor: pointer"
              @click="endEditingUser()"
              ><i class="fa-solid fa-xmark"></i
            ></span>
          </h4>
          <form action="">
            <label for="imie" class="pt-2">Imię</label>
            <input
              type="text"
              class="form-control input-pb shadow-none"
              id="imie"
              placeholder="Imię"
              v-model="editUser.imie"
            />
            <label for="nazwisko" class="pt-2">Nazwisko</label>
            <input
              type="text"
              class="form-control input-pb shadow-none"
              id="nazwisko"
              placeholder="Nazwisko"
              v-model="editUser.nazwisko"
            />
            <label for="email" class="pt-2">E-mail</label>
            <input
              type="email"
              class="form-control input-pb shadow-none"
              id="email"
              placeholder="E-mail"
              v-model="editUser.email"
            />

            <label for="rola" class="pt-2">Rola</label>
            <select
              class="form-select input-pb shadow-none"
              id="rola"
              v-model="editUser.rola"
              @change="checkIfAdmin()"
            >
              <option
                v-for="rola in this.$store.state.podsumowanie.role"
                :key="rola.id"
                :value="rola.id"
                :selected="rola.id == editUser.rola"
                :style="rola.nazwa === 'Admin' ? 'color: red' : ''"
              >
                {{ rola.nazwa }}
              </option>
            </select>
            <button
              class="button-pb mt-2"
              type="button"
              @click="submitUserEdit()"
            >
              EDYTUJ
            </button>
          </form>
        </div>
        <div
          class="col-3 p-4"
          style="background: var(--dark-black)"
          v-if="this.settings === 'addUser'"
        >
          <h4>
            Dodaj pracownika
            <span
              style="float: right; color: var(--basic-red); cursor: pointer"
              @click="endAddingUser()"
              ><i class="fa-solid fa-xmark"></i
            ></span>
          </h4>
          <form action="">
            <label for="imie" class="pt-2">Imię</label>
            <input
              type="text"
              class="form-control input-pb shadow-none"
              id="imie"
              placeholder="Imię"
              v-model="addUser.imie"
            />
            <label for="nazwisko" class="pt-2">Nazwisko</label>
            <input
              type="text"
              class="form-control input-pb shadow-none"
              id="nazwisko"
              placeholder="Nazwisko"
              v-model="addUser.nazwisko"
            />
            <label for="email" class="pt-2">E-mail</label>
            <input
              type="email"
              class="form-control input-pb shadow-none"
              id="email"
              placeholder="E-mail"
              v-model="addUser.email"
            />

            <label for="rola" class="pt-2">Rola</label>
            <select
              class="form-select input-pb shadow-none"
              id="rola"
              v-model="addUser.rola"
              @change="checkIfAdmin()"
            >
              <option
                v-for="rola in this.$store.state.podsumowanie.role"
                :key="rola.id"
                :value="rola.id"
                :style="rola.nazwa === 'Admin' ? 'color: red' : ''"
              >
                {{ rola.nazwa }}
              </option>
            </select>
            <button
              class="button-pb mt-2"
              type="button"
              @click="submitUserAdd()"
            >
              DODAJ
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Mixins from "@/Mixins";

export default {
  mixins: [Mixins],
  data() {
    return {
      users: {},
      settings: "",
      editUser: {
        user_id: -1,
        imie: "",
        nazwisko: "",
        email: "",
        rola: "",
        is_active: 1,
      },
      addUser: {
        imie: "",
        nazwisko: "",
        username: "",
        haslo: "",
        email: "",
        rola: "",
        is_active: 2,
        created_by: this.$store.state.user.user_id,
        created_date: "",
      },
    };
  },
  methods: {
    getLocalStorage() {
      // sprawdź czy localStorage puste
      if (localStorage.getItem("filteredData") === null) {
        return false;
      } else return true;
    },
    getUsers() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      };
      axios
        .get(`${process.env.VUE_APP_API_URL}/users`, { headers: headers })
        .then((response) => {
          this.users = response.data.data;
          console.log(this.users);
        })
        .catch((error) => {
          console.log(error);
          Mixins.methods.showSpinner(false);
        });
    },
    startEditingUser(user) {
      this.settings = "editUser";
      this.editUser.user_id = user.user_id;
      this.editUser.imie = user.imie;
      this.editUser.nazwisko = user.nazwisko;
      this.editUser.email = user.email;
      this.editUser.rola = user.rola;
      this.editUser.is_active = user.is_active;
    },
    endEditingUser() {
      this.settings = "";
      this.editUser.user_id = -1;
      this.editUser.imie = "";
      this.editUser.nazwisko = "";
      this.editUser.email = "";
      this.editUser.rola = "";
      this.editUser.is_active = 1;
    },
    submitUserEdit() {
      Mixins.methods.showSpinner(true);
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      };
      axios
        .put(
          `${process.env.VUE_APP_API_URL}/users/${this.editUser.user_id}`,
          this.editUser,
          { headers: headers }
        )
        .then(() => {
          this.getUsers();
          this.endEditingUser();
          Mixins.methods.showSpinner(false);
        })
        .catch((error) => {
          console.log(error);
          Mixins.methods.showSpinner(false);
        });
    },
    startAddingUser() {
      this.settings = "addUser";
    },
    endAddingUser() {
      this.settings = "";
      this.addUser.user_id = -1;
      this.addUser.imie = "";
      this.addUser.nazwisko = "";
      this.addUser.email = "";
      this.addUser.rola = "";
      this.addUser.is_active = 1;
      this.addUser.created_by = "";
    },
    submitUserAdd() {
      Mixins.methods.showSpinner(true);
      this.addUser.created_date = Date.now();
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      };
      axios
        .post(`${process.env.VUE_APP_API_URL}/users`, this.addUser, {
          headers: headers,
        })
        .then(() => {
          this.getUsers();
          this.endAddingUser();
          Mixins.methods.showSpinner(false);
        })
        .catch((error) => {
          console.log(error);
          Mixins.methods.showSpinner(false);
        });
    },
    setUserActive(id, is_active) {
      Mixins.methods.showSpinner(true);
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      };
      axios
        .put(
          `${process.env.VUE_APP_API_URL}/users/activate/${id}`,
          { is_active: is_active },
          { headers: headers }
        )
        .then((res) => {
          this.getUsers();
          console.log(res);
          Mixins.methods.showSpinner(false);
        })
        .catch((error) => {
          console.log(error);
          Mixins.methods.showSpinner(false);
        });
    },
    resetUserPassword(id, is_active) {
      Mixins.methods.showSpinner(true);
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      };
      axios
        .put(
          `${process.env.VUE_APP_API_URL}/users/activate/${id}`,
          { is_active: is_active },
          { headers: headers }
        )
        .then((res) => {
          this.getUsers();
          console.log(res);
          Mixins.methods.showSpinner(false);
        })
        .catch((error) => {
          console.log(error);
          Mixins.methods.showSpinner(false);
        });
    },
    checkIfAdmin() {
      console.log(this.addUser);
      if (this.addUser.rola === "Admin") {
        if (
          confirm(
            "Czy na pewno? To ustawienie przyzna uprawnienia administratora dla tego użytkownika"
          )
        ) {
          this.addUser.rola = "Admin";
        } else {
          this.addUser.rola = "";
        }
      }
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style scoped>
.username {
  color: var(--dark-black);
  background: var(--dark-black);
}

.username:hover {
  color: white;
  background: none;
}

.user-row:hover {
  opacity: 1 !important;
  transition: all 0.3s ease;
}
</style>
