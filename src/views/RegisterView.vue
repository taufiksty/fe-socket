<template>
  <main class="h-[90vh] flex flex-col space-y-8 justify-center px-64">
    <h2 class="text-2xl">Simple Chat App</h2>
    <h4 class="text-lg">Register</h4>
    <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4">
      <div class="flex flex-col space-y-2">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Type your email"
          v-model="form.email"
          class="p-2 border rounded w-1/3"
        />
      </div>
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
        Register
      </button>
    </form>
    <p class="text-sm">
      Have an account? You can login
      <a href="/" class="hover:underline text-sky-600">here</a>
    </p>
  </main>
</template>

<script>
import axiosClient from "@/services/axiosClient";

export default {
  name: "RegisterView",
  data() {
    return {
      form: {
        email: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axiosClient.post(
          "/api/v1/user/register",
          this.form
        );
        if (response.status == 201) {
          this.$router.push("/");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
