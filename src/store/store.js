import { createStore } from "vuex";

import authModule from "./modules/authModule/authModule";
import productModule from "./modules/productModule/productModule";
import cartModule from "./modules/cartModule/cartModule";
import orderModule from "./modules/orderModule/orderModule";

export const store = createStore({
  modules: {
    auth: { ...authModule, namespaced: true },
    product: { ...productModule, namespaced: true },
    cart: { ...cartModule, namespaced: true },
    order: { ...orderModule, namespaced: true },
  },
});
