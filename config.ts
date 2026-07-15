import { createRequire } from 'module'
import { defineAdditionalConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export default defineAdditionalConfig({
  description: 'Vite & Vue powered static site generator.',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/vision/': { items: sidebarMain() },
      '/methodology/': { items: sidebarMain() },
      '/knowledge/': { items: sidebarMain() },
      '/training/': { items: sidebarMain() },
      '/research/': { items: sidebarMain() },
      '/blog/': { items: sidebarMain() },
      '/about/': { items: sidebarMain() }
    },

    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} OHULAB All rights reserved`
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Home',
      link: '/',
      activeMatch: '/$'
    },
    {
      text: 'White Paper',
      items: [
        { text: 'Vision', link: '/vision/' },
        { text: 'Methodology', link: '/methodology/' },
        { text: 'Knowledge', link: '/knowledge/' },
        { text: 'Training', link: '/training/' },
        { text: 'Research', link: '/research/' }
      ]
    },
    {
      text: 'Blog',
      link: '/blog/',
      activeMatch: '/blog/'
    },
    {
      text: 'About',
      link: '/about/',
      activeMatch: '/about/'
    }
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'What is VitePress?', link: 'what-is-vitepress' },
        { text: 'Getting Started', link: 'getting-started' },
        { text: 'Routing', link: 'routing' },
        { text: 'Deploy', link: 'deploy' }
      ]
    },
    {
      text: 'Writing',
      collapsed: false,
      items: [
        { text: 'Markdown Extensions', link: 'markdown' },
        { text: 'Asset Handling', link: 'asset-handling' },
        { text: 'Frontmatter', link: 'frontmatter' },
        { text: 'Using Vue in Markdown', link: 'using-vue' },
        { text: 'Internationalization', link: 'i18n' }
      ]
    },
    {
      text: 'Customization',
      collapsed: false,
      items: [
        { text: 'Using a Custom Theme', link: 'custom-theme' },
        {
          text: 'Extending the Default Theme',
          link: 'extending-default-theme'
        },
        { text: 'Build-Time Data Loading', link: 'data-loading' },
        { text: 'SSR Compatibility', link: 'ssr-compat' },
        { text: 'Connecting to a CMS', link: 'cms' }
      ]
    },
    {
      text: 'Experimental',
      collapsed: false,
      items: [
        { text: 'MPA Mode', link: 'mpa-mode' },
        { text: 'Sitemap Generation', link: 'sitemap-generation' }
      ]
    },
    { text: 'Config & API Reference', base: '/reference/', link: 'site-config' }
  ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Reference',
      items: [
        { text: 'Site Config', link: 'site-config' },
        { text: 'Frontmatter Config', link: 'frontmatter-config' },
        { text: 'Runtime API', link: 'runtime-api' },
        { text: 'CLI', link: 'cli' },
        {
          text: 'Default Theme',
          base: '/reference/default-theme-',
          items: [
            { text: 'Overview', link: 'config' },
            { text: 'Nav', link: 'nav' },
            { text: 'Sidebar', link: 'sidebar' },
            { text: 'Home Page', link: 'home-page' },
            { text: 'Footer', link: 'footer' },
            { text: 'Layout', link: 'layout' },
            { text: 'Badge', link: 'badge' },
            { text: 'Team Page', link: 'team-page' },
            { text: 'Prev / Next Links', link: 'prev-next-links' },
            { text: 'Edit Link', link: 'edit-link' },
            { text: 'Last Updated Timestamp', link: 'last-updated' },
            { text: 'Search', link: 'search' },
            { text: 'Carbon Ads', link: 'carbon-ads' }
          ]
        }
      ]
    }
  ]
}

function sidebarMain(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Vision', link: '/vision/' },
    { text: 'Methodology', link: '/methodology/' },
    { text: 'Knowledge', link: '/knowledge/' },
    { text: 'Training', link: '/training/' },
    { text: 'Research', link: '/research/' },
    { text: 'Blog', link: '/blog/' },
    { text: 'About', link: '/about/' }
  ]
}
