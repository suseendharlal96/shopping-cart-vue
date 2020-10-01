<template>
  <div v-if="authData">
    <button data-tooltip="create product" @click="createProduct">+</button>
  </div>
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
      <div class="products-container">
        <template v-for="product in productData.products" :key="product._id">
          <Product :product="product" @delproduct="delproduct($event)" />
        </template>
      </div>
    </template>
    <p v-else>No data</p>
  </template>
  <p v-else>Fetching data...</p>
  <template v-if="isModalOpen">
    <product-form @cancel="cancel" :delId="delId" :prodName="prodName" />
  </template>
</template>

<script>
import { onMounted, inject, ref, computed, watch } from "vue";

import Product from "../components/Product.vue";
import ProductForm from "./ProductForm.vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    // injected properties
    const store = inject("$store");
    const router = useRouter();
    // data
    let activePage = ref(1);
    const currentLimit = ref(2);
    const isModalOpen = ref(false);
    const delId = ref(null);
    const prodName = ref(null);
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
    const createProduct = () => {
      router.push("/create-product");
      isModalOpen.value = true;
    };
    const delproduct = ({ id, name }) => {
      console.log(id);
      delId.value = id;
      prodName.value = name;
      router.push(`/delete-product/${id}`);
      isModalOpen.value = true;
    };
    const cancel = () => {
      isModalOpen.value = false;
      if (delId.value) {
        delId.value = null;
      }
      router.back();
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
      authData,
      loading,
      router,
      isModalOpen,
      createProduct,
      delId,
      prodName,
      delproduct,
      cancel,
    };
  },
  components: {
    Product,
    ProductForm,
  },
};
</script>

<style scoped>
.products-container,
.pagination-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  /* align-content: center; */
}
.pagination-container {
  margin: 0 10px;
}
.pagination-container > .pages {
  margin-bottom: 10px;
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

[data-tooltip] {
  position: relative;
  background-color: rgb(68, 0, 255);
}

[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  border: 1px solid black;
  top: -1rem;
  left: 36px;
  background-color: rgb(68, 0, 255);
  padding: 0.5rem;
  color: #ffffff;
}
</style>
