import { defineStore } from "pinia";// Import the defineStore function
export default defineStore("modal", {// Define a store with the name "modal"
  state: () => ({ isOpen: false }), // This is a reactive property
  getters: {
    hiddenClass(state) {// This is a computed property
      return !state.isOpen ? "hidden" : "";// Return a string
    },
  },
});
