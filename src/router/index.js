import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores";
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/layout.vue"),
      children: [
        {
          path: "",
          name: "dashboard",
          component: () => import("@/views/dashboard.vue"),
        },
      ],
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("@/views/auth/login.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (
    authStore.user &&
    (to.path === "/auth/login" || to.path === "/auth/register")
  ) {
    next("/");
  } else {
    next();
  }
});
