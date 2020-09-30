<template>
  <div class="product-container">
    <h3>{{ product.name }}</h3>
    <p class="price">{{ product.price }}</p>
    <img :src="product.image" :alt="product.name" />
    <p>{{ product.description }}</p>
    <div class="btn-container">
      <template v-if="authData">
        <template v-if="userId && userId === product.creators">
          <button class="delete">Delete</button>
          <button class="edit">Edit</button>
        </template>
        <button class="cart">Add to cart</button>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, inject, ref, watch } from "vue";
export default {
  props: ["product"],
  setup(props) {
    const store = inject("$store");

    let userId = ref(null);

    const authData = computed(() => store.getters["auth/getAuthData"]);
    console.log(authData.value);
    userId = authData ? authData.value && authData.value._id : null;

    return {
      product: props.product,
      userId,
      authData,
    };
  },
};
</script>

<style scoped>
.product-container {
  flex-direction: column;
  width: 350px;
  height: 400px;
  margin: 10px 10px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 4px;
  border: 1px solid gray;
  box-shadow: 2px 3px;
}
.price::before {
  content: "₹";
}
h3,
p {
  margin-bottom: 5px;
}
img {
  margin-bottom: 5px;
  height: 176px;
}
.btn-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 125px;
}
.btn-container button {
  border-radius: 5px;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
}

button.delete {
  background-color: #ff0000;
  color: #ffffff;
}
button.edit {
  background-color: #00ffff;
  color: #000000;
}
button.cart {
  background-color: #00ff00;
  color: #000000;
}
</style>
