<template>
  <button @click="logout">退出</button>
  <button @click="get">请求数据</button>
</template>

<script setup>
import { useAuthStore } from "@/stores";
import { fetchWrapper } from "@/request";
const authStore = useAuthStore();
const logout = async () => {
  await authStore.logout();
};
const get = () => {
  fetchWrapper
    .get("/get?id=1")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
