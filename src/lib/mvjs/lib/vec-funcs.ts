import { IVec, IVec3, vec3 } from './vector';

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

/**
 * 求向量的非
 * @param u 向量
 * @returns 向量的非
 */
export function negate<T extends IVec>(u: T): T {
  const result = [];
  for (let i = 0; i < u.length; i += 1) {
    result.push( -u[i] );
  }

  return result as T;
}

/**
 * 求向量的点积
 * @param u 向量u
 * @param v 向量v
 * @returns 向量的点积
 */
export function dot<T extends IVec>(u: T, v: T): number {
  if (u.length !== v.length) {
    throw new Error('dot(): vectors are not the same dimension');
  }

  let sum = 0;
  for (let i = 0; i < u.length; i += 1) {
    sum += u[i] * v[i];
  }

  return sum;
}

/**
 * 求向量的叉积
 * @param u 向量u
 * @param v 向量v
 * @returns 向量的叉积
 */
export function cross(u: IVec3, v: IVec3): IVec3 {
  if (!Array.isArray(u) || u.length < 3) {
    throw new Error('cross(): first argument is not a vector of at least 3');
  }

  if (!Array.isArray(v) || v.length < 3) {
    throw new Error('cross(): second argument is not a vector of at least 3');
  }

  const result = vec3(
    u[1] * v[2] - u[2] * v[1],
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0]
  );

  return result;
}

/**
 * 求向量的长度(几何中的向量长度)
 * @param u 向量
 * @returns 向量的长度
 */
export function length<T extends IVec>(u: T): number {
  return Math.sqrt( dot(u, u) );
}

/**
 * 求向量的标准化结果
 * @param u 向量
 * @param excludeLastItem 是否忽略最后一个元素
 * @returns 标准化后的向量
 */
export function normalize<T extends IVec>(u: T, excludeLastItem = false): T {
  let last;
  if (excludeLastItem) {
    last = u.pop();
  }

  const len = length(u);
  if (!isFinite(len)) {
    throw new Error('normalize(): vector has zero length')
  }

  for (let i = 0; i < u.length; i += 1) {
    u[i] /= len;
  }

  if (excludeLastItem && last !== undefined) {
    u.push(last);
  }

  return u;
}
