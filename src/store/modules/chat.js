import axios from "axios";

const state = {
  chats: [],
};

const getters = {
  watsonChat: (state) => state.chats,
};

const actions = {
  userMessage({ commit }, message) {
    try {
      commit("INPUT_SUCCESS", message);
    } catch (error) {
      commit("INPUT_FAIL");
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
  async createSession({ commit }) {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/watson/session"
      );
      commit("SESSION_SUCCESS", response.data);
    } catch (error) {
      commit("SESSION_FAIL");
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
  async sendMessage({ commit }, message) {
    const body = { input: message };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/watson/message",
        body
      );
      console.log(response);
      commit("MESSAGE_SUCCESS", response.data.output.generic[0].text);
    } catch (error) {
      commit("MESSAGE_FAIL");
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
};

let { payload } = actions;
let { chats } = state;
const mutations = {
  INPUT_SUCCESS: (state) => {
    chats = [...chats, { message: payload, type: "user" }];
    return {
      ...state,
      chats,
    };
  },
  INPUT_FAIL: (state) => {
    return { ...state };
  },
  // eslint-disable-next-line camelcase
  SESSION_SUCCESS: (state) => {
    localStorage.setItem("session", payload["session_id"]);
    return { ...state };
  },
  SESSION_FAIL: (state) => {
    return { ...state };
  },
  MESSAGE_SUCCESS: (state) => {
    chats = [...chats, { message: payload, type: "bot" }];
    return {
      ...state,
      chats,
    };
  },
  MESSAGE_FAIL: (state) => {
    return { ...state };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
