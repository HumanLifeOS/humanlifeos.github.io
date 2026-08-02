import { createRequire } from 'module'
import { defineAdditionalConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export default defineAdditionalConfig({
  description: 'HumanLifeOS - The Human Life Operating System',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/': {
        items: sidebarEn()
      }
    },

    editLink: {
      pattern: 'https://github.com/HumanLifeOS/humanlifeos.github.io/edit/main/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated'
    },

    footer: {
      message: '<a href="/open-source" style="text-decoration: none;">HLOS Open Ecosystem & Licensing</a>',
      copyright: `Copyright © ${new Date().getFullYear()} OHULAB All Rights Reserved.`
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },

    outline: {
      label: 'On this page'
    },

    notFound: {
      title: 'Page Not Found',
      quote: "But if you don't change direction and keep looking, you may eventually arrive at where you're headed.",
      linkLabel: 'Back to Home',
      linkText: 'Take me home'
    },

    langMenuLabel: 'Language',
    returnToTopLabel: 'Back to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Theme',
    lightModeSwitchTitle: 'Switch to light mode',
    darkModeSwitchTitle: 'Switch to dark mode',
    skipToContentLabel: 'Skip to content'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Home', link: '/', activeMatch: '/$' },
    { text: 'Origin', link: '/origin', activeMatch: '/origin' },
    { text: 'Framework', link: '/framework', activeMatch: '/framework' },
    { text: 'Guide', link: '/knowledge/life-user-manual', activeMatch: '/knowledge' },
    { text: 'Training', link: '/training', activeMatch: '/training' },
    { text: 'Research', link: '/research', activeMatch: '/research' },
    { text: 'About', link: '/about', activeMatch: '/about' }
  ]
}

function sidebarEn(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Origin',
      collapsed: true,
      base: '/origin#',
      items: [
        { text: 'Life OS', link: 'lifeos' },
        { text: 'Mindfulness 2.0', link: 'mindfulness-2-0' },
        { text: 'Modern Zen', link: 'modern-zen' },
        { text: 'Engineering Psychology', link: 'engineering-psychology' },
        { text: 'Vision', link: 'vision' }
      ]
    },
    {
      text: 'Framework',
      collapsed: true,
      base: '/framework#',
      items: [
        { text: 'Scientific Methodology', link: 'scientific-methodology' },
        { text: 'Systematization & Engineering', link: 'systemization-engineering' },
        { text: 'Lifestyle Training', link: 'lifestyle-training' },
        { text: 'Research Directions', link: 'scientific-research' }
      ]
    },
    {
      text: 'Guide',
      collapsed: true,
      items: [
        { text: 'Quick Start', link: '/knowledge/life-user-manual' },
        { text: 'Life Structure', link: '/knowledge/frontmatter-config' },
        { text: 'Life Mechanism', link: '/knowledge/runtime-api' },
        { text: 'Life Healing', link: '/knowledge/cli' },
        { text: 'Life Training', link: '/knowledge/site-config' },
        {
          text: 'Dictionary',
          collapsed: true,
          base: '/knowledge/default-theme-',
          items: [
            { text: 'Life Entity', link: 'config' },
            { text: 'Intelligence', link: 'nav' },
            { text: 'Attention', link: 'sidebar' },
            { text: 'Consciousness', link: 'home-page' },
            { text: 'Emotion', link: 'footer' },
            { text: 'Instinct', link: 'layout' },
            { text: 'Perception', link: 'badge' },
            { text: 'Personality', link: 'team-page' },
            { text: 'Mindfulness', link: 'prev-next-links' },
            { text: 'Right Awakening', link: 'edit-link' },
            { text: 'Perception Anchor', link: 'last-updated' },
            { text: 'Environmental Engineering', link: 'search' },
            { text: 'Mind-Body Mirror', link: 'carbon-ads' }
          ]
        },
        {
          text: 'Terminology',
          collapsed: true,
          base: '/glossary#',
          items: [
            { text: 'HumanLifeOS', link: 'humanlifeos' },
            { text: 'HLOS', link: 'hlos' },
            { text: 'RA', link: 'right-awakening' },
            { text: 'RAT-1', link: 'right-awakening-training' },
            { text: 'RAT-2', link: 'right-awakening-therapy' },
            { text: 'RAC', link: 'right-awakening-camp' }
          ]
        }
      ]
    },
    {
      text: 'Training',
      collapsed: true,
      base: '/training#',
      items: [
        { text: 'What is Right Awakening?', link: 'right-awakening' },
        { text: 'Mindfulness Training', link: 'right-awakening-training' },
        { text: 'Mindfulness Therapy', link: 'right-awakening-therapy' },
        { text: 'Training Camp', link: 'right-awakening-camp' }
      ]
    },
    {
      text: 'Research',
      collapsed: true,
      base: '/research#',
      items: [
        { text: 'Goals', link: 'goals' },
        { text: 'Projects', link: 'projects' }
      ]
    },
    {
      text: 'About',
      collapsed: true,
      base: '/about#',
      items: [
        { text: 'Creator', link: 'creator' },
        { text: 'Team', link: 'team' },
        { text: 'Values', link: 'values' },
        { text: 'Careers', link: 'careers' }
      ]
    },
    { text: 'Blog', link: '/blog/' },
    { text: 'Copyright', link: '/open-source' },
    { text: 'Contact', link: '/contact' }
  ]
}