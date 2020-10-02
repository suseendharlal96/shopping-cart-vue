<template>
  <nav class="navbar">
    <button v-if="!authData" @click="router.push('/auth')">Auth</button>
    <button @click="router.push('/')">Home</button>
    <template v-if="authData">
      <button @click="router.push('/cart')">Cart</button>
      <button @click="router.push('/orders')">Orders</button>
      <button @click="logout">Logout</button>
    </template>
  </nav>
</template>

<script>
import { inject, computed } from "vue";
export default {
  setup() {
    const router = inject("$router");
    const store = inject("$store");

    const logout = () => {
      const answer = window.confirm("Do you really want to logout?");
      if (!answer) return false;
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
button {
  cursor: pointer;
  min-width: 5%;
  color: #ffffff;
  background-color: #c529c5;
}
button:hover {
  background-color: #c796c7;
}
.auth-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5%;
}
</style>
