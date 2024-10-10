<template>
  <main class="px-64 my-4">
    <div v-if="!rooms.length">No rooms.</div>
    <div v-else class="flex flex-col w-full">
      <a
        v-for="(room, index) in rooms"
        :key="index"
        :href="`/chat/${room.id}`"
        class="p-5 mb-2 bg-slate-100 w-full text-slate-700 rounded hover:bg-slate-200"
      >
        {{ room.name }}
      </a>
    </div>
  </main>
</template>

<script>
import axiosClient from "@/services/axiosClient";

export default {
  name: "ChatView",
  data() {
    return {
      rooms: [],
    };
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await axiosClient.get(`/api/v1/rooms`);
        if (response.status == 200) {
          this.rooms = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    await this.fetchRooms();
  },
};
</script>
