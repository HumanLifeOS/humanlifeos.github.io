---
title: Subscribe to HLOS Insights!
layout: home
outline: deep
footer: true
prev: false
next: false
---

<div class="subscribe-page-wrap">
  <SubscribeForm language="en-US" />
</div>

<style>
/* 只在本页的包裹容器上设置高度和居中，不改动 VitePress 全局布局容器 */
.subscribe-page-wrap {
  width: 100%;
  max-width: 500px;
  /* 直接以视口为参照，减去导航和页脚即可，不依赖父容器高度 */
  min-height: calc(100vh - var(--vp-nav-height, 64px) - var(--vp-footer-height, 96px));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 内部内容垂直居中 */
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;
}

.subscribe-page-wrap > * {
  width: 100%;
}
</style>