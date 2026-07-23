<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import VPAd from './VPAd.vue'
import { useData } from 'vitepress'

const { page } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-after>
      <VPAd class="footer-ad" />
    </template>
  </DefaultTheme.Layout>
</template>