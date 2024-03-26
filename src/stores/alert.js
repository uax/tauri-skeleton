import { defineStore } from "pinia";

export const useAlertStore = defineStore({
  id: "alert",
  state: () => ({
    alert: null,
  }),
  actions: {
    success(message) {
      this.alert = { title: "成功", message, type: "success" };
    },
    error(message) {
      this.alert = { title: "错误", message, type: "danger" };
    },
    clear() {
      this.alert = null;
    },
  },
});
