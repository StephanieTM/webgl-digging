import { IVec } from './vector';
import { IMat } from './matrix';

/**
 * 判断两个向量是否相等
 * @param u 向量u
 * @param v 向量v
 * @returns 是否相等
 */
export function equal(u: IVec, v: IVec): boolean;
/**
 * 判断两个矩阵是否相等
 * @param u 矩阵u
 * @param v 矩阵v
 * @returns 是否相等
 */
export function equal(u: IMat, v: IMat): boolean;
/**
 * 判断两个向量/矩阵是否相等
 * @param u 向量/矩阵u
 * @param v 向量/矩阵v
 * @returns 是否相等
 */
export function equal(u: IVec|IMat, v: IVec|IMat): boolean {
  if (u.length !== v.length) {
    return false;
  }
  if ((u as IMat).matrix && (v as IMat).matrix) {
    for (let i = 0; i < u.length; i += 1) {
      if ((u as IMat)[i].length !== (v as IMat)[i].length) { return false; }
      for (let j = 0; j < (u as IMat)[i].length; j += 1) {
        if (u[i][j] !== v[i][j]) { return false; }
      }
    }
  } else {
    for (let i = 0; i < u.length; i += 1) {
      if (u[i] !== v[i]) { return false; }
    }
  }
  return true;
}

// export function flatten(v: ) {}
