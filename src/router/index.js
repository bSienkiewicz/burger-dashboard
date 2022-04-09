import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/PodsumowanieView.vue"),
  },
  {
    path: "/zamowienia",
    name: "zamowienia",
    component: () => import("../views/ZamowieniaView.vue"),
  },
  {
    path: "/menu",
    name: "menu",
    component: () => import("../views/MenuView.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("../views/OrderView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
