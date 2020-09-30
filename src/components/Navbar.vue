<template>
  <div class="navbar">
    <button @click="router.push('/auth')">Auth</button>
    <button @click="router.push('/')">Home</button>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const router = inject("$router");
    return { router };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  height: 5%;
  background-color: brown;
  justify-content: center;
  margin-bottom: 2%;
}
</style>
