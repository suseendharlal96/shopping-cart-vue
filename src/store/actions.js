import axios from "axios";

import { baseURL } from "../baseUrl";

const actions = {
  // AUTH
  authenticate: async ({ commit }, { form, url }) => {
    console.log(form);
    console.log(url);
    const res = await axios.post(`${baseURL}/user/${url}`, form);
    console.log(res.data);
    commit("authenticate", { authData: res.data.result, url });
  },
  // PRODUCTS
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
