/**
 * @file prettier.config.js
 * @desc prettier.config
 * @author KeeneChen <keenechen@qq.com>
 * @since  2024.05.26-21:37:29
 * @see https://prettier.nodejs.cn/docs
 */

/** @type {import("prettier").Config} */
const config = {
  arrowParens: 'avoid',
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};

export default config;
