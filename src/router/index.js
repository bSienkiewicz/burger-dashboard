import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/HomeView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/stats",
    name: "Statystyki",
    component: () => import("../views/StatystykiView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/orders",
    name: "Zamówienia",
    component: () => import("../views/ZamowieniaView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/orders/details",
    name: "Szczegóły",
    component: () => import("../views/DetailsView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/menu",
    name: "Menu",
    component: () => import("../views/MenuView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/menu/add",
    name: "Dodaj Menu",
    component: () => import("../views/MenuAddView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/menu/edit",
    name: "Edytuj Menu",
    component: () => import("../views/MenuEditView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "Ustawienia",
    component: () => import("../views/SettingsView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: "/orderpanel",
    name: "Panel pracowniczy",
    component: () => import("../views/OrderView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/AdminView.vue"),
    meta: {
      requiresAuth: true,
      adminOnly: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/PathNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name + " | PBDash";
  console.log();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (
      localStorage.getItem("jwt") == null ||
      localStorage.getItem("jwt") == undefined
    ) {
      store.commit("setUser", null);
      next({ name: "Login" });
    } else {
      next(); // go to wherever I'm going
    }
  }
  if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (
      localStorage.getItem("jwt") != null ||
      localStorage.getItem("jwt") != undefined
    ) {
      next({ name: "Dashboard" });
    } else {
      next();
    }
  }
  // if (to.matched.some((record) => record.meta.adminOnly)) {
  //   if (JSON.parse(localStorage.getItem("user")).rola == "Admin") {
  //     next();
  //   } else {
  //     console.log("nie jest adminem");
  //     next({ name: "Dashboard" });
  //   }
  // }
});

export default router;
