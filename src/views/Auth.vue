<template>
  <div class="auth-form">
    <form @submit="submitForm">
      <div>
        <label for="email" required>Email</label>
        <input
          :class="[
            (errors && errors.email) || (errors && errors.error) ? 'error' : '',
            'form-control',
          ]"
          type="text"
          name="email"
          id="email"
          v-model.lazy.trim="form.email"
        />
      </div>
      <p v-if="errors && errors.email" class="invalid">{{ errors.email }}</p>
      <div>
        <label for="password" required>Password</label>
        <input
          :class="[errors && errors.password ? 'error' : '', 'form-control']"
          type="password"
          name="password"
          id="password"
          v-model.lazy.trim="form.password"
        />
      </div>
      <p v-if="errors && errors.password" class="invalid">
        {{ errors.password }}
      </p>
      <template v-if="isSignup">
        <div>
          <label for="confirmpassword" required>Confirm Password</label>
          <input
            :class="[isInValid ? 'invalid' : '', 'form-control']"
            type="password"
            name="confirmpassword"
            :disabled="form.password === ''"
            id="confirmpassword"
            v-model.trim="form.confirmpassword"
          />
        </div>
        <p v-if="isInValid" class="invalid">Passwords do not match</p>
      </template>
      <p v-if="errors && errors.error" class="invalid">
        {{ isSignup ? errors.error : "Invalid credentials" }}
      </p>
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
      confirmpassword: "",
    });
    const isSignup = ref(false);
    // const errors = ref(null);

    const changeMode = () => {
      isSignup.value = !isSignup.value;
      form.confirmpassword = "";
      if (form.password !== "") {
        form.password = "";
      }
      // if (errors.value) {
      //   errors.value = null;
      // }
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
    const isInValid = computed(() => {
      if (isSignup) {
        if (
          form.password !== "" &&
          form.confirmpassword !== "" &&
          form.password !== form.confirmpassword
        ) {
          return true;
        } else {
          return false;
        }
      }
    });
    const authData = computed(() => store.getters["auth/getAuthData"]);
    const loading = computed(() => store.getters["auth/getLoading"]);
    const errors = computed(() => store.getters["auth/getErrors"]);
    // console.log(authErrors.value);
    // errors.value = authErrors.value;
    // console.log(errors);

    return {
      form,
      isSignup,
      changeMode,
      submitForm,
      authData,
      loading,
      isInValid,
      errors,
    };
  },
};
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  flex-wrap: wrap;
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

div input:not(.invalid):focus {
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
  margin: 2% 2%;
  min-width: 10%;
  padding: 0.5rem;
  border-radius: 4px;
}
button:hover {
  background-color: blueviolet;
}
.invalid {
  color: red;
}
.primary {
  background-color: #00ff00;
  color: #ffffff;
}
.secondary {
  background-color: #ff0000;
  color: #ffffff;
}
</style>
