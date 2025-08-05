# Popup Component

一个简单易用、可扩展的弹窗组件，支持多种弹窗样式，适合前端项目集成和二次开发。

## 安装依赖

```bash
npm install
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
- 压缩 dist 目录下的 JS 文件（如有 compress.js 脚本）：  
  ```bash
  node scripts/compress.js
  ```

## 使用说明

### 浏览器直接引入

将 `dist/popup.umd.min.js` 用 `<script>` 标签引入页面：

```html
<script src="dist/popup.umd.min.js"></script>
<script>
  // Popup 会挂载到全局
  const popup = new Popup();
  popup.alert({
    title: '提示',
    content: 'Hello World!',
    btns: ['确定'],
    callbacks: [function() { alert('点击了确定'); }]
  });
</script>
```

### ES Module 引入

适用于现代前端工程化项目：

```js
import Popup from './dist/popup.esm.js';

const popup = new Popup();
popup.tips({
  title: '温馨提示',
  content: '操作成功！'
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

参数详见源码注释或后续文档补充。

## 移动端 Demo

建议参考 `demo/index.html`，支持参数可视化编辑和所有功能演示。


## 贡献与持续优化

- 欢迎 Fork 本仓库并提交 PR。
- 每次优化后建议运行构建和压缩脚本，保持 dist 目录最新。
- 如有建议或问题，请通过 Issue 反馈。

## License

MIT