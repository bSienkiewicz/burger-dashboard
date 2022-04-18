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
    path: "/orders/edit",
    name: "edit",
    component: () => import("../views/EditView.vue"),
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
