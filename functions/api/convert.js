/**
 * MarkHTML API v3.0
 * Simplified - Supports full style configuration
 */

// Preset theme styles (kept for backward compatibility)
const THEME_STYLES = {
  github: 'body{background:#fff;color:#24292f;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.7}pre{background:#f6f8fa;padding:16px;border-radius:6px;overflow-x:auto}code{font-family:JetBrains Mono,Consolas,monospace;font-size:.9em;color:#24292f}code:not(pre code){background:#f6f8fa;padding:2px 6px;border-radius:4px}blockquote{border-left:4px solid #0969da;padding-left:20px;margin:16px 0;color:#57606a}table{border-collapse:collapse;width:100%;margin:16px 0}th,td{border:1px solid #d0d7de;padding:10px 14px;text-align:left}th{background:#f6f8fa;font-weight:600}h1,h2{border-bottom:1px solid #d0d7de;padding-bottom:8px}a{color:#0969da}',
  'github-dark': 'body{background:#0d1117;color:#e6edf3;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.7}pre{background:#161b22;padding:16px;border-radius:6px}code{font-family:JetBrains Mono,Consolas,monospace;color:#e6edf3}code:not(pre code){background:#161b22}blockquote{border-left:4px solid #58a6ff;padding-left:20px;color:#7d8590}th,td{border:1px solid #30363d;padding:10px}th{background:#161b22}h1,h2{border-bottom:1px solid #30363d}a{color:#58a6ff}',
  nord: 'body{background:#2e3440;color:#eceff4;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.7}pre{background:#3b4252;padding:16px;border-radius:6px}code{font-family:JetBrains Mono,Consolas,monospace;color:#eceff4}blockquote{border-left:4px solid #81a1c1;padding-left:20px;color:#d8dee9}th,td{border:1px solid #4c566a;padding:10px}th{background:#3b4252}h1,h2{border-bottom:1px solid #4c566a}a{color:#88c0d0}',
  monokai: 'body{background:#272822;color:#f8f8f2;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.7}pre{background:#1e1f1c;padding:16px;border-radius:6px}code{font-family:JetBrains Mono,Consolas,monospace;color:#f8f8f2}blockquote{border-left:4px solid #66d9ef;padding-left:20px;color:#a6a69b}th,td{border:1px solid #49483e;padding:10px}th{background:#1e1f1c}h1,h2{border-bottom:1px solid #49483e}a{color:#a6e22e}'
};

const HIGHLIGHT_STYLES = {
  github: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.min.css',
  'github-dark': 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github-dark.min.css',
  monokai: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/monokai.min.css',
  'atom-one-dark': 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/atom-one-dark.min.css',
  'atom-one-light': 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/atom-one-light.min.css',
  nord: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/nord.min.css',
  'tokyo-night': 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/tokyo-night-dark.min.css'
};

const KATEX_CSS = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
const KATEX_JS = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
const KATEX_AUTO_RENDER = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js';
const MERMAID_JS = 'https://cdn.jsdelivr.net/npm/mermaid@10.8.0/dist/mermaid.min.js';

/**
 * Generate CSS from Scheme
 * Full version - consistent with schemeToInlineCSS in Schema.js
 */
function generateCSSFromScheme(scheme) {
  const c = scheme.colors || {};
  const l = scheme.layout || {};
  const comp = scheme.components || {};
  const effects = scheme.effects || {};
  const typography = scheme.typography || {};
  
  const fontSize = l.font?.baseSize || 16;
  const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  const codeFont = "'JetBrains Mono', 'Fira Code', Consolas, monospace";
  const lineHeight = l.font?.lineHeight || 1.7;
  const maxWidth = l.sizing?.maxWidth || 900;
  
  let css = `*{margin:0;padding:0;box-sizing:border-box}`;
  css += `html{font-size:${fontSize}px}`;
  css += `body{font-family:${fontFamily};line-height:${lineHeight};background:${c.base?.bg || '#fff'};color:${c.base?.textBase || '#24292f'};max-width:${maxWidth}px;margin:0 auto;padding:40px 20px}`;
  
  // === Paragraphs and Text ===
  css += `p{margin:0 0 ${l.spacing?.paragraph || 16}px;line-height:${lineHeight}}`;
  
  // === Headings ===
  css += `h1,h2,h3,h4,h5,h6{margin:${l.spacing?.heading || 24}px 0 12px;font-weight:600;line-height:1.3;color:${c.component?.heading || '#1f2328'}}`;
  css += `h1:first-child,h2:first-child,h3:first-child{margin-top:0}`;
  css += `h1{font-size:${comp.heading?.h1Size || 2}em}`;
  css += `h2{font-size:${comp.heading?.h2Size || 1.5}em}`;
  css += `h3{font-size:${comp.heading?.h3Size || 1.25}em}`;
  css += `h4{font-size:${comp.heading?.h4Size || 1}em}`;
  if (comp.heading?.showBorder !== false) {
    css += `h1,h2{border-bottom:${comp.heading?.borderWidth || 1}px solid ${c.base?.borderDefault || '#d0d7de'};padding-bottom:8px}`;
  }
  
  // === Links ===
  css += `a{color:${c.component?.link || c.accent?.primary || '#0969da'};text-decoration:none;transition:color 0.15s ease}`;
  css += `a:hover{color:${c.component?.linkHover || c.accent?.primaryHover || '#0550ae'};text-decoration:underline}`;
  
  // === Code Blocks ===
  const codeLineHeight = comp.code?.lineHeight || 1.6;
  const codePadding = comp.code?.padding || 16;
  const codeRadius = comp.code?.radius || 6;
  const codeFontScale = comp.code?.fontScale || 0.9;
  const codeText = c.component?.codeText || c.base?.textBase || '#24292f';
  
  css += `pre{position:relative;background:${c.component?.codeBg || '#f6f8fa'};padding:${codePadding}px;border-radius:${codeRadius}px;overflow-x:auto;border:${comp.code?.borderWidth || 1}px solid ${c.base?.borderDefault || '#d0d7de'};margin:16px 0;box-shadow:0 1px 2px rgba(0,0,0,0.05)}`;
  css += `pre code{font-family:${codeFont};font-size:${codeFontScale}em;line-height:${codeLineHeight};color:${codeText}}`;
  css += `code{font-family:${codeFont}}`;
  css += `code:not(pre code){background:${c.component?.codeBg || '#f6f8fa'};padding:2px 6px;border-radius:${effects.radius?.sm || 4}px;font-size:${codeFontScale}em;color:${codeText}}`;
  
  // === Line Numbers ===
  css += `pre.with-line-numbers{display:flex;gap:16px;align-items:stretch}`;
  css += `pre .line-numbers{user-select:none;text-align:right;padding-right:16px;border-right:1px solid ${c.base?.borderDefault || '#d0d7de'};color:${c.base?.textSubtle || '#8c959f'};flex-shrink:0;font-family:${codeFont};font-size:${codeFontScale}em;line-height:${codeLineHeight};white-space:pre}`;
  css += `pre .code-content{flex:1;min-width:0}`;
  
  // Code block language label
  if (comp.code?.showLang !== false) {
    css += `pre[data-lang]::before{content:attr(data-lang);position:absolute;top:0;right:0;padding:2px 8px;font-size:0.7rem;font-family:${codeFont};background:${c.base?.borderDefault || '#d0d7de'};color:${c.base?.textMuted || '#57606a'};border-radius:0 ${codeRadius}px 0 6px;text-transform:uppercase;letter-spacing:0.5px}`;
  }
  
  // === Blockquotes ===
  css += `blockquote{margin:16px 0;padding:${comp.quote?.padding || '12px 20px'};border-left:${comp.quote?.borderWidth || 4}px ${comp.quote?.style || 'solid'} ${c.component?.quoteBorder || '#0969da'};background:${c.base?.bgSurface || '#f6f8fa'};border-radius:0 ${comp.quote?.radius || 6}px ${comp.quote?.radius || 6}px 0;color:${c.base?.textMuted || '#57606a'}}`;
  css += `blockquote p:last-child{margin-bottom:0}`;
  
  // === Lists ===
  css += `ul,ol{margin:0 0 ${l.spacing?.paragraph || 16}px;padding-left:${comp.list?.indent || 24}px}`;
  css += `ul{list-style-type:${comp.list?.markerStyle || 'disc'}}`;
  css += `li{margin:${comp.list?.spacing || 4}px 0;line-height:1.6}`;
  
  // Task lists
  css += `.task-list-item{list-style:none;margin-left:-1.5em}`;
  css += `.task-list-item input[type="checkbox"]{margin-right:8px;accent-color:${c.accent?.primary || '#0969da'};width:14px;height:14px}`;
  
  // === Tables ===
  css += `table{width:100%;border-collapse:collapse;margin:16px 0;border-radius:${comp.table?.radius || 0}px;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,0.05)}`;
  css += `th,td{padding:${comp.table?.padding || '10px 14px'};border:${comp.table?.borderWidth || 1}px solid ${c.base?.borderDefault || '#d0d7de'};text-align:left}`;
  css += `th{background:${c.base?.bgSurface || '#f6f8fa'};font-weight:600}`;
  if (comp.table?.striped !== false) {
    css += `tr:nth-child(even){background:${c.base?.bgSurface || '#f6f8fa'}}`;
  }
  if (comp.table?.hoverHighlight !== false) {
    css += `tr:hover{background:${c.base?.bgElevated || '#eaeef2'}}`;
  }
  
  // === Horizontal Rules ===
  css += `hr{border:none;height:${comp.hr?.height || 2}px;background:${c.component?.hr || c.base?.borderDefault || '#d0d7de'};margin:${comp.hr?.margin || 24}px 0;opacity:${comp.hr?.opacity || 1}}`;
  
  // === Images ===
  css += `img{max-width:${comp.image?.maxWidth || '100%'};border-radius:${comp.image?.radius || 6}px}`;
  
  // === Mark ===
  css += `mark{background:${c.semantic?.warningBg || '#fff8c5'};padding:1px 4px;border-radius:2px}`;
  
  // === Sub/Sup/Del ===
  css += `sub,sup{font-size:0.75em;line-height:0;position:relative;vertical-align:baseline}`;
  css += `sup{top:-0.5em}`;
  css += `sub{bottom:-0.25em}`;
  css += `del{text-decoration:line-through;color:${c.base?.textMuted || '#57606a'}`;
  
  // === Definition Lists ===
  css += `dl{margin:16px 0}`;
  css += `dt{font-weight:600;margin-top:8px}`;
  css += `dd{margin-left:24px;color:${c.base?.textMuted || '#57606a'}`;
  
  // === Footnotes ===
  css += `.footnotes{margin-top:48px;padding-top:16px;border-top:1px solid ${c.base?.borderDefault || '#d0d7de'};font-size:${comp.footnote?.fontSize || 0.85}em;opacity:${comp.footnote?.opacity || 0.8}}`;
  css += `.footnotes-sep{display:none}`;
  css += `.footnote-ref{font-size:0.8em;vertical-align:super}`;
  
  // === Callout Containers ===
  const calloutPadding = comp.callout?.padding || '12px 16px';
  const calloutRadius = comp.callout?.radius || 8;
  const calloutBorderWidth = comp.callout?.borderLeftWidth || 4;
  
  css += `.warning,.info,.tip,.danger{padding:${calloutPadding};margin:16px 0;border-radius:${calloutRadius}px;border-left:${calloutBorderWidth}px solid}`;
  css += `.warning{background:${c.callout?.warningBg || '#fff8c5'};border-left-color:${c.callout?.warningBorder || '#bf8700'}}`;
  css += `.info{background:${c.callout?.infoBg || '#ddf4ff'};border-left-color:${c.callout?.infoBorder || '#0969da'}}`;
  css += `.tip{background:${c.callout?.tipBg || '#dafbe1'};border-left-color:${c.callout?.tipBorder || '#1a7f37'}}`;
  css += `.danger{background:${c.callout?.dangerBg || '#ffebe9'};border-left-color:${c.callout?.dangerBorder || '#cf222e'}}`;
  
  // === KaTeX Math ===
  css += `.katex-display{display:block;text-align:center;margin:16px 0;overflow-x:auto;overflow-y:hidden}`;
  css += `.katex-display>.katex{display:inline-block;text-align:initial}`;
  
  // === Mermaid Diagrams ===
  css += `.mermaid{background:${c.base?.bgSurface || '#f6f8fa'};padding:${codePadding}px;border-radius:${codeRadius}px;margin:16px 0;text-align:center;box-shadow:0 1px 2px rgba(0,0,0,0.05)}`;
  
  // === Badge ===
  css += `.badge{display:inline-block;padding:${comp.badge?.padding || '2px 8px'};border-radius:${comp.badge?.radius || 9999}px;font-size:${comp.badge?.fontSize || 0.85}em;font-weight:${comp.badge?.fontWeight || 500};background:${c.accent?.primaryBg || '#ddf4ff'};color:${c.accent?.primary || '#0969da'}}`;
  
  // Custom CSS
  if (scheme.advanced?.customCss) {
    css += scheme.advanced.customCss;
  }
  
  return css;
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function parseMarkdown(markdown, options) {
  const { showLineNumbers = true, enableMermaid = true } = options;
  let html = markdown;
  
  // Protect math formulas
  const mathPlaceholders = [];
  html = html.replace(/\$\$([\s\S]+?)\$\$/g, (match, formula) => {
    const index = mathPlaceholders.length;
    mathPlaceholders.push(`$$${formula}$$`);
    return `__MATH_BLOCK_${index}__`;
  });
  html = html.replace(/(?<!\$)\$(?!\$)([^\$\n]+?)\$(?!\$)/g, (match, formula) => {
    const index = mathPlaceholders.length;
    mathPlaceholders.push(`$${formula}$`);
    return `__MATH_INLINE_${index}__`;
  });
  
  html = parseCodeBlocks(html, showLineNumbers, enableMermaid);
  html = parseFootnotes(html);
  html = parseTaskLists(html);
  html = parseDefinitionLists(html);
  html = parseTables(html);
  html = parseHeaders(html);
  html = parseBlockquotes(html);
  html = parseHorizontalRules(html);
  html = parseImages(html);
  html = parseLinks(html);
  html = parseMark(html);
  html = parseSub(html);
  html = parseSup(html);
  html = parseStrikethrough(html);
  html = parseBold(html);
  html = parseItalic(html);
  html = parseInlineCode(html);
  html = parseUnorderedLists(html);
  html = parseOrderedLists(html);
  html = parseParagraphs(html);
  html = renderFootnotes(html);
  
  // Restore math formulas
  mathPlaceholders.forEach((formula, index) => {
    html = html.replace(`__MATH_BLOCK_${index}__`, formula);
    html = html.replace(`__MATH_INLINE_${index}__`, formula);
  });
  
  return html;
}

function parseCodeBlocks(text, showLineNumbers, enableMermaid) {
  return text.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const trimmedCode = code.replace(/\n$/, '');
    if (lang === 'mermaid' && enableMermaid) {
      return `<div class="mermaid">${trimmedCode}</div>`;
    }
    if (showLineNumbers) {
      const lines = trimmedCode.split('\n');
      const lineNumbers = lines.map((_, i) => i + 1).join('\n');
      return `<pre class="with-line-numbers"><code class="line-numbers">${lineNumbers}</code><code class="code-content hljs">${escapeHtml(trimmedCode)}</code></pre>`;
    }
    return `<pre><code class="hljs">${escapeHtml(trimmedCode)}</code></pre>`;
  });
}

function parseFootnotes(text) {
  const footnotes = [];
  text = text.replace(/\[\^([^\]]+)\]:\s*(.*(?:\n\s{2,}.*)*)/g, (match, id, content) => {
    footnotes.push({ id, content: content.trim() });
    return '';
  });
  text = text.replace(/\[\^([^\]]+)\]/g, '<sup class="footnote-ref"><a href="#fn-$1" id="fnref-$1">[$1]</a></sup>');
  text = text + '\n\n__FOOTNOTES_PLACEHOLDER__';
  return text;
}

function renderFootnotes(text) {
  const footnotesRegex = /<sup class="footnote-ref">.*?<a href="#fn-([^"]+)".*?<\/sup>/g;
  const usedFootnotes = new Set();
  let match;
  while ((match = footnotesRegex.exec(text)) !== null) {
    usedFootnotes.add(match[1]);
  }
  
  if (usedFootnotes.size === 0) {
    return text.replace('\n\n__FOOTNOTES_PLACEHOLDER__', '');
  }
  
  let footnoteList = '<div class="footnotes"><hr><ol>';
  usedFootnotes.forEach(id => {
    footnoteList += `<li id="fn-${id}">Footnote ${id} <a href="#fnref-${id}">↩</a></li>`;
  });
  footnoteList += '</ol></div>';
  
  return text.replace('\n\n__FOOTNOTES_PLACEHOLDER__', '\n\n' + footnoteList);
}

function parseTaskLists(text) {
  return text.replace(/^- \[([ xX])\]\s+(.+)$/gm, (match, checked, content) => {
    const isChecked = checked.toLowerCase() === 'x' ? 'checked' : '';
    return `<li class="task-list-item"><input type="checkbox" ${isChecked} disabled> ${content}</li>`;
  });
}

function parseDefinitionLists(text) {
  return text.replace(/(?:^([^\n]+)\n:\s+(.+)$)+/gm, (match) => {
    const lines = match.trim().split('\n');
    let html = '<dl>';
    let currentTerm = '';
    lines.forEach(line => {
      if (line.startsWith(': ')) {
        html += `<dd>${line.slice(2)}</dd>`;
      } else if (line.trim()) {
        if (currentTerm) html += `<dt>${currentTerm}</dt>`;
        currentTerm = line;
      }
    });
    if (currentTerm) html += `<dt>${currentTerm}</dt>`;
    html += '</dl>';
    return html;
  });
}

function parseHeaders(text) {
  return text.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, content) => {
    return `<h${hashes.length}>${content.trim()}</h${hashes.length}>`;
  });
}

function parseInlineCode(text) {
  return text.replace(/`([^`]+)`/g, '<code>$1</code>');
}

function parseBold(text) {
  return text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/__([^_]+)__/g, '<strong>$1</strong>');
}

function parseItalic(text) {
  return text.replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/_([^_]+)_/g, '<em>$1</em>');
}

function parseStrikethrough(text) {
  return text.replace(/~~([^~]+)~~/g, '<del>$1</del>');
}

function parseMark(text) {
  return text.replace(/==([^=]+)==/g, '<mark>$1</mark>');
}

function parseSub(text) {
  return text.replace(/~([^~]+)~/g, '<sub>$1</sub>');
}

function parseSup(text) {
  return text.replace(/\^([^^]+)\^/g, '<sup>$1</sup>');
}

function parseLinks(text) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function parseImages(text) {
  return text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
}

function parseBlockquotes(text) {
  return text.replace(/^(>+)\s*(.*)$/gm, '<blockquote>$2</blockquote>');
}

function parseUnorderedLists(text) {
  return text.replace(/^[-*+]\s+(.+)$/gm, '<li>$1</li>');
}

function parseOrderedLists(text) {
  return text.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
}

function parseTables(text) {
  const lines = text.split('\n');
  let inTable = false;
  let result = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        result.push('<table>');
        inTable = true;
      }
      if (line.match(/^\|[\s\-:|]+\|$/)) continue;
      const cells = line.slice(1, -1).split('|').map(c => c.trim());
      const isFirstRow = !result.some(r => r.includes('<th>'));
      const tag = isFirstRow ? 'th' : 'td';
      result.push('<tr>' + cells.map(c => `<${tag}>${c}</${tag}>`).join('') + '</tr>');
    } else if (inTable) {
      result.push('</table>');
      inTable = false;
      result.push(line);
    } else {
      result.push(line);
    }
  }
  if (inTable) result.push('</table>');
  return result.join('\n');
}

function parseHorizontalRules(text) {
  return text.replace(/^(---|\*\*\*|___)$/gm, '<hr>');
}

function parseParagraphs(text) {
  const blocks = text.split(/\n\n+/);
  return blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    if (block.match(/^<(h[1-6]|ul|ol|li|blockquote|pre|table|hr|dl|div class="mermaid"|hr\s*\/?>)/)) return block;
    if (block.includes('</table>') || block.includes('</dl>')) return block;
    if (block.includes('<hr>') || block.includes('<hr ')) return block;
    return `<p>${block.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');
}

function wrapInHtmlDocument(html, options) {
  const { theme = 'github', highlightStyle = 'github', includeKaTeX = true, enableMermaid = true, styleScheme = null } = options;
  
  let themeCss;
  let isDark = false;
  
  if (styleScheme) {
    themeCss = generateCSSFromScheme(styleScheme);
    const bg = styleScheme.colors?.base?.bg || '#ffffff';
    const hex = bg.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    isDark = (r * 299 + g * 587 + b * 114) / 1000 < 128;
  } else {
    themeCss = THEME_STYLES[theme] || THEME_STYLES.github;
    isDark = ['dark', 'github-dark', 'nord', 'monokai'].includes(theme);
  }
  
  const highlightCss = HIGHLIGHT_STYLES[highlightStyle] || HIGHLIGHT_STYLES.github;
  
  let head = `<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><link rel="stylesheet" href="${highlightCss}"><style>${themeCss}</style>`;
  
  if (includeKaTeX) {
    head += `<link rel="stylesheet" href="${KATEX_CSS}"><script src="${KATEX_JS}"><\/script><script src="${KATEX_AUTO_RENDER}"><\/script>`;
  }
  
  let bodyEnd = '';
  if (includeKaTeX) {
    bodyEnd += `<script>renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false},{left:'\\\\[',right:'\\\\]',display:true},{left:'\\\\(',right:'\\\\)',display:false}]});<\/script>`;
  }
  if (enableMermaid && html.includes('mermaid')) {
    bodyEnd += `<script src="${MERMAID_JS}"><\/script><script>mermaid.initialize({startOnLoad:true,theme:'${isDark ? 'dark' : 'default'}'});<\/script>`;
  }
  
  return `<!DOCTYPE html><html lang="en"><head>${head}</head><body>${html}${bodyEnd}</body></html>`;
}

export async function onRequestPost(context) {
  try {
    const contentType = context.request.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Content-Type must be application/json' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    
    const body = await context.request.json();
    const { markdown, theme, highlightStyle, showLineNumbers, includeKaTeX, enableMermaid, wrapHtml, styleScheme } = body;
    
    if (!markdown) {
      return new Response(JSON.stringify({ error: 'markdown field is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    
    const options = {
      theme: theme || 'github',
      highlightStyle: highlightStyle || 'github',
      showLineNumbers: showLineNumbers !== false,
      includeKaTeX: includeKaTeX !== false,
      enableMermaid: enableMermaid !== false,
      styleScheme: styleScheme || null
    };
    
    const html = parseMarkdown(markdown, options);
    
    let css = '';
    if (styleScheme) {
      css = generateCSSFromScheme(styleScheme);
    } else {
      css = THEME_STYLES[options.theme] || THEME_STYLES.github;
    }
    
    if (wrapHtml !== false) {
      const fullHtml = wrapInHtmlDocument(html, options);
      return new Response(JSON.stringify({ 
        css: css,
        html: html,
        fullHtml: fullHtml
      }), { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }
    
    return new Response(JSON.stringify({ css, html }), { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}