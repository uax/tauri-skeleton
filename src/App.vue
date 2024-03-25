<script setup>
import { useAuthStore } from "@/stores";
import { computed, defineAsyncComponent } from "vue";
const Layout = defineAsyncComponent(() => import("./views/layout.vue"));
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const layout = computed(() => {
  if (!authStore.user) {
    router.push("/auth/login");
    return "div";
  }
  return Layout;
});
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped></style>
