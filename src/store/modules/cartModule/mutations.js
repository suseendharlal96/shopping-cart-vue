const mutations = {
  loading: (state, loading) => {
    state.loading = loading;
  },
  setCart: (state, cart) => {
    state.cart = cart;
  },
  removeCartItem: (state, cartId) => {
    let tempCart = [...state.cart];
    state.cart = tempCart.filter((t) => t._id !== cartId);
  },
};

export default mutations;
