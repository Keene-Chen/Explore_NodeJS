/**
 * @file utils.js
 * @desc execa 执行命令
 * @author KeeneChen <keenechen@qq.com>
 * @since  2024.05.26-01:03:41
 */

import { execa } from 'execa';
import pico from 'picocolors';

/**
 * 异步运行指定的命令行工具。
 * @param {string} bin - 需要执行的命令行工具的路径或名称。
 * @param {ReadonlyArray<string>} args - 传递给命令行工具的参数数组。
 * @param {import('execa').Options} opts - execa库执行命令时的额外选项，是一个对象，默认为空对象。
 * @returns {Promise<import('execa').ResultPromise>} 返回一个Promise，解析为execa子进程对象。
 */
async function run(bin,
  /** @type {ReadonlyArray<string>} */ args,
  /** @type {import('execa').Options} */ opts = {}) {
  return execa(bin, args, { stdio: 'inherit', ...opts });
}

export default run;
export { pico, run };
