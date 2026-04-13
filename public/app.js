/* MarkHTML v6.0 */

// DOM Elements
const htmlPreview = document.getElementById('html-preview');
const themeSelect = document.getElementById('theme-select');
const styleSettingsBtn = document.getElementById('style-settings-btn');
const highlightSelect = document.getElementById('highlight-select');
const lineNumbersCheckbox = document.getElementById('line-numbers');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');
const clearBtn = document.getElementById('clear-btn');
const toast = document.getElementById('toast');
const hljsTheme = document.getElementById('hljs-theme');
const styleModal = document.getElementById('style-modal');
const closeStyleModal = document.getElementById('close-style-modal');
const applyStyleBtn = document.getElementById('apply-style');
const resetStyleBtn = document.getElementById('reset-style');

// Global Variables
let editor = null;
let md = null;
let styleManager = null;
let colorEngine = null;

// Monaco Output Editors
let cssEditor = null;
let htmlEditor = null;
let currentOutputTab = 'css';

// Code Highlight Styles
const highlightStyles = {
  github: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.min.css',
  'github-dark': 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github-dark.min.css',
  monokai: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/monokai.min.css',
  'atom-one-dark': 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/atom-one-dark.min.css',
  'atom-one-light': 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/atom-one-light.min.css',
  nord: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/nord.min.css',
  'tokyo-night': 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/tokyo-night-dark.min.css'
};

// Initialization
async function initStyleSystem() {
  const { getStyleManager } = await import('./lib/StyleManager.js');
  const { ColorEngine: CE } = await import('./lib/ColorEngine.js');
  
  colorEngine = new CE();
  styleManager = getStyleManager({ onSchemeChange: onSchemeChange });
  styleManager.applyToDOM();
  
  if (editor) {
    monaco.editor.setTheme(styleManager.getEditorTheme());
  }
  syncHighlightTheme();
}

function onSchemeChange(scheme) {
  if (styleManager) {
    styleManager.applyToDOM();
  }
  if (editor) {
    monaco.editor.setTheme(styleManager?.getEditorTheme?.() || 'vs');
  }
  syncHighlightTheme();
  updateSourceView();
  renderMarkdown();
}

function syncHighlightTheme() {
  if (!styleManager) return;
  
  const recommendedTheme = styleManager.getHighlightTheme();
  
  if (highlightSelect.value !== recommendedTheme) {
    const currentIsDark = ['github-dark', 'monokai', 'atom-one-dark', 'nord', 'tokyo-night'].includes(highlightSelect.value);
    const recommendedIsDark = ['github-dark', 'monokai', 'atom-one-dark', 'nord', 'tokyo-night'].includes(recommendedTheme);
    
    if (currentIsDark !== recommendedIsDark) {
      highlightSelect.value = recommendedTheme;
      setHighlightStyle(recommendedTheme);
    }
  }
}

function initMonacoEditor() {
  require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.47.0/min/vs' } });
  
  require(['vs/editor/editor.main'], function () {
    const editorTheme = styleManager ? styleManager.getEditorTheme() : 'vs';
    
    editor = monaco.editor.create(document.getElementById('editor-container'), {
      value: '',
      language: 'markdown',
      theme: editorTheme,
      fontFamily: "'JetBrains Mono', Consolas, monospace",
      fontSize: 14,
      lineHeight: 22,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      lineNumbers: 'on',
      renderLineHighlight: 'line',
      automaticLayout: true,
      padding: { top: 16, bottom: 16 },
      scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 }
    });
    
    editor.onDidChangeModelContent(() => debounceRender());
    initMarkdownIt();
    
    const savedContent = localStorage.getItem('markhtml-content');
    if (savedContent) {
      editor.setValue(savedContent);
    }
    initOutputEditors();
  });
}

function initMarkdownIt() {
  md = window.markdownit({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    disableSetext: true,
    highlight: function (str, lang) {
      if (lang === 'mermaid') {
        return `<div class="mermaid">${str}</div>`;
      }
      return highlightCode(str, lang);
    }
  });
  
  md.use(window.markdownitTaskLists, { enabled: true, label: true, lineNumber: true });
  md.use(window.markdownitFootnote);
  md.use(window.markdownitMark);
  md.use(window.markdownitSub);
  md.use(window.markdownitSup);
  md.use(window.markdownitDeflist);
  md.use(window.markdownitContainer, 'warning');
  md.use(window.markdownitContainer, 'info');
  md.use(window.markdownitContainer, 'tip');
  
  // Protect math formulas
  const originalRender = md.render.bind(md);
  md.render = function(src) {
    const mathPlaceholders = [];
    const genId = () => `MATH${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    
    src = src.replace(/\$\$([\s\S]+?)\$\$/g, (match, formula) => {
      const id = genId();
      mathPlaceholders.push({ id, formula: `$$${formula}$$` });
      return id;
    });
    
    src = src.replace(/(?<!\$)\$(?!\$)([^\$\n]+?)\$(?!\$)/g, (match, formula) => {
      const id = genId();
      mathPlaceholders.push({ id, formula: `$${formula}$` });
      return id;
    });
    
    let result = originalRender(src);
    
    mathPlaceholders.forEach(({ id, formula }) => {
      result = result.replace(new RegExp(`<p>${id}</p>`, 'g'), formula);
      result = result.replace(new RegExp(id, 'g'), formula);
    });
    
    result = fixUnparsedEmphasis(result);
    return result;
  };
  
  renderMarkdown();
}

function fixUnparsedEmphasis(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  
  function processTextNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      const parent = node.parentNode;
      
      if (parent && (parent.tagName === 'STRONG' || parent.tagName === 'EM')) return;
      
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let hasMatch = false;
      
      const boldRegex = /(\*\*|__)(.+?)\1/g;
      const italicRegex = /(\*|_)(.+?)\1/g;
      
      let match;
      const matches = [];
      
      while ((match = boldRegex.exec(text)) !== null) {
        matches.push({ start: match.index, end: match.index + match[0].length, content: match[2], type: 'strong' });
      }
      
      while ((match = italicRegex.exec(text)) !== null) {
        const overlaps = matches.some(m => 
          (match.index >= m.start && match.index < m.end) ||
          (match.index + match[0].length > m.start && match.index + match[0].length <= m.end)
        );
        if (!overlaps) {
          matches.push({ start: match.index, end: match.index + match[0].length, content: match[2], type: 'em' });
        }
      }
      
      matches.sort((a, b) => a.start - b.start);
      
      for (const m of matches) {
        hasMatch = true;
        if (m.start > lastIndex) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex, m.start)));
        }
        const el = document.createElement(m.type);
        el.textContent = m.content;
        fragment.appendChild(el);
        lastIndex = m.end;
      }
      
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      }
      
      if (hasMatch) {
        node.parentNode.replaceChild(fragment, node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (!['CODE', 'PRE', 'SCRIPT', 'STYLE'].includes(node.tagName)) {
        Array.from(node.childNodes).forEach(child => processTextNode(child));
      }
    }
  }
  
  processTextNode(temp);
  return temp.innerHTML;
}

function highlightCode(code, lang) {
  const showLineNumbers = lineNumbersCheckbox.checked;
  const showLang = styleManager?.currentScheme?.components?.code?.showLang ?? true;
  let highlighted;
  
  try {
    if (lang && window.hljs.getLanguage(lang)) {
      highlighted = window.hljs.highlight(code, { language: lang }).value;
    } else {
      highlighted = window.hljs.highlightAuto(code).value;
      lang = '';
    }
  } catch (e) {
    highlighted = escapeHtml(code);
    lang = '';
  }
  
  if (showLineNumbers) {
    const lines = code.split('\n');
    const lineNumbers = lines.map((_, i) => i + 1).join('\n');
    const langAttr = showLang && lang ? ` data-lang="${lang}"` : '';
    return `<pre${langAttr} class="with-line-numbers"><code class="line-numbers">${lineNumbers}</code><code class="code-content hljs">${highlighted}</code></pre>`;
  }
  
  const langAttr = showLang && lang ? ` data-lang="${lang}"` : '';
  return `<pre${langAttr}><code class="hljs">${highlighted}</code></pre>`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Rendering
async function renderMarkdown() {
  if (!editor || !md) return;
  
  const markdown = editor.getValue();
  localStorage.setItem('markhtml-content', markdown);
  
  const html = md.render(markdown);
  htmlPreview.innerHTML = html;
  
  updateSourceView();
  
  renderMathInElement(htmlPreview, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false }
    ],
    throwOnError: false,
    ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option'],
    ignoredClasses: []
  });
  
  const mermaidDivs = htmlPreview.querySelectorAll('.mermaid');
  if (mermaidDivs.length > 0 && styleManager) {
    const isDark = styleManager.isDarkTheme();
    
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      securityLevel: 'loose'
    });
    
    for (const div of mermaidDivs) {
      try {
        const { svg } = await mermaid.render(`mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, div.textContent);
        div.innerHTML = svg;
      } catch (e) {
        div.innerHTML = `<pre style="color: red;">Mermaid Error: ${e.message}</pre>`;
      }
    }
  }
}

function updateSourceView() {
  const css = generateCSS();
  const html = generateHTML();
  
  if (cssEditor) cssEditor.setValue(css);
  if (htmlEditor) htmlEditor.setValue(html);
}

function formatHtml(html) {
  const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
  const inlineTags = ['span', 'a', 'strong', 'em', 'code', 'mark', 'sub', 'sup', 'del', 'b', 'i', 'u', 'small', 'label', 'input'];
  const placeholders = [];
  
  html = html.replace(/<pre([^>]*)>([\s\S]*?)<\/pre>/gi, (match, attrs, content) => {
    const index = placeholders.length;
    placeholders.push(`<pre${attrs}>${content}</pre>`);
    return `PLACEHOLDER${index}ENDHOLDER`;
  });
  
  const protectKatex = (html) => {
    const regex = /<span([^>]*)class="([^"]*\bkatex(?:-display)?\b[^"]*)"([^>]*)>/gi;
    let result = '';
    let lastIndex = 0;
    
    while (true) {
      const match = regex.exec(html);
      if (!match) break;
      
      result += html.slice(lastIndex, match.index);
      
      const startIndex = match.index;
      let depth = 1;
      let pos = startIndex + match[0].length;
      
      while (depth > 0 && pos < html.length) {
        const nextOpen = html.indexOf('<span', pos);
        const nextClose = html.indexOf('</span>', pos);
        
        if (nextClose === -1) break;
        
        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          pos = nextOpen + 5;
        } else {
          depth--;
          pos = nextClose + 7;
        }
      }
      
      const fullMatch = html.slice(startIndex, pos);
      const index = placeholders.length;
      placeholders.push(fullMatch);
      result += `PLACEHOLDER${index}ENDHOLDER`;
      
      lastIndex = pos;
      regex.lastIndex = pos;
    }
    
    result += html.slice(lastIndex);
    return result;
  };
  
  html = protectKatex(html);
  
  html = html.replace(/<div[^>]*class="mermaid[^"]*"[^>]*>[\s\S]*?<\/div>/gi, (match) => {
    const index = placeholders.length;
    placeholders.push(match);
    return `PLACEHOLDER${index}ENDHOLDER`;
  });
  
  let formatted = '';
  let indent = 0;
  const indentStr = '  ';
  
  const tokens = html.split(/(<[^>]+>)/g).filter(t => t.trim());
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].trim();
    if (!token) continue;
    
    if (token.startsWith('PLACEHOLDER') && token.endsWith('ENDHOLDER')) {
      const index = parseInt(token.replace('PLACEHOLDER', '').replace('ENDHOLDER', ''));
      formatted += indentStr.repeat(indent) + placeholders[index] + '\n';
      continue;
    }
    
    if (!token.startsWith('<')) {
      token.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (trimmed) {
          formatted += indentStr.repeat(indent) + trimmed + '\n';
        }
      });
      continue;
    }
    
    if (token.match(/^<[^>]+\/>$/) || selfClosingTags.some(tag => token.match(new RegExp(`^<${tag}[\s>]`, 'i')))) {
      formatted += indentStr.repeat(indent) + token + '\n';
      continue;
    }
    
    if (token.startsWith('</')) {
      const tagName = token.match(/^<(\/)(\w+)/)?.[1]?.toLowerCase();
      if (!inlineTags.includes(tagName)) {
        indent = Math.max(0, indent - 1);
      }
      formatted += indentStr.repeat(indent) + token + '\n';
      continue;
    }
    
    if (token.startsWith('<')) {
      const tagName = token.match(/^<(\w+)/)?.[1]?.toLowerCase();
      const nextToken = tokens[i + 1]?.trim();
      const isImmediateClose = nextToken && nextToken === `</${tagName}>`;
      
      formatted += indentStr.repeat(indent) + token + '\n';
      
      if (!inlineTags.includes(tagName) && !isImmediateClose) {
        indent++;
      }
    }
  }
  
  return formatted.trim();
}

// Style Settings
function loadStyleSettings() {
  if (!styleManager?.currentScheme) return;
  
  const scheme = styleManager.currentScheme;
  const colors = scheme.colors || {};
  
  setColorInput('custom-bg-base', colors.base?.bg);
  setColorInput('custom-text-base', colors.base?.textBase);
  setColorInput('custom-bg-surface', colors.base?.bgSurface);
  setColorInput('custom-accent', colors.accent?.primary);
  setColorInput('custom-heading', colors.component?.heading);
  setColorInput('custom-link-color', colors.component?.link);
  setColorInput('custom-code-bg', colors.component?.codeBg);
  setColorInput('custom-code-text', colors.component?.codeText);
  
  const fontSizeInput = document.getElementById('style-font-size');
  const lineHeightInput = document.getElementById('style-line-height');
  
  if (fontSizeInput) {
    fontSizeInput.value = scheme.layout?.font?.baseSize || 16;
    updateSliderValue(fontSizeInput);
  }
  if (lineHeightInput) {
    lineHeightInput.value = scheme.layout?.font?.lineHeight || 1.7;
    updateSliderValue(lineHeightInput);
  }
  
  const paragraphSpacingInput = document.getElementById('style-paragraph-spacing');
  const maxWidthInput = document.getElementById('style-max-width');
  
  if (paragraphSpacingInput) {
    paragraphSpacingInput.value = scheme.layout?.spacing?.paragraph || 16;
    updateSliderValue(paragraphSpacingInput);
  }
  if (maxWidthInput) {
    maxWidthInput.value = scheme.layout?.sizing?.maxWidth || 900;
    updateSliderValue(maxWidthInput);
  }
}

function setColorInput(id, value) {
  const input = document.getElementById(id);
  if (input && value) {
    const colorValue = value.length === 9 ? value.slice(0, 7) : value;
    input.value = colorValue;
    
    const textInput = document.getElementById(`${id}-text`);
    if (textInput) textInput.value = colorValue;
  }
}

function updateSliderValue(input) {
  const valueSpan = document.getElementById(`${input.id}-value`);
  if (valueSpan) {
    const unit = valueSpan.textContent.replace(/[\d.]+/, '');
    valueSpan.textContent = input.value + unit;
  }
}

function saveStyleSettings() {
  if (!styleManager) return;
  
  const updates = {
    colors: {
      ...styleManager.currentScheme.colors,
      base: {
        ...styleManager.currentScheme.colors.base,
        bg: getInputValue('custom-bg-base'),
        textBase: getInputValue('custom-text-base'),
        bgSurface: getInputValue('custom-bg-surface')
      },
      accent: {
        ...styleManager.currentScheme.colors.accent,
        primary: getInputValue('custom-accent')
      },
      component: {
        ...styleManager.currentScheme.colors.component,
        heading: getInputValue('custom-heading'),
        link: getInputValue('custom-link-color'),
        codeBg: getInputValue('custom-code-bg'),
        codeText: getInputValue('custom-code-text')
      }
    },
    layout: {
      font: {
        baseSize: parseInt(document.getElementById('style-font-size')?.value) || 16,
        lineHeight: parseFloat(document.getElementById('style-line-height')?.value) || 1.7
      },
      spacing: {
        paragraph: parseInt(document.getElementById('style-paragraph-spacing')?.value) || 16
      },
      sizing: {
        maxWidth: parseInt(document.getElementById('style-max-width')?.value) || 900
      }
    }
  };
  
  styleManager.updateScheme(updates);
  styleManager.applyToDOM();
  renderMarkdown();
}

function getInputValue(id) {
  const input = document.getElementById(id);
  if (input) {
    const textInput = document.getElementById(`${id}-text`);
    if (textInput && textInput.value) return textInput.value;
    return input.value;
  }
  return '';
}

function resetStyleSettings() {
  if (!styleManager) return;
  
  const currentThemeId = styleManager.currentScheme?.meta?.id;
  styleManager.loadPreset(currentThemeId || 'github-light');
  loadStyleSettings();
  renderMarkdown();
  showToast('Settings reset to default');
}

// Export HTML
function formatCss(css) {
  if (!css) return '';
  if (css.includes('\n  ')) return css;
  
  let formatted = '';
  let indent = 0;
  const indentStr = '  ';
  
  const tokens = css.split(/([{};])/);
  
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i].trim();
    if (!token) continue;
    
    if (token === '{') {
      formatted += ' {\n';
      indent++;
    } else if (token === '}') {
      indent = Math.max(0, indent - 1);
      formatted += indentStr.repeat(indent) + '}\n';
    } else if (token === ';') {
      formatted += ';\n';
    } else {
      if (tokens[i + 1] === '{') {
        if (formatted && !formatted.endsWith('\n')) formatted += '\n';
        formatted += indentStr.repeat(indent) + token;
      } else if (tokens[i + 1] === ';') {
        formatted += indentStr.repeat(indent) + token;
      } else {
        formatted += indentStr.repeat(indent) + token;
      }
    }
  }
  
  return formatted.trim();
}

function generateCSS() {
  if (!styleManager) return '';
  return formatCss(styleManager.getInlineCSS());
}

function generateHTML() {
  return formatHtml(htmlPreview.innerHTML);
}

function generateFullHtml() {
  const highlightStyle = highlightSelect.value;
  const content = htmlPreview.innerHTML;
  
  if (!styleManager) return content;
  
  const css = styleManager.getInlineCSS();
  const isDark = styleManager.isDarkTheme();
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const mermaidDivs = tempDiv.querySelectorAll('.mermaid');
  let hasUnrenderedMermaid = false;
  mermaidDivs.forEach(div => {
    if (!div.innerHTML.trim().toLowerCase().startsWith('<svg')) {
      hasUnrenderedMermaid = true;
    }
  });
  
  const mermaidScript = hasUnrenderedMermaid
    ? `<script src="https://cdn.jsdelivr.net/npm/mermaid@10.8.0/dist/mermaid.min.js"><\/script>\n<script>mermaid.initialize({startOnLoad:true,theme:'${isDark ? 'dark' : 'default'}'});<\/script>`
    : '';
  
  const katexLink = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">`;
  const formattedContent = formatHtml(content);
  
  return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>MarkHTML Export</title>\n  ${katexLink}\n  <link rel="stylesheet" href="${highlightStyles[highlightStyle]}">\n  <style>\n${css}\n  </style>\n</head>\n<body>\n${formattedContent}\n${mermaidScript}\n</body>\n</html>`;
}

// Utility Functions
let debounceTimer = null;
function debounceRender() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(renderMarkdown, 200);
}

function setHighlightStyle(style) {
  const themeUrl = highlightStyles[style];
  if (themeUrl) {
    hljsTheme.href = themeUrl;
    localStorage.setItem('markhtml-highlight', style);
    renderMarkdown();
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard');
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Copied to clipboard');
  });
}

function downloadHtml() {
  try {
    const html = generateFullHtml();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    showToast('HTML file downloaded');
  } catch (err) {
    console.error('Download failed:', err);
    showToast('Download failed, please try again');
  }
}

// Event Listeners
document.querySelectorAll('.modal-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
  });
});

document.querySelectorAll('input[type="range"]').forEach(input => {
  const valueSpan = document.getElementById(`${input.id}-value`);
  if (valueSpan) {
    input.addEventListener('input', () => {
      const unit = valueSpan.textContent.replace(/[\d.]+/, '');
      valueSpan.textContent = input.value + unit;
    });
  }
});

document.querySelectorAll('input[type="color"]').forEach(input => {
  input.addEventListener('input', () => {
    const textInput = document.getElementById(`${input.id}-text`);
    if (textInput) textInput.value = input.value;
  });
});

document.querySelectorAll('input[type="text"][id$="-text"]').forEach(input => {
  input.addEventListener('change', () => {
    const colorId = input.id.replace('-text', '');
    const colorInput = document.getElementById(colorId);
    if (colorInput && /^#[0-9A-Fa-f]{6}$/.test(input.value)) {
      colorInput.value = input.value;
    }
  });
});

themeSelect.addEventListener('change', (e) => {
  if (styleManager) styleManager.loadPreset(e.target.value);
});

styleSettingsBtn.addEventListener('click', () => {
  styleModal.classList.add('active');
  loadStyleSettings();
});

highlightSelect.addEventListener('change', (e) => {
  setHighlightStyle(e.target.value);
  updateSourceView();
});

lineNumbersCheckbox.addEventListener('change', renderMarkdown);

document.querySelectorAll('.output-main-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.output-main-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.output-view').forEach(v => v.classList.remove('active'));
    tab.classList.add('active');
    
    const view = document.getElementById(`${tab.dataset.view}-view`);
    if (view) view.classList.add('active');
  });
});

document.querySelectorAll('.source-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.source-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.source-editor-container').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    
    currentOutputTab = tab.dataset.tab;
    const container = document.getElementById(`${tab.dataset.tab}-editor-container`);
    if (container) container.classList.add('active');
  });
});

copyBtn.addEventListener('click', () => copyToClipboard(generateFullHtml()));
downloadBtn.addEventListener('click', downloadHtml);

clearBtn.addEventListener('click', () => {
  if (editor) {
    editor.setValue('');
    localStorage.removeItem('markhtml-content');
  }
});

closeStyleModal.addEventListener('click', () => styleModal.classList.remove('active'));
styleModal.addEventListener('click', (e) => {
  if (e.target === styleModal) styleModal.classList.remove('active');
});

applyStyleBtn.addEventListener('click', () => {
  saveStyleSettings();
  styleModal.classList.remove('active');
  showToast('Style applied');
});
resetStyleBtn.addEventListener('click', resetStyleSettings);

// About Modal
const aboutBtn = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');
const closeAboutModal = document.getElementById('close-about-modal');

aboutBtn.addEventListener('click', () => aboutModal.classList.add('active'));
closeAboutModal.addEventListener('click', () => aboutModal.classList.remove('active'));
aboutModal.addEventListener('click', (e) => {
  if (e.target === aboutModal) aboutModal.classList.remove('active');
});

// Initialization
async function init() {
  await initStyleSystem();
  
  const savedHighlight = localStorage.getItem('markhtml-highlight') || 'github';
  highlightSelect.value = savedHighlight;
  setHighlightStyle(savedHighlight);
  
  if (styleManager?.currentScheme) {
    themeSelect.value = styleManager.currentScheme.meta.id;
  }
  
  initMonacoEditor();
}

function initOutputEditors() {
  require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.47.0/min/vs' } });
  
  require(['vs/editor/editor.main'], function () {
    const editorTheme = styleManager ? styleManager.getEditorTheme() : 'vs';
    
    cssEditor = monaco.editor.create(document.getElementById('css-editor-container'), {
      value: '',
      language: 'css',
      theme: editorTheme,
      fontFamily: "'JetBrains Mono', Consolas, monospace",
      fontSize: 13,
      lineHeight: 20,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      lineNumbers: 'off',
      renderLineHighlight: 'none',
      automaticLayout: true,
      readOnly: true,
      padding: { top: 12, bottom: 12 },
      scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 }
    });
    
    htmlEditor = monaco.editor.create(document.getElementById('html-editor-container'), {
      value: '',
      language: 'html',
      theme: editorTheme,
      fontFamily: "'JetBrains Mono', Consolas, monospace",
      fontSize: 13,
      lineHeight: 20,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      lineNumbers: 'off',
      renderLineHighlight: 'none',
      automaticLayout: true,
      readOnly: true,
      padding: { top: 12, bottom: 12 },
      scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 }
    });
    
    updateSourceView();
  });
}

init();
