<template>
  <template v-if="!loading">
    <template v-if="cart && cart.length > 0">
      <h3>Total: {{ total }}</h3>
      <div class="cart-container">
        <template v-for="c in cart" :key="c._id">
          <Cart :cart="c" @changetotal="changetotal($event)" />
        </template>
      </div>
    </template>
    <p v-else>No items in cart</p>
  </template>
  <template v-else>
    <p>Fetching Cart Items..⏳</p>
  </template>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Cart from "../components/Cart.vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const authData = computed(() => store.getters["auth/getAuthData"]);
    const cart = computed(() => store.getters["cart/getCart"]);
    const loading = computed(() => store.getters["cart/loading"]);
    const total = computed(() => {
      let t = 0;
      cart.value.forEach((c) => {
        t += c.quantity * c.price;
      });
      return t;
    });

    const changetotal = (data) => {
      const a = cart.value.findIndex((c) => c._id === data.value._id);
      cart.value[a].quantity = data.value.quantity;
    };

    onMounted(() => {
      if (!authData.value) {
        router.push("/");
      } else {
        store.dispatch("cart/getCart", {
          userId: authData.value._id,
          token: authData.value.token,
        });
      }
    });

    return {
      cart,
      loading,
      total,
      changetotal,
    };
  },
  components: {
    Cart,
  },
};
</script>

<style scoped>
.cart-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
</style>
