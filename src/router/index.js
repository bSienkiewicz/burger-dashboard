import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/stats",
    name: "Statystyki",
    component: () => import("../views/StatystykiView.vue"),
  },
  {
    path: "/orders",
    name: "Zamówienia",
    component: () => import("../views/ZamowieniaView.vue"),
  },
  {
    path: "/orders/details",
    name: "Szczegóły",
    component: () => import("../views/DetailsView.vue"),
  },
  {
    path: "/menu",
    name: "Menu",
    component: () => import("../views/MenuView.vue"),
  },
  {
    path: "/menu/add",
    name: "Dodaj Menu",
    component: () => import("../views/AddMenuView.vue"),
  },
  {
    path: "/orderpanel",
    name: "Panel pracowniczy",
    component: () => import("../views/OrderView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name + " | PBDash";
  next();
});

export default router;
