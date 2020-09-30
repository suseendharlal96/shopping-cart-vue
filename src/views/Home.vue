<template>
  <div>Home</div>
  <template v-if="productData">
    <ul v-for="product in productData.products" :key="product._id">
      <li>
        {{ product.name }}
      </li>
    </ul>
  </template>
  <p v-else>Loading...</p>
</template>

<script>
import { onMounted, inject, ref, computed } from "vue";
export default {
  setup() {
    const store = inject("$store");
    const activePage = ref(1);
    const currentLimit = ref(2);
    const productData = computed(() => store.getters["product/getProducts"]);
    const authData = computed(() => store.getters["auth/getAuthData"]);
    onMounted(() => {
      store.dispatch("product/getProducts", {
        activePage: activePage.value,
        currentLimit: currentLimit.value,
        token: authData ? authData.value && authData.value.token : "",
      });
    });
    return {
      activePage,
      currentLimit,
      productData,
    };
  },
};
</script>

<style scoped></style>
