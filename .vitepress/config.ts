import {
  defineConfig,
  resolveSiteDataByRoute,
  type HeadConfig
} from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader
} from 'vitepress-plugin-group-icons'
import llmstxt from 'vitepress-plugin-llms'

// 判断是否为生产环境（通过环境变量 NETLIFY 判断）
const prod = !!process.env.NETLIFY
// 站点的基础 URL
const siteUrl = 'https://humanlifeos.com'

// Open Graph 图片的完整 URL
const ogImage = new URL('/vitepress-og.jpg', siteUrl).href

// 语言代码到 Open Graph 语言标签的映射
// 用于设置 og:locale 元数据
const localeToOgLocaleMap: Record<string, string> = {
  root: 'en_US',
  zh: 'zh_CN'
}

export default defineConfig({
  // 站点标题
  title: 'HumanLifeOS',

  // 基础路径（GitHub Pages 用户主页）
  base: '/',

  // URL 重写规则
  // 将 zh/ 开头的路径重写为根路径（使中文为默认语言）
  rewrites: {
    'zh/:rest*': ':rest*'
  },

  // 是否显示最后更新时间（基于 Git 提交时间）
  lastUpdated: true,

  // 忽略死链检查（知识库文档中包含指向 VitePress 官方文档的链接）
  ignoreDeadLinks: true,
  // 是否使用干净的 URL（不带 .html 后缀）
  cleanUrls: true,
  // 是否将元数据提取到单独的 chunk 中（优化缓存）
  metaChunk: true,

  // Markdown 相关配置
  markdown: {
    // 是否启用数学公式支持（需要安装 markdown-it-mathjax3）
    math: true,
    // 代码块转换器
    codeTransformers: [
      // 在演示中使用 `[!!code` 和 `@@include` 来防止转换，
      // 在这里将它们还原回正常格式。
      {
        postprocess(code) {
          return code
            .replaceAll('[!!code', '[!code')
            .replaceAll('@@include', '@include')
        }
      }
    ],
    // 自定义 Markdown 配置
    config(md) {
      // TODO: 当 https://github.com/vuejs/vitepress/issues/4431 修复后移除这段代码
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const { localeIndex = 'root' } = env
        // 根据当前语言设置代码复制按钮的标题
        const codeCopyButtonTitle = (() => {
          switch (localeIndex) {
            case 'zh':
              return '复制代码'
            default:
              return 'Copy code'
          }
        })()
        // 替换默认的复制按钮标题为当前语言的标题
        return fence(tokens, idx, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          `<button title="${codeCopyButtonTitle}" class="copy"></button>`
        )
      }
      // 使用组图标 Markdown 插件
      md.use(groupIconMdPlugin)
    }
  },

  // 站点地图配置
  sitemap: {
    // 站点域名
    hostname: siteUrl,
    // 转换站点地图条目（过滤掉迁移相关的页面）
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },

  // prettier-ignore: 告诉 Prettier 不要格式化这段代码
  // HTML head 配置（添加自定义 meta 标签、链接等）
  head: [
    // SVG 格式的站点图标
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/icon.png' }],
    // PNG 格式的站点图标（备用）
    ['link', { rel: 'icon', type: 'image/png', href: '/icon.png' }],
    // 浏览器主题颜色（地址栏颜色）
    ['meta', { name: 'theme-color', content: '#5f67ee' }]
  ],

  // 主题配置（默认主题的配置项）
  themeConfig: {

    // 社交链接（显示在导航栏）
    socialLinks: [
      { icon: 'github', link: 'https://github.com/HumanLifeOS/' }
    ],

    // 搜索配置
    search: {
      // 搜索服务提供商（algolia 或 local）
      provider: 'algolia',
      // Algolia DocSearch 配置
      options: {
        appId: '8J64VVRP8K',
        apiKey: '52f578a92b88ad6abde815aae2b0ad7c',
        indexName: 'vitepress',
        // AI 搜索功能配置
        askAi: {
          assistantId: 'YaVSonfX5bS8',
          sidePanel: true
        }
      }
    },

    // Carbon Ads 广告配置
    carbonAds: { code: 'CEBDT27Y', placement: 'vuejsorg' }
  },

  // 多语言配置
  locales: {
    root: { label: 'English', lang: 'en-US', dir: 'ltr' },
    zh: { label: '简体中文', lang: 'zh-Hans', dir: 'ltr' }
  },

  // Vite 构建配置
  vite: {
    plugins: [
      // 组图标 Vite 插件（用于自定义图标）
      groupIconVitePlugin({
        customIcon: {
          // 自定义 vitepress 图标
          vitepress: localIconLoader(
            import.meta.url,
            '../public/icon.png'
          ),
          // 使用 Iconify 的 firebase 图标
          firebase: 'logos:firebase'
        }
      }),
      // 生产环境下启用 LLM 文本插件（用于 AI 搜索索引）
      prod && llmstxt({ workDir: 'en', ignoreFiles: ['index.md'] })
    ],
    // Vite 实验性配置
    experimental: {
      // 启用原生插件支持
      enableNativePlugin: true
    }
  },

  // prettier-ignore: 告诉 Prettier 不要格式化这段代码
  // 页面数据转换钩子（用于添加 SEO 相关的 meta 标签）
  transformPageData: prod ? (pageData, ctx) => {
    // 生成页面的完整 URL
    const url = new URL(pageData.relativePath.replace(/(?:(^|\/)index)?\.md$/, '$1'), siteUrl).href
    // 根据路由解析站点数据
    const site = resolveSiteDataByRoute(ctx.siteConfig.site, pageData.relativePath)
    // 生成页面标题（如果页面有标题则拼接，否则使用站点标题）
    const title = pageData.title ? `${pageData.title} | VitePress` : site.title
    // 获取页面描述（优先使用页面描述，否则使用站点描述）
    const description = pageData.description || site.description
    // 获取当前语言的 Open Graph 标签
    const locale = localeToOgLocaleMap[site.localeIndex || 'root']

    // 向页面的 head 添加 Open Graph 相关的 meta 标签
    ;((pageData.frontmatter.head ??= []) as HeadConfig[]).push(
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:locale', content: locale }],
      ['meta', { property: 'og:site_name', content: 'VitePress' }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { property: 'og:image:secure_url', content: ogImage }],
      ['meta', { property: 'og:image:type', content: 'image/jpeg' }],
      ['meta', { property: 'og:image:width', content: '1280' }],
      ['meta', { property: 'og:image:height', content: '640' }],
      ['meta', { property: 'og:image:alt', content: 'VitePress' }],
      ['link', { rel: 'canonical', href: url }]
    )
  } : undefined
})
