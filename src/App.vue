<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  <router-view />
</template>

<script>
import { provide } from "vue";

import HelloWorld from "./components/HelloWorld.vue";
import { store } from "./store/store";

export default {
  name: "App",
  setup() {
    provide("$store", store);
  },
  components: {
    HelloWorld,
  },
};
</script>
