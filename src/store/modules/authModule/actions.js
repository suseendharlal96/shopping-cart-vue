import axios from "axios";

const actions = {
  authenticate: async ({ commit }, { form, url }) => {
    console.log(form);
    console.log(url);
    commit("loading", true);
    commit("errors", null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_baseURL}/user/${url}`, form);
      commit("authenticate", {
        authData: { ...res.data.result, token: res.data.token },
      });
    } catch (e) {
      commit("errors", e.response.data);
    }
    commit("loading", false);
  },
};

export default actions;
