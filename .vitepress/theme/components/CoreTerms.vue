<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

interface TermZh {
  abbr: string
  enFull: string
  zhName: string
}

interface TermEn {
  abbr: string
  full: string
}

const props = defineProps<{
  lang?: string
}>()

const { lang: siteLang } = useData()

const zhTerms: TermZh[] = [
  { abbr: 'OS', enFull: 'Operating System', zhName: '操作系统' },  
  { abbr: 'HumanLifeOS', enFull: 'Human Life (Intelligence Agent) Operating System', zhName: '人类生命智能体操作系统' },
  { abbr: 'HLOS', enFull: 'Human Life Operating System', zhName: '人类生命智能体操作系统' },
  { abbr: 'RA', enFull: 'Right Awakening', zhName: '正觉' },
  { abbr: 'RAT ➊', enFull: 'Right Awakening Training', zhName: '正觉训练' },
  { abbr: 'RAT ➋', enFull: 'Right Awakening Therapy', zhName: '正觉疗法' },
  { abbr: 'RAC', enFull: 'Right Awakening Course', zhName: '正觉课程' }
]

const enTerms: TermEn[] = [
  { abbr: 'OS', full: 'Operating System' },
  { abbr: 'HumanLifeOS', full: 'Human Life (Intelligence Agent) Operating System' },
  { abbr: 'HLOS', full: 'Human Life Operating System' },
  { abbr: 'RA', full: 'Right Awakening' },
  { abbr: 'RAT ➊', full: 'Right Awakening Training' },
  { abbr: 'RAT ➋', full: 'Right Awakening Therapy' },
  { abbr: 'RAC', full: 'Right Awakening Course' }
]

const effectiveLang = computed(() => {
  return props.lang || (siteLang.value === 'zh-Hans' ? 'zh-CN' : 'en-US')
})

const isZh = computed(() => effectiveLang.value.startsWith('zh'))

const displayTitle = computed(() => {
  return isZh.value ? '核心术语' : 'Core Terminology'
})
</script>

<template>
  <div class="core-terms">
    <h2 class="core-terms-title">{{ displayTitle }}</h2>

    <!-- 中文表格：三列 -->
    <table v-if="isZh">
      <thead>
        <tr>
          <th class="col-abbr">缩写</th>
          <th class="col-en">英文全称</th>
          <th class="col-zh">中文名称</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in zhTerms" :key="t.abbr">
          <td class="col-abbr">
            <span class="term-abbr">{{ t.abbr }}</span>
          </td>
          <td class="col-en">
            <span class="term-full">{{ t.enFull }}</span>
          </td>
          <td class="col-zh">
            <span class="term-zh">{{ t.zhName }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 英文表格：两列 -->
    <table v-else>
      <thead>
        <tr>
          <th class="col-abbr">Abbr.</th>
          <th class="col-full">Full Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in enTerms" :key="t.abbr">
          <td class="col-abbr">
            <span class="term-abbr">{{ t.abbr }}</span>
          </td>
          <td class="col-full">
            <span class="term-full">{{ t.full }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
  </div>
</template>

<style scoped>
.core-terms {
  margin: 24px 0;
}

.core-terms-title {
  margin: 0 0 16px 0;
  padding: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  border-top: none;
  border-bottom: none;
}

.core-terms-divider {
  display: none;
}

.core-terms table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  table-layout: auto;
}

.core-terms th {
  padding: 9px 11px;
  text-align: center;
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
  white-space: nowrap;
}

.core-terms td {
  padding: 10px 11px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  vertical-align: middle;
}

.core-terms tbody tr:last-child td {
  border-bottom: 1px solid var(--vp-c-divider);
}

.core-terms tbody tr:hover {
  background: var(--vp-c-brand-soft);
}

.col-abbr {
  white-space: nowrap;
}

.col-en {
  white-space: nowrap;
}

.col-zh {
  width: 100%;
  white-space: nowrap;
}

.col-full {
  width: 100%;
  white-space: nowrap;
}

.term-abbr {
  display: inline-block;
  font-weight: 700;
  font-size: 0.85rem;
}

.term-full {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.term-zh {
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
