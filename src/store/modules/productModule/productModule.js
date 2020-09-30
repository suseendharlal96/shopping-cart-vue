import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const productModule = {
  state: () => ({
    productData: null,
    loading: false,
  }),
  getters,
  mutations,
  actions,
};

export default productModule;
