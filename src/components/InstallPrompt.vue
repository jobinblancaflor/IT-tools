<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { IconDownload, IconX } from '@tabler/icons-vue';

const { t } = useI18n();
const deferredPrompt = ref<any>(null);
const showPrompt = ref(false);

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt.value = e;
    // Update UI notify the user they can install the PWA
    showPrompt.value = true;
  });

  window.addEventListener('appinstalled', () => {
    // Hide the app-provided install promotion
    showPrompt.value = false;
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt.value = null;
    console.log('PWA was installed');
  });
});

async function installPWA() {
  if (!deferredPrompt.value) return;
  // Show the install prompt
  deferredPrompt.value.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.value.userChoice;
  console.log(`User response to the install prompt: ${outcome}`);
  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt.value = null;
  showPrompt.value = false;
}

function dismissPrompt() {
  showPrompt.value = false;
}
</script>

<template>
  <transition name="fade">
    <div v-if="showPrompt" class="install-prompt">
      <div class="content">
        <n-icon :component="IconDownload" size="24" class="icon" />
        <div class="text">
          <div class="title">
            Install Armytool
          </div>
          <div class="subtitle">
            Install our app for a better experience.
          </div>
        </div>
        <div class="actions">
          <n-button type="primary" size="small" @click="installPWA">
            Install
          </n-button>
          <n-button circle variant="text" size="small" @click="dismissPrompt">
            <n-icon :component="IconX" />
          </n-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
.install-prompt {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: var(--n-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 12px 20px;
  border: 1px solid rgba(128, 128, 128, 0.2);
  width: calc(100% - 40px);
  max-width: 400px;

  .content {
    display: flex;
    align-items: center;
    gap: 15px;

    .icon {
      color: var(--primary-color);
    }

    .text {
      flex: 1;

      .title {
        font-weight: 600;
        font-size: 1rem;
      }

      .subtitle {
        font-size: 0.85rem;
        opacity: 0.7;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
