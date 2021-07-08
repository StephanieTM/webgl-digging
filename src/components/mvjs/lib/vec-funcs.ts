import { IVec } from './vector';

/**
 * 对两个向量求和
 * @param u 向量u
 * @param v 向量v
 * @returns 向量之和
 */
export function add<T extends IVec>(u: T, v: T): T {
  if (u.length !== v.length) {
    throw new Error(`add: vectors ${u} and ${v} are not the same dimension`);
  }

  const result: T = [] as unknown as T;
  for (let i = 0; i < u.length; i += 1) {
    result.push(u[i] + v[i]);
  }
  return result;
}

/**
 * 对两个向量求差
 * @param u 向量u
 * @param v 向量v
 * @returns 向量之差
 */
export function subtract<T extends IVec>(u: T, v: T): T {
  if (u.length !== v.length) {
    throw new Error(`subtract: vectors ${u} and ${v} are not the same dimension`);
  }

  const result: T = [] as unknown as T;
  for (let i = 0; i < u.length; i += 1) {
    result.push(u[i] - v[i]);
  }
  return result;
}

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