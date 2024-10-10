<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import NavbarUI from "../ui/NavbarUI.vue";

export default {
  name: "DefaultLayout",
  components: {
    Navbar: NavbarUI,
  },
};
</script>
