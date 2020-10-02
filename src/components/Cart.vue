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
      <button class="remove">Remove</button>
      <button class="pay">Pay</button>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";

export default {
  props: ["cart"],
  emits: ["changetotal"],
  setup(props, { emit }) {
    let actualCart = ref({});
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

    return {
      mycart: actualCart,
      changeQuantity,
    };
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
</style>
