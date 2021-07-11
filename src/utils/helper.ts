/**
 * 生成随机的16进制颜色字符串
 * @returns 16进制颜色字符串，如'#000000'
 */
export function randomHexColor(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `#${twoDigitHexString(r)}${twoDigitHexString(g)}${twoDigitHexString(b)}`;
}

/**
 * 生成十进制数(0-255)对应的两位十六进制数字符串
 * @param num 十进制数
 * @returns 两位十六进制数，如输入10，输出'0a'
 */
function twoDigitHexString(num: number): string {
  return Number(num).toString(16).padStart(2, '0');
}
