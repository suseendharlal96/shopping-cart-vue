import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
import CartView from "../views/CartView.vue";

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
  { path: "/delete-product/:productId", component: Home },
  { path: "/edit-product/:productName", component: Home },
  { path: "/cart", component: CartView },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
