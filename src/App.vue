<script setup>
import { useAuthStore } from "@/stores";
import { computed, defineAsyncComponent } from "vue";
const Layout = defineAsyncComponent(() => import("./views/layout.vue"));
const authStore = useAuthStore();
const layout = computed(() => {
  return authStore.user ? Layout : "div";
});
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped></style>
