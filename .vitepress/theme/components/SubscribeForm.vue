<template>
  <div class="subscribe-section">
    <p class="subscribe-title">{{ isZh ? '订阅HLOS最新洞见！' : 'Subscribe to HLOS Insights!' }}</p>

    <!-- 订阅模式 -->
    <form v-if="mode === 'subscribe'" @submit.prevent="handleSubscribe" class="subscribe-form" novalidate>
      <input
        v-model="email"
        type="email"
        class="subscribe-input"
        :placeholder="isZh ? '您的邮箱' : 'Your email'"
      >
      <button type="submit" :disabled="sending">{{ subscribeButtonText }}</button>
    </form>

    <!-- 退订模式 -->
    <form v-else @submit.prevent="handleUnsubscribe" class="subscribe-form" novalidate>
      <input
        v-model="email"
        type="email"
        class="subscribe-input"
        :placeholder="isZh ? '输入您的邮箱以取消订阅' : 'Enter your email to unsubscribe'"
      >
      <button type="submit" :disabled="sending" class="unsubscribe-btn">{{ unsubscribeButtonText }}</button>
    </form>

    <!-- 模式切换链接 -->
    <a href="#" class="mode-toggle" @click.prevent="toggleMode">
      {{ mode === 'subscribe'
        ? (isZh ? '已有账号？点此取消订阅' : 'Already subscribed? Unsubscribe here')
        : (isZh ? '← 返回订阅' : '← Back to subscribe') }}
    </a>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  language: {
    type: String,
    default: 'en'
  }
});

const SUBSCRIBE_API = 'https://subs.humanlifeos.com/subscribe';
const UNSUBSCRIBE_API = 'https://subs.humanlifeos.com/unsubscribe';

const email = ref('');
const sending = ref(false);
const status = ref({ type: '', message: '' });
const mode = ref('subscribe'); // 'subscribe' | 'unsubscribe'

const isZh = computed(() => props.language === 'zh-CN');

function toggleMode() {
  mode.value = mode.value === 'subscribe' ? 'unsubscribe' : 'subscribe';
  email.value = '';
  status.value = { type: '', message: '' };
}

const subscribeButtonText = computed(() => {
  if (sending.value) return isZh.value ? '订阅中...' : 'Submitting...';
  if (status.value.type === 'success') return status.value.message || (isZh.value ? '订阅成功！' : 'Subscription successful!');
  if (status.value.type === 'error') return status.value.message || (isZh.value ? '订阅失败，请稍后重试！' : 'Subscription failed. Please try again later.');
  return isZh.value ? '我要订阅' : 'Subscribe';
});

const unsubscribeButtonText = computed(() => {
  if (sending.value) return isZh.value ? '处理中...' : 'Processing...';
  if (status.value.type === 'success') return status.value.message || (isZh.value ? '已取消订阅' : 'Unsubscribed');
  if (status.value.type === 'error') return status.value.message || (isZh.value ? '操作失败，请稍后重试' : 'Failed. Please try again.');
  return isZh.value ? '取消订阅' : 'Unsubscribe';
});

async function handleSubscribe() {
  if (sending.value) return;
  const trimmedEmail = email.value.trim();
  if (!trimmedEmail) return;

  sending.value = true;
  status.value = { type: '', message: '' };

  try {
    const res = await fetch(SUBSCRIBE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: trimmedEmail, lang: isZh.value ? 'zh' : 'en' })
    });
    const data = await res.json();

    if (data.success) {
      status.value = { type: 'success', message: data.message || '' };
      email.value = '';
    } else {
      status.value = { type: 'error', message: data.error || '' };
    }
  } catch (err) {
    status.value = {
      type: 'error',
      message: isZh.value ? '网络错误，请稍后重试！' : 'Network error. Please try again later.'
    };
  } finally {
    sending.value = false;
    setTimeout(() => { status.value = { type: '', message: '' }; }, 3000);
  }
}

async function handleUnsubscribe() {
  if (sending.value) return;
  const trimmedEmail = email.value.trim();
  if (!trimmedEmail) return;

  sending.value = true;
  status.value = { type: '', message: '' };

  try {
    const res = await fetch(UNSUBSCRIBE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: trimmedEmail, lang: isZh.value ? 'zh' : 'en' })
    });
    const data = await res.json();

    if (data.success) {
      status.value = {
        type: 'success',
        message: isZh.value ? '已成功取消订阅' : 'You have been unsubscribed'
      };
      email.value = '';
    } else {
      status.value = {
        type: 'error',
        message: data.error || (isZh.value ? '取消订阅失败' : 'Unsubscribe failed')
      };
    }
  } catch (err) {
    status.value = {
      type: 'error',
      message: isZh.value ? '网络错误，请稍后重试！' : 'Network error. Please try again later.'
    };
  } finally {
    sending.value = false;
    setTimeout(() => { status.value = { type: '', message: '' }; }, 3000);
  }
}
</script>

<style scoped>
.subscribe-section {
  text-align: center;
}

.subscribe-title {
  text-align: center;
}

.subscribe-form {
  max-width: 350px;
  margin: 24px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.subscribe-input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  border: 2px solid #ccc;
  border-radius: 9999px;
  font-size: 15px;
  font-family: inherit;
  color: inherit;
  outline: none;
  background-color: transparent;
}

.subscribe-form button[type="submit"] {
  width: 100%;
  box-sizing: border-box;
  background-color: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 9999px;
  font-size: 15px;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.3s;
}

.subscribe-form button[type="submit"]:hover:not(:disabled) {
  background-color: var(--vp-c-brand-2);
}

.subscribe-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.unsubscribe-btn {
  background-color: #6b7280 !important;
}

.unsubscribe-btn:hover:not(:disabled) {
  background-color: #4b5563 !important;
}

.mode-toggle {
  display: inline-block;
  margin-top: 8px;
  font-size: 13px;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  cursor: pointer;
}

.mode-toggle:hover {
  text-decoration: underline;
}
</style>
