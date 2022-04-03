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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
