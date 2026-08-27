# 更新日志 (Changelog)

## [1.0.9] - 2026-08-27

### 新功能
- 添加弹窗动画效果：
  - 中间弹窗（alert/tips/confirm/showImagePreview）：缩放入场 + 缩放退出
  - 底部弹窗（showBottomPopup）：从底部滑入 + 向下滑出
  - 消息提示（msg）和加载（load）：淡入淡出

### Bug 修复
- 修复队列机制不一致问题：`alert`、`tips`、`confirm`、`showImagePreview`、`showBottomPopup` 现在统一使用队列管理，避免弹窗互相覆盖
- 修复 `showBottomPopup` 的 `btnBoxStyle` 类型错误：默认值从 `''` 改为 `{}`
- 修复 `changeColor` 返回无效 CSS：添加渐变方向参数 `to right`
- 修复 `confirm` 方法 `Object.assign` 逻辑错误：直接使用 `obj?.btn` 避免结构被破坏
- 修复 `msg` 定时器未清除：连续调用时正确清除旧定时器
- 修复 `middleBox` 关闭按钮事件监听问题：只在 `isCloseSvg=true` 时添加事件监听
- 修复 `confirm` 的 `obj.btn` 类型安全问题：用 `Array.isArray()` 验证，防止传入字符串导致取到单个字符
- 修复 `close` 方法状态问题：只在 mask 成功移除后才重置 `isShowing` 和清除事件
- 修复 `showImagePreview` 未使用 color 参数：不再传递未使用的 `color` 参数
- 修复 `tips` 覆盖基础样式不完整：合并 `...this.baseContentBoxStyle` 保留 `minWidth` 等基础属性

## [1.0.8] - 2026-08-25

### 新增与改进
- 为弹窗元素增加稳定的 CSS 类名，方便通过外部样式表统一定制外观。
- 使用 `aggb-popup-*` 命名空间降低与宿主项目样式冲突的风险。
- 导出 `PopupStyle` 类型，方便 TypeScript 项目复用样式类型。
- 将 TypeScript 的模块解析方式从已弃用的 `node10` 迁移为 `bundler`。

### CSS 类名
- 遮罩：`.aggb-popup-mask`
- 内容框：`.aggb-popup-content-box`
- 标题：`.aggb-popup-title`
- 内容：`.aggb-popup-content`
- 关闭按钮：`.aggb-popup-close-button`
- 按钮容器：`.aggb-popup-button-box`
- 按钮：`.aggb-popup-button`
- 图片：`.aggb-popup-image`
- 消息：`.aggb-popup-message`
- 加载图标：`.aggb-popup-loading`

## [1.0.7] - 2025-12-23

### 新增功能
- 添加 alert、showBottomPopup回调函数返回值控制弹窗关闭功能
  - [alert](file://d:\Desktop\组件\myPopup\src\popup.ts#L203-L235) - 带按钮的提示弹窗
  - [showBottomPopup](file://d:\Desktop\组件\myPopup\src\popup.ts#L322-L436) - 底部弹窗

### 功能特性
- 支持弹窗队列管理，防止弹窗重叠显示
- 可自定义样式，包括颜色、尺寸、位置等
- 支持响应式设计，适配移动端
- 提供多种回调函数支持
- 支持自定义按钮和样式

### 技术改进
- 使用 TypeScript 编写，提供完整的类型定义
- 使用 Rollup 构建，输出多种格式 (ESM/UMD)
- 支持压缩版本，优化生产环境性能
- 遵循 MIT 许可证

### 自动化配置
- 配置 GitHub Actions 自动发布工作流
- 集成 npm 发布流程
- 自动生成更新日志