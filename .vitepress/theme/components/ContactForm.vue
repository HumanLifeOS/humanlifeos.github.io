<template>
  <div>
    <form @submit.prevent="handleSubmit" class="contact-form" novalidate>
      <div class="form-field">
        <input
          v-model="form.name"
          type="text"
          class="form-input"
          :placeholder="placeholders.name"
        >
      </div>

      <div class="form-field">
        <input
          v-model="form.email"
          type="email"
          class="form-input"
          :placeholder="placeholders.email"
        >
      </div>

      <div class="form-field">
        <textarea
          v-model="form.message"
          class="form-input"
          :placeholder="placeholders.message"
          rows="6"
        ></textarea>
      </div>

      <div class="form-field">
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

// 组件属性：language 决定界面语言（zh-CN 中文，其他为英文）
const props = defineProps({
  language: {
    type: String,
    default: 'en'
  }
});

// 留言提交 API 地址
const API_URL = 'https://subs.humanlifeos.com/api/contact';

// 表单数据
const form = reactive({
  name: '',
  email: '',
  message: ''
});

// 发送状态
const sending = ref(false);
// 按钮状态：type（success/error）, reason（错误原因）, detail（服务器返回的详细错误）
const status = ref({ type: '' });

// 是否为中文环境
const isZh = computed(() => props.language === 'zh-CN');

// 输入框占位文本（中英双语）
const placeholders = computed(() => {
  switch (props.language) {
    case 'zh-CN':
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

// 按钮文字：根据状态和语言显示对应文案
const buttonText = computed(() => {
  if (sending.value) {
    return isZh.value ? '发送中...' : 'Sending...';
  }
  if (status.value.type === 'success') {
    return isZh.value ? '✓ 发送成功' : '✓ Sent';
  }
  if (status.value.type === 'error') {
    const reason = status.value.reason;
    if (reason === 'empty_name') return isZh.value ? '✗ 请填写姓名！' : '✗ Name required!';
    if (reason === 'invalid_email') return isZh.value ? '✗ 邮箱格式错误！' : '✗ Invalid email!';
    if (reason === 'empty_message') return isZh.value ? '✗ 请填写留言内容！' : '✗ Message required!';
    if (reason === 'timeout') return isZh.value ? '✗ 请求超时，重试！' : '✗ Timeout, Retry!';
    if (reason === 'network') return isZh.value ? '✗ 网络错误，重试！' : '✗ Network error, Retry!';
    if (reason === 'server_detail' && status.value.detail) {
      return isZh.value ? `✗ ${status.value.detail}` : `✗ ${status.value.detail}`;
    }
    if (reason === 'server') return isZh.value ? '✗ 服务器错误，重试！' : '✗ Server error, Retry!';
    return isZh.value ? '✗ 发送失败，重试！' : '✗ Failed, Retry!';
  }
  return isZh.value ? '发送留言' : 'Send Message';
});

// 提交留言：表单验证 → 发送请求 → 处理结果
async function handleSubmit() {
  if (sending.value) return;

  // 去除首尾空格
  const name = form.name.trim();
  const email = form.email.trim().toLowerCase();
  const message = form.message.trim();

  // 表单验证
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

  // 30秒超时控制
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
      // 发送成功，清空表单
      status.value = { type: 'success' };
      form.name = '';
      form.email = '';
      form.message = '';
    } else if (data && data.detail) {
      // 服务器返回了具体错误原因
      status.value = { type: 'error', reason: 'server_detail', detail: data.detail };
    } else {
      // 服务器返回失败，但无具体原因
      status.value = { type: 'error', reason: 'server' };
    }
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      // 请求超时
      status.value = { type: 'error', reason: 'timeout' };
    } else {
      // 网络错误（如断网、DNS解析失败等）
      status.value = { type: 'error', reason: 'network' };
    }
  } finally {
    sending.value = false;
  }
}
</script>

<style scoped>
/* 表单容器 */
.contact-form {
  max-width: 600px;
  margin: 0;
}

/* 每个表单字段的外层间距 */
.form-field {
  margin-bottom: 16px;
}

/* 输入框和文本域共享样式 */
.form-input {
  width: 98%;
  margin-left: 2px;
  padding: 10px 15px;
  border: 2px solid #ccc;
  border-radius: 20px;
  font-size: 15px;
  font-family: inherit;
  color: inherit;
  background-color: transparent;
  outline: none;
}

/* 发送按钮 */
button[type="submit"] {
  width: 98%;
  background-color: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 20px;
  font-size: 15px;
  cursor: pointer;
  display: block;
  margin: 0 0 0 2px;
  transition: background-color 0.3s;
}

/* 按钮悬停效果：切换到品牌深色 */
button[type="submit"]:hover:not(:disabled) {
  background-color: var(--vp-c-brand-2);
}

/* 禁用状态（发送中） */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
