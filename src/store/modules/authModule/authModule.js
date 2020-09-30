import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const authModule = {
  state: () => ({
    authData: null,
    loading: false,
    errors: null,
  }),
  getters,
  mutations,
  actions,
};

export default authModule;
