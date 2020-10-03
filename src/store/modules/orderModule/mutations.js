import { router } from "../../../route/route";

const mutations = {
  setOrders: (state, orders) => {
    state.orders = orders;
  },
  loading: (state, loading) => {
    state.loading = loading;
  },
  errors: (state, errors) => {
    state.errors = errors;
  },
};

export default mutations;
