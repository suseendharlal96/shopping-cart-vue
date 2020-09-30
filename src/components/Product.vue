<template>
  <div class="product">
    <p>name:{{ product.name }}</p>
    <p>price:{{ product.price }}</p>
    <img :src="product.image" :alt="product.name" />
    <p>description:{{ product.description }}</p>
  </div>
</template>

<script>
export default {
  props: ["product"],
  setup(props) {
    return {
      product: props.product,
    };
  },
};
</script>

<style scoped>
.product {
  flex-direction: column;
  width: 400px;
  width: 350px;
  margin: 10px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* align-self: center; */
  border: 1px solid gray;
  box-shadow: 2px 3px;
}
</style>
