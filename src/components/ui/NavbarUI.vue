<template>
  <nav class="min-h-8 py-4 shadow-lg px-64">
    <div v-if="isAuth" class="flex justify-between">
      <form @submit.prevent="handleSubmitJoin" class="flex space-x-2">
        <input
          type="text"
          name="room"
          id="roomInput"
          class="p-2 border rounded w-80"
          placeholder="Type room name to join/create"
          v-model="room"
        />
        <button
          type="submit"
          class="bg-sky-600 text-white py-2 px-4 rounded hover:opacity-80"
        >
          Join
        </button>
      </form>
      <button
        type="button"
        @click.prevent="handleLogout"
        class="bg-rose-600 text-white py-2 px-4 rounded hover:opacity-80"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
import { isAuthenticated } from "@/router";
import axiosClient from "@/services/axiosClient";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "NavbarUI",
  data() {
    return {
      isAuth: isAuthenticated(),
      room: "",
    };
  },
  methods: {
    async handleSubmitJoin() {
      try {
        const roomId = uuidv4();
        const response = await axiosClient.post("/api/v1/rooms", {
          id: roomId,
          name: this.room,
        });
        if (response.status == 201) {
          this.$router.push(`/chat/${roomId}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
    handleLogout() {
      localStorage.clear();
      this.$router.replace("/").then(() => {
        window.location.reload();
      });
    },
  },
};
</script>
