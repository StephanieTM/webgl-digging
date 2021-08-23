import { IMat, IMat2, IMat3, IMat4, mat2, mat3, mat4 } from './matrix';
import { vec2, vec3 } from './vector';

// -------------------------------------------------------------------------------------------------

// transpose 转置

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

// -------------------------------------------------------------------------------------------------

// determinants 行列式

/**
 * 求二阶矩阵的行列式
 * @param m 二阶矩阵
 * @returns 矩阵的行列式
 */
export function det2(m: IMat2): number {
  return m[0][0]*m[1][1] - m[0][1]*m[1][0];
}

/**
 * 求三阶矩阵的行列式
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
 * 求四阶矩阵的行列式
 * @param m 四阶矩阵
 * @returns 矩阵的行列式
 */
export function det4(m: IMat4): number {
  const m0 = mat3(
    vec3(m[1][1], m[1][2], m[1][3]),
    vec3(m[2][1], m[2][2], m[2][3]),
    vec3(m[3][1], m[3][2], m[3][3])
  );

  const m1 = mat3(
    vec3(m[1][0], m[1][2], m[1][3]),
    vec3(m[2][0], m[2][2], m[2][3]),
    vec3(m[3][0], m[3][2], m[3][3])
  );

  const m2 = mat3(
    vec3(m[1][0], m[1][1], m[1][3]),
    vec3(m[2][0], m[2][1], m[2][3]),
    vec3(m[3][0], m[3][1], m[3][3])
  );

  const m3 = mat3(
    vec3(m[1][0], m[1][1], m[1][2]),
    vec3(m[2][0], m[2][1], m[2][2]),
    vec3(m[3][0], m[3][1], m[3][2])
  );

  return m[0][0]*det3(m0) - m[0][1]*det3(m1) + m[0][2]*det3(m2) - m[0][3]*det3(m3);
}

/**
 * 求二/三/四矩阵的行列式
 * @param m 矩阵
 * @returns 矩阵的行列式
 */
export function det<T extends IMat>(m: T): number {
  if (m.matrix !== true) throw new Error('det(): not a matrix');
  if (m.length === 2) return det2(m as IMat2);
  if (m.length === 3) return det3(m as IMat3);
  if (m.length === 4) return det4(m as IMat4);
  throw new Error('det(): dimension not supported');
}

// -------------------------------------------------------------------------------------------------

// inverse 逆

/**
 * 求二阶矩阵的逆
 * @param m 二阶矩阵
 * @returns 矩阵的逆
 */
export function inverse2(m: IMat2): IMat2 {
  const d = det2(m); // m的行列式

  const result = mat2();
  result[0][0] =  m[1][1]/d;
  result[0][1] = -m[0][1]/d;
  result[1][0] = -m[1][0]/d;
  result[1][1] =  m[0][0]/d;

  return result;
}

/**
 * 求三阶矩阵的逆
 * @param m 三阶矩阵
 * @returns 矩阵的逆
 */
export function inverse3(m: IMat3): IMat3 {
  const d = det3(m); // m的行列式

  const a00 = mat2(
    vec2(m[1][1], m[1][2]),
    vec2(m[2][1], m[2][2])
  );
  const a01 = mat2(
    vec2(m[1][0], m[1][2]),
    vec2(m[2][0], m[2][2])
  );
  const a02 = mat2(
    vec2(m[1][0], m[1][1]),
    vec2(m[2][0], m[2][1])
  );

  const a10 = mat2(
    vec2(m[0][1], m[0][2]),
    vec2(m[2][1], m[2][2])
  );
  const a11 = mat2(
    vec2(m[0][0], m[0][2]),
    vec2(m[2][0], m[2][2])
  );
  const a12 = mat2(
    vec2(m[0][0], m[0][1]),
    vec2(m[2][0], m[2][1])
  );

  const a20 = mat2(
    vec2(m[0][1], m[0][2]),
    vec2(m[1][1], m[1][2])
  );
  const a21 = mat2(
    vec2(m[0][0], m[0][2]),
    vec2(m[1][0], m[1][2])
  );
  const a22 = mat2(
    vec2(m[0][0], m[0][1]),
    vec2(m[1][0], m[1][1])
  );

  const result = mat3();
  result[0][0] =  det2(a00)/d;
  result[0][1] = -det2(a10)/d;
  result[0][2] =  det2(a20)/d;
  result[1][0] = -det2(a01)/d;
  result[1][1] =  det2(a11)/d;
  result[1][2] = -det2(a21)/d;
  result[2][0] =  det2(a02)/d;
  result[2][1] = -det2(a12)/d;
  result[2][2] =  det2(a22)/d;

  return result;
}

/**
 * 求四阶矩阵的逆
 * @param m 四阶矩阵
 * @returns 矩阵的逆
 */
export function inverse4(m: IMat4): IMat4 {
  const d = det4(m);

  const a00 = mat3(
    vec3(m[1][1], m[1][2], m[1][3]),
    vec3(m[2][1], m[2][2], m[2][3]),
    vec3(m[3][1], m[3][2], m[3][3])
  );
  const a01 = mat3(
    vec3(m[1][0], m[1][2], m[1][3]),
    vec3(m[2][0], m[2][2], m[2][3]),
    vec3(m[3][0], m[3][2], m[3][3])
  );
  const a02 = mat3(
    vec3(m[1][0], m[1][1], m[1][3]),
    vec3(m[2][0], m[2][1], m[2][3]),
    vec3(m[3][0], m[3][1], m[3][3])
  );
  const a03 = mat3(
    vec3(m[1][0], m[1][1], m[1][2]),
    vec3(m[2][0], m[2][1], m[2][2]),
    vec3(m[3][0], m[3][1], m[3][2])
  );

  const a10 = mat3(
    vec3(m[0][1], m[0][2], m[0][3]),
    vec3(m[2][1], m[2][2], m[2][3]),
    vec3(m[3][1], m[3][2], m[3][3])
  );
  const a11 = mat3(
    vec3(m[0][0], m[0][2], m[0][3]),
    vec3(m[2][0], m[2][2], m[2][3]),
    vec3(m[3][0], m[3][2], m[3][3])
  );
  const a12 = mat3(
    vec3(m[0][0], m[0][1], m[0][3]),
    vec3(m[2][0], m[2][1], m[2][3]),
    vec3(m[3][0], m[3][1], m[3][3])
  );
  const a13 = mat3(
    vec3(m[0][0], m[0][1], m[0][2]),
    vec3(m[2][0], m[2][1], m[2][2]),
    vec3(m[3][0], m[3][1], m[3][2])
  );

  const a20 = mat3(
    vec3(m[1][1], m[1][2], m[1][3]),
    vec3(m[2][1], m[2][2], m[2][3]),
    vec3(m[3][1], m[3][2], m[3][3])
  );
  const a21 = mat3(
    vec3(m[0][0], m[0][2], m[0][3]),
    vec3(m[1][0], m[1][2], m[1][3]),
    vec3(m[3][0], m[3][2], m[3][3])
  );
  const a22 = mat3(
    vec3(m[0][0], m[0][1], m[0][3]),
    vec3(m[1][0], m[1][1], m[1][3]),
    vec3(m[3][0], m[3][1], m[3][3])
  );
  const a23 = mat3(
    vec3(m[0][0], m[0][1], m[0][2]),
    vec3(m[1][0], m[1][1], m[1][2]),
    vec3(m[3][0], m[3][1], m[3][2])
  );

  const a30 = mat3(
    vec3(m[0][1], m[0][2], m[0][3]),
    vec3(m[1][1], m[1][2], m[1][3]),
    vec3(m[2][1], m[2][2], m[2][3])
  );
  const a31 = mat3(
    vec3(m[0][0], m[0][2], m[0][3]),
    vec3(m[1][0], m[1][2], m[1][3]),
    vec3(m[2][0], m[2][2], m[2][3])
  );
  const a32 = mat3(
    vec3(m[0][0], m[0][1], m[0][3]),
    vec3(m[1][0], m[1][1], m[1][3]),
    vec3(m[2][0], m[2][1], m[2][3])
  );
  const a33 = mat3(
    vec3(m[0][0], m[0][1], m[0][2]),
    vec3(m[1][0], m[1][1], m[1][2]),
    vec3(m[2][0], m[2][1], m[2][2])
  );

  const result = mat4();
  result[0][0] =  det3(a00)/d;
  result[0][1] = -det3(a10)/d;
  result[0][2] =  det3(a20)/d;
  result[0][3] = -det3(a30)/d;
  result[1][0] = -det3(a01)/d;
  result[1][1] =  det3(a11)/d;
  result[1][2] = -det3(a21)/d;
  result[1][3] =  det3(a31)/d;
  result[2][0] =  det3(a02)/d;
  result[2][1] = -det3(a12)/d;
  result[2][2] =  det3(a22)/d;
  result[2][3] = -det3(a32)/d;
  result[3][0] = -det3(a03)/d;
  result[3][1] =  det3(a13)/d;
  result[3][2] = -det3(a23)/d;
  result[3][3] =  det3(a33)/d;

  return result;
}

/**
 * 求二/三/四矩阵的逆
 * @param m 矩阵
 * @returns 矩阵的逆
 */
export function inverse<T extends IMat>(m: T): T {
  if (m.matrix !== true) throw new Error('inverse(): not a matrix');
  if (m.length === 2) return inverse2(m as IMat2) as T;
  if (m.length === 3) return inverse3(m as IMat3) as T;
  if (m.length === 4) return inverse4(m as IMat4) as T;
  throw new Error('inverse(): dimension not supported');
}
