<template>
  <div class="navbar">
    <button v-if="!authData" @click="router.push('/auth')">Auth</button>
    <button @click="router.push('/')">Home</button>
    <button v-if="authData" @click="logout">Logout</button>
  </div>
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
  /* align-items: center; */
  margin-bottom: 2%;
}
.navbar button {
  cursor: pointer;
  min-width: 5%;
}
</style>
