import { router } from "../../../route/route";

const mutations = {
  authenticate: (state, { authData }) => {
    console.log(authData);
    state.authData = authData;
    router.push("/");
  },
  loading: (state, loading) => {
    state.loading = loading;
  },
};

export default mutations;
