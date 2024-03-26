import { defineStore } from "pinia";
import { router } from "@/router";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(username, password) {
      const user = await { username: "Noah", token: "123321" }; //mockLogin(username, password);
      localStorage.setItem("user", JSON.stringify(user));
      this.user = user;
      this.isAuthenticated = true;
      router.push({ name: "dashboard" });
    },
    async logout() {
      localStorage.removeItem("user");
      this.user = null;
      this.isAuthenticated = false;
      router.push({ name: "login" });
    },
  },
});
