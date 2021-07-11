import { IVec } from './vector';

/**
 * 根据指定的倍率缩放向量
 * @param s 倍率
 * @param u 向量
 * @returns 缩放后的向量
 */
export function scale<T extends IVec>(s: number, u: T): T {
  if (!Array.isArray(u)) {
    throw new Error(`scale: second parameter ${u} is not a vector`);
  }

  const result: T = [] as unknown as T;
  for (let i = 0; i < u.length; i += 1) {
    result.push(s * u[i]);
  }

  return result;
}