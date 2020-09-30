<template>
  <Navbar />
  <router-view />
</template>

<script>
import { provide } from "vue";

import Navbar from "./components/Navbar.vue";
import { store } from "./store/store";
import { router } from "./route/route";

export default {
  name: "App",
  setup() {
    provide("$store", store);
    provide("$router", router);
  },
  components: {
    Navbar,
  },
};
</script>
