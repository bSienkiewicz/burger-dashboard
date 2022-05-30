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
    component: () => import("../views/AddMenuView.vue"),
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
  } else if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (
      localStorage.getItem("jwt") != null ||
      localStorage.getItem("jwt") != undefined
    ) {
      next({ name: "Dashboard" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
