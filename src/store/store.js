import { createStore } from "vuex";

import authModule from "./modules/authModule";

export const store = createStore({
  modules: {
    auth: { ...authModule, namespaced: true },
  },
});
