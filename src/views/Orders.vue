<template>
  <template v-if="!loading">
    <template v-if="orders && orders.length > 0">
      <h3>Your Orders:</h3>
      <div class="order-container">
        <template v-for="c in orders" :key="c._id">
          <div class="order">
            <h3>{{ c.product.name }}</h3>
            <p>
              Bought on:{{
                new Date(c.date).getDate() +
                "-" +
                +(new Date(c.date).getMonth() + 1) +
                "-" +
                new Date(c.date).getFullYear()
              }}
            </p>
            <p class="price">{{ c.product.price }}</p>
            <img :src="c.product.image" :alt="c.product.name" />
          </div>
        </template>
      </div>
    </template>
    <p v-else>You have not ordered yet.</p>
  </template>
  <template v-else>
    <p>Fetching your orders..⏳</p>
  </template>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const authData = computed(() => store.getters["auth/getAuthData"]);
    const orders = computed(() => store.getters["order/getOrders"]);
    const loading = computed(() => store.getters["order/getLoading"]);

    onMounted(() => {
      if (!authData.value) {
        router.push("/auth");
      } else {
        store.dispatch("order/getOrders", { token: authData.value.token });
      }
    });
    return {
      loading,
      orders,
    };
  },
};
</script>

<style scoped>
.order-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
.order {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #000000;
  border-radius: 4px;
  /* box-shadow: 3px 3px; */
  padding: 0.5rem;
  margin: 0px 15px 15px 0px;
  transition: box-shadow 0.5s;
  width: 350px;
}
.order:hover {
  box-shadow: 4px 4px;
}
.price::before {
  content: "₹";
}
.price {
  font-weight: bold;
}
img {
  height: 275px;
}
</style>
