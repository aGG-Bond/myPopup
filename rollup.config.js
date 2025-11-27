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

export default [
  // 非压缩版本
  {
    input: "src/popup.js",
    output: [
      {
        file: `dist/popup.esm.js`,
        format: "es",
        banner,
      },
      {
        file: `dist/popup.umd.js`,
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
        file: `dist/popup.esm.min.js`,
        format: "es",
      },
      {
        file: `dist/popup.umd.min.js`,
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
    ],
  },
];
