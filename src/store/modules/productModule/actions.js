import axios from "axios";

import { baseURL } from "../../../baseUrl";

const actions = {
  getProducts: async ({ commit }, { activePage, currentLimit, token }) => {
    commit("loader", true);
    const res = await axios.get(
      `${baseURL}/products?page=${activePage}&limit=${currentLimit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    commit("loader", false);
    commit("getProducts", { productData: res.data });
  },
};

export default actions;
