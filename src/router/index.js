import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/stats",
    name: "statystyki",
    component: () => import("../views/StatystykiView.vue"),
  },
  {
    path: "/orders",
    name: "zamowienia",
    component: () => import("../views/ZamowieniaView.vue"),
  },
  {
    path: "/orders/details",
    name: "details",
    component: () => import("../views/DetailsView.vue"),
  },
  {
    path: "/menu",
    name: "menu",
    component: () => import("../views/MenuView.vue"),
  },
  {
    path: "/orderpanel",
    name: "orderpanel",
    component: () => import("../views/OrderView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
