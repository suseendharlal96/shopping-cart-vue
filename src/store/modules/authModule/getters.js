const getters = {
  // getAuthData: (state) => (args) => state.authData, getting args in Getters
  getAuthData: (state) => state.authData,
  getLoading: (state) => state.loading,
  getErrors: (state) => state.errors,
};
export default getters;
