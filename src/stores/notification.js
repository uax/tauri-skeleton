import { defineStore } from "pinia";

export const useNotificationStore = defineStore({
  id: "notification",
  state: () => ({
    notification: null,
  }),
  actions: {
    success(message) {
      this.notification = { title: "成功", message, type: "success" };
    },
    error(message) {
      this.notification = { title: "错误", message, type: "danger" };
    },
    clear() {
      this.notification = null;
    },
  },
});
