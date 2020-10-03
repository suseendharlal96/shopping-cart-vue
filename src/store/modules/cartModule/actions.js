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
  addCart: async (_, { body, token }) => {
    console.log(body);
    try {
      const res = await axios.post(`${baseURL}/user/cart`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
    } catch (e) {
      console.log(e.response);
    }
  },
  removeCartItem: async ({ commit }, { productId, token }) => {
    console.log(productId);
    try {
      const res = await axios.post(
        `${baseURL}/user/removeCartItem`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      commit("removeCartItem", productId);
    } catch (e) {
      console.log(e.response);
    }
  },
  makepayment: async ({ commit }, { cart, token }) => {
    try {
      const res = await axios.post(
        `${baseURL}/user/pay`,
        { product: cart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      commit("removeCartItem", cart._id);
    } catch (e) {
      console.log(e.response);
    }
  },
};

export default actions;
