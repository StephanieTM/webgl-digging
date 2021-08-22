import { IMat, IMat2, IMat3, IMat4 } from './matrix';
import { vec3 } from './vector';

/**
 * 求矩阵的转置
 * @param mat 矩阵
 * @returns 矩阵的转置
 */
export function transpose<T extends IMat>(mat: T): T {
  if (!mat.matrix) {
    throw new Error('transpose(): trying to transpose a non-matrix');
  }

  const result: T = [] as unknown as T;
  for (let i = 0; i < mat.length; i += 1) {
    const temp = [];
    for (let j = 0; j < mat[i].length; j += 1) {
      temp.push(mat[j][i]);
    }
    result[i] = temp as T[number];
  }

  result.matrix = true;

  return result;
}

// determinants行列式

/**
 * 求二阶矩阵行列式
 * @param m 二阶矩阵
 * @returns 矩阵的行列式
 */
export function det2(m: IMat2): number {
  return m[0][0]*m[1][1] - m[0][1]*m[1][0];
}

/**
 * 求三阶矩阵行列式
 * @param m 三阶矩阵
 * @returns 矩阵的行列式
 */
export function det3(m: IMat3): number {
  const d = m[0][0]*m[1][1]*m[2][2]
          - m[0][0]*m[1][2]*m[2][1]
          - m[0][1]*m[1][0]*m[2][2]
          + m[0][1]*m[1][2]*m[2][0]
          + m[0][2]*m[1][0]*m[2][1]
          - m[0][2]*m[1][1]*m[2][0];
  return d;
}

/**
 * 求四阶矩阵行列式
 * @param m 四阶矩阵
 * @returns 矩阵的行列式
 */
export function det4(m: IMat4): number {
  const m0: IMat3 = [
    vec3(m[1][1], m[1][2], m[1][3]),
    vec3(m[2][1], m[2][2], m[2][3]),
    vec3(m[3][1], m[3][2], m[3][3])
  ] as IMat3;
  m0.matrix = true;

  const m1: IMat3 = [
    vec3(m[1][0], m[1][2], m[1][3]),
    vec3(m[2][0], m[2][2], m[2][3]),
    vec3(m[3][0], m[3][2], m[3][3])
  ] as IMat3;
  m1.matrix = true;

  const m2: IMat3 = [
    vec3(m[1][0], m[1][1], m[1][3]),
    vec3(m[2][0], m[2][1], m[2][3]),
    vec3(m[3][0], m[3][1], m[3][3])
  ] as IMat3;
  m2.matrix = true;

  const m3: IMat3 = [
    vec3(m[1][0], m[1][1], m[1][2]),
    vec3(m[2][0], m[2][1], m[2][2]),
    vec3(m[3][0], m[3][1], m[3][2])
  ] as IMat3;
  m3.matrix = true;

  return m[0][0]*det3(m0) - m[0][1]*det3(m1) + m[0][2]*det3(m2) - m[0][3]*det3(m3);
}

/**
 * 求二/三/四矩阵行列式
 * @param m 矩阵
 * @returns 行列式
 */
export function det<T extends IMat>(m: T): number {
  if (m.matrix !== true) throw new Error('det(): not a matrix');
  if (m.length === 2) return det2(m as IMat2);
  if (m.length === 3) return det3(m as IMat3);
  if (m.length === 4) return det4(m as IMat4);
  throw new Error('det(): rank not supported');
}
