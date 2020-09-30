import { createStore } from "vuex";

import authModule from "./modules/authModule";
import productModule from "./modules/productModule";

export const store = createStore({
  modules: {
    auth: { ...authModule, namespaced: true },
    product: { ...productModule, namespaced: true },
  },
});
