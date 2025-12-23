# 更新日志 (Changelog)

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