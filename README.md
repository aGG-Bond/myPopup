# Popup Component

`Popup` 是一个轻量的完全免费的移动端弹窗组件（无依赖），提供常见的弹窗类型：`alert`、`tips`、`msg`、`confirm`、`showImagePreview`、`showBottomPopup`、`load` 与 `close`。

## 安装

```bash
npm install @aggbond/my-popup
```

## 构建与压缩

- 构建（打包源码到 dist）：
  ```bash
  npm run build
  ```
- 开发模式（监听源码变化自动打包）：
  ```bash
  npm run dev
  ```

## 使用说明

### 通过 npm 包引入

#### ES Module 方式（推荐）

```js
import Popup from "@aggbond/my-popup";

const popup = new Popup();
popup.alert({
  title: "提示",
  content: "Hello World!",
  btns: ["确定"],
  callbacks: [
    function () {
      alert("点击了确定");
    },
  ],
});
```
#### CommonJS 方式
```js
const Popup = require('@aggbond/my-popup');

const popup = new Popup();
popup.tips({
  title: '温馨提示',
  content: '操作成功！'
});
```
### 浏览器直接引入

将 `dist/popup.umd.min.js` 用 `<script>` 标签引入页面：

```html
<script src="dist/popup.umd.min.js"></script>
<script>
  const popup = new Popup();
  popup.alert({
    title: "提示",
    content: "Hello World!",
    btns: ["确定"],
    callbacks: [
      function () {
        alert("点击了确定");
      },
    ],
  });
</script>
```
### 在HTML 页面通过CDN引入
```html
<script src="https://cdn.jsdelivr.net/npm/@aggbond/my-popup@1.0.2/dist/popup.umd.min.js"></script>
<script>
  const popup = new Popup();
  // 使用 popup 实例
</script>
```
### ES Module 引入

```js
import Popup from "./dist/popup.esm.js";

const popup = new Popup();
popup.tips({
  title: "温馨提示",
  content: "操作成功！",
});
```

### 常用 API

- `popup.alert(options)`：弹出带按钮的提示框
- `popup.tips(options, callback, color)`：弹出带确认按钮的提示
- `popup.msg(content, options)`：消息提示（自动消失）
- `popup.confirm(info, obj, cb1, cb2)`：确认框
- `popup.showImagePreview({ imgUrl, ... })`：图片预览弹窗
- `popup.showBottomPopup(options)`：底部弹窗
- `popup.load(options)`：加载动画弹窗
- `popup.close()`：关闭弹窗


## 主要参数说明

- 通用参数（多数方法共用）
  - `title`：弹窗标题（字符串）
  - `content`：弹窗内容（字符串或 HTML）
  - `isTitleBox`：是否显示标题栏（布尔，默认 true）
  - `isCloseSvg`：是否显示右上角关闭 SVG（布尔）
  - `closeBtnStyle`、`btnStyle`、`contentStyle`、`titleStyle`：样式对象（键值对）

- alert / showBottomPopup
  - `btns`：按钮文字数组
  - `callbacks`：与 `btns` 对应的回调函数数组

- tips
  - `callback`：点击确认的回调
  - `color`：颜色数组（支持 1 个或 2 个颜色，两个颜色会生成渐变）

- msg
  - `time`：显示时长（毫秒，默认 1000）
  - `icon`：0/1，显示不同样式的图标

- confirm
  - `info`：包含 `title`/`content` 的对象
  - `obj`：可定制按钮文本与颜色（例如 `{ btn: ['确认','取消'], color: ['#2196f3','#21cbf3'] }`）
  - `cb1`、`cb2`：确认/取消 回调

- showImagePreview
  - `imgUrl`：图片地址（必需）
  - `onClose`：关闭回调
  - `svgIcon`：可替换的 SVG 字符串

- load
  - `width`、`height`：SVG 大小
  - `color`：加载颜色
参数详见源码注释或后续文档补充。




## 使用示例（来自 demo）

- alert：

```js
popup.alert({
  title: '提示',
  content: '这是一个 alert 弹窗',
  btns: ['确定', '取消'],
  callbacks: [() => console.log('确定'), () => console.log('取消')]
});
```

- tips：

```js
popup.tips({ title: '温馨提示', content: '这是一个tips弹窗！' }, () => console.log('点击了确定'), ['#4caf50']);
```

- msg：

```js
popup.msg('这是一个消息提示', { time: 1500 });
```

- confirm：

```js
popup.confirm(
  { title: '确认操作', content: '你确定要继续吗？' },
  { btn: ['确定', '取消'], color: ['#2196f3', '#21cbf3'] },
  () => console.log('确认'),
  () => console.log('取消')
);
```

- 图片预览：

```js
popup.showImagePreview({ imgUrl: 'https://placekitten.com/300/200', onClose: () => console.log('关闭') });
```

- 底部弹窗：

```js
popup.showBottomPopup({
  title: '底部弹窗',
  content: '这是底部弹窗内容',
  btns: ['确定', '取消'],
  callbacks: [() => console.log('确定'), () => console.log('取消')],
  cancelCallbacks: () => console.log('关闭')
});
```

- loading：

```js
popup.load();
// popup.load({ width: 80, height: 80, color: '#1976d2' });
setTimeout(() => popup.close(), 2000);
```

## 参考与示例文件

- 源码：`src/popup.ts`、`src/popup.js`
- Demo：`demo/index.html`
- 包信息：`package.json`

---

## 详细 API 表格

| 方法 | 参数 | 类型 | 默认 | 说明 |
|---|---|---:|---|---|
| `alert(options)` | `title`, `content`, `btns`, `callbacks`, `btnStyles`, `closeBtnStyle`, `titleStyle`, `contentStyle` | object | — | 带按钮的模态弹窗，`btns` 与 `callbacks` 一一对应 |
| `tips(options, callback, color)` | `title`, `content`, `callback`, `color` | object, Function, string[] | — | 带确认按钮的提示，`color` 可为 1 或 2 个颜色，两个颜色生成渐变 |
| `msg(content, options)` | `content`, `time`, `icon` | string, object | `time=1000` | 顶部/中间消息提示，自动消失，`icon` 控制图标样式 |
| `confirm(info, obj, cb1, cb2)` | `info`（title/content）, `obj`（{btn, color}）, `cb1`, `cb2` | object, object, Function, Function | — | 确认对话框，`cb1` 确认回调，`cb2` 取消回调 |
| `showImagePreview({imgUrl, color, onClose, svgIcon})` | `imgUrl`, `color`, `onClose`, `svgIcon` | object | — | 图片预览弹窗，`onClose` 在关闭时触发，`svgIcon` 可自定义关闭图标 |
| `showBottomPopup(options)` | `title`, `content`, `btns`, `callbacks`, `cancelCallbacks`, `contentBoxStyle`, `btnStyle`, `btnBoxStyle` | object | — | 从底部弹出的弹窗，支持自定义按钮和样式 |
| `load({width, height, color})` | `width`, `height`, `color` | object | `{width:100,height:100,color:'#201c1d'}` | 显示 loading 动画，尺寸取 `width` 与 `height` 中较大者 |
| `close()` | — | — | — | 关闭当前显示的弹窗并触发队列中下一个 |
| `changeColor(colorArr)` | `colorArr` | string[] | — | 辅助函数：1 色返回该色，2 色返回线性渐变字符串 |

### 参数类型说明
- 样式相关参数（例如 `closeBtnStyle`、`btnStyle`、`contentStyle`、`titleStyle`、`contentBoxStyle` 等）均为 JS 对象，键为 CSS 属性名（驼峰或短横皆可），值为字符串或数字。

## 移动端 Demo

建议参考 `demo/index.html`，支持参数可视化编辑和所有功能演示。

## 贡献与持续优化

- 欢迎 Fork 本仓库并提交 PR。
- 每次优化后建议运行构建和压缩脚本，保持 dist 目录最新。
- 如有建议或问题，请通过 Issue 反馈。

## License

MIT
