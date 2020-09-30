<template>
  <div>Home</div>
  <div
    v-if="productData && productData.paginationInfo"
    class="pagination-container"
  >
    <div class="pages">
      <button
        @click="setPage(activePage - 1)"
        v-if="productData.paginationInfo.prevPage"
      >
        Prev
      </button>
      <template
        v-for="(page, index) in Array.from({
          length: productData.paginationInfo.totalPage,
        })"
        :key="index"
      >
        <button
          @click="setPage(index + 1)"
          :disabled="activePage === index + 1 ? true : false"
        >
          {{ index + 1 }}
        </button>
      </template>
      <button
        @click="setPage(activePage + 1)"
        v-if="productData.paginationInfo.nextPage"
      >
        Next
      </button>
    </div>
    <div class="limit">
      <select v-model="currentLimit">
        <option disabled value="">Items per page</option>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  </div>
  <template v-if="!loading">
    <template v-if="productData && productData.paginationInfo">
      <div class="product-container">
        <template v-for="product in productData.products" :key="product._id">
          <Product :product="product" />
        </template>
      </div>
    </template>
    <p v-else>No data</p>
  </template>
  <p v-else>Fetching data...</p>
</template>

<script>
import { onMounted, inject, ref, computed, watch } from "vue";

import Product from "../components/Product.vue";
export default {
  setup() {
    // injected properties
    const store = inject("$store");
    // data
    let activePage = ref(1);
    const currentLimit = ref(2);
    // computed
    const productData = computed(() => store.getters["product/getProducts"]);
    const loading = computed(() => store.getters["product/getLoading"]);
    const authData = computed(() => store.getters["auth/getAuthData"]);
    // methods
    const getProducts = () => {
      store.dispatch("product/getProducts", {
        activePage: activePage.value,
        currentLimit: currentLimit.value,
        token: authData ? authData.value && authData.value.token : "",
      });
    };
    const setPage = (page) => {
      activePage.value = page;
    };
    // watchers
    watch([currentLimit, activePage], () => {
      getProducts();
    });
    // lifecycle hooks
    onMounted(() => {
      getProducts();
    });
    return {
      activePage,
      currentLimit,
      productData,
      setPage,
      loading,
    };
  },
  components: {
    Product,
  },
};
</script>

<style scoped>
.product-container,
.pagination-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  /* align-content: center; */
}
.pagination-container {
  margin: 0 10px;
}
button {
  margin: 0 5px;
  cursor: pointer;
  background-color: #0000ff;
  border-radius: 4px;
  color: #ffffff;
}
button:disabled {
  cursor: no-drop;
  background-color: gray;
  color: #000000;
}
.limit::before {
  content: "Items per page";
  margin-right: 5px;
  /* position: absolute; */
}
</style>
