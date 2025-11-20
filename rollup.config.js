import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import fs from "fs";
import path from "path";
// 动态读取 package.json 获取版本号
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve("./package.json"), "utf-8")
);
const { version, license } = packageJson;

const currentYear = new Date().getFullYear();
const banner = `/*!
 * myPopup Component v${version}
 * GitHub: https://github.com/aGG-Bond/myPopup
 * (c) ${currentYear} aGG-Bond
 * @license ${license}
 */`;
// 创建最新版本快捷方式的插件
const createLatestSymlink = () => ({
  name: "create-latest-symlink",
  closeBundle() {
    const versionDir = path.resolve(`./dist/v${version}`);
    const latestDir = path.resolve("./dist/latest");

    // 确保版本目录存在
    if (!fs.existsSync(versionDir)) {
      fs.mkdirSync(versionDir, { recursive: true });
    }

    // 删除已存在的latest目录或符号链接
    if (fs.existsSync(latestDir)) {
      fs.rmSync(latestDir, { recursive: true, force: true });
    }

    try {
      // 创建符号链接（Unix/Linux/Mac）
      fs.symlinkSync(
        path.relative(path.dirname(latestDir), versionDir),
        latestDir,
        "junction"
      );
    } catch (error) {
      // 如果符号链接失败，则复制整个目录
      fs.cpSync(versionDir, latestDir, { recursive: true });
    }

    console.log(`Created latest version shortcut pointing to v${version}`);
  },
});
export default [
  // 非压缩版本
  {
    input: "src/popup.js",
    output: [
      {
        file: `dist/v${version}/popup.esm.js`,
        format: "es",
        banner,
      },
      {
        file: `dist/v${version}/popup.umd.js`,
        format: "umd",
        name: "Popup",
        banner,
      },
    ],
    plugins: [nodeResolve(), commonjs()],
  },
  // 压缩版本
  {
    input: "src/popup.js",
    output: [
      {
        file: `dist/v${version}/popup.esm.min.js`,
        format: "es",
      },
      {
        file: `dist/v${version}/popup.umd.min.js`,
        format: "umd",
        name: "Popup",
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      terser({
        compress: {
          drop_console: true, // 移除console
          drop_debugger: true, // 移除debugger
        },
        output: {
          preamble: banner,
          comments: /^!/, // 移除注释
        },
      }),
      createLatestSymlink(),
    ],
  },
];
