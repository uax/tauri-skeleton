<template>
  <button @click="logout">退出</button>
  <button @click="get">请求数据</button>
</template>

<script setup>
import { useAuthStore } from "@/stores";
import { fetchWrapper } from "@/request";
import { onMounted } from "vue";
import { useNotificationStore } from "@/stores";
const authStore = useAuthStore();

onMounted(() => {
  const notification = useNotificationStore();
  notification.success("通知消息：成功");
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
