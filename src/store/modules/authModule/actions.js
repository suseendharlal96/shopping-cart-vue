import axios from "axios";

import { baseURL } from "../../../baseUrl";

const actions = {
  authenticate: async ({ commit }, { form, url }) => {
    console.log(form);
    console.log(url);
    commit('loading',true)
    const res = await axios.post(`${baseURL}/user/${url}`, form);
    console.log(res.data);
    commit('loading',false)
    commit("authenticate", { authData: res.data.result, url });
  },
};

export default actions;
