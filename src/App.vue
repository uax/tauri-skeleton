<template>
  <router-view />
  <Notification />
  <Updater v-if="showUpdater" :info="updateInfo" />
</template>

<script setup>
import { Notification } from "@/components";
import { checkUpdate } from "@tauri-apps/api/updater";
import { onMounted, ref } from "vue";

import Updater from "@/components/Updater.vue";

const updateInfo = ref({});
const showUpdater = ref(false);

const isTauriApp = () => !!window.__TAURI_IPC__;

const checkAndHandleUpdate = async () => {
  try {
    const { shouldUpdate, manifest } = await checkUpdate();
    if (shouldUpdate) {
      updateInfo.value = manifest;
      showUpdater.value = true;
    }
  } catch (error) {
    console.error("检查更新失败:", error);
  }
};
onMounted(() => {
  if (isTauriApp()) {
    checkAndHandleUpdate();
  }
});
</script>
