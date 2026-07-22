import { defineAdditionalConfig, type DefaultTheme } from 'vitepress'

export default defineAdditionalConfig({
  description: '人类生命操作系统 - Human Life (Intelligence Agent) Operating System - HLOS',

  themeConfig: {
    // 顶部导航栏
    nav: nav(),

    // 搜索配置
    search: {
      options: searchOptions()
    },

    // 中文侧边栏
    sidebar: {
      '/zh/': {
        base: '/zh/',
        items: sidebarMain()
      }
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/HumanLifeOS/humanlifeos.github.io/edit/main/:path',
      text: '在 GitHub 上编辑此页面'
    },

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © ${new Date().getFullYear()} 『天人合一科学实验室』`
    },

    // 文档翻页
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 页面导航
    outline: {
      label: '页面导航'
    },

    // 更新时间
    lastUpdated: {
      text: '最后更新于'
    },

    // 404
    notFound: {
      title: '页面未找到',
      quote: '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页'
    },

    // VitePress UI 中文化
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
// 导航栏配置
// ============================================================================

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: '首页', link: '/zh/', activeMatch: '/zh/$' },
    { text: '关于', link: '/zh/about/origin', activeMatch: '/zh/about' },
    { text: '方法论', link: '/zh/methodology/scientific-approach', activeMatch: '/zh/methodology' },
    { text: '知识库', link: '/zh/knowledge/life-user-manual', activeMatch: '/zh/knowledge' },
    { text: '科研', link: '/zh/research', activeMatch: '/zh/research' },
    { text: '联系', link: '/zh/contact', activeMatch: '/zh/contact' }
  ]
}

// ============================================================================
// 中文侧边栏
// ============================================================================

function sidebarMain(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '关于',
      collapsed: true,
      items: [
        { text: '缘起', link: '/about/origin' },
        { text: '愿景', link: '/about/vision' },
        { text: '创始人', link: '/about/creator' },
        { text: '团队', link: '/about/team' }
      ]
    },
    {
      text: '方法论',
      collapsed: true,
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
      items: [
        { text: '生命使用手册', link: '/knowledge/life-user-manual' },
        { text: 'frontmatter 配置', link: '/knowledge/frontmatter-config' },
        { text: '运行时 API', link: '/knowledge/runtime-api' },
        { text: 'CLI', link: '/knowledge/cli' }
      ]
    },
    { text: '科研', link: '/research' },
    { text: '联系', link: '/contact' }
  ]
}

// ============================================================================
// 搜索功能中文翻译配置
// ============================================================================

function searchOptions(): Partial<DefaultTheme.AlgoliaSearchOptions> {
  return {
    translations: {
      button: {
        buttonText: '搜索',
        buttonAriaLabel: '搜索'
      },

      modal: {
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

        newConversation: {
          newConversationTitle: '我今天能帮你什么？',
          newConversationDescription: '我会搜索你的文档，快速帮你找到设置指南、功能细节和故障排除提示。'
        },

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

        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查网络连接。'
        },

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

        noResultsScreen: {
          noResultsText: '未找到相关结果',
          suggestedQueryText: '尝试搜索',
          reportMissingResultsText: '认为此查询应该有结果？',
          reportMissingResultsLinkText: '告诉我们。'
        },

        resultsScreen: {
          askAiPlaceholder: '询问 AI：',
          noResultsAskAiPlaceholder: '文档里没找到？让 Ask AI 帮忙：'
        },

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

    askAi: {
      sidePanel: {
        button: {
          translations: {
            buttonText: '询问 AI',
            buttonAriaLabel: '询问 AI'
          }
        },

        panel: {
          translations: {
            header: {
              title: '询问 AI',
              conversationHistoryTitle: '我的对话历史',
              newConversationText: '开始新的对话',
              viewConversationHistoryText: '对话历史'
            },

            promptForm: {
              promptPlaceholderText: '提问',
              promptAnsweringText: '正在回答...',
              promptAskAnotherQuestionText: '再问一个问题',
              promptDisclaimerText: '回答由 AI 生成，可能会出错。',
              promptLabelText: '按回车发送，Shift+回车换行。',
              promptAriaLabelText: '问题输入'
            },

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

            newConversationScreen: {
              titleText: '我今天能帮你什么？',
              introductionText: '我会搜索你的文档，快速帮你找到设置指南、功能细节和故障排除提示。'
            },

            logo: {
              poweredByText: '搜索提供'
            }
          }
        }
      }
    }
  }
}