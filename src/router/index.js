import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore, useAlertStore } from "@/stores";
export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "",
  linkExactActiveClass: "",
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
        {
          path: "about",
          name: "about",
          component: () => import("@/views/About.vue"),
        },
        {
          path: "/:pathMatch(.*)*",
          name: "notfound",
          component: () => import("@/views/notfound.vue"),
        },
      ],
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("@/views/auth/login.vue"),
    },
    {
      path: "/auth/register",
      name: "register",
      component: () => import("@/views/auth/register.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/auth/login", "/auth/register"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  const redirectTo =
    authRequired && !authStore.user
      ? "/auth/login"
      : !authRequired && authStore.user
      ? "/"
      : null;

  if (redirectTo) {
    authStore.returnUrl = to.fullPath;
    return redirectTo;
  }
});
