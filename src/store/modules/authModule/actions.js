import axios from "axios";

import { baseURL } from "../../../baseUrl";

const actions = {
  authenticate: async ({ commit }, { form, url }) => {
    console.log(form);
    console.log(url);
    commit("loading", true);
    commit("errors", null);
    try {
      const res = await axios.post(`${baseURL}/user/${url}`, form);
      commit("authenticate", { authData: res.data.result, url });
    } catch (e) {
      commit("errors", e.response.data);
    }
    commit("loading", false);
  },
};

export default actions;
