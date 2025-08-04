import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [
  // 非压缩版本
  {
    input: 'src/popup.js',
    output: [
      {
        file: 'dist/popup.esm.js',
        format: 'es'
      },
      {
        file: 'dist/popup.umd.js',
        format: 'umd',
        name: 'Popup'
      }
    ],
    plugins: [nodeResolve(), commonjs()]
  },
  // 压缩版本
  {
    input: 'src/popup.js',
    output: [
      {
        file: 'dist/popup.esm.min.js',
        format: 'es'
      },
      {
        file: 'dist/popup.umd.min.js',
        format: 'umd',
        name: 'Popup'
      }
    ],
    plugins: [
      nodeResolve(), 
      commonjs(),
      terser({
        compress: {
          drop_console: true, // 移除console
          drop_debugger: true // 移除debugger
        },
        output: {
          comments: false // 移除注释
        }
      })
    ]
  }
];