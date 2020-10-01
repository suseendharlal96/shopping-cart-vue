import { router } from "../../../route/route";

const mutations = {
  getProducts: (state, { productData }) => {
    state.productData = productData;
  },
  loader: (state, loading) => {
    state.loading = loading;
  },
  createProduct: (state, { product }) => {
    console.log(product);
    state.productData.products.push(product);
    router.push("/");
  },
  deleteProduct: (state, { delId }) => {
    console.log(delId);
    let products = [...state.productData.products];
    products = products.filter((p) => p._id !== delId);
    state.productData.products = products;
    router.push("/");
  },
};

export default mutations;
