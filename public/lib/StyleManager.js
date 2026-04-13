/* MarkHTML StyleManager v3.0 */

import {
  createEmptyScheme,
  createFromPreset,
  validateScheme,
  schemeToCSSVars,
  schemeToCSS,
  schemeToInlineCSS,
  getValueByPath,
  setValueByPath,
  PresetThemes,
  StyleSchemeSchema,
  SCHEMA_VERSION,
  isDarkScheme,
  getRecommendedHighlightTheme
} from './Schema.js';

import { ColorEngine, colorEngine } from './ColorEngine.js';

export class StyleManager {
  constructor(options = {}) {
    this.currentScheme = null;
    this.defaultScheme = JSON.parse(JSON.stringify(StyleSchemeSchema));
    this.colorEngine = colorEngine;
    this.autoDeriveEnabled = true;
    this.onSchemeChange = options.onSchemeChange || null;
    this.onApply = options.onApply || null;
    this.debounceDelay = options.debounceDelay || 16;
    this.debounceTimer = null;
    this._init();
  }
  
  _init() {
    const saved = this._loadFromStorage();
    if (saved) {
      this.currentScheme = saved;
    } else {
      this.loadPreset('github-light');
    }
  }
  
  loadPreset(presetId) {
    const scheme = createFromPreset(presetId);
    if (scheme) {
      this.currentScheme = scheme;
      this._saveToStorage();
      this._notifyChange();
      return true;
    }
    return false;
  }
  
  loadScheme(scheme) {
    const validation = validateScheme(scheme);
    if (!validation.valid) {
      console.error('Invalid scheme:', validation.errors);
      return false;
    }
    this.currentScheme = scheme;
    this._saveToStorage();
    this._notifyChange();
    return true;
  }
  
  getScheme() {
    return this.currentScheme ? JSON.parse(JSON.stringify(this.currentScheme)) : null;
  }
  
  updateScheme(updates) {
    if (!this.currentScheme) return false;
    
    this.currentScheme = this._deepMerge(this.currentScheme, updates);
    this.currentScheme.meta.updatedAt = new Date().toISOString();
    
    if (this.autoDeriveEnabled && this._shouldAutoDerive(updates)) {
      this._applyAutoDerive();
    }
    
    this._saveToStorage();
    this._notifyChange();
    return true;
  }
  
  updateAtPath(path, value) {
    if (!this.currentScheme) return false;
    
    setValueByPath(this.currentScheme, path, value);
    this.currentScheme.meta.updatedAt = new Date().toISOString();
    
    if (this.autoDeriveEnabled && path.startsWith('colors.')) {
      this._handleColorPathChange(path, value);
    }
    
    this._saveToStorage();
    this._notifyChange();
    return true;
  }
  
  _shouldAutoDerive(updates) {
    if (!this.currentScheme?.colors?.autoDerive?.enabled) return false;
    return updates.colors?.base?.bg !== undefined;
  }
  
  _handleColorPathChange(path, value) {
    if (!this.currentScheme?.colors?.autoDerive?.enabled) return;
    
    if (path === 'colors.base.bg') {
      this._applyAutoDerive();
    }
    
    if (path === 'colors.accent.primary') {
      const isDark = this.colorEngine.isDark(this.currentScheme.colors.base.bg);
      const hoverColor = this.colorEngine.deriveHoverColor(
        value,
        this.currentScheme.colors.autoDerive.hoverBrightness || 0.9,
        isDark
      );
      setValueByPath(this.currentScheme, 'colors.accent.primaryHover', hoverColor);
      const primaryBg = this.colorEngine.withAlpha(value, 0.15);
      setValueByPath(this.currentScheme, 'colors.accent.primaryBg', primaryBg);
    }
  }
  
  _applyAutoDerive() {
    if (!this.currentScheme?.colors?.autoDerive?.enabled) return;
    const derived = this.colorEngine.autoDeriveColors(this.currentScheme);
    if (derived) {
      this.currentScheme.colors = derived;
    }
  }
  
  reset() {
    const presetId = this.currentScheme?.meta?.id;
    if (presetId && PresetThemes[presetId]) {
      this.loadPreset(presetId);
    } else {
      this.currentScheme = createEmptyScheme('Reset Scheme');
      this._saveToStorage();
      this._notifyChange();
    }
  }
  
  resetGroup(group) {
    if (!this.currentScheme) return false;
    const defaultValues = this.defaultScheme[group];
    if (defaultValues) {
      this.currentScheme[group] = JSON.parse(JSON.stringify(defaultValues));
      this._saveToStorage();
      this._notifyChange();
      return true;
    }
    return false;
  }
  
  generateFromColor(baseColor, options = {}) {
    if (!this.currentScheme) return false;
    
    const palette = this.colorEngine.derivePalette(baseColor, options);
    if (!palette) return false;
    
    const isDark = this.colorEngine.isDark(baseColor);
    
    this.currentScheme.colors.base = {
      ...this.currentScheme.colors.base,
      bg: baseColor,
      bgSurface: palette.bgSurface,
      bgElevated: palette.bgElevated,
      textBase: palette.textBase,
      textMuted: palette.textMuted,
      textSubtle: palette.textSubtle,
      borderDefault: palette.borderDefault,
      borderMuted: palette.borderMuted
    };
    
    this.currentScheme.colors.accent = {
      ...this.currentScheme.colors.accent,
      ...palette.accent
    };
    
    this.currentScheme.colors.component.heading = palette.textBase;
    this.currentScheme.advanced.editorTheme = isDark ? 'vs-dark' : 'vs';
    this.currentScheme.meta.updatedAt = new Date().toISOString();
    
    this._saveToStorage();
    this._notifyChange();
    return true;
  }
  
  getContrastInfo(textPath = 'colors.base.textBase', bgPath = 'colors.base.bg') {
    const textColor = getValueByPath(this.currentScheme, textPath);
    const bgColor = getValueByPath(this.currentScheme, bgPath);
    if (!textColor || !bgColor) return null;
    return this.colorEngine.checkContrast(textColor, bgColor);
  }
  
  ensureTextContrast() {
    if (!this.currentScheme) return;
    const bgColor = this.currentScheme.colors?.base?.bg;
    const textColor = this.currentScheme.colors?.base?.textBase;
    if (bgColor && textColor) {
      const fixedColor = this.colorEngine.ensureContrast(textColor, bgColor);
      if (fixedColor !== textColor) {
        this.currentScheme.colors.base.textBase = fixedColor;
      }
    }
  }
  
  generatePalette(baseColor, type = 'primary') {
    return this.colorEngine.generateScale(baseColor, 8);
  }
  
  generateGrayScale() {
    const bgColor = this.currentScheme?.colors?.base?.bg || '#ffffff';
    const isDark = this.colorEngine.isDark(bgColor);
    return this.colorEngine.generateGrayScale(bgColor, isDark);
  }
  
  setColor(category, key, value) {
    return this.updateAtPath(`colors.${category}.${key}`, value);
  }
  
  setColors(colors) {
    return this.updateScheme({ colors });
  }
  
  getColor(category, key) {
    return getValueByPath(this.currentScheme, `colors.${category}.${key}`);
  }
  
  getValue(path) {
    return getValueByPath(this.currentScheme, path);
  }
  
  setValue(path, value) {
    return this.updateAtPath(path, value);
  }
  
  setLayout(category, key, value) {
    return this.updateAtPath(`layout.${category}.${key}`, value);
  }
  
  setFont(key, value) {
    return this.updateAtPath(`layout.font.${key}`, value);
  }
  
  setComponent(component, key, value) {
    return this.updateAtPath(`components.${component}.${key}`, value);
  }
  
  exportToJSON() {
    const scheme = this.getScheme();
    if (!scheme) return null;
    return JSON.stringify({
      version: SCHEMA_VERSION,
      type: 'markhtml-style-scheme',
      exportedAt: new Date().toISOString(),
      scheme
    }, null, 2);
  }
  
  importFromJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      let scheme;
      if (data.type === 'markhtml-style-scheme' && data.scheme) {
        scheme = data.scheme;
      } else if (data.meta && data.colors) {
        scheme = data;
      } else {
        throw new Error('Invalid scheme format');
      }
      scheme.meta.id = this._generateUUID();
      scheme.meta.createdAt = new Date().toISOString();
      scheme.meta.updatedAt = new Date().toISOString();
      scheme = this._ensureCompleteScheme(scheme);
      return this.loadScheme(scheme);
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  }
  
  _ensureCompleteScheme(scheme) {
    const defaults = JSON.parse(JSON.stringify(StyleSchemeSchema));
    return {
      ...this._deepMerge(defaults, scheme),
      meta: scheme.meta
    };
  }
  
  exportToFile(filename = 'markhtml-theme.json') {
    const json = this.exportToJSON();
    if (!json) return false;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    return true;
  }
  
  importFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          resolve(this.importFromJSON(e.target.result));
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
  
  applyToDOM(root = document.documentElement) {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this._applyToDOMImmediate(root), this.debounceDelay);
  }
  
  _applyToDOMImmediate(root = document.documentElement) {
    if (!this.currentScheme) return;
    const vars = schemeToCSSVars(this.currentScheme);
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    root.setAttribute('data-scheme-id', this.currentScheme.meta.id);
    if (this.onApply) this.onApply(this.currentScheme);
  }
  
  applyImmediately(root = document.documentElement) {
    this._applyToDOMImmediate(root);
  }
  
  getCSSVars() {
    return schemeToCSSVars(this.currentScheme);
  }
  
  getCSS() {
    return schemeToCSS(this.currentScheme);
  }
  
  getInlineCSS() {
    return schemeToInlineCSS(this.currentScheme);
  }
  
  getEditorTheme() {
    return this.currentScheme?.advanced?.editorTheme || 'vs';
  }
  
  isDarkTheme() {
    return isDarkScheme(this.currentScheme);
  }
  
  getHighlightTheme() {
    const themeHighlight = this.currentScheme?.advanced?.highlightTheme;
    if (themeHighlight) return themeHighlight;
    return getRecommendedHighlightTheme(this.currentScheme);
  }
  
  _saveToStorage() {
    try {
      localStorage.setItem('markhtml-scheme', JSON.stringify(this.currentScheme));
    } catch (e) {
      console.error('Save to storage failed:', e);
    }
  }
  
  _loadFromStorage() {
    try {
      const saved = localStorage.getItem('markhtml-scheme');
      if (saved) {
        const scheme = JSON.parse(saved);
        const validation = validateScheme(scheme);
        if (validation.valid) {
          return this._ensureCompleteScheme(scheme);
        }
      }
    } catch (e) {
      console.error('Load from storage failed:', e);
    }
    return null;
  }
  
  _notifyChange() {
    if (this.onSchemeChange) this.onSchemeChange(this.getScheme());
  }
  
  _generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  _deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this._deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }
}

let styleManagerInstance = null;

export function getStyleManager(options = {}) {
  if (!styleManagerInstance) {
    styleManagerInstance = new StyleManager(options);
  }
  return styleManagerInstance;
}

export default StyleManager;
