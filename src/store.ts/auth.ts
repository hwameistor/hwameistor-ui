import { defineStore, acceptHMRUpdate } from 'pinia';

const useAuthStore = defineStore('user', {
  state: () => ({
    enableAuth: false,
  }),
  getters: {
    isAuthEnable: (state) => state.enableAuth,
  },
});

// this is for webpack 5.x
if (import.meta.webpackHot) {
  import.meta.webpackHot?.accept(acceptHMRUpdate(useAuthStore, import.meta.webpackHot));
}

export default useAuthStore;
