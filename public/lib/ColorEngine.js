/* MarkHTML Color Engine v1.0 */

export class ColorEngine {
  constructor() {
    this.cache = new Map();
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  rgbToHex(r, g, b) {
    const toHex = (c) => {
      const hex = Math.round(Math.max(0, Math.min(255, c))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  hexToHsl(hex) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return null;
    return this.rgbToHsl(rgb.r, rgb.g, rgb.b);
  }

  hslToHex(h, s, l) {
    const rgb = this.hslToRgb(h, s, l);
    return this.rgbToHex(rgb.r, rgb.g, rgb.b);
  }

  adjustBrightness(hex, amount) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    const adjust = (c) => Math.max(0, Math.min(255, c + Math.round(255 * amount / 100)));
    return this.rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
  }

  adjustSaturation(hex, amount) {
    const hsl = this.hexToHsl(hex);
    if (!hsl) return hex;
    hsl.s = Math.max(0, Math.min(100, hsl.s + amount));
    return this.hslToHex(hsl.h, hsl.s, hsl.l);
  }

  mix(color1, color2, ratio) {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    if (!rgb1 || !rgb2) return color1;
    const mix = (c1, c2) => Math.round(c1 * (1 - ratio) + c2 * ratio);
    return this.rgbToHex(mix(rgb1.r, rgb2.r), mix(rgb1.g, rgb2.g), mix(rgb1.b, rgb2.b));
  }

  withAlpha(hex, alpha) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  }

  deriveSurfaceColor(bgColor, opacity = 0.04, isDark = null) {
    if (isDark === null) isDark = this.isDark(bgColor);
    const hsl = this.hexToHsl(bgColor);
    if (!hsl) return bgColor;
    const adjustment = isDark ? opacity * 100 : -opacity * 100;
    const newL = Math.max(0, Math.min(100, hsl.l + adjustment));
    return this.hslToHex(hsl.h, hsl.s, newL);
  }

  deriveBorderColor(bgColor, opacity = 0.12, isDark = null) {
    if (isDark === null) isDark = this.isDark(bgColor);
    const hsl = this.hexToHsl(bgColor);
    if (!hsl) return bgColor;
    const adjustment = isDark ? opacity * 100 : -opacity * 100;
    const newL = Math.max(0, Math.min(100, hsl.l + adjustment));
    const newS = Math.max(0, hsl.s * 0.8);
    return this.hslToHex(hsl.h, newS, newL);
  }

  deriveTextColor(bgColor) {
    return this.isDark(bgColor) ? '#e6edf3' : '#1f2328';
  }

  deriveHoverColor(primaryColor, brightness = 0.9, isDark = null) {
    if (isDark === null) isDark = this.isDark(primaryColor);
    const hsl = this.hexToHsl(primaryColor);
    if (!hsl) return primaryColor;
    const adjustment = isDark ? (1 - brightness) * 30 : -(1 - brightness) * 30;
    const newL = Math.max(0, Math.min(100, hsl.l + adjustment));
    return this.hslToHex(hsl.h, hsl.s, newL);
  }

  isDark(hex) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return false;
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance < 0.5;
  }

  derivePalette(baseColor, options = {}) {
    const { surfaceOpacity = 0.04, borderOpacity = 0.12, hoverBrightness = 0.9, accentHueShift = 210 } = options;
    const isDark = this.isDark(baseColor);
    const hsl = this.hexToHsl(baseColor);
    if (!hsl) return null;

    const accentHue = (hsl.h + accentHueShift) % 360;
    const accentColor = this.hslToHex(accentHue, 70, isDark ? 60 : 45);

    return {
      bg: baseColor,
      bgSurface: this.deriveSurfaceColor(baseColor, surfaceOpacity, isDark),
      bgElevated: this.deriveSurfaceColor(baseColor, surfaceOpacity * 2, isDark),
      textBase: this.deriveTextColor(baseColor),
      textMuted: isDark ? '#7d8590' : '#57606a',
      textSubtle: isDark ? '#6e7681' : '#8c959f',
      borderDefault: this.deriveBorderColor(baseColor, borderOpacity, isDark),
      borderMuted: this.deriveBorderColor(baseColor, borderOpacity * 0.5, isDark),
      accent: {
        primary: accentColor,
        primaryHover: this.deriveHoverColor(accentColor, hoverBrightness, isDark),
        primaryBg: this.withAlpha(accentColor, 0.15),
        primaryBorder: accentColor
      }
    };
  }

  autoDeriveColors(scheme) {
    const config = scheme.colors?.autoDerive || {};
    if (!config.enabled) return scheme.colors;

    const bgColor = scheme.colors?.base?.bg || '#ffffff';
    const isDark = this.isDark(bgColor);
    
    const derived = this.derivePalette(bgColor, {
      surfaceOpacity: config.surfaceOpacity || 0.04,
      borderOpacity: config.borderOpacity || 0.12,
      hoverBrightness: config.hoverBrightness || 0.9
    });

    return {
      ...scheme.colors,
      base: {
        ...scheme.colors.base,
        bgSurface: derived.bgSurface,
        bgElevated: derived.bgElevated,
        textBase: derived.textBase,
        borderDefault: derived.borderDefault,
        borderMuted: derived.borderMuted
      },
      accent: {
        ...scheme.colors.accent,
        primaryHover: derived.accent.primaryHover,
        primaryBg: derived.accent.primaryBg
      }
    };
  }

  getLuminance(hex) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return 0;
    const toLinear = (c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * toLinear(rgb.r) + 0.7152 * toLinear(rgb.g) + 0.0722 * toLinear(rgb.b);
  }

  getContrastRatio(color1, color2) {
    const L1 = this.getLuminance(color1);
    const L2 = this.getLuminance(color2);
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  checkContrast(fg, bg, level = 'AA', size = 'normal') {
    const ratio = this.getContrastRatio(fg, bg);
    const requirements = { 'AA': { normal: 4.5, large: 3 }, 'AAA': { normal: 7, large: 4.5 } };
    const required = requirements[level]?.[size] || 4.5;
    return {
      ratio: ratio.toFixed(2),
      passes: ratio >= required,
      required,
      level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA Large' : 'Fail'
    };
  }

  ensureContrast(textColor, bgColor, minRatio = 4.5) {
    const currentRatio = this.getContrastRatio(textColor, bgColor);
    if (currentRatio >= minRatio) return textColor;
    
    const isDarkBg = this.isDark(bgColor);
    const hsl = this.hexToHsl(textColor);
    if (!hsl) return isDarkBg ? '#ffffff' : '#000000';
    
    let adjustedL = hsl.l;
    const step = 5;
    let iterations = 0;
    
    while (iterations < 20) {
      iterations++;
      if (isDarkBg) {
        adjustedL = Math.min(100, adjustedL + step);
      } else {
        adjustedL = Math.max(0, adjustedL - step);
      }
      const adjustedColor = this.hslToHex(hsl.h, hsl.s, adjustedL);
      if (this.getContrastRatio(adjustedColor, bgColor) >= minRatio) return adjustedColor;
    }
    
    return isDarkBg ? '#ffffff' : '#000000';
  }

  hueDifference(color1, color2) {
    const hsl1 = this.hexToHsl(color1);
    const hsl2 = this.hexToHsl(color2);
    if (!hsl1 || !hsl2) return 0;
    let diff = Math.abs(hsl1.h - hsl2.h);
    return diff > 180 ? 360 - diff : diff;
  }

  generateHarmony(baseColor, harmonyType = 'complementary') {
    const hsl = this.hexToHsl(baseColor);
    if (!hsl) return [baseColor];
    
    const harmonies = {
      complementary: [0, 180],
      analogous: [0, 30, 330],
      triadic: [0, 120, 240],
      splitComplementary: [0, 150, 210],
      tetradic: [0, 90, 180, 270],
      square: [0, 90, 180, 270]
    };
    
    const offsets = harmonies[harmonyType] || harmonies.complementary;
    return offsets.map(offset => this.hslToHex((hsl.h + offset) % 360, hsl.s, hsl.l));
  }

  generateScale(baseColor, steps = 9) {
    const hsl = this.hexToHsl(baseColor);
    if (!hsl) return [baseColor];
    
    const scale = [];
    const lightStep = (100 - hsl.l) / ((steps - 1) / 2);
    const darkStep = hsl.l / ((steps - 1) / 2);
    
    for (let i = 0; i < steps; i++) {
      let l;
      if (i < (steps - 1) / 2) {
        l = hsl.l + lightStep * ((steps - 1) / 2 - i);
      } else if (i > (steps - 1) / 2) {
        l = hsl.l - darkStep * (i - (steps - 1) / 2);
      } else {
        l = hsl.l;
      }
      scale.push(this.hslToHex(hsl.h, hsl.s, Math.max(0, Math.min(100, l))));
    }
    
    return scale;
  }

  generateGrayScale(baseColor, isDark = null) {
    if (isDark === null) isDark = this.isDark(baseColor);
    const hsl = this.hexToHsl(baseColor);
    if (!hsl) return this.generateScale('#808080', 9);
    
    const grayHue = hsl.h;
    const graySat = Math.max(0, hsl.s * 0.1);
    const values = isDark 
      ? [12, 18, 24, 32, 42, 54, 66, 78, 92]
      : [98, 96, 92, 84, 72, 56, 40, 24, 8];
    
    return values.map(l => this.hslToHex(grayHue, graySat, l));
  }

  parseColor(color) {
    if (!color) return null;
    if (color.startsWith('#')) {
      if (color.length === 4) {
        const r = color[1], g = color[2], b = color[3];
        return `#${r}${r}${g}${g}${b}${b}`;
      }
      return color.toLowerCase();
    }
    
    const rgbMatch = color.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (rgbMatch) return this.rgbToHex(parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3]));
    
    const rgbaMatch = color.match(/rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*[\d.]+\s*\)/i);
    if (rgbaMatch) return this.rgbToHex(parseInt(rgbaMatch[1]), parseInt(rgbaMatch[2]), parseInt(rgbaMatch[3]));
    
    const hslMatch = color.match(/hsl\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)/i);
    if (hslMatch) return this.hslToHex(parseInt(hslMatch[1]), parseInt(hslMatch[2]), parseInt(hslMatch[3]));
    
    return null;
  }

  toCss(color, format = 'hex') {
    const rgb = this.hexToRgb(color);
    const hsl = this.hexToHsl(color);
    if (!rgb || !hsl) return color;
    
    switch (format) {
      case 'rgb': return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case 'hsl': return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
      default: return color;
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const colorEngine = new ColorEngine();

export const deriveColors = (scheme) => colorEngine.autoDeriveColors(scheme);
export const getContrastRatio = (fg, bg) => colorEngine.getContrastRatio(fg, bg);
export const checkContrast = (fg, bg, level, size) => colorEngine.checkContrast(fg, bg, level, size);
export const isDark = (color) => colorEngine.isDark(color);
export const generatePalette = (color, options) => colorEngine.derivePalette(color, options);