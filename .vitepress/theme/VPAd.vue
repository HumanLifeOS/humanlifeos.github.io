<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'

defineProps<{
  carbonAds?: DefaultTheme.CarbonAdsOptions
}>()
</script>

<template>
  <div class="VPCarbonAds custom-ad">
    <div class="ad-container">
      <div class="ad-label">
        <span class="ad-icon">★</span>
        <span>推荐</span>
      </div>
      <div class="ad-content">
        <a href="https://humanlifeos.com" target="_blank" rel="noopener noreferrer">
          <div class="ad-title">HumanLifeOS</div>
          <div class="ad-description">人类生命操作系统 - 让生命更智慧</div>
        </a>
      </div>
      <div class="ad-tag">HLOS</div>
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