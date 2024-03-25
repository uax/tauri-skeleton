<template><button @click="logout">退出</button></template>

<script setup>
import { useAuthStore } from "@/stores";
const authStore = useAuthStore();
const logout = async () => {
  await authStore.logout();
};
</script>
