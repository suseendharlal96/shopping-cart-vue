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
  errors:(state,errors)=>{
    state.errors = errors
  },
  logout: (state) => {
    state.authData = null;
  },
};

export default mutations;
