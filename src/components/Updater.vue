<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900"
                  >
                    New Version Available
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      {{ info.body }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ listen }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:pl-4">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-500 sm:w-auto focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-indigo-600"
                  :disabled="updating"
                  @click="update"
                >
                  <svg
                    v-if="updating"
                    class="animate-spin -ml-0.5 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <CloudArrowDownIcon
                    v-else
                    class="-ml-0.5 mr-2 h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  Update Now
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                  @click="handleSkip"
                  ref="cancelButtonRef"
                >
                  Skip This Version
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
// 传入参数
const props = defineProps({
  info: {
    type: Object,
    default: {},
  },
});

import { defineEmits, onUnmounted, ref } from "vue";
import { installUpdate, onUpdaterEvent } from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";

const listen = ref(null);
let unlisten;

const setupUpdaterListener = async () => {
  unlisten = await onUpdaterEvent(({ error, status }) => {
    console.log(status);
    if (status === "ERROR") {
      listen.value = error;
      updating.value = false;
    }
  });
};

setupUpdaterListener();

const emit = defineEmits(["close"]);
const handleSkip = () => {
  emit("close");
  unlisten(); // 现在可以正确调用 unlisten 函数
};

onUnmounted(() => {
  console.log("onUnmounted");
  unlisten && unlisten(); // 确保在组件卸载时也取消监听
});

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CloudArrowDownIcon } from "@heroicons/vue/24/outline";

const open = ref(true);
const updating = ref(false);
const update = async () => {
  try {
    updating.value = true;
    listen.value = null;
    const updateResult = await installUpdate();
    console.log(updateResult);
    if (updateResult.status !== "UPDATED") {
      // 处理更新失败或被跳过的情况
      listen.value = updateResult.error || "Update failed or skipped.";
      updating.value = false;
      // 可以在这里添加其他错误处理逻辑,例如显示错误消息等
    } else {
      // 更新成功,重新启动应用程序
      await relaunch();
    }
  } catch (error) {
    console.log(error);
    updating.value = false;
    // 处理其他未捕获的错误
  }
};
</script>
