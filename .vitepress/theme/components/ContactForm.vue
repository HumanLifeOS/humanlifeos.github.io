<template>
  <div>
    <form @submit.prevent="handleSubmit" style="max-width: 600px; margin: 0;">
      <div style="margin-bottom: 16px;">
        <input
          v-model="form.name"
          type="text"
          :placeholder="placeholders.name"
          required
          style="width: 98%; margin-left: 2px; padding: 12px; border: 2px solid #ddd; border-radius: 20px; font-size: 16px;"
        >
      </div>

      <div style="margin-bottom: 16px;">
        <input
          v-model="form.email"
          type="email"
          :placeholder="placeholders.email"
          required
          style="width: 98%; margin-left: 2px; padding: 12px; border: 2px solid #ddd; border-radius: 20px; font-size: 16px;"
        >
      </div>

      <div style="margin-bottom: 16px;">
        <textarea
          v-model="form.message"
          :placeholder="placeholders.message"
          rows="6"
          required
          style="width: 98%; margin-left: 2px; padding: 12px; border: 2px solid #ddd; border-radius: 20px; font-size: 16px; resize: vertical; background-color: transparent;"
        ></textarea>
      </div>

      <div style="margin-bottom: 16px;">
        <button
          type="submit"
          :disabled="sending"
          style="background-color: #2D5A8C; color: white; border: none; padding: 12px 50px; border-radius: 20px; font-size: 16px; cursor: pointer; transition: background-color 0.3s;"
          @mouseover="$event.target.style.backgroundColor = 'var(--vp-c-brand-1)'"
          @mouseout="$event.target.style.backgroundColor = '#2D5A8C'"
        >{{ buttonText }}</button>
      </div>

      <div v-if="status.text" :style="statusStyle">
        {{ status.text }}
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
const status = ref({ type: '', text: '' });

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
  return isZh.value ? '发送留言' : 'Send Message';
});

const statusStyle = computed(() => ({
  marginTop: '16px',
  padding: '12px',
  borderRadius: '20px',
  fontWeight: 'bold',
  color: status.value.type === 'success' ? '#2e7d32' : (status.value.type === 'error' ? '#c62828' : '#666'),
  backgroundColor: 'transparent'
}));

const statusMessages = computed(() => {
  switch (props.language) {
    case 'zh-CN':
    case 'zh-TW':
      return {
        success: '留言发送成功！确认邮件已发送到您的邮箱，我们会尽快与您联系。',
        error: '留言发送失败，请稍后重试或直接通过邮箱联系我们。'
      };
    default:
      return {
        success: 'Message sent successfully! A confirmation email has been sent to your inbox. We will contact you soon.',
        error: 'Failed to send message. Please try again later or contact us directly via email.'
      };
  }
});

async function handleSubmit() {
  sending.value = true;
  status.value = { type: '', text: '' };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
        lang: isZh.value ? 'zh' : 'en'
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      status.value = { type: 'success', text: statusMessages.value.success };
      form.name = '';
      form.email = '';
      form.message = '';
    } else {
      status.value = { type: 'error', text: data.error || statusMessages.value.error };
    }
  } catch (err) {
    status.value = { type: 'error', text: statusMessages.value.error };
  } finally {
    sending.value = false;
  }
}
</script>

<style scoped>
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
