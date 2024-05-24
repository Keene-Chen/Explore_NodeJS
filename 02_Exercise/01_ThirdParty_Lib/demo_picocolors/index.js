import pc from 'picocolors';

console.log(`isColorSupported: ${pc.isColorSupported}`);
Object.keys(pc).forEach(key => {
  try {
    // 确保pc[key]是一个函数
    if (typeof pc[key] !== 'function') {
      console.error(`${key}: 不是一个函数`);
      return;
    }
    console.log(`${key.padEnd(12)}: ${pc[key]('Beautiful World!')}`);
  } catch (error) {
    console.error(`执行${key}函数时发生错误:`, error);
  }
});
