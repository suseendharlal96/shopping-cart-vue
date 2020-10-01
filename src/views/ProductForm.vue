<template>
  <teleport to="body">
    <div class="model-container">
      <span class="close" @click="$emit('cancel')">X</span>
      <div class="auth-form">
        <h2 v-if="!delId">{{ "Create" }} product</h2>
        <form v-if="!delId" @submit="submitForm">
          <div>
            <label for="name" required>Name</label>
            <input
              class="form-control"
              type="text"
              name="name"
              id="name"
              v-model.lazy.trim="form.name"
              placeholder="Product Name"
            />
          </div>
          <!-- <p v-if="errors && errors.email" class="invalid">{{ errors.email }}</p> -->
          <div>
            <label for="price" required>Price</label>
            <input
              class="form-control"
              type="number"
              name="price"
              id="price"
              v-model.lazy.trim="form.price"
              placeholder="Price"
            />
          </div>
          <!-- <p v-if="errors && errors.password" class="invalid">
        {{ errors.password }}
      </p> -->
          <div>
            <label for="image" required>Image url</label>
            <input
              class="form-control"
              type="text"
              name="image"
              id="image"
              v-model.trim="form.image"
              placeholder="Image URL"
            />
          </div>
          <div>
            <label for="description" required>Description</label>
            <textarea
              class="form-control"
              rows="2"
              name="description"
              id="description"
              v-model.trim="form.description"
              placeholder="About product.."
            />
          </div>
          <button class="primary" type="submit">
            {{ loading ? "Creating.." : " Create" }}
          </button>
          <button
            class="secondary"
            :disabled="loading"
            type="button"
            @click="$emit('cancel')"
          >
            Cancel
          </button>
        </form>
        <template v-if="delId">
          <div class="delete-container">
            <h3>Are you sure want to Delete "{{ prodName }}" ?</h3>
            <button class="secondary" @click="deleteProduct">
              {{ loading ? "Deleting.." : "Delete" }}
            </button>
            <button
              class="primary"
              :disabled="loading"
              type="button"
              @click="$emit('cancel')"
            >
              Cancel
            </button>
          </div>
        </template>
      </div>
    </div>
  </teleport>
</template>

<script>
import { reactive, inject, computed, onMounted } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  props: ["delId", "prodName"],
  emits: ["cancel"],
  setup(props, { emit }) {
    // method 1 injected from parent component
    // const router = inject('router');
    // const store = inject('$store');

    // method 2
    const router = useRouter();
    const store = useStore();
    let form = reactive({
      name: "",
      price: null,
      image: "",
      description: "",
    });
    const authData = computed(() => store.getters["auth/getAuthData"]);
    const token = authData.value
      ? authData.value.token && authData.value.token
      : null;
    const loading = computed(() => store.getters["product/getLoading"]);
    const submitForm = (e) => {
      e.preventDefault();
      console.log(form);
      console.log(authData.value);
      store.dispatch("product/createProduct", { form, token });
      form = { name: "", price: null, image: "", description: "" };
      emit("cancel");
    };
    const deleteProduct = () => {
      store.dispatch("product/deleteProduct", { delId: props.delId, token });
      emit("cancel");
    };
    onMounted(() => {
      console.log(authData);
      console.log(router);
      if (!authData.value) {
        router.push("/auth");
      }
    });
    return {
      form,
      submitForm,
      loading,
      deleteProduct,
      delId: props.delId,
    };
  },
};
</script>

<style scoped>
.model-container {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0px;
  text-align: center;
}
.delete-container {
  background-color: #ffffff;
  padding: 2rem;
  margin-top: 5%;
}
.auth-form {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  padding: 6rem 1rem;
}
[required]::after {
  content: "*";
  color: red;
}
.form-control {
  min-width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #555;
  outline: none;
}

div input:not(.invalid):focus,
textarea:not(.invalid):focus {
  background-color: lightblue;
  border: 2px solid lightskyblue;
}
.invalid:focus {
  background-color: salmon;
}
.error {
  background-color: salmon;
}
label {
  display: block;
}
button {
  cursor: pointer;
  margin: 2% 2%;
  min-width: 10%;
  padding: 0.5rem;
  border-radius: 4px;
  box-shadow: 2px 3px solid;
}
.primary {
  background-color: #0000ff;
  color: #ffffff;
}
.primary:hover {
  background: rgba(64, 64, 230, 0.6);
  color: #ffffff;
}
.secondary {
  background-color: #ff0000;
  color: #ffffff;
}
.secondary:hover {
  background: rgba(233, 12, 0, 0.75);
  color: #ffffff;
}
.close {
  position: absolute;
  top: 50px;
  right: 60px;
  color: #ff0000;
  font-size: 1.75rem;
  cursor: pointer;
  width: 35px;
  background-color: #ffffff;
  border-radius: 4px;
}
</style>
