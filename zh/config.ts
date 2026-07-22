// ============================================================================
// 模块导入区
// ============================================================================

import { createRequire } from 'module'
import { defineAdditionalConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

// ============================================================================
// 中文版站点附加配置（覆盖全局配置中对应的英文配置）
// ============================================================================

export default defineAdditionalConfig({
  // 站点描述（用于 SEO 和社交媒体分享）
  description: '人类生命操作系统 - Human Life (Intelligence Agent) Operating System - HLOS',

  themeConfig: {
    // 顶部导航栏（调用 nav() 函数生成）
    nav: nav(),

    // 搜索功能配置（调用 searchOptions() 函数生成）
    search: { options: searchOptions() },

    // 侧边栏配置（按路径匹配不同的侧边栏内容）
    sidebar: {
      '/zh/': { base: '/zh/', items: sidebarMain() }
    },

    // 编辑链接（显示在页面底部，引导用户到 GitHub 编辑此页）
    editLink: {
      pattern: 'https://github.com/HumanLifeOS/humanlifeos.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    // 页脚版权信息
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © ${new Date().getFullYear()} 『天人合一科学实验室』`
    },

    // 文档底部上一页/下一页按钮文案
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 右侧页面大纲导航标题
    outline: {
      label: '页面导航'
    },

    // 最后更新时间标签
    lastUpdated: {
      text: '最后更新于'
    },

    // 404 页面配置
    notFound: {
      title: '页面未找到',
      quote:
        '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页'
    },

    // 各 UI 组件的中文文案
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容'
  }
})

// ============================================================================
// 导航栏配置函数
// 定义顶部导航栏的菜单项
// ============================================================================

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '首页',
      link: '/zh/',
      // activeMatch: 仅当 URL 精确匹配 /zh/ 时高亮"首页"
      activeMatch: '/zh/$'
    },
    {
      // 下拉菜单：白皮书栏目集合
      text: '关于',
      items: [
        { text: '缘起', link: '/zh/about/origin' },
        { text: '愿景', link: '/zh/about/vision' },
        { text: '创始人', link: '/zh/about/creator' },
        { text: '团队', link: '/zh/about/team' },
        { text: '博客', link: '/zh/about/blog'}
      ]
    },

    { text: '方法论', 
      items: [
        { text: '科学化', link: '/zh/methodology/scientific-approach' },
        { text: '生活化', link: '/zh/methodology/life-integration' },
        { text: '工程化', link: '/zh/methodology/engineering-implementation' },
        { text: '系统化', link: '/zh/methodology/systematic-framework' }
      ],
      },

    { text: '知识库', link: '/zh//knowledge/life-user-manual'},

    { text: '科研', link: '/zh/research', activeMatch: '/zh/research'},

    { text: '联系', link: '/zh/contact', activeMatch: '/zh/contact'}
  ]
}

// ============================================================================
// VitePress 官方指南侧边栏（保留参考，当前未使用）
// ============================================================================

function sidebarMain(): DefaultTheme.SidebarItem[] {
  return [

    { text: '关于',
      collapsed: true,
      base: '/zh/',
      items: [
        { text: '缘起', link: '/about/origin' },
        { text: '愿景', link: '/about/vision' },
        { text: '创始人', link: '/about/creator' },
        { text: '团队', link: '/about/team' }
      ]
    },

    { text: '方法论',
      collapsed: true,
      base: '/zh/',
      items: [
        { text: '科学化', link: '/methodology/scientific-approach' },
        { text: '生活化', link: '/methodology/life-integration' },
        { text: '工程化', link: '/methodology/engineering-implementation' },
        { text: '系统化', link: '/methodology/systematic-framework' }
      ]
    },

    {
      text: '知识库',
      collapsed: true,
      base: '/zh/knowledge/',
      items: [
        { text: '生命使用手册', link: 'life-user-manual' },
        { text: 'frontmatter 配置', link: 'frontmatter-config' },
        { text: '运行时 API', link: 'runtime-api' },
        { text: 'CLI', link: 'cli' },
        {
          text: '默认主题',
          collapsed: true,
          base: '/zh/knowledge/default-theme-',
          items: [
            { text: '概览', link: 'config' },
            { text: '导航栏', link: 'nav' },
            { text: '侧边栏', link: 'sidebar' },
            { text: '主页', link: 'home-page' },
            { text: '页脚', link: 'footer' },
            { text: '布局', link: 'layout' },
            { text: '徽章', link: 'badge' },
            { text: '团队页', link: 'team-page' },
            { text: '上下页链接', link: 'prev-next-links' },
            { text: '编辑链接', link: 'edit-link' },
            { text: '最后更新时间戳', link: 'last-updated' },
            { text: '搜索', link: 'search' },
            { text: 'Carbon Ads', link: 'carbon-ads' }
          ]
        },

      ]
    },

    { text: '科研',link: 'research' },

    { text: '联系', link: 'contact' }

  ]
}

// ============================================================================
// 搜索功能中文翻译配置函数
// 定义 Algolia 搜索和 AI 问答的所有界面文案
// ============================================================================

function searchOptions(): Partial<DefaultTheme.AlgoliaSearchOptions> {
  return {
    translations: {
      // 搜索按钮
      button: {
        buttonText: '搜索',
        buttonAriaLabel: '搜索'
      },
      // 搜索弹窗
      modal: {
        // 搜索框区域
        searchBox: {
          clearButtonTitle: '清除',
          clearButtonAriaLabel: '清除查询',
          closeButtonText: '关闭',
          closeButtonAriaLabel: '关闭',
          placeholderText: '搜索文档或向 AI 提问',
          placeholderTextAskAi: '再问一个问题...',
          placeholderTextAskAiStreaming: '正在回答...',
          searchInputLabel: '搜索',
          backToKeywordSearchButtonText: '返回关键词搜索',
          backToKeywordSearchButtonAriaLabel: '返回关键词搜索',
          newConversationPlaceholder: '提问',
          conversationHistoryTitle: '我的对话历史',
          startNewConversationText: '开始新的对话',
          viewConversationHistoryText: '对话历史',
          threadDepthErrorPlaceholder: '对话已达上限'
        },
        // 新对话欢迎页
        newConversation: {
          newConversationTitle: '我今天能帮你什么？',
          newConversationDescription:
            '我会搜索你的文档，快速帮你找到设置指南、功能细节和故障排除提示。'
        },
        // 弹窗底部
        footer: {
          selectText: '选择',
          submitQuestionText: '提交问题',
          selectKeyAriaLabel: '回车键',
          navigateText: '导航',
          navigateUpKeyAriaLabel: '向上箭头',
          navigateDownKeyAriaLabel: '向下箭头',
          closeText: '关闭',
          backToSearchText: '返回搜索',
          closeKeyAriaLabel: 'Esc 键',
          poweredByText: '搜索提供'
        },
        // 错误页面
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查网络连接。'
        },
        // 搜索起始页
        startScreen: {
          recentSearchesTitle: '最近',
          noRecentSearchesText: '暂无最近搜索',
          saveRecentSearchButtonTitle: '保存此搜索',
          removeRecentSearchButtonTitle: '从历史记录中移除此搜索',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除此搜索',
          recentConversationsTitle: '最近对话',
          removeRecentConversationButtonTitle: '从历史记录中移除此对话'
        },
        // 无结果页面
        noResultsScreen: {
          noResultsText: '未找到相关结果',
          suggestedQueryText: '尝试搜索',
          reportMissingResultsText: '认为此查询应该有结果？',
          reportMissingResultsLinkText: '告诉我们。'
        },
        // 搜索结果页面
        resultsScreen: {
          askAiPlaceholder: '询问 AI：',
          noResultsAskAiPlaceholder: '文档里没找到？让 Ask AI 帮忙：'
        },
        // AI 对话页面
        askAiScreen: {
          disclaimerText: '回答由 AI 生成，可能会出错。请核实。',
          relatedSourcesText: '相关来源',
          thinkingText: '思考中...',
          copyButtonText: '复制',
          copyButtonCopiedText: '已复制！',
          copyButtonTitle: '复制',
          likeButtonTitle: '喜欢',
          dislikeButtonTitle: '不喜欢',
          thanksForFeedbackText: '感谢你的反馈！',
          preToolCallText: '搜索中...',
          duringToolCallText: '搜索中...',
          afterToolCallText: '已搜索',
          stoppedStreamingText: '你已停止此回复',
          errorTitleText: '聊天错误',
          threadDepthExceededMessage: '为保持回答准确，此对话已关闭。',
          startNewConversationButtonText: '开始新的对话'
        }
      }
    },
    // AI 侧边栏面板配置
    askAi: {
      sidePanel: {
        // 侧边栏触发按钮
        button: {
          translations: {
            buttonText: '询问 AI',
            buttonAriaLabel: '询问 AI'
          }
        },
        // 侧边栏面板内容
        panel: {
          translations: {
            // 面板头部
            header: {
              title: '询问 AI',
              conversationHistoryTitle: '我的对话历史',
              newConversationText: '开始新的对话',
              viewConversationHistoryText: '对话历史'
            },
            // 提问输入框
            promptForm: {
              promptPlaceholderText: '提问',
              promptAnsweringText: '正在回答...',
              promptAskAnotherQuestionText: '再问一个问题',
              promptDisclaimerText: '回答由 AI 生成，可能会出错。',
              promptLabelText: '按回车发送，Shift+回车换行。',
              promptAriaLabelText: '问题输入'
            },
            // 对话屏幕
            conversationScreen: {
              preToolCallText: '搜索中...',
              searchingText: '搜索中...',
              toolCallResultText: '已搜索',
              conversationDisclaimer: '回答由 AI 生成，可能会出错。请核实。',
              reasoningText: '推理中...',
              thinkingText: '思考中...',
              relatedSourcesText: '相关来源',
              stoppedStreamingText: '你已停止此回复',
              copyButtonText: '复制',
              copyButtonCopiedText: '已复制！',
              likeButtonTitle: '喜欢',
              dislikeButtonTitle: '不喜欢',
              thanksForFeedbackText: '感谢你的反馈！',
              errorTitleText: '聊天错误'
            },
            // 新对话欢迎屏
            newConversationScreen: {
              titleText: '我今天能帮你什么？',
              introductionText:
                '我会搜索你的文档，快速帮你找到设置指南、功能细节和故障排除提示。'
            },
            // 底部 Logo 区域
            logo: {
              poweredByText: '搜索提供'
            }
          }
        }
      }
    }
  }
}