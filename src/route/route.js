import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
// import ProductForm from "../views/ProductForm.vue";

const routes = [
  {
    path: "/auth",
    component: Auth,
  },
  {
    path: "/",
    component: Home,
  },
  { path: "/create-product", component: Home },
  { path: "/delete-product/:delId", component: Home },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
