<template>
  <div>
    <form @submit.prevent="handleSubmit" style="max-width: 600px; margin: 0;" novalidate>
      <div style="margin-bottom: 16px;">
        <input
          v-model="form.name"
          type="text"
          :placeholder="placeholders.name"
          style="width: 98%; margin-left: 2px; padding: 12px; border: 2px solid #ddd; border-radius: 20px; font-size: 16px;"
        >
      </div>

      <div style="margin-bottom: 16px;">
        <input
          v-model="form.email"
          type="email"
          :placeholder="placeholders.email"
          style="width: 98%; margin-left: 2px; padding: 12px; border: 2px solid #ddd; border-radius: 20px; font-size: 16px;"
        >
      </div>

      <div style="margin-bottom: 16px;">
        <textarea
          v-model="form.message"
          :placeholder="placeholders.message"
          rows="6"
          style="width: 98%; margin-left: 2px; padding: 12px; border: 2px solid #ddd; border-radius: 20px; font-size: 16px; background-color: transparent;"
        ></textarea>
      </div>

      <div style="margin-bottom: 16px;">
        <button
          type="submit"
          :disabled="sending"
        >{{ buttonText }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';

const props = defineProps({
  language: {
    type: String,
    default: 'en'
  }
});

const API_URL = 'https://subs.humanlifeos.com/api/contact';

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const sending = ref(false);
const status = ref({ type: '' });

const isZh = computed(() => props.language === 'zh-CN' || props.language === 'zh-TW');

const placeholders = computed(() => {
  switch (props.language) {
    case 'zh-CN':
    case 'zh-TW':
      return {
        name: '您的姓名',
        email: '您的邮箱',
        message: '留言内容'
      };
    default:
      return {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Message Content'
      };
  }
});

const buttonText = computed(() => {
  if (sending.value) {
    return isZh.value ? '发送中...' : 'Sending...';
  }
  if (status.value.type === 'success') {
    return isZh.value ? '✓ 发送成功' : '✓ Sent';
  }
  if (status.value.type === 'error') {
    const reason = status.value.reason;
    if (reason === 'empty_name') return isZh.value ? '✗ 请填写姓名' : '✗ Name required';
    if (reason === 'invalid_email') return isZh.value ? '✗ 邮箱格式错误' : '✗ Invalid email';
    if (reason === 'empty_message') return isZh.value ? '✗ 请填写留言内容' : '✗ Message required';
    if (reason === 'timeout') return isZh.value ? '✗ 请求超时，重试' : '✗ Timeout, Retry';
    if (reason === 'network') return isZh.value ? '✗ 网络错误，重试' : '✗ Network error, Retry';
    if (reason === 'server_detail' && status.value.detail) {
      return isZh.value ? `✗ ${status.value.detail}` : `✗ ${status.value.detail}`;
    }
    if (reason === 'server') return isZh.value ? '✗ 服务器错误，重试' : '✗ Server error, Retry';
    return isZh.value ? '✗ 发送失败，重试' : '✗ Failed, Retry';
  }
  return isZh.value ? '发送留言' : 'Send Message';
});

async function handleSubmit() {
  if (sending.value) return;

  const name = form.name.trim();
  const email = form.email.trim().toLowerCase();
  const message = form.message.trim();

  if (!name) {
    status.value = { type: 'error', reason: 'empty_name' };
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.value = { type: 'error', reason: 'invalid_email' };
    return;
  }
  if (!message) {
    status.value = { type: 'error', reason: 'empty_message' };
    return;
  }

  sending.value = true;
  status.value = { type: '' };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, lang: isZh.value ? 'zh' : 'en' }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (response.ok && data.success) {
      status.value = { type: 'success' };
      form.name = '';
      form.email = '';
      form.message = '';
    } else if (data && data.detail) {
      status.value = { type: 'error', reason: 'server_detail', detail: data.detail };
    } else {
      status.value = { type: 'error', reason: 'server' };
    }
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      status.value = { type: 'error', reason: 'timeout' };
    } else {
      status.value = { type: 'error', reason: 'network' };
    }
  } finally {
    sending.value = false;
  }
}
</script>

<style scoped>
button[type="submit"] {
  width: 98%;
  background: #2D5A8C;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 15px;
  cursor: pointer;
  display: block;
  margin: 0 0 0 2px;
  position: relative;
  overflow: hidden;
}

button[type="submit"]::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #386EAD 0%, #2D5A8C 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

button[type="submit"]:hover:not(:disabled)::before {
  opacity: 1;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
