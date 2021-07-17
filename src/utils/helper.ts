import { IVec3, scale } from 'src/lib/mvjs';

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

/**
 * 将16进制颜色字符串转化成rgb颜色数组
 * @param hexColor 16进制颜色字符串，如'#ffaabb'
 * @param origin true - 采用原始值(0-255)，false - 采用单位化值(0-1)，默认false
 * @returns 转化后的rgb颜色数组，如[255, 170, 187](origin = true时)或[1, 0.66, 0.73]
 */
export function normalizeHexColor(hexColor: string, origin = false): IVec3 {
  const hex = hexColor.slice(1);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4), 16);
  const scaleFactor = origin ? 1 : 1/255;

  return scale(scaleFactor, [r, g, b]);
}
