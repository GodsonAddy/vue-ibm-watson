<template>
  <div>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    if (localStorage.session) {
      delete axios.defaults.headers.common["session_id"];
      axios.defaults.headers.common["session_id"] = localStorage.session;
    } else {
      delete axios.defaults.headers.common["session_id"];
    }
    this.$watch(() => {
      if (!localStorage.session) {
        // Create
        this.$store.commit(this.createSession(this.message));
      }
    });
  },
};
</script>

<style lang="scss"></style>
