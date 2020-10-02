import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const cartModule = {
  state: () => ({
    cart: null,
    loading: false,
  }),
  getters,
  mutations,
  actions,
};

export default cartModule;
