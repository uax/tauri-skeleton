<template>
  <div>
    <div>
      <h1>App</h1>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <button @click="login">lgoin</button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores";
const authStore = useAuthStore();

const login = async () => {
  await authStore.login("username", "password");
};
</script>
