import { defineStore } from "pinia";
import { router } from "@/router";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: localStorage.getItem("user"),
    returnUrl: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(username, password) {
      console.log(username, password);
      localStorage.setItem("user", username);
      this.user = username;

      this.isAuthenticated = true;
      router.push({ name: "dashboard" });
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      this.isAuthenticated = false;
      router.push({ name: "login" });
    },
  },
});
