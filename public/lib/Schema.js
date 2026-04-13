/**
 * MarkHTML Style Scheme Schema v3.0
 * Simplified Style Configuration Definition
 */

// 当前 Schema 版本
export const SCHEMA_VERSION = '3.0.0';

// 完整的样式方案结构
export const StyleSchemeSchema = {
  // === 元数据 ===
  meta: {
    id: '',
    name: '未命名方案',
    description: '',
    author: '',
    version: '1.0.0',
    createdAt: '',
    updatedAt: '',
    tags: []
  },
  
  // === 颜色系统 ===
  colors: {
    // 基础色
    base: {
      bg: '#ffffff',
      bgSurface: '#f6f8fa',
      bgElevated: '#eaeef2',
      textBase: '#24292f',
      textMuted: '#57606a',
      textSubtle: '#8c959f',
      borderDefault: '#d0d7de',
      borderMuted: '#eaeef2'
    },
    // 强调色
    accent: {
      primary: '#0969da',
      primaryHover: '#0550ae',
      primaryBg: '#ddf4ff',
      primaryBorder: '#54aeff'
    },
    // 组件色
    component: {
      heading: '#1f2328',
      codeBg: '#f6f8fa',
      codeText: '#24292f',
      quoteBorder: '#0969da',
      link: '#0969da',
      linkHover: '#0550ae',
      hr: '#d0d7de',
      markBg: '#fff3cd',
      markText: '#24292f',
      thBg: '#f6f8fa'
    },
    // 语义色
    semantic: {
      success: '#1a7f37',
      successBg: '#dafbe1',
      warning: '#bf8700',
      warningBg: '#fff8c5',
      danger: '#cf222e',
      dangerBg: '#ffebe9',
      info: '#0969da',
      infoBg: '#ddf4ff'
    },
    // Callout 颜色
    callout: {
      warningBg: '#fff8c5',
      warningBorder: '#bf8700',
      infoBg: '#ddf4ff',
      infoBorder: '#0969da',
      tipBg: '#dafbe1',
      tipBorder: '#1a7f37',
      dangerBg: '#ffebe9',
      dangerBorder: '#cf222e'
    },
    // 编辑器颜色
    editor: {
      bg: '#ffffff',
      text: '#24292f'
    }
  },
  
  // === 布局系统 ===
  layout: {
    font: {
      family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      codeFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
      baseSize: 16,
      lineHeight: 1.7,
      fontWeight: 400
    },
    spacing: {
      paragraph: 16,
      heading: 24
    },
    sizing: {
      maxWidth: 900
    }
  },
  
  // === 组件样式 ===
  components: {
    code: {
      padding: 16,
      radius: 6,
      fontScale: 0.9,
      lineHeight: 1.6,
      showLang: true
    },
    quote: {
      borderWidth: 4,
      radius: 6
    },
    table: {
      striped: true
    },
    heading: {
      h1Size: 2.0,
      h2Size: 1.5,
      h3Size: 1.25
    }
  },
  
  // === 高级设置 ===
  advanced: {
    editorTheme: 'vs',
    highlightTheme: 'github'
  }
};

// 主题类型
export const ThemeTypes = {
  LIGHT: 'light',
  DARK: 'dark'
};

/**
 * 简化的配置路径定义
 */
export const ConfigPaths = {
  // Colors
  'colors.base.bg': { label: 'Background', type: 'color', group: 'colors' },
  'colors.base.textBase': { label: 'Text', type: 'color', group: 'colors' },
  'colors.base.bgSurface': { label: 'Surface', type: 'color', group: 'colors' },
  'colors.accent.primary': { label: 'Primary', type: 'color', group: 'colors' },
  'colors.component.heading': { label: 'Heading', type: 'color', group: 'colors' },
  'colors.component.codeBg': { label: 'Code Background', type: 'color', group: 'colors' },
  'colors.component.codeText': { label: 'Code Text', type: 'color', group: 'colors' },
  'colors.component.link': { label: 'Link', type: 'color', group: 'colors' },
  
  // Font
  'layout.font.family': { label: 'Body Font', type: 'select', options: ['system', 'serif', 'inter', 'source-han'], group: 'font' },
  'layout.font.codeFamily': { label: 'Code Font', type: 'select', options: ['jetbrains', 'fira', 'consolas', 'source-code'], group: 'font' },
  'layout.font.baseSize': { label: 'Font Size', type: 'range', min: 12, max: 24, step: 1, unit: 'px', group: 'font' },
  'layout.font.lineHeight': { label: 'Line Height', type: 'range', min: 1.4, max: 2.2, step: 0.1, group: 'font' },
  
  // Spacing
  'layout.spacing.paragraph': { label: 'Paragraph Spacing', type: 'range', min: 8, max: 32, step: 2, unit: 'px', group: 'layout' }
};

/**
 * 配置分组定义
 */
export const ConfigGroups = {
  colors: { label: 'Colors', icon: '🎨', order: 1 },
  font: { label: 'Font', icon: '🔤', order: 2 },
  layout: { label: 'Layout', icon: '📐', order: 3 }
};

// 预设主题定义
export const PresetThemes = {
  // ========== 浅色主题 ==========
  'github-light': {
    meta: {
      id: 'github-light',
      name: 'GitHub Light',
      description: '经典的 GitHub 浅色主题',
      author: 'GitHub',
      tags: ['light', 'professional']
    },
    colors: {
      base: {
        bg: '#ffffff',
        bgSurface: '#f6f8fa',
        bgElevated: '#eaeef2',
        textBase: '#1f2328',
        textMuted: '#656d76',
        textSubtle: '#8c959f',
        borderDefault: '#d1d9e0',
        borderMuted: '#eaeef2'
      },
      accent: {
        primary: '#0969da',
        primaryHover: '#0550ae',
        primaryBg: '#ddf4ff',
        primaryBorder: '#54aeff'
      },
      component: {
        heading: '#1f2328',
        codeBg: '#f6f8fa',
        codeText: '#1f2328',
        quoteBorder: '#0969da',
        link: '#0969da',
        linkHover: '#0550ae',
        hr: '#d1d9e0',
        markBg: '#fff3cd',
        markText: '#1f2328',
        thBg: '#f6f8fa'
      },
      semantic: {
        success: '#1a7f37',
        successBg: '#dafbe1',
        warning: '#bf8700',
        warningBg: '#fff8c5',
        danger: '#cf222e',
        dangerBg: '#ffebe9',
        info: '#0969da',
        infoBg: '#ddf4ff'
      },
      callout: {
        warningBg: '#fff8c5',
        warningBorder: '#bf8700',
        infoBg: '#ddf4ff',
        infoBorder: '#0969da',
        tipBg: '#dafbe1',
        tipBorder: '#1a7f37',
        dangerBg: '#ffebe9',
        dangerBorder: '#cf222e'
      },
      editor: { bg: '#ffffff', text: '#1f2328' }
    },
    advanced: { editorTheme: 'vs', highlightTheme: 'github' }
  },
  
  'academic': {
    meta: {
      id: 'academic',
      name: 'Academic',
      description: '学术风格浅色主题，适合论文和文档',
      author: 'MarkHTML',
      tags: ['light', 'academic', 'serif']
    },
    colors: {
      base: {
        bg: '#fefefe',
        bgSurface: '#f8f9fa',
        bgElevated: '#e9ecef',
        textBase: '#212529',
        textMuted: '#495057',
        textSubtle: '#6c757d',
        borderDefault: '#dee2e6',
        borderMuted: '#e9ecef'
      },
      accent: {
        primary: '#0066cc',
        primaryHover: '#004999',
        primaryBg: '#e6f0ff',
        primaryBorder: '#0066cc'
      },
      component: {
        heading: '#212529',
        codeBg: '#f8f9fa',
        codeText: '#212529',
        quoteBorder: '#0066cc',
        link: '#0066cc',
        linkHover: '#004999',
        hr: '#dee2e6',
        markBg: '#fff3cd',
        markText: '#212529',
        thBg: '#f8f9fa'
      },
      semantic: {
        success: '#198754',
        successBg: '#d1e7dd',
        warning: '#ffc107',
        warningBg: '#fff3cd',
        danger: '#dc3545',
        dangerBg: '#f8d7da',
        info: '#0dcaf0',
        infoBg: '#cff4fc'
      },
      callout: {
        warningBg: '#fff3cd',
        warningBorder: '#ffc107',
        infoBg: '#cff4fc',
        infoBorder: '#0dcaf0',
        tipBg: '#d1e7dd',
        tipBorder: '#198754',
        dangerBg: '#f8d7da',
        dangerBorder: '#dc3545'
      },
      editor: { bg: '#fefefe', text: '#212529' }
    },
    layout: {
      font: {
        family: "Georgia, 'Times New Roman', serif",
        codeFamily: "'JetBrains Mono', Consolas, monospace",
        baseSize: 16,
        lineHeight: 1.8,
        fontWeight: 400
      }
    },
    advanced: { editorTheme: 'vs', highlightTheme: 'github' }
  },
  
  'one-light': {
    meta: {
      id: 'one-light',
      name: 'One Light',
      description: 'Atom One Light 主题',
      author: 'Atom',
      tags: ['light', 'clean']
    },
    colors: {
      base: {
        bg: '#fafafa',
        bgSurface: '#f3f3f3',
        bgElevated: '#e5e5e5',
        textBase: '#383a42',
        textMuted: '#696c77',
        textSubtle: '#a0a1a7',
        borderDefault: '#d8d8d8',
        borderMuted: '#e5e5e5'
      },
      accent: {
        primary: '#4078f2',
        primaryHover: '#0184bc',
        primaryBg: '#4078f233',
        primaryBorder: '#4078f2'
      },
      component: {
        heading: '#383a42',
        codeBg: '#f3f3f3',
        codeText: '#383a42',
        quoteBorder: '#4078f2',
        link: '#4078f2',
        linkHover: '#0184bc',
        hr: '#d8d8d8',
        markBg: '#c1840133',
        markText: '#383a42',
        thBg: '#f3f3f3'
      },
      semantic: {
        success: '#50a14f',
        successBg: '#50a14f33',
        warning: '#c18401',
        warningBg: '#c1840133',
        danger: '#e45649',
        dangerBg: '#e4564933',
        info: '#0184bc',
        infoBg: '#0184bc33'
      },
      callout: {
        warningBg: '#c1840133',
        warningBorder: '#c18401',
        infoBg: '#0184bc33',
        infoBorder: '#0184bc',
        tipBg: '#50a14f33',
        tipBorder: '#50a14f',
        dangerBg: '#e4564933',
        dangerBorder: '#e45649'
      },
      editor: { bg: '#fafafa', text: '#383a42' }
    },
    advanced: { editorTheme: 'vs', highlightTheme: 'atom-one-light' }
  },
  
  'gruvbox-light': {
    meta: {
      id: 'gruvbox-light',
      name: 'Gruvbox Light',
      description: 'Gruvbox 浅色主题',
      author: 'morhetz',
      tags: ['light', 'warm', 'retro']
    },
    colors: {
      base: {
        bg: '#fbf1c7',
        bgSurface: '#f2e5bc',
        bgElevated: '#ebdbb2',
        textBase: '#3c3836',
        textMuted: '#665c54',
        textSubtle: '#928374',
        borderDefault: '#d5c4a1',
        borderMuted: '#ebdbb2'
      },
      accent: {
        primary: '#458588',
        primaryHover: '#076678',
        primaryBg: '#45858833',
        primaryBorder: '#458588'
      },
      component: {
        heading: '#3c3836',
        codeBg: '#f2e5bc',
        codeText: '#3c3836',
        quoteBorder: '#d65d0e',
        link: '#458588',
        linkHover: '#076678',
        hr: '#d5c4a1',
        markBg: '#b5761433',
        markText: '#3c3836',
        thBg: '#f2e5bc'
      },
      semantic: {
        success: '#79740e',
        successBg: '#79740e33',
        warning: '#b57614',
        warningBg: '#b5761433',
        danger: '#9d0006',
        dangerBg: '#9d000633',
        info: '#076678',
        infoBg: '#07667833'
      },
      callout: {
        warningBg: '#b5761433',
        warningBorder: '#b57614',
        infoBg: '#07667833',
        infoBorder: '#076678',
        tipBg: '#79740e33',
        tipBorder: '#79740e',
        dangerBg: '#9d000633',
        dangerBorder: '#9d0006'
      },
      editor: { bg: '#fbf1c7', text: '#3c3836' }
    },
    advanced: { editorTheme: 'vs', highlightTheme: 'github' }
  },
  
  'catppuccin-latte': {
    meta: {
      id: 'catppuccin-latte',
      name: 'Catppuccin Latte',
      description: 'Catppuccin 浅色主题',
      author: 'Catppuccin',
      tags: ['light', 'pastel', 'soothing']
    },
    colors: {
      base: {
        bg: '#eff1f5',
        bgSurface: '#e6e9ef',
        bgElevated: '#ccd0da',
        textBase: '#4c4f69',
        textMuted: '#6c6f85',
        textSubtle: '#8c8fa1',
        borderDefault: '#bcc0cc',
        borderMuted: '#ccd0da'
      },
      accent: {
        primary: '#1e66f5',
        primaryHover: '#7287fd',
        primaryBg: '#1e66f533',
        primaryBorder: '#1e66f5'
      },
      component: {
        heading: '#4c4f69',
        codeBg: '#e6e9ef',
        codeText: '#4c4f69',
        quoteBorder: '#8839ef',
        link: '#1e66f5',
        linkHover: '#7287fd',
        hr: '#bcc0cc',
        markBg: '#df8e1d33',
        markText: '#4c4f69',
        thBg: '#e6e9ef'
      },
      semantic: {
        success: '#40a02b',
        successBg: '#40a02b33',
        warning: '#df8e1d',
        warningBg: '#df8e1d33',
        danger: '#d20f39',
        dangerBg: '#d20f3933',
        info: '#179299',
        infoBg: '#17929933'
      },
      callout: {
        warningBg: '#df8e1d33',
        warningBorder: '#df8e1d',
        infoBg: '#17929933',
        infoBorder: '#179299',
        tipBg: '#40a02b33',
        tipBorder: '#40a02b',
        dangerBg: '#d20f3933',
        dangerBorder: '#d20f39'
      },
      editor: { bg: '#eff1f5', text: '#4c4f69' }
    },
    advanced: { editorTheme: 'vs', highlightTheme: 'github' }
  },
  
  'material-light': {
    meta: {
      id: 'material-light',
      name: 'Material Light',
      description: 'Material Design 浅色主题',
      author: 'Google',
      tags: ['light', 'material', 'clean']
    },
    colors: {
      base: {
        bg: '#ffffff',
        bgSurface: '#f5f5f5',
        bgElevated: '#eeeeee',
        textBase: '#212121',
        textMuted: '#757575',
        textSubtle: '#9e9e9e',
        borderDefault: '#e0e0e0',
        borderMuted: '#eeeeee'
      },
      accent: {
        primary: '#1976d2',
        primaryHover: '#1565c0',
        primaryBg: '#e3f2fd',
        primaryBorder: '#1976d2'
      },
      component: {
        heading: '#212121',
        codeBg: '#f5f5f5',
        codeText: '#212121',
        quoteBorder: '#1976d2',
        link: '#1976d2',
        linkHover: '#1565c0',
        hr: '#e0e0e0',
        markBg: '#fff3e0',
        markText: '#212121',
        thBg: '#f5f5f5'
      },
      semantic: {
        success: '#388e3c',
        successBg: '#e8f5e9',
        warning: '#f57c00',
        warningBg: '#fff3e0',
        danger: '#d32f2f',
        dangerBg: '#ffebee',
        info: '#1976d2',
        infoBg: '#e3f2fd'
      },
      callout: {
        warningBg: '#fff3e0',
        warningBorder: '#f57c00',
        infoBg: '#e3f2fd',
        infoBorder: '#1976d2',
        tipBg: '#e8f5e9',
        tipBorder: '#388e3c',
        dangerBg: '#ffebee',
        dangerBorder: '#d32f2f'
      },
      editor: { bg: '#ffffff', text: '#212121' }
    },
    advanced: { editorTheme: 'vs', highlightTheme: 'github' }
  },
  
  // ========== 深色主题 ==========
  'github-dark': {
    meta: {
      id: 'github-dark',
      name: 'GitHub Dark',
      description: '经典的 GitHub 深色主题',
      author: 'GitHub',
      tags: ['dark', 'professional']
    },
    colors: {
      base: {
        bg: '#0d1117',
        bgSurface: '#161b22',
        bgElevated: '#21262d',
        textBase: '#e6edf3',
        textMuted: '#7d8590',
        textSubtle: '#6e7681',
        borderDefault: '#30363d',
        borderMuted: '#21262d'
      },
      accent: {
        primary: '#58a6ff',
        primaryHover: '#79c0ff',
        primaryBg: '#1f6feb33',
        primaryBorder: '#58a6ff'
      },
      component: {
        heading: '#e6edf3',
        codeBg: '#161b22',
        codeText: '#e6edf3',
        quoteBorder: '#58a6ff',
        link: '#58a6ff',
        linkHover: '#79c0ff',
        hr: '#30363d',
        markBg: '#4d2d00',
        markText: '#ffb86c',
        thBg: '#161b22'
      },
      semantic: {
        success: '#3fb950',
        successBg: '#23863633',
        warning: '#d29922',
        warningBg: '#4d2d0033',
        danger: '#f85149',
        dangerBg: '#f8514933',
        info: '#58a6ff',
        infoBg: '#1f6feb33'
      },
      callout: {
        warningBg: '#4d2d0033',
        warningBorder: '#d29922',
        infoBg: '#1f6feb33',
        infoBorder: '#58a6ff',
        tipBg: '#23863633',
        tipBorder: '#3fb950',
        dangerBg: '#f8514933',
        dangerBorder: '#f85149'
      },
      editor: { bg: '#0d1117', text: '#e6edf3' }
    },
    advanced: { editorTheme: 'vs-dark', highlightTheme: 'github-dark' }
  },
  
  'nord': {
    meta: {
      id: 'nord',
      name: 'Nord',
      description: '北极风格深色主题，冷色调优雅',
      author: 'Nord Theme',
      tags: ['dark', 'cold', 'elegant']
    },
    colors: {
      base: {
        bg: '#2e3440',
        bgSurface: '#3b4252',
        bgElevated: '#434c5e',
        textBase: '#eceff4',
        textMuted: '#d8dee9',
        textSubtle: '#4c566a',
        borderDefault: '#4c566a',
        borderMuted: '#3b4252'
      },
      accent: {
        primary: '#88c0d0',
        primaryHover: '#81a1c1',
        primaryBg: '#88c0d033',
        primaryBorder: '#88c0d0'
      },
      component: {
        heading: '#eceff4',
        codeBg: '#3b4252',
        codeText: '#eceff4',
        quoteBorder: '#81a1c1',
        link: '#88c0d0',
        linkHover: '#81a1c1',
        hr: '#4c566a',
        markBg: '#ebcb8b',
        markText: '#2e3440',
        thBg: '#3b4252'
      },
      semantic: {
        success: '#a3be8c',
        successBg: '#a3be8c33',
        warning: '#ebcb8b',
        warningBg: '#ebcb8b33',
        danger: '#bf616a',
        dangerBg: '#bf616a33',
        info: '#81a1c1',
        infoBg: '#81a1c133'
      },
      callout: {
        warningBg: '#ebcb8b33',
        warningBorder: '#ebcb8b',
        infoBg: '#81a1c133',
        infoBorder: '#81a1c1',
        tipBg: '#a3be8c33',
        tipBorder: '#a3be8c',
        dangerBg: '#bf616a33',
        dangerBorder: '#bf616a'
      },
      editor: { bg: '#2e3440', text: '#eceff4' }
    },
    advanced: { editorTheme: 'vs-dark', highlightTheme: 'nord' }
  },
  
  'monokai': {
    meta: {
      id: 'monokai',
      name: 'Monokai',
      description: '经典的代码编辑器深色主题',
      author: 'Monokai',
      tags: ['dark', 'classic', 'developer']
    },
    colors: {
      base: {
        bg: '#272822',
        bgSurface: '#1e1f1c',
        bgElevated: '#3e3d32',
        textBase: '#f8f8f2',
        textMuted: '#a6a69b',
        textSubtle: '#75715e',
        borderDefault: '#49483e',
        borderMuted: '#3e3d32'
      },
      accent: {
        primary: '#a6e22e',
        primaryHover: '#c2f54c',
        primaryBg: '#a6e22e33',
        primaryBorder: '#a6e22e'
      },
      component: {
        heading: '#f8f8f2',
        codeBg: '#1e1f1c',
        codeText: '#f8f8f2',
        quoteBorder: '#66d9ef',
        link: '#a6e22e',
        linkHover: '#c2f54c',
        hr: '#49483e',
        markBg: '#e6db74',
        markText: '#272822',
        thBg: '#1e1f1c'
      },
      semantic: {
        success: '#a6e22e',
        successBg: '#a6e22e33',
        warning: '#e6db74',
        warningBg: '#e6db7433',
        danger: '#f92672',
        dangerBg: '#f9267233',
        info: '#66d9ef',
        infoBg: '#66d9ef33'
      },
      callout: {
        warningBg: '#e6db7433',
        warningBorder: '#e6db74',
        infoBg: '#66d9ef33',
        infoBorder: '#66d9ef',
        tipBg: '#a6e22e33',
        tipBorder: '#a6e22e',
        dangerBg: '#f9267233',
        dangerBorder: '#f92672'
      },
      editor: { bg: '#272822', text: '#f8f8f2' }
    },
    advanced: { editorTheme: 'vs-dark', highlightTheme: 'monokai' }
  },
  
  'one-dark': {
    meta: {
      id: 'one-dark',
      name: 'One Dark',
      description: 'Atom One Dark 主题',
      author: 'Atom',
      tags: ['dark', 'clean']
    },
    colors: {
      base: {
        bg: '#282c34',
        bgSurface: '#21252b',
        bgElevated: '#3a3f4b',
        textBase: '#abb2bf',
        textMuted: '#5c6370',
        textSubtle: '#4b5263',
        borderDefault: '#3e4451',
        borderMuted: '#21252b'
      },
      accent: {
        primary: '#61afef',
        primaryHover: '#528bff',
        primaryBg: '#61afef33',
        primaryBorder: '#61afef'
      },
      component: {
        heading: '#abb2bf',
        codeBg: '#21252b',
        codeText: '#abb2bf',
        quoteBorder: '#528bff',
        link: '#61afef',
        linkHover: '#528bff',
        hr: '#3e4451',
        markBg: '#e5c07b',
        markText: '#282c34',
        thBg: '#21252b'
      },
      semantic: {
        success: '#98c379',
        successBg: '#98c37933',
        warning: '#e5c07b',
        warningBg: '#e5c07b33',
        danger: '#e06c75',
        dangerBg: '#e06c7533',
        info: '#56b6c2',
        infoBg: '#56b6c233'
      },
      callout: {
        warningBg: '#e5c07b33',
        warningBorder: '#e5c07b',
        infoBg: '#56b6c233',
        infoBorder: '#56b6c2',
        tipBg: '#98c37933',
        tipBorder: '#98c379',
        dangerBg: '#e06c7533',
        dangerBorder: '#e06c75'
      },
      editor: { bg: '#282c34', text: '#abb2bf' }
    },
    advanced: { editorTheme: 'vs-dark', highlightTheme: 'atom-one-dark' }
  },
  
  'tokyo-night': {
    meta: {
      id: 'tokyo-night',
      name: 'Tokyo Night',
      description: '东京夜景主题',
      author: 'Eniola Ademola',
      tags: ['dark', 'city', 'neon']
    },
    colors: {
      base: {
        bg: '#1a1b26',
        bgSurface: '#16161e',
        bgElevated: '#24283b',
        textBase: '#c0caf5',
        textMuted: '#565f89',
        textSubtle: '#414868',
        borderDefault: '#414868',
        borderMuted: '#24283b'
      },
      accent: {
        primary: '#7aa2f7',
        primaryHover: '#7dcfff',
        primaryBg: '#7aa2f733',
        primaryBorder: '#7aa2f7'
      },
      component: {
        heading: '#c0caf5',
        codeBg: '#16161e',
        codeText: '#c0caf5',
        quoteBorder: '#bb9af7',
        link: '#7aa2f7',
        linkHover: '#7dcfff',
        hr: '#414868',
        markBg: '#e0af68',
        markText: '#1a1b26',
        thBg: '#16161e'
      },
      semantic: {
        success: '#9ece6a',
        successBg: '#9ece6a33',
        warning: '#e0af68',
        warningBg: '#e0af6833',
        danger: '#f7768e',
        dangerBg: '#f7768e33',
        info: '#7dcfff',
        infoBg: '#7dcfff33'
      },
      callout: {
        warningBg: '#e0af6833',
        warningBorder: '#e0af68',
        infoBg: '#7dcfff33',
        infoBorder: '#7dcfff',
        tipBg: '#9ece6a33',
        tipBorder: '#9ece6a',
        dangerBg: '#f7768e33',
        dangerBorder: '#f7768e'
      },
      editor: { bg: '#1a1b26', text: '#c0caf5' }
    },
    advanced: { editorTheme: 'vs-dark', highlightTheme: 'tokyo-night' }
  },
  
  'gruvbox-dark': {
    meta: {
      id: 'gruvbox-dark',
      name: 'Gruvbox Dark',
      description: 'Gruvbox 深色主题',
      author: 'morhetz',
      tags: ['dark', 'warm', 'retro']
    },
    colors: {
      base: {
        bg: '#282828',
        bgSurface: '#1d2021',
        bgElevated: '#3c3836',
        textBase: '#ebdbb2',
        textMuted: '#a89984',
        textSubtle: '#665c54',
        borderDefault: '#3c3836',
        borderMuted: '#1d2021'
      },
      accent: {
        primary: '#fe8019',
        primaryHover: '#fabd2f',
        primaryBg: '#fe801933',
        primaryBorder: '#fe8019'
      },
      component: {
        heading: '#ebdbb2',
        codeBg: '#1d2021',
        codeText: '#ebdbb2',
        quoteBorder: '#d65d0e',
        link: '#fe8019',
        linkHover: '#fabd2f',
        hr: '#3c3836',
        markBg: '#fabd2f',
        markText: '#282828',
        thBg: '#1d2021'
      },
      semantic: {
        success: '#b8bb26',
        successBg: '#b8bb2633',
        warning: '#fabd2f',
        warningBg: '#fabd2f33',
        danger: '#fb4934',
        dangerBg: '#fb493433',
        info: '#83a598',
        infoBg: '#83a59833'
      },
      callout: {
        warningBg: '#fabd2f33',
        warningBorder: '#fabd2f',
        infoBg: '#83a59833',
        infoBorder: '#83a598',
        tipBg: '#b8bb2633',
        tipBorder: '#b8bb26',
        dangerBg: '#fb493433',
        dangerBorder: '#fb4934'
      },
      editor: { bg: '#282828', text: '#ebdbb2' }
    },
    advanced: { editorTheme: 'vs-dark', highlightTheme: 'github-dark' }
  },
  
  'catppuccin-mocha': {
    meta: {
      id: 'catppuccin-mocha',
      name: 'Catppuccin Mocha',
      description: 'Catppuccin 深色主题',
      author: 'Catppuccin',
      tags: ['dark', 'pastel', 'soothing']
    },
    colors: {
      base: {
        bg: '#1e1e2e',
        bgSurface: '#181825',
        bgElevated: '#313244',
        textBase: '#cdd6f4',
        textMuted: '#a6adc8',
        textSubtle: '#6c7086',
        borderDefault: '#45475a',
        borderMuted: '#313244'
      },
      accent: {
        primary: '#cba6f7',
        primaryHover: '#f5c2e7',
        primaryBg: '#cba6f733',
        primaryBorder: '#cba6f7'
      },
      component: {
        heading: '#cdd6f4',
        codeBg: '#181825',
        codeText: '#cdd6f4',
        quoteBorder: '#f5c2e7',
        link: '#cba6f7',
        linkHover: '#f5c2e7',
        hr: '#45475a',
        markBg: '#f9e2af',
        markText: '#1e1e2e',
        thBg: '#181825'
      },
      semantic: {
        success: '#a6e3a1',
        successBg: '#a6e3a133',
        warning: '#f9e2af',
        warningBg: '#f9e2af33',
        danger: '#f38ba8',
        dangerBg: '#f38ba833',
        info: '#89dceb',
        infoBg: '#89dceb33'
      },
      callout: {
        warningBg: '#f9e2af33',
        warningBorder: '#f9e2af',
        infoBg: '#89dceb33',
        infoBorder: '#89dceb',
        tipBg: '#a6e3a133',
        tipBorder: '#a6e3a1',
        dangerBg: '#f38ba833',
        dangerBorder: '#f38ba8'
      },
      editor: { bg: '#1e1e2e', text: '#cdd6f4' }
    },
    advanced: { editorTheme: 'vs-dark', highlightTheme: 'github-dark' }
  },
  
  'material-dark': {
    meta: {
      id: 'material-dark',
      name: 'Material Dark',
      description: 'Material Design 深色主题',
      author: 'Google',
      tags: ['dark', 'material', 'clean']
    },
    colors: {
      base: {
        bg: '#121212',
        bgSurface: '#1e1e1e',
        bgElevated: '#2d2d2d',
        textBase: '#e4e4e4',
        textMuted: '#a0a0a0',
        textSubtle: '#6e6e6e',
        borderDefault: '#3d3d3d',
        borderMuted: '#2d2d2d'
      },
      accent: {
        primary: '#82b1ff',
        primaryHover: '#448aff',
        primaryBg: '#82b1ff33',
        primaryBorder: '#82b1ff'
      },
      component: {
        heading: '#e4e4e4',
        codeBg: '#1e1e1e',
        codeText: '#e4e4e4',
        quoteBorder: '#82b1ff',
        link: '#82b1ff',
        linkHover: '#448aff',
        hr: '#3d3d3d',
        markBg: '#ffd740',
        markText: '#121212',
        thBg: '#1e1e1e'
      },
      semantic: {
        success: '#69f0ae',
        successBg: '#69f0ae33',
        warning: '#ffd740',
        warningBg: '#ffd74033',
        danger: '#ff5252',
        dangerBg: '#ff525233',
        info: '#40c4ff',
        infoBg: '#40c4ff33'
      },
      callout: {
        warningBg: '#ffd74033',
        warningBorder: '#ffd740',
        infoBg: '#40c4ff33',
        infoBorder: '#40c4ff',
        tipBg: '#69f0ae33',
        tipBorder: '#69f0ae',
        dangerBg: '#ff525233',
        dangerBorder: '#ff5252'
      },
      editor: { bg: '#121212', text: '#e4e4e4' }
    },
    advanced: { editorTheme: 'vs-dark', highlightTheme: 'github-dark' }
  },
  
  // ========== 新增主题 ==========
  'ayu-light': {
    meta: {
      id: 'ayu-light',
      name: 'Ayu Light',
      description: 'Ayu 浅色主题，温暖舒适的配色',
      author: 'Ayu',
      tags: ['light', 'warm', 'comfortable']
    },
    colors: {
      base: {
        bg: '#fafafa',
        bgSurface: '#f3f3f3',
        bgElevated: '#e8e8e8',
        textBase: '#5c6166',
        textMuted: '#8a9199',
        textSubtle: '#b3b9bf',
        borderDefault: '#d9d9d9',
        borderMuted: '#e8e8e8'
      },
      accent: {
        primary: '#ff9940',
        primaryHover: '#f0ae53',
        primaryBg: '#ff994033',
        primaryBorder: '#ff9940'
      },
      component: {
        heading: '#5c6166',
        codeBg: '#f3f3f3',
        codeText: '#5c6166',
        quoteBorder: '#ff9940',
        link: '#ff9940',
        linkHover: '#f0ae53',
        hr: '#d9d9d9',
        markBg: '#f0ae53',
        markText: '#5c6166',
        thBg: '#f3f3f3'
      },
      semantic: {
        success: '#86b300',
        successBg: '#86b30033',
        warning: '#f2ae49',
        warningBg: '#f2ae4933',
        danger: '#f51818',
        dangerBg: '#f5181833',
        info: '#55b4d4',
        infoBg: '#55b4d433'
      },
      callout: {
        warningBg: '#f2ae4933',
        warningBorder: '#f2ae49',
        infoBg: '#55b4d433',
        infoBorder: '#55b4d4',
        tipBg: '#86b30033',
        tipBorder: '#86b300',
        dangerBg: '#f5181833',
        dangerBorder: '#f51818'
      },
      editor: { bg: '#fafafa', text: '#5c6166' }
    },
    advanced: { editorTheme: 'vs', highlightTheme: 'github' }
  },
  
  'ayu-dark': {
    meta: {
      id: 'ayu-dark',
      name: 'Ayu Dark',
      description: 'Ayu 深色主题，优雅的暗色调',
      author: 'Ayu',
      tags: ['dark', 'elegant', 'warm']
    },
    colors: {
      base: {
        bg: '#0f1419',
        bgSurface: '#131820',
        bgElevated: '#1a1f29',
        textBase: '#e6e1cf',
        textMuted: '#8a9199',
        textSubtle: '#5c6166',
        borderDefault: '#1a1f29',
        borderMuted: '#131820'
      },
      accent: {
        primary: '#ff9940',
        primaryHover: '#ffb366',
        primaryBg: '#ff994033',
        primaryBorder: '#ff9940'
      },
      component: {
        heading: '#e6e1cf',
        codeBg: '#131820',
        codeText: '#e6e1cf',
        quoteBorder: '#ff9940',
        link: '#ff9940',
        linkHover: '#ffb366',
        hr: '#1a1f29',
        markBg: '#ff9940',
        markText: '#0f1419',
        thBg: '#131820'
      },
      semantic: {
        success: '#b8cc52',
        successBg: '#b8cc5233',
        warning: '#ffb454',
        warningBg: '#ffb45433',
        danger: '#ff6b6b',
        dangerBg: '#ff6b6b33',
        info: '#39bae6',
        infoBg: '#39bae633'
      },
      callout: {
        warningBg: '#ffb45433',
        warningBorder: '#ffb454',
        infoBg: '#39bae633',
        infoBorder: '#39bae6',
        tipBg: '#b8cc5233',
        tipBorder: '#b8cc52',
        dangerBg: '#ff6b6b33',
        dangerBorder: '#ff6b6b'
      },
      editor: { bg: '#0f1419', text: '#e6e1cf' }
    },
    advanced: { editorTheme: 'vs-dark', highlightTheme: 'github-dark' }
  },
  
  'night-owl': {
    meta: {
      id: 'night-owl',
      name: 'Night Owl',
      description: '夜间模式主题，专为深夜编码设计',
      author: 'Sarah Drasner',
      tags: ['dark', 'night', 'contrast']
    },
    colors: {
      base: {
        bg: '#011627',
        bgSurface: '#0a1f35',
        bgElevated: '#122d42',
        textBase: '#d6deeb',
        textMuted: '#82aaff',
        textSubtle: '#5c7a99',
        borderDefault: '#1f3a5f',
        borderMuted: '#0a1f35'
      },
      accent: {
        primary: '#82aaff',
        primaryHover: '#9db8ff',
        primaryBg: '#82aaff33',
        primaryBorder: '#82aaff'
      },
      component: {
        heading: '#c792ea',
        codeBg: '#0a1f35',
        codeText: '#d6deeb',
        quoteBorder: '#82aaff',
        link: '#82aaff',
        linkHover: '#9db8ff',
        hr: '#1f3a5f',
        markBg: '#ecc48d',
        markText: '#011627',
        thBg: '#0a1f35'
      },
      semantic: {
        success: '#addb67',
        successBg: '#addb6733',
        warning: '#ecc48d',
        warningBg: '#ecc48d33',
        danger: '#ef5350',
        dangerBg: '#ef535033',
        info: '#82aaff',
        infoBg: '#82aaff33'
      },
      callout: {
        warningBg: '#ecc48d33',
        warningBorder: '#ecc48d',
        infoBg: '#82aaff33',
        infoBorder: '#82aaff',
        tipBg: '#addb6733',
        tipBorder: '#addb67',
        dangerBg: '#ef535033',
        dangerBorder: '#ef5350'
      },
      editor: { bg: '#011627', text: '#d6deeb' }
    },
    advanced: { editorTheme: 'vs-dark', highlightTheme: 'github-dark' }
  },
  
  'github-dimmed': {
    meta: {
      id: 'github-dimmed',
      name: 'GitHub Dimmed',
      description: 'GitHub 暗淡主题，柔和的深色变体',
      author: 'GitHub',
      tags: ['dark', 'soft', 'professional']
    },
    colors: {
      base: {
        bg: '#1c2128',
        bgSurface: '#22272e',
        bgElevated: '#2d333b',
        textBase: '#adbac7',
        textMuted: '#768390',
        textSubtle: '#545d68',
        borderDefault: '#373e47',
        borderMuted: '#2d333b'
      },
      accent: {
        primary: '#6cb6ff',
        primaryHover: '#96c0ff',
        primaryBg: '#6cb6ff33',
        primaryBorder: '#6cb6ff'
      },
      component: {
        heading: '#adbac7',
        codeBg: '#22272e',
        codeText: '#adbac7',
        quoteBorder: '#6cb6ff',
        link: '#6cb6ff',
        linkHover: '#96c0ff',
        hr: '#373e47',
        markBg: '#c69026',
        markText: '#1c2128',
        thBg: '#22272e'
      },
      semantic: {
        success: '#57ab5a',
        successBg: '#57ab5a33',
        warning: '#c69026',
        warningBg: '#c6902633',
        danger: '#f47067',
        dangerBg: '#f4706733',
        info: '#6cb6ff',
        infoBg: '#6cb6ff33'
      },
      callout: {
        warningBg: '#c6902633',
        warningBorder: '#c69026',
        infoBg: '#6cb6ff33',
        infoBorder: '#6cb6ff',
        tipBg: '#57ab5a33',
        tipBorder: '#57ab5a',
        dangerBg: '#f4706733',
        dangerBorder: '#f47067'
      },
      editor: { bg: '#1c2128', text: '#adbac7' }
    },
    advanced: { editorTheme: 'vs-dark', highlightTheme: 'github-dark' }
  },
  
  'panda': {
    meta: {
      id: 'panda',
      name: 'Panda',
      description: '可爱的熊猫主题，柔和的粉色系配色',
      author: 'Panda Theme',
      tags: ['dark', 'cute', 'pink']
    },
    colors: {
      base: {
        bg: '#292a2b',
        bgSurface: '#242526',
        bgElevated: '#2a2b2c',
        textBase: '#e6e6e6',
        textMuted: '#b6b6b6',
        textSubtle: '#676b79',
        borderDefault: '#3b3b3b',
        borderMuted: '#2a2b2c'
      },
      accent: {
        primary: '#ff75b5',
        primaryHover: '#ff9ac1',
        primaryBg: '#ff75b533',
        primaryBorder: '#ff75b5'
      },
      component: {
        heading: '#e6e6e6',
        codeBg: '#242526',
        codeText: '#e6e6e6',
        quoteBorder: '#ff75b5',
        link: '#ff75b5',
        linkHover: '#ff9ac1',
        hr: '#3b3b3b',
        markBg: '#ffb86c',
        markText: '#292a2b',
        thBg: '#242526'
      },
      semantic: {
        success: '#6fca9b',
        successBg: '#6fca9b33',
        warning: '#ffb86c',
        warningBg: '#ffb86c33',
        danger: '#ff2c6d',
        dangerBg: '#ff2c6d33',
        info: '#45a9f9',
        infoBg: '#45a9f933'
      },
      callout: {
        warningBg: '#ffb86c33',
        warningBorder: '#ffb86c',
        infoBg: '#45a9f933',
        infoBorder: '#45a9f9',
        tipBg: '#6fca9b33',
        tipBorder: '#6fca9b',
        dangerBg: '#ff2c6d33',
        dangerBorder: '#ff2c6d'
      },
      editor: { bg: '#292a2b', text: '#e6e6e6' }
    },
    advanced: { editorTheme: 'vs-dark', highlightTheme: 'github-dark' }
  },
  
  'quiet-light': {
    meta: {
      id: 'quiet-light',
      name: 'Quiet Light',
      description: '安静的浅色主题，柔和护眼',
      author: 'Quiet Light',
      tags: ['light', 'soft', 'eye-friendly']
    },
    colors: {
      base: {
        bg: '#f5f5f5',
        bgSurface: '#e8e8e8',
        bgElevated: '#d9d9d9',
        textBase: '#333333',
        textMuted: '#666666',
        textSubtle: '#999999',
        borderDefault: '#c0c0c0',
        borderMuted: '#d9d9d9'
      },
      accent: {
        primary: '#4b69c6',
        primaryHover: '#5c7ad4',
        primaryBg: '#4b69c633',
        primaryBorder: '#4b69c6'
      },
      component: {
        heading: '#333333',
        codeBg: '#e8e8e8',
        codeText: '#333333',
        quoteBorder: '#4b69c6',
        link: '#4b69c6',
        linkHover: '#5c7ad4',
        hr: '#c0c0c0',
        markBg: '#db9d63',
        markText: '#333333',
        thBg: '#e8e8e8'
      },
      semantic: {
        success: '#4c9a4c',
        successBg: '#4c9a4c33',
        warning: '#db9d63',
        warningBg: '#db9d6333',
        danger: '#c3414c',
        dangerBg: '#c3414c33',
        info: '#4b69c6',
        infoBg: '#4b69c633'
      },
      callout: {
        warningBg: '#db9d6333',
        warningBorder: '#db9d63',
        infoBg: '#4b69c633',
        infoBorder: '#4b69c6',
        tipBg: '#4c9a4c33',
        tipBorder: '#4c9a4c',
        dangerBg: '#c3414c33',
        dangerBorder: '#c3414c'
      },
      editor: { bg: '#f5f5f5', text: '#333333' }
    },
    advanced: { editorTheme: 'vs', highlightTheme: 'github' }
  }
};

/**
 * 创建新的空白方案
 */
export function createEmptyScheme(name = '新方案') {
  const now = new Date().toISOString();
  return {
    meta: {
      id: generateUUID(),
      name,
      description: '',
      author: '',
      version: '1.0.0',
      createdAt: now,
      updatedAt: now,
      tags: []
    },
    colors: JSON.parse(JSON.stringify(StyleSchemeSchema.colors)),
    layout: JSON.parse(JSON.stringify(StyleSchemeSchema.layout)),
    components: JSON.parse(JSON.stringify(StyleSchemeSchema.components)),
    advanced: JSON.parse(JSON.stringify(StyleSchemeSchema.advanced))
  };
}

/**
 * 从预设主题创建方案
 */
export function createFromPreset(presetId) {
  const preset = PresetThemes[presetId];
  if (!preset) return null;
  
  const scheme = JSON.parse(JSON.stringify(preset));
  scheme.meta = {
    ...scheme.meta,
    id: generateUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // 合并默认值确保完整性
  scheme.colors = deepMerge(JSON.parse(JSON.stringify(StyleSchemeSchema.colors)), scheme.colors || {});
  scheme.layout = deepMerge(JSON.parse(JSON.stringify(StyleSchemeSchema.layout)), scheme.layout || {});
  scheme.components = deepMerge(JSON.parse(JSON.stringify(StyleSchemeSchema.components)), scheme.components || {});
  scheme.advanced = deepMerge(JSON.parse(JSON.stringify(StyleSchemeSchema.advanced)), scheme.advanced || {});
  
  return scheme;
}

/**
 * 验证方案结构
 */
export function validateScheme(scheme) {
  const errors = [];
  
  if (!scheme.meta || !scheme.meta.id) {
    errors.push('Missing meta.id');
  }
  if (!scheme.meta || !scheme.meta.name) {
    errors.push('Missing meta.name');
  }
  if (!scheme.colors) {
    errors.push('Missing colors section');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * 通过路径获取值
 */
export function getValueByPath(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * 通过路径设置值
 */
export function setValueByPath(obj, path, value) {
  const parts = path.split('.');
  const last = parts.pop();
  const target = parts.reduce((acc, part) => {
    if (acc[part] === undefined) {
      acc[part] = {};
    }
    return acc[part];
  }, obj);
  target[last] = value;
}

/**
 * 将方案转换为 CSS 变量对象
 */
export function schemeToCSSVars(scheme) {
  const vars = {};
  
  // 基础色
  if (scheme.colors?.base) {
    vars['--bg-base'] = scheme.colors.base.bg;
    vars['--bg-surface'] = scheme.colors.base.bgSurface;
    vars['--bg-elevated'] = scheme.colors.base.bgElevated;
    vars['--text-base'] = scheme.colors.base.textBase;
    vars['--text-muted'] = scheme.colors.base.textMuted;
    vars['--text-subtle'] = scheme.colors.base.textSubtle;
    vars['--border-default'] = scheme.colors.base.borderDefault;
    vars['--border-muted'] = scheme.colors.base.borderMuted;
  }
  
  // 强调色
  if (scheme.colors?.accent) {
    vars['--color-accent'] = scheme.colors.accent.primary;
    vars['--color-accent-emphasis'] = scheme.colors.accent.primaryHover;
    vars['--color-accent-subtle'] = scheme.colors.accent.primaryBg;
  }
  
  // 组件色
  if (scheme.colors?.component) {
    vars['--heading-color'] = scheme.colors.component.heading;
    vars['--code-bg'] = scheme.colors.component.codeBg;
    vars['--code-text'] = scheme.colors.component.codeText || scheme.colors.base?.textBase || '#24292f';
    vars['--quote-border'] = scheme.colors.component.quoteBorder;
    vars['--hr'] = scheme.colors.component.hr;
    vars['--link-color'] = scheme.colors.component.link;
    vars['--link-color-hover'] = scheme.colors.component.linkHover;
    vars['--mark-bg'] = scheme.colors.component.markBg || scheme.colors.semantic?.warningBg || '#fff3cd';
    vars['--mark-text'] = scheme.colors.component.markText || scheme.colors.base?.textBase || '#24292f';
  }
  
  // 表头背景色
  vars['--th-bg'] = scheme.colors?.component?.thBg || scheme.colors?.base?.bgSurface || '#f6f8fa';
  
  // 语义色
  if (scheme.colors?.semantic) {
    vars['--color-success'] = scheme.colors.semantic.success;
    vars['--color-success-subtle'] = scheme.colors.semantic.successBg;
    vars['--color-warning'] = scheme.colors.semantic.warning;
    vars['--color-warning-subtle'] = scheme.colors.semantic.warningBg;
    vars['--color-danger'] = scheme.colors.semantic.danger;
    vars['--color-danger-subtle'] = scheme.colors.semantic.dangerBg;
    vars['--color-info'] = scheme.colors.semantic.info;
    vars['--color-info-subtle'] = scheme.colors.semantic.infoBg;
  }
  
  // Callout 颜色
  if (scheme.colors?.callout) {
    vars['--callout-warning-bg'] = scheme.colors.callout.warningBg;
    vars['--callout-warning-border'] = scheme.colors.callout.warningBorder;
    vars['--callout-info-bg'] = scheme.colors.callout.infoBg;
    vars['--callout-info-border'] = scheme.colors.callout.infoBorder;
    vars['--callout-tip-bg'] = scheme.colors.callout.tipBg;
    vars['--callout-tip-border'] = scheme.colors.callout.tipBorder;
    vars['--callout-danger-bg'] = scheme.colors.callout.dangerBg;
    vars['--callout-danger-border'] = scheme.colors.callout.dangerBorder;
  }
  
  // 编辑器颜色
  if (scheme.colors?.editor) {
    vars['--editor-bg'] = scheme.colors.editor.bg;
    vars['--editor-text'] = scheme.colors.editor.text;
  }
  
  // 布局
  if (scheme.layout?.font) {
    vars['--font-body'] = scheme.layout.font.family;
    vars['--font-code'] = scheme.layout.font.codeFamily;
    vars['--font-size-base'] = `${scheme.layout.font.baseSize}px`;
    vars['--line-height'] = scheme.layout.font.lineHeight;
    vars['--font-weight'] = scheme.layout.font.fontWeight || 400;
  }
  
  if (scheme.layout?.spacing) {
    vars['--spacing-paragraph'] = `${scheme.layout.spacing.paragraph}px`;
    vars['--spacing-heading'] = `${scheme.layout.spacing.heading}px`;
  }
  
  if (scheme.layout?.sizing) {
    vars['--layout-max-width'] = `${scheme.layout.sizing.maxWidth}px`;
  }
  
  // 组件样式 - 代码块
  if (scheme.components?.code) {
    vars['--code-padding'] = `${scheme.components.code.padding}px`;
    vars['--code-radius'] = `${scheme.components.code.radius}px`;
    vars['--code-font-scale'] = scheme.components.code.fontScale;
    vars['--code-line-height'] = scheme.components.code.lineHeight || 1.6;
  }
  
  // 组件样式 - 引用块
  if (scheme.components?.quote) {
    vars['--quote-border-width'] = `${scheme.components.quote.borderWidth}px`;
    vars['--quote-radius'] = `${scheme.components.quote.radius}px`;
  }
  
  // 组件样式 - 标题
  if (scheme.components?.heading) {
    vars['--heading-h1-size'] = `${scheme.components.heading.h1Size}em`;
    vars['--heading-h2-size'] = `${scheme.components.heading.h2Size}em`;
    vars['--heading-h3-size'] = `${scheme.components.heading.h3Size}em`;
  }
  
  // 阴影
  vars['--shadow-sm'] = '0 1px 2px rgba(0, 0, 0, 0.05)';
  vars['--shadow-md'] = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)';
  vars['--radius-sm'] = '4px';
  vars['--radius-md'] = '6px';
  vars['--radius-lg'] = '12px';
  
  return vars;
}

/**
 * 将方案转换为 CSS 字符串
 */
export function schemeToCSS(scheme) {
  const vars = schemeToCSSVars(scheme);
  let css = ':root {\n';
  
  Object.entries(vars).forEach(([key, value]) => {
    css += `  ${key}: ${value};\n`;
  });
  
  css += '}\n';
  return css;
}

/**
 * 将方案转换为内联 CSS (用于导出 HTML)
 */
export function schemeToInlineCSS(scheme) {
  const vars = schemeToCSSVars(scheme);
  
  // 先定义 :root 变量
  let css = ':root{';
  Object.entries(vars).forEach(([key, value]) => {
    css += `${key}:${value};`;
  });
  css += '}';
  
  // === 基础样式 ===
  css += '*{margin:0;padding:0;box-sizing:border-box}';
  css += 'html{font-size:var(--font-size-base)}';
  css += 'body{font-family:var(--font-body);line-height:var(--line-height);background:var(--bg-base);color:var(--text-base);max-width:var(--layout-max-width);margin:0 auto;padding:40px 20px}';
  
  // === 段落和文本 ===
  css += 'p{margin:0 0 var(--spacing-paragraph);line-height:var(--line-height)}';
  
  // === 标题 ===
  css += 'h1,h2,h3,h4,h5,h6{margin:var(--spacing-heading) 0 12px;font-weight:600;line-height:1.3;color:var(--heading-color)}';
  css += 'h1:first-child,h2:first-child,h3:first-child{margin-top:0}';
  css += 'h1{font-size:var(--heading-h1-size);padding-bottom:12px;border-bottom:1px solid var(--border-default)}';
  css += 'h2{font-size:var(--heading-h2-size);padding-bottom:8px;border-bottom:1px solid var(--border-default)}';
  css += 'h3{font-size:var(--heading-h3-size)}';
  css += 'h4{font-size:1em}';
  
  // === 链接 ===
  css += 'a{color:var(--link-color);text-decoration:none;transition:color 0.15s ease}';
  css += 'a:hover{color:var(--link-color-hover);text-decoration:underline}';
  
  // === 代码块 - 容器背景就是代码背景，代码直接显示在容器中 ===
  css += 'pre{position:relative;background:var(--code-bg);padding:var(--code-padding);border-radius:var(--code-radius);overflow-x:auto;border:1px solid var(--border-default);margin:16px 0;box-shadow:var(--shadow-sm)}';
  css += 'pre code,pre .hljs{font-family:var(--font-code);font-size:calc(var(--code-font-scale) * 1em);line-height:var(--code-line-height);background:transparent;display:block}';
  
  // 行内代码
  css += 'code{font-family:var(--font-code)}';
  css += 'code:not(pre code){background:var(--code-bg);padding:2px 6px;border-radius:var(--radius-sm);font-size:calc(var(--code-font-scale) * 1em);color:var(--code-text)}';
  
  // === 代码块行号样式 ===
  css += 'pre.with-line-numbers{display:flex;gap:16px;align-items:stretch}';
  css += 'pre .line-numbers{user-select:none;text-align:right;padding-right:16px;border-right:1px solid var(--border-default);color:var(--text-subtle);flex-shrink:0;font-family:var(--font-code);font-size:calc(var(--code-font-scale) * 1em);line-height:var(--code-line-height);white-space:pre;background:transparent}';
  css += 'pre .code-content{flex:1;min-width:0;background:transparent}';
  
  // 代码块语言标签
  if (scheme.components?.code?.showLang !== false) {
    css += 'pre[data-lang]::before{content:attr(data-lang);position:absolute;top:0;right:0;padding:2px 8px;font-size:0.7rem;font-family:var(--font-code);background:var(--border-default);color:var(--text-muted);border-radius:0 var(--code-radius) 0 6px;text-transform:uppercase;letter-spacing:0.5px}';
  }
  
  // === 引用块 ===
  css += 'blockquote{margin:16px 0;padding:12px 20px;border-left:var(--quote-border-width) solid var(--quote-border);background:var(--bg-surface);border-radius:0 var(--quote-radius) var(--quote-radius) 0;color:var(--text-muted)}';
  css += 'blockquote p:last-child{margin-bottom:0}';
  
  // === 列表 ===
  css += 'ul,ol{margin:0 0 var(--spacing-paragraph);padding-left:24px}';
  css += 'li{margin:4px 0;line-height:1.6}';
  
  // 任务列表
  css += '.task-list-item{list-style:none;margin-left:-1.5em}';
  css += '.task-list-item input[type="checkbox"]{margin-right:8px;accent-color:var(--color-accent);width:14px;height:14px}';
  
  // === 表格 ===
  css += 'table{width:100%;border-collapse:collapse;margin:16px 0;border-radius:0;overflow:hidden;box-shadow:var(--shadow-sm)}';
  css += 'th,td{padding:10px 14px;border:1px solid var(--border-default)}';
  css += 'th{background:var(--th-bg);font-weight:600}';
  css += 'th[style*="text-align: left"],td[style*="text-align: left"]{text-align:left}';
  css += 'th[style*="text-align: center"],td[style*="text-align: center"]{text-align:center}';
  css += 'th[style*="text-align: right"],td[style*="text-align: right"]{text-align:right}';
  if (scheme.components?.table?.striped !== false) {
    css += 'tr:nth-child(even){background:var(--bg-surface)}';
  }
  css += 'tr:hover{background:var(--bg-elevated)}';
  
  // === 分割线 ===
  css += 'hr{border:none;height:2px;background:var(--hr);margin:24px 0}';
  
  // === 图片 ===
  css += 'img{max-width:100%;border-radius:var(--code-radius)}';
  
  // === 高亮标记 ===
  css += 'mark{background:var(--mark-bg);color:var(--mark-text);padding:1px 4px;border-radius:2px}';
  
  // === 上标/下标 ===
  css += 'sub,sup{font-size:0.75em;line-height:0;position:relative;vertical-align:baseline}';
  css += 'sup{top:-0.5em}';
  css += 'sub{bottom:-0.25em}';
  
  // === 删除线 ===
  css += 'del{text-decoration:line-through;color:var(--text-muted)}';
  
  // === 定义列表 ===
  css += 'dl{margin:16px 0}';
  css += 'dt{font-weight:600;margin-top:8px}';
  css += 'dd{margin-left:24px;color:var(--text-muted)}';
  
  // === 脚注 ===
  css += '.footnotes{margin-top:48px;padding-top:16px;border-top:1px solid var(--border-default);font-size:0.85em;opacity:0.8}';
  css += '.footnotes-sep{display:none}';
  css += '.footnote-ref{font-size:0.8em;vertical-align:super}';
  
  // === Callout 容器 ===
  css += '.warning,.info,.tip,.danger{padding:12px 16px;margin:16px 0;border-radius:8px;border-left:4px solid}';
  css += '.warning{background:var(--callout-warning-bg);border-left-color:var(--callout-warning-border)}';
  css += '.info{background:var(--callout-info-bg);border-left-color:var(--callout-info-border)}';
  css += '.tip{background:var(--callout-tip-bg);border-left-color:var(--callout-tip-border)}';
  css += '.danger{background:var(--callout-danger-bg);border-left-color:var(--callout-danger-border)}';
  
  // === KaTeX 数学公式 ===
  css += '.katex-display{display:block;text-align:center;margin:16px 0;overflow-x:auto;overflow-y:hidden}';
  css += '.katex-display>.katex{display:inline-block;text-align:initial}';
  
  // === Mermaid 图表 ===
  css += '.mermaid{background:var(--bg-surface);padding:var(--code-padding);border-radius:var(--code-radius);margin:16px 0;text-align:center;box-shadow:var(--shadow-sm)}';
  
  return css;
}

// === 工具函数 ===

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

/**
 * 判断是否为深色主题
 */
export function isDarkScheme(scheme) {
  const bgColor = scheme.colors?.base?.bg || '#ffffff';
  // 计算亮度
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

/**
 * 获取推荐的高亮主题
 */
export function getRecommendedHighlightTheme(scheme) {
  const highlightTheme = scheme.advanced?.highlightTheme;
  if (highlightTheme) return highlightTheme;
  return isDarkScheme(scheme) ? 'github-dark' : 'github';
}
