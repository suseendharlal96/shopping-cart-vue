import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const authModule = {
  state: () => ({
    authData: null,
    loading: false,
  }),
  getters,
  mutations,
  actions,
};

export default authModule;
