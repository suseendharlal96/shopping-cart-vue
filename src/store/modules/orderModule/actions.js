import axios from "axios";

import { baseURL } from "../../../baseUrl";

const actions = {
  getOrders: async ({ commit }, { token }) => {
    commit("loading", true);
    commit("errors", null);
    try {
      const res = await axios.get(`${baseURL}/user/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("setOrders", res.data.orders);
    } catch (e) {
      commit("errors", e.response);
    }
    commit("loading", false);
  },
};

export default actions;
