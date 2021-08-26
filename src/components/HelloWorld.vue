<template>
  <div class="hello">
    <b-container fluid>
      <b-form @submit.prevent="postChat">
        <b-form-textarea id="textarea-no-resize" rows="12" no-resize disabled>
          {{ chats.length === 0 ? "" : chat.map((msg) =>
          <div class="{" msg.type }>{ msg.message }</div>
          )}}
          <div ref="scrollDown" v-on:scroll.passive="scrollBottom" />
        </b-form-textarea>
        <div class="input-text">
          <b-form-input
            v-model="message"
            placeholder="text"
            @keyup.enter="postChat"
          ></b-form-input>
          <b-button type="submit" variant="success" class="paper-plane">
            <font-awesome-icon icon="paper-plane" />
            Send
          </b-button>
        </div>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {
      message: "",
    };
  },
  computed: mapGetters(["watsonChat"]),
  methods: {
    ...mapActions(["userMessage", "sendMessage", "createSession"]),
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
</style>
