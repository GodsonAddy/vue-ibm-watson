import Vue from "vue";
import Vuex from "vuex";
import chat from "./modules/chat.js";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default () =>
  new Vuex.Store({
    modules: {
      chat,
    },
    plugins: [createPersistedState],
  });
