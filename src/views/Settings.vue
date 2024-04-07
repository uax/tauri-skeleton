<template>
  <button
    v-if="isTauriApp()"
    type="button"
    class="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    @click="checkAndHandleUpdate"
  >
    Checking Updater
  </button>
  <Updater v-if="showUpdater" :info="updateInfo" @close="showUpdater = false" />
</template>

<script setup>
import { checkUpdate } from "@tauri-apps/api/updater";
import { onMounted, ref } from "vue";
import Updater from "@/components/Updater.vue";

const updateInfo = ref({});
const showUpdater = ref(false);
const isTauriApp = () => !!window.__TAURI_IPC__;
onMounted(() => {
  console.log(isTauriApp());
});

const checkAndHandleUpdate = async () => {
  console.log("开始检测新版本");
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
</script>
