<template>
  <nav class="navbar">
    <button v-if="!authData" @click="router.push('/auth')">Auth</button>
    <button @click="router.push('/')">Home</button>
    <button v-if="authData" @click="logout">Logout</button>
  </nav>
</template>

<script>
import { inject, computed } from "vue";
export default {
  setup() {
    const router = inject("$router");
    const store = inject("$store");

    const logout = () => {
      store.commit("auth/logout");
    };
    const authData = computed(() => store.getters["auth/getAuthData"]);
    return { router, authData, logout };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  height: 5%;
  background-color: brown;
  justify-content: space-evenly;
  padding: 10px 0px;
  margin-bottom: 2%;
}
.navbar button {
  cursor: pointer;
  min-width: 5%;
  color: #ffffff;
  background-color: #c529c5;
}
.navbar button:hover {
  background-color: #c796c7;
}
</style>
