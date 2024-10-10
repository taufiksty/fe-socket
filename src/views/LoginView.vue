<template>
  <main class="h-[90vh] flex flex-col space-y-8 justify-center px-64">
    <h2 class="text-2xl">Simple Chat App</h2>
    <h4 class="text-lg">Login</h4>
    <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4">
      <div class="flex flex-col space-y-2">
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Type your username"
          v-model="form.username"
          class="p-2 border rounded w-1/3"
        />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="password" class="flex flex-col space-y-2">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Type your password"
          v-model="form.password"
          class="p-2 border rounded w-1/3"
        />
      </div>
      <button
        type="submit"
        class="bg-sky-600 text-white font-semibold p-2 w-1/3 rounded hover:opacity-80"
      >
        Login
      </button>
    </form>
    <p class="text-sm">
      Doesn't have an account? You can register
      <a href="/register" class="hover:underline text-sky-600">here</a>
    </p>
  </main>
</template>

<script>
import axiosClient from "@/services/axiosClient";

export default {
  name: "LoginView",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axiosClient.post(
          "/api/v1/user/login",
          this.form
        );
        if (response.status == 200) {
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("authUser", JSON.stringify(response.data.user));
          this.$router.push("/chat").then(() => {
            window.location.reload();
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
