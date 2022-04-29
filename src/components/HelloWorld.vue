<template>
  <div class="hello">
    <b-container fluid>
      <b-form @submit.prevent="postChat">
        <div class="demo">
          <ul>
            <li :key="messages.id" v-for="messages in chats" class="msg.type">
              {{ messages }}
            </li>
          </ul>
          <div ref="scrollDown" v-on:scroll.passive="scrollBottom" />
        </div>
        <div class="input-text">
          <b-form-input
            v-model="message"
            placeholder="text"
            @keyup.enter="postChat"
          ></b-form-input>
          <b-button
            type="submit"
            variant="success"
            class="paper-plane"
            :disabled="validated"
          >
            <font-awesome-icon icon="paper-plane" />
            Send
          </b-button>
        </div>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapState(["chats"]),
    ...mapGetters(["watsonChat"]),
    validated() {
      return !this.message;
    },
  },
  methods: {
    ...mapActions(["userMessage", "sendMessage"]),
    async postChat() {
      try {
        await this.userMessage(this.message);
        await this.sendMessage(this.message);
        this.message = "";
      } catch (error) {
        console.error(error);
      }
    },
    scrollBottom() {
      this.$refs.scrollDown.current.scrollIntoView({
        behavior: "smooth",
      });
    },
  },
  setup() {
    this.$watch(() => {
      this.scrollBottom([this.chats]);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  font-family: Poppins, sans-serif;
  justify-content: center;
  align-items: center;
  padding: 0 300px;
}
.input-text {
  display: flex;
  flex-direction: row;
}
.paper-plane {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.demo {
  font-family: Poppins, sans-serif;
  border: 1px solid rgb(181, 176, 176);
  border-radius: 2px;
  height: 50vh;
  margin-top: 1em;
}
</style>
