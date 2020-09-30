const mutations = {
  // AUTH
  authenticate: (state, { authData }) => {
    console.log(authData);
    state.authData = authData;
  },
  // PRODUCTS
  getProducts: (state, { productData }) => {
    state.productData = productData;
  },
};

export default mutations;
