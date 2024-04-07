import { defineStore } from "pinia";

export const useNotificationStore = defineStore({
  id: "notification",
  state: () => ({
    notification: null,
    showNotification: false,
    notificationTransitioning: false,
  }),
  actions: {
    success(message) {
      this.notification = { title: "成功", message, type: "success" };
      this.showNotification = true;
    },
    error(message) {
      this.notification = { title: "错误", message, type: "danger" };
      this.showNotification = true;
    },
    clear() {
      if (this.showNotification && !this.notificationTransitioning) {
        this.notificationTransitioning = true;
        setTimeout(() => {
          this.notification = null;
          this.showNotification = false;
          this.notificationTransitioning = false;
        }, 300);
      }
    },
  },
});
