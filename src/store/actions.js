import axios from "axios";

import { baseURL } from "../baseUrl";

const actions = {
  authenticate: async ({ commit }, { form, url }) => {
    console.log(form);
    console.log(url);
    const res = await axios.post(`${baseURL}/user/${url}`, form);
    console.log(res.data);
    commit("authenticate", { form, url });
  },
};

export default actions;
