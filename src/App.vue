<template>
  <div>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { mapActions } from "vuex";
import axios from "axios";

if (localStorage.session) {
  delete axios.defaults.headers.common["session_id"];
  axios.defaults.headers.common["session_id"] = localStorage.session;
} else {
  delete axios.defaults.headers.common["session_id"];
}

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  computed: {
    ...mapActions(["createSession"]),
  },
  created() {
    if (!localStorage.session) {
      this.$store.dispatch("createSession");
    }
  },
};
</script>

<style lang="scss"></style>
