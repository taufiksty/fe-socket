<template>
  <main class="px-64">
    <div class="mt-6">
      <div class="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 class="text-xl font-semibold mb-2">Room: {{ roomName }}</h2>
        <div class="h-64 overflow-y-auto mb-4">
          <div v-if="!messages?.length">No messages.</div>
          <div v-else>
            <div v-for="(message, index) in messages" :key="index" class="mb-2">
              <strong>{{ message.sender_username }}:</strong>
              {{ message.content }}
            </div>
          </div>
        </div>
        <div class="flex">
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            class="border p-2 flex-grow mr-2"
            placeholder="Type a message..."
          />
          <button
            @click="sendMessage"
            class="bg-blue-500 text-white p-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axiosClient from "@/services/axiosClient";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "ChatRoomView",
  data() {
    return {
      roomId: this.$route.params.room_id,
      roomName: "",
      messages: [],
      newMessage: "",
      user: {},
      ws: null,
    };
  },
  async created() {
    // Fetch chat history
    const response = await axiosClient.get(
      `/api/v1/rooms/messages/${this.roomId}`
    );
    this.messages = response.data || [];
    this.user = JSON.parse(localStorage.getItem("authUser"));

    await this.getRoomById();

    if (this.ws) {
      this.closeConnection();
    }
    // Setup WebSocket connection
    this.ws = new WebSocket(
      `ws://localhost:3000/ws/${this.roomId}?token=${localStorage.getItem(
        "authToken"
      )}`
    );

    // Listen for incoming messages
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messages.push(message);
    };

    // On close ws
    this.ws.onclose = () => {
      console.log(`Disconnected from room ${this.roomId}`);
    };
  },
  methods: {
    async getRoomById() {
      try {
        const response = await axiosClient.get(`/api/v1/rooms/${this.roomId}`);
        if (response.status == 200) {
          this.roomName = response.data.name;
        }
      } catch (error) {
        console.error(error);
      }
    },
    sendMessage() {
      if (this.newMessage && this.ws) {
        const message = {
          id: uuidv4(),
          room_id: this.roomId,
          user_id: this.user.id,
          sender_username: this.user.username,
          content: this.newMessage,
          timestamp: new Date().toISOString(),
        };
        // Send message via WebSocket
        this.ws.send(JSON.stringify(message));
        this.newMessage = "";
      }
    },
    closeConnection() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    },
  },
  beforeDestroy() {
    this.closeConnection(); // Ensure WebSocket connection is closed on destroy
  },
};
</script>
