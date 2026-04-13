/**
 * MarkHTML Migrations v1.0
 * 配置迁移工具
 * 
 * 从旧版配置格式迁移到新的 Schema 格式
 */

import { createEmptyScheme } from './Schema.js';

/**
 * 从旧版配置迁移
 */
export function migrateFromLegacy(oldTheme, oldStyleSettings, oldCustomColors) {
  const scheme = createEmptyScheme('迁移方案');
  
  // 迁移主题
  if (oldTheme) {
    scheme.meta.name = getThemeName(oldTheme);
    scheme.advanced.editorTheme = getEditorTheme(oldTheme);
  }
  
  // 迁移自定义颜色
  if (oldCustomColors) {
    // 基础色
    if (oldCustomColors.bgBase) {
      scheme.colors.base.bg = oldCustomColors.bgBase;
    }
    if (oldCustomColors.bgSurface) {
      scheme.colors.base.bgSurface = oldCustomColors.bgSurface;
    }
    if (oldCustomColors.textBase) {
      scheme.colors.base.textBase = oldCustomColors.textBase;
    }
    if (oldCustomColors.textMuted) {
      scheme.colors.base.textMuted = oldCustomColors.textMuted;
    }
    if (oldCustomColors.borderDefault) {
      scheme.colors.base.borderDefault = oldCustomColors.borderDefault;
    }
    
    // 组件色
    if (oldCustomColors.heading) {
      scheme.colors.component.heading = oldCustomColors.heading;
    }
    if (oldCustomColors.codeBg) {
      scheme.colors.component.codeBg = oldCustomColors.codeBg;
    }
    if (oldCustomColors.quoteBorder) {
      scheme.colors.component.quoteBorder = oldCustomColors.quoteBorder;
    }
    if (oldCustomColors.accent) {
      scheme.colors.accent.primary = oldCustomColors.accent;
      scheme.colors.component.link = oldCustomColors.accent;
    }
    
    // 语义色
    if (oldCustomColors.success) {
      scheme.colors.semantic.success = oldCustomColors.success;
    }
    if (oldCustomColors.successSubtle) {
      scheme.colors.semantic.successBg = oldCustomColors.successSubtle;
    }
    if (oldCustomColors.warning) {
      scheme.colors.semantic.warning = oldCustomColors.warning;
    }
    if (oldCustomColors.warningSubtle) {
      scheme.colors.semantic.warningBg = oldCustomColors.warningSubtle;
    }
    if (oldCustomColors.danger) {
      scheme.colors.semantic.danger = oldCustomColors.danger;
    }
    if (oldCustomColors.dangerSubtle) {
      scheme.colors.semantic.dangerBg = oldCustomColors.dangerSubtle;
    }
    if (oldCustomColors.info) {
      scheme.colors.semantic.info = oldCustomColors.info;
    }
    if (oldCustomColors.infoSubtle) {
      scheme.colors.semantic.infoBg = oldCustomColors.infoSubtle;
    }
    
    // 编辑器
    scheme.colors.editor.bg = scheme.colors.base.bg;
    scheme.colors.editor.text = scheme.colors.base.textBase;
  }
  
  // 迁移样式设置
  if (oldStyleSettings) {
    // 字体
    if (oldStyleSettings.fontFamily) {
      scheme.layout.font.family = oldStyleSettings.fontFamily;
    }
    if (oldStyleSettings.codeFont) {
      scheme.layout.font.codeFamily = oldStyleSettings.codeFont;
    }
    if (oldStyleSettings.fontSize) {
      scheme.layout.font.baseSize = oldStyleSettings.fontSize;
    }
    if (oldStyleSettings.lineHeight) {
      scheme.layout.font.lineHeight = oldStyleSettings.lineHeight;
    }
    
    // 布局
    if (oldStyleSettings.maxWidth) {
      scheme.layout.sizing.maxWidth = oldStyleSettings.maxWidth;
    }
    if (oldStyleSettings.paragraphMargin) {
      scheme.layout.spacing.paragraph = oldStyleSettings.paragraphMargin;
    }
    if (oldStyleSettings.headingMargin) {
      scheme.layout.spacing.heading = oldStyleSettings.headingMargin;
    }
    
    // 代码块
    if (oldStyleSettings.codePadding) {
      scheme.components.code.padding = oldStyleSettings.codePadding;
    }
    if (oldStyleSettings.codeRadius) {
      scheme.components.code.radius = oldStyleSettings.codeRadius;
    }
    if (oldStyleSettings.codeFontScale) {
      scheme.components.code.fontScale = oldStyleSettings.codeFontScale;
    }
    if (oldStyleSettings.codeShowLang !== undefined) {
      scheme.components.code.showLang = oldStyleSettings.codeShowLang;
    }
    
    // 引用块
    if (oldStyleSettings.quotePadding) {
      scheme.components.quote.padding = `${oldStyleSettings.quotePadding}px 20px`;
    }
    if (oldStyleSettings.quoteBorderWidth) {
      scheme.components.quote.borderWidth = oldStyleSettings.quoteBorderWidth;
    }
    if (oldStyleSettings.quoteRadius) {
      scheme.components.quote.radius = oldStyleSettings.quoteRadius;
    }
    
    // 表格
    if (oldStyleSettings.tablePadding) {
      scheme.components.table.padding = `${oldStyleSettings.tablePadding}px 14px`;
    }
    if (oldStyleSettings.tableRadius) {
      scheme.components.table.radius = oldStyleSettings.tableRadius;
    }
    if (oldStyleSettings.tableStriped !== undefined) {
      scheme.components.table.striped = oldStyleSettings.tableStriped;
    }
    
    // 标题
    if (oldStyleSettings.h1Size) {
      scheme.components.heading.h1Size = oldStyleSettings.h1Size;
    }
    if (oldStyleSettings.h2Size) {
      scheme.components.heading.h2Size = oldStyleSettings.h2Size;
    }
    if (oldStyleSettings.h3Size) {
      scheme.components.heading.h3Size = oldStyleSettings.h3Size;
    }
    if (oldStyleSettings.headingBorder !== undefined) {
      scheme.components.heading.showBorder = oldStyleSettings.headingBorder;
    }
    
    // 自定义 CSS
    if (oldStyleSettings.customCss) {
      scheme.advanced.customCss = oldStyleSettings.customCss;
    }
  }
  
  return scheme;
}

/**
 * 检测是否有旧版配置
 */
export function hasLegacyConfig() {
  return !!(
    localStorage.getItem('markhtml-theme') ||
    localStorage.getItem('markhtml-style-settings') ||
    localStorage.getItem('markhtml-custom-colors')
  );
}

/**
 * 自动迁移
 */
export function autoMigrate() {
  try {
    const oldTheme = localStorage.getItem('markhtml-theme');
    const oldStyleSettings = JSON.parse(localStorage.getItem('markhtml-style-settings') || 'null');
    const oldCustomColors = JSON.parse(localStorage.getItem('markhtml-custom-colors') || 'null');
    
    if (!oldTheme && !oldStyleSettings && !oldCustomColors) {
      return null;
    }
    
    const scheme = migrateFromLegacy(oldTheme, oldStyleSettings, oldCustomColors);
    
    // 保存新格式
    localStorage.setItem('markhtml-scheme', JSON.stringify(scheme));
    
    // 清理旧配置（可选）
    // localStorage.removeItem('markhtml-theme');
    // localStorage.removeItem('markhtml-style-settings');
    // localStorage.removeItem('markhtml-custom-colors');
    
    return scheme;
  } catch (e) {
    console.error('Migration failed:', e);
    return null;
  }
}

/**
 * 获取主题名称
 */
function getThemeName(themeId) {
  const names = {
    'github-light': 'GitHub Light',
    'github-dark': 'GitHub Dark',
    'academic': 'Academic',
    'dracula': 'Dracula',
    'nord': 'Nord',
    'monokai': 'Monokai',
    'custom': '自定义主题'
  };
  return names[themeId] || '未知主题';
}

/**
 * 获取编辑器主题
 */
function getEditorTheme(themeId) {
  const darkThemes = ['github-dark', 'dracula', 'nord', 'monokai'];
  return darkThemes.includes(themeId) ? 'vs-dark' : 'vs';
}

export default {
  migrateFromLegacy,
  hasLegacyConfig,
  autoMigrate
};
