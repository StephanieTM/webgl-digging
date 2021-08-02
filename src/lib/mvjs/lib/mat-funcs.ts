import { IMat } from './matrix';

/**
 * 矩阵转置
 * @param mat 矩阵
 * @returns 转置后的矩阵
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
