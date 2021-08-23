import { IVec } from './vector';

/**
 * 根据指定的倍率缩放向量
 * @param s 倍率
 * @param u 向量
 * @returns 缩放后的向量
 */
export function scale<T extends IVec>(s: number, u: T): T {
  if (!Array.isArray(u)) {
    throw new Error(`scale(): second parameter ${u} is not a vector`);
  }

  const result: T = [] as unknown as T;
  for (let i = 0; i < u.length; i += 1) {
    result.push(s * u[i]);
  }

  return result;
}

/**
 * 按照指定比例混合两个同维向量
 * @param u 向量u
 * @param v 向量v
 * @param s 混合系数
 * @returns 混合后的向量
 */
export function mix<T extends IVec>(u: T, v: T, s: number): T {
  if (u.length !== v.length) {
    throw new Error('mix(): vector dimension mismatch');
  }

  const result = [];
  for (let i = 0; i < u.length; i += 1) {
    result.push( (1.0 - s) * u[i] + s * v[i] );
  }

  return result as T;
}
