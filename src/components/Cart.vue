<template>
  <div class="cart">
    <h3>{{ mycart.name }}</h3>
    <p class="price">{{ mycart.price }}</p>
    <img :src="mycart.image" :alt="mycart.name" />
    <div class="btn-container">
      <div>
        <span>
          <button
            :disabled="mycart.quantity === 1"
            @click="changeQuantity('decrease')"
          >
            -
          </button>
        </span>
        <span>
          <input
            class="item-quantity"
            type="text"
            disabled
            :value="mycart.quantity"
          />
        </span>
        <span>
          <button @click="changeQuantity('increase')">+</button>
        </span>
      </div>
      <button class="remove" @click="removeCart(mycart._id)">Remove</button>
      <button class="pay" @click="makepayment(mycart)">Pay</button>
      <!-- <StripeCheckout
        ref="checkoutRef"
        :name="`Product Name: ${mycart.name}`"
        :image="mycart.image"
        :email="authData.email"
        panelLabel="Proceed to pay"
        description="STRIPE-Safe and Secure Payments"
        pk="
          pk_test_51H54IgEH45zGy2FRW5V9EQMtqCHFnUbuxogqUbG8ENCn5GBUT6qxDeFTvfomsusc2J6aUSpzmB3UJLnLOMh2aq4t00c2Cwlhz3
        "
        :amount="mycart.quantity * mycart.price * 100"
        currency="INR"
      >
        <template>
          <button @click="checkout">Shut up and take my money!</button>
        </template>
      </StripeCheckout> -->
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import StripeCheckout from "vue-stripe-checkout";

export default {
  props: ["cart"],
  emits: ["changetotal"],
  setup(props, { emit }) {
    let actualCart = ref({});
    const store = useStore();

    if (props.cart) {
      actualCart.value = { ...props.cart };
    }

    const changeQuantity = (option) => {
      if (option === "increase") {
        actualCart.value.quantity++;
      } else {
        actualCart.value.quantity--;
      }
      emit("changetotal", actualCart);
      actualCart.value.price = props.cart.price * actualCart.value.quantity;
    };

    const authData = computed(() => store.getters["auth/getAuthData"]);

    const removeCart = (productId) => {
      store.dispatch("cart/removeCartItem", {
        productId,
        token: authData.value.token,
      });
    };

    const makepayment = (cart) => {
      store.dispatch('cart/makepayment',{ cart, token: authData.value.token });
    };

    return {
      mycart: actualCart,
      changeQuantity,
      removeCart,
      makepayment,
      authData,
    };
  },
  components: {
    StripeCheckout,
  },
};
</script>

<style scoped>
.cart {
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
.cart:hover {
  box-shadow: 4px 4px;
}
.price::before {
  content: "₹";
}
.price {
  font-weight: bold;
}
.btn-container {
  margin-top: 15px;
  padding: 1rem;
  display: flex;
  width: 300px;
  justify-content: space-between;
}
.item-quantity {
  text-align: center;
  width: 40px;
  margin: 0 10px;
}
button {
  cursor: pointer;
  border-radius: 4px;
  padding: 0.5rem;
}
.remove {
  background-color: #700f0f;
  color: #ffffff;
}
.remove:hover {
  background: #ff0000;
  color: #ffffff;
}
.pay {
  background-color: #042e04;
  color: #ffffff;
}
.pay:hover {
  background: #00ff00;
  color: #000000;
}
[disabled] {
  cursor: no-drop;
}
img {
  height: 275px;
}
</style>
