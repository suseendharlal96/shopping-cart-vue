import axios from "axios";

import { baseURL } from "../../../baseUrl";

const actions = {
  getCart: async ({ commit }, { userId, token }) => {
    commit("loading", true);
    console.log(userId);
    try {
      const res = await axios.get(`${baseURL}/user/getCart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("setCart", res.data.cart);
      commit("loading", false);
    } catch (e) {
      console.log(e.response);
      commit("loading", false);
    }
  },
};

export default actions;
