import axios from "axios";

const actions = {
  getProducts: async ({ commit }, { activePage, currentLimit, token }) => {
    commit("loader", true);
    const res = await axios.get(
      `${import.meta.env.VITE_baseURL}/products?page=${activePage}&limit=${currentLimit}`,
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
  createEditProduct: async ({ commit }, { form, token }) => {
    console.log(form);
    commit("loader", true);
    try {
      let res;
      if (form._id) {
        res = await axios.patch(`${import.meta.env.VITE_baseURL}/products/${form._id}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        // commit("updateProduct", { product: res.data.createdProduct });
      } else {
        res = await axios.post(`${import.meta.env.VITE_baseURL}/products`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        commit("createProduct", { product: res.data.createdProduct });
      }
      console.log(res.data);
      commit("loader", false);
    } catch (error) {
      commit("loader", false);
      console.log(error.response);
    }
  },
  deleteProduct: async ({ commit }, { delId, token }) => {
    console.log(delId);
    commit("loader", true);
    try {
      const res = await axios({
        method: "delete",
        url: `${import.meta.env.VITE_baseURL}/products/${delId}`,
        data: { delId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("loader", false);
      commit("deleteProduct", { delId });
    } catch (e) {
      console.log(e.response);
      commit("loader", false);
    }
  },
};

export default actions;
