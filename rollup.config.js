import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs'];

const babelConfig = {
  babelHelpers: 'runtime',
  extensions, //应该被 babel 转换的所有文件的扩展名数组；这些扩展名的文件会被 babel 处理，其它文件刚会被 babel 忽略；默认值：['.js', '.jsx', '.es6', '.es', '.mjs']
  presets: ['@babel/preset-env'],
  exclude: 'node_modules/**', // 排除node_modules文件夹
};

const config = [
  {
    input: 'src/index.js', // 入口文件

    output: {
      file: 'lib/index.js', // 输出文件
      format: 'umd', // 输出格式
      name: 'aes-tracker-miniapp-taro', // 库名
      plugins: [terser()], // 压缩
    },
    plugins: [
      commonjs(), // 将依赖的模块从 CommonJS 模块规范转换成 ES2015 模块规范
      resolve({ extensions }),
      babel({
        ...babelConfig,
        plugins: [
          /*
					@babel/plugin-transform-runtime 能够重复使用 Babel 的注入帮助器 Helper 代码，以节省代码大小。
					注意：如果 rollup 的 format 设置为 "es" ， 则应将 useESModules 设置为 true，否则，应将 useESModules 设置 false ；
					*/
          [
            '@babel/plugin-transform-runtime',
            { useESModules: false, corejs: { version: 3 } },
            ,
          ],
        ],
      }),
    ],
  },
  {
    input: 'src/index.js', // 入口文件
    output: {
      file: 'es/index.js',
      format: 'es',
      name: 'aes-tracker-miniapp-taro',
      plugins: [terser()],
    },
    plugins: [
      commonjs(), // 将依赖的模块从 CommonJS 模块规范转换成 ES2015 模块规范
      resolve({ extensions }), // 使用node解析算法查找模块
      babel({
        ...babelConfig,
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            { useESModules: true, corejs: { version: 3 } },
            ,
          ],
        ],
      }),
    ],
  },
];

export default config;
