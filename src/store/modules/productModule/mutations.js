const mutations = {
  getProducts: (state, { productData }) => {
    state.productData = productData;
  },
  loader: (state, loading) => {
    state.loading = loading;
  },
};

export default mutations;
