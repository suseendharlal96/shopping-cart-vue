<template>
  <div class="auth-form">
    <form @submit="submitForm">
      <div class="flex-item-1">
        <label for="email" required>Email</label>
        <input
          class="form-control"
          type="text"
          name="email"
          id="email"
          v-model="form.email"
        />
      </div>
      <div class="flex-item-2">
        <label for="password" required>Password</label>
        <input
          class="form-control"
          type="password"
          name="password"
          id="password"
          v-model="form.password"
        />
      </div>
      <button
        :disabled="loading"
        class="secondary"
        type="button"
        @click="changeMode"
      >
        Switch to {{ isSignup ? "Signin" : "Signup" }}
      </button>
      <button class="primary" type="submit">
        {{
          isSignup
            ? loading
              ? "Signingup.."
              : "Signup"
            : loading
            ? "Signingin.."
            : "Signin"
        }}
      </button>
    </form>
  </div>
</template>

<script>
import { inject, reactive, ref, computed } from "vue";
import axios from "axios";

export default {
  setup() {
    const store = inject("$store");
    const router = inject("$router");
    const form = reactive({
      email: "",
      password: "",
    });
    const isSignup = ref(false);

    const changeMode = () => {
      isSignup.value = !isSignup.value;
    };

    const submitForm = (e) => {
      e.preventDefault();
      let url = "signin";
      if (isSignup.value) {
        url = "signup";
      }
      store.dispatch("auth/authenticate", { form, url });

      console.log(form);
    };

    const authData = computed(() => store.getters["auth/getAuthData"]);
    const loading = computed(() => store.getters["auth/getLoading"]);
    console.log(authData.value);

    return {
      form,
      isSignup,
      changeMode,
      submitForm,
      authData,
      loading,
    };
  },
};
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
}
[required]::after {
  content: "*";
  color: red;
}
.form-control {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #555;
  outline: none;
}
.form-control:focus {
  background-color: lightblue;
  border: 2px solid lightskyblue;
}
label {
  display: block;
}
button {
  margin: 2% 2%;
  width: 10%;
  padding: 0.5rem;
  border-radius: 4px;
}
.primary {
  background-color: #00ff00;
  color: #ffffff;
}
.primary:hover {
  background-color: blueviolet;
}
.secondary {
  background-color: #ff0000;
  color: #ffffff;
}
.secondary:hover {
  background-color: blueviolet;
}
</style>
