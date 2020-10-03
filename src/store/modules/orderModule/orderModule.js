import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const orderModule = {
  state: () => ({
    orders: null,
    loading: false,
    errors: null,
  }),
  getters,
  mutations,
  actions,
};

export default orderModule;
