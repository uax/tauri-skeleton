<template>
  <component :is="layout">
    <router-view />
  </component>
  <Alert />
</template>

<script setup>
import { useAuthStore } from "@/stores";
import { computed, defineAsyncComponent } from "vue";
import { Alert } from "@/components";
const Layout = defineAsyncComponent(() => import("./views/layout.vue"));
const authStore = useAuthStore();
const layout = computed(() => {
  return authStore.user ? Layout : "div";
});
</script>

<style scoped></style>
