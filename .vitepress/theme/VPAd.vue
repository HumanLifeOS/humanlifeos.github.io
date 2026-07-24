<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import { useData } from 'vitepress'

defineProps<{
  carbonAds?: DefaultTheme.CarbonAdsOptions
}>()

const { lang } = useData()

const adContent: Record<string, { label: string; title: string; description: string; tag: string }> = {
  'zh-Hans': {
    label: '推荐',
    title: 'HumanLifeOS',
    description: '生命中最值得、最基本的、最关键的认知与训练 —— 正觉训练',
    tag: 'HLOS'
  },
  'en-US': {
    label: 'Sponsored',
    title: 'HumanLifeOS',
    description: 'Human Life Operating System - Make Life Smarter',
    tag: 'HLOS'
  }
}

const currentAd = adContent[lang.value] || adContent['en-US']
</script>

<template>
  <div class="VPCarbonAds custom-ad">
    <div class="ad-container">
      <div class="ad-label">
        <span class="ad-icon">★</span>
        <span>{{ currentAd.label }}</span>
      </div>
      <div class="ad-content">
        <a href="https://humanlifeos.com" target="_blank" rel="noopener noreferrer">
          <div class="ad-title">{{ currentAd.title }}</div>
          <div class="ad-description">{{ currentAd.description }}</div>
        </a>
      </div>
      <div class="ad-tag">{{ currentAd.tag }}</div>
    </div>
  </div>
</template>

<style scoped>
.VPCarbonAds.custom-ad {
  padding: 16px;
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-bg-soft) 100%);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  min-height: auto;
}

.VPCarbonAds.custom-ad:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(95, 103, 238, 0.15);
}

.ad-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ad-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--vp-c-brand);
  font-weight: 500;
  padding: 4px 8px;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
}

.ad-icon {
  font-size: 10px;
}

.ad-content a {
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-decoration: none;
}

.ad-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.ad-description {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.ad-tag {
  margin-left: auto;
  font-size: 10px;
  font-weight: 700;
  color: var(--vp-c-brand);
  padding: 4px 10px;
  background: var(--vp-c-brand-soft);
  border-radius: 10px;
  letter-spacing: 1px;
}

.footer-ad {
  margin-top: 32px;
}
</style>