import axios from "axios";

const actions = {
  getOrders: async ({ commit }, { token }) => {
    commit("loading", true);
    commit("errors", null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_baseURL}/user/orders`, {
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
