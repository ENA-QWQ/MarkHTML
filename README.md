# MarkHTML

[English](#english) | [中文](#中文)

---

<a name="english"></a>

## English

An online Markdown to HTML converter with multiple themes and syntax highlighting support.

### Features

- **Multiple Themes**: 20+ built-in themes including GitHub, Nord, Monokai, Tokyo Night, and more
- **Syntax Highlighting**: Code block highlighting with multiple style options
- **Math Support**: KaTeX for mathematical formulas
- **Diagrams**: Mermaid diagram support
- **Custom Styling**: Color customization and spacing adjustments
- **REST API**: Programmable API for integration
- **Export**: Download as standalone HTML file

### Themes

#### Light Themes
- GitHub Light
- Academic
- One Light
- Gruvbox Light
- Catppuccin Latte
- Material Light
- Ayu Light
- Quiet Light

#### Dark Themes
- GitHub Dark
- GitHub Dimmed
- Nord
- Monokai
- One Dark
- Tokyo Night
- Gruvbox Dark
- Catppuccin Mocha
- Material Dark
- Ayu Dark
- Night Owl
- Panda

### Code Highlight Themes

- GitHub / GitHub Dark
- Monokai
- Atom One Dark / Atom One Light
- Nord
- Tokyo Night

### Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Deploy to Cloudflare Pages
npm run deploy
```

### License

[MIT License](LICENSE)

---

<a name="中文"></a>

## 中文

在线 Markdown 转 HTML 工具，支持多主题和语法高亮。

### 功能特性

- 内置 20+ 主题，包括 GitHub、Nord、Monokai、Tokyo Night 等
- 代码块高亮，支持多种样式
- 支持 KaTeX 数学公式
- 支持 Mermaid 图表
- 颜色自定义和间距调整
- 可编程 API 便于集成
- 下载为独立 HTML 文件

### 主题

#### 浅色主题
- GitHub Light
- Academic
- One Light
- Gruvbox Light
- Catppuccin Latte
- Material Light
- Ayu Light
- Quiet Light

#### 深色主题
- GitHub Dark
- GitHub Dimmed
- Nord
- Monokai
- One Dark
- Tokyo Night
- Gruvbox Dark
- Catppuccin Mocha
- Material Dark
- Ayu Dark
- Night Owl
- Panda

### 代码高亮主题

- GitHub / GitHub Dark
- Monokai
- Atom One Dark / Atom One Light
- Nord
- Tokyo Night

### 开发

```bash
# 安装依赖
npm install

# 启动本地开发服务器
npm run dev

# 部署到 Cloudflare Pages
npm run deploy
```

### 许可证

[MIT License](LICENSE)

---

## API Documentation / API 文档

### Overview / 概述

MarkHTML provides a REST API for converting Markdown to HTML programmatically.

MarkHTML 提供 REST API 接口，支持通过 HTTP 请求将 Markdown 转换为 HTML。

### Endpoint / 接口地址

```
POST /api/convert
```

### Request Format / 请求格式

**Content-Type**: `application/json`

### Parameters / 请求参数

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `markdown` | string | Yes | - | Markdown text to convert |
| `theme` | string | No | `github` | Theme name |
| `highlightStyle` | string | No | `github` | Code highlight theme |
| `showLineNumbers` | boolean | No | `true` | Show line numbers in code blocks |
| `includeKaTeX` | boolean | No | `true` | Include KaTeX math support |
| `enableMermaid` | boolean | No | `true` | Enable Mermaid diagrams |
| `wrapHtml` | boolean | No | `true` | Generate complete HTML document |
| `styleScheme` | object | No | `null` | Custom style scheme object |

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|-----------|------|----------|---------|-------------|
| `markdown` | string | 是 | - | 要转换的 Markdown 文本 |
| `theme` | string | 否 | `github` | 主题名称 |
| `highlightStyle` | string | 否 | `github` | 代码高亮主题 |
| `showLineNumbers` | boolean | 否 | `true` | 是否显示代码行号 |
| `includeKaTeX` | boolean | 否 | `true` | 是否包含 KaTeX 数学公式支持 |
| `enableMermaid` | boolean | 否 | `true` | 是否启用 Mermaid 图表 |
| `wrapHtml` | boolean | 否 | `true` | 是否生成完整 HTML 文档 |
| `styleScheme` | object | 否 | `null` | 自定义样式方案对象 |

### Available Themes / 可用主题

**Light / 浅色**: `github`, `academic`, `one-light`, `gruvbox-light`, `catppuccin-latte`, `material-light`, `ayu-light`, `quiet-light`

**Dark / 深色**: `github-dark`, `github-dimmed`, `nord`, `monokai`, `one-dark`, `tokyo-night`, `gruvbox-dark`, `catppuccin-mocha`, `material-dark`, `ayu-dark`, `night-owl`, `panda`

### Highlight Themes / 代码高亮主题

`github`, `github-dark`, `monokai`, `atom-one-dark`, `atom-one-light`, `nord`, `tokyo-night`

### Response Format / 响应格式

**Content-Type**: `application/json`

| Field | Type | Description |
|-------|------|-------------|
| `css` | string | Generated CSS styles |
| `html` | string | Converted HTML content |
| `fullHtml` | string | Complete HTML document (when `wrapHtml=true`) |

| 字段 | 类型 | 说明 |
|-------|------|-------------|
| `css` | string | 生成的 CSS 样式 |
| `html` | string | 转换后的 HTML 内容 |
| `fullHtml` | string | 完整的 HTML 文档（当 `wrapHtml=true` 时） |

### Examples / 示例

#### Basic Usage / 基本用法

```bash
curl -X POST https://your-domain/api/convert \
  -H "Content-Type: application/json" \
  -d '{
    "markdown": "# Hello\n\nThis is **bold** text.",
    "theme": "github",
    "wrapHtml": false
  }'
```

#### JavaScript Fetch

```javascript
const response = await fetch('/api/convert', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    markdown: '# Hello\n\nThis is **bold** text.',
    theme: 'github-dark',
    highlightStyle: 'github-dark',
    wrapHtml: true
  })
});

const { css, html, fullHtml } = await response.json();
```

#### Custom Style Scheme / 使用自定义样式方案

```javascript
const response = await fetch('/api/convert', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    markdown: '# Custom Theme',
    styleScheme: {
      colors: {
        base: { bg: '#1e1e1e', textBase: '#d4d4d4' },
        accent: { primary: '#569cd6' }
      },
      layout: {
        font: { baseSize: 16, lineHeight: 1.7 }
      }
    },
    wrapHtml: true
  })
});
```

### Error Response / 错误响应

```json
{
  "error": "Error description"
}
```

| Status Code | Description |
|-------------|-------------|
| 400 | Bad request (missing required fields) |
| 500 | Server error |

| 状态码 | 说明 |
|-------------|-------------|
| 400 | 请求参数错误（缺少必填字段） |
| 500 | 服务器内部错误 |

### CORS Support

The API supports CORS with the following header:

API 支持 CORS，响应头包含：

```
Access-Control-Allow-Origin: *
```

---

## Author / 作者

[ENA](https://enashpinal.pages.dev)

## Repository / 仓库

[github.com/ENA-QWQ/MarkHTML](https://github.com/ENA-QWQ/MarkHTML)
