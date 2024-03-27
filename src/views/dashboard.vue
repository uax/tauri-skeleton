<template>
  <button @click="logout">退出</button>
  <button @click="get">请求数据</button>
</template>

<script setup>
import { useAuthStore } from "@/stores";
import { fetchWrapper } from "@/request";
import { onMounted } from "vue";
import { useAlertStore } from "@/stores";
const authStore = useAuthStore();

onMounted(() => {
  const alertStore = useAlertStore();
  alertStore.success("通知消息：成功");
});

const logout = async () => {
  await authStore.logout();
};
const get = () => {
  fetchWrapper
    .get("/status/403")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
