import { IVec, vec2, vec3, vec4 } from './vector';
import { IMat, mat2, mat3, mat4 } from './matrix';
import { transpose } from './mat-funcs';

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
  if (u.length !== v.length) { return false; }

  if ((u as IMat).matrix !== (v as IMat).matrix) { return false; }

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

// -------------------------------------------------------------------------------------------------

/**
 * 对两个向量求和
 * @param u 向量u
 * @param v 向量v
 * @returns 向量之和
 */
export function add<T extends IVec>(u: T, v: T): T;
/**
 * 对两个矩阵求和
 * @param u 矩阵u
 * @param v 矩阵v
 * @returns 矩阵之和
 */
export function add<T extends IMat>(u: T, v: T): T;
/**
 * 对两个向量/矩阵求和
 * @param u 向量/矩阵u
 * @param v 向量/矩阵v
 * @returns 向量/矩阵之和
 */
export function add<T extends IVec|IMat>(u: T, v: T): T {
  if ((u as IMat).matrix !== (v as IMat).matrix) {
    throw new Error(`add(): trying to add matrix and non-matrix variables`);
  } else if ((u as IMat).matrix && (v as IMat).matrix) {
    if (u.length !== v.length) {
      throw new Error(`add(): trying to add matrices of different dimensions`);
    }

    const result: IMat = [] as unknown as IMat;
    for (let i = 0; i < u.length; i += 1) {
      if ((u as IMat)[i].length !== (v as IMat)[i].length) {
        throw new Error(`add(): trying to add matrices of different dimensions`);
      }

      const temp: IVec = [] as unknown as IVec;
      for (let j = 0; j < (u as IMat)[i].length; j += 1) {
        temp.push(u[i][j] + v[i][j]);
      }
      result[i] = temp;
    }
    result.matrix = true;
    return result as T;
  } else {
    if (u.length !== v.length) {
      throw new Error(`add(): trying to add vectors of different dimensions`);
    }

    const result: IVec = [] as unknown as IVec;
    for (let i = 0; i < u.length; i += 1) {
      result.push((u as IVec)[i] + (v as IVec)[i]);
    }
    return result as T;
  }
}

// -------------------------------------------------------------------------------------------------

/**
 * 对两个向量求差
 * @param u 向量u
 * @param v 向量v
 * @returns 向量之差
 */
export function subtract<T extends IVec>(u: T, v: T): T;
/**
 * 对两个矩阵求差
 * @param u 矩阵u
 * @param v 矩阵v
 * @returns 矩阵之差
 */
export function subtract<T extends IMat>(u: T, v: T): T;
/**
 * 对两个向量/矩阵求差
 * @param u 向量/矩阵u
 * @param v 向量/矩阵v
 * @returns 向量/矩阵之差
 */
export function subtract<T extends IVec|IMat>(u: T, v: T): T {
  if ((u as IMat).matrix !== (v as IMat).matrix) {
    throw new Error(`subtract(): trying to subtract matrix and non-matrix variables`);
  } else if ((u as IMat).matrix && (v as IMat).matrix) {
    if (u.length !== v.length) {
      throw new Error(`subtract(): trying to subtract matrices of different dimensions`);
    }

    const result: IMat = [] as unknown as IMat;
    for (let i = 0; i < u.length; i += 1) {
      if ((u as IMat)[i].length !== (v as IMat)[i].length) {
        throw new Error(`subtract(): trying to subtract matrices of different dimensions`);
      }

      const temp: IVec = [] as unknown as IVec;
      for (let j = 0; j < (u as IMat)[i].length; j += 1) {
        temp.push(u[i][j] - v[i][j]);
      }
      result[i] = temp;
    }
    result.matrix = true;
    return result as T;
  } else {
    if (u.length !== v.length) {
      throw new Error(`subtract(): trying to subtract vectors of different dimensions`);
    }

    const result: IVec = [] as unknown as IVec;
    for (let i = 0; i < u.length; i += 1) {
      result.push((u as IVec)[i] - (v as IVec)[i]);
    }
    return result as T;
  }
}

// -------------------------------------------------------------------------------------------------

/**
 * 对两个向量求积
 * @param u 向量u
 * @param v 向量v
 * @returns 向量之积
 */
export function mult<T extends IVec>(u: T, v: T): T;
/**
 * 对两个矩阵求积
 * @param u 矩阵u
 * @param v 矩阵v
 * @returns 矩阵之积
 */
export function mult<T extends IMat>(u: T, v: T): T;
/**
 * 对两个向量/矩阵求积
 * @param u 向量/矩阵u
 * @param v 向量/矩阵v
 * @returns 向量/矩阵之积
 */
export function mult<T extends IVec|IMat>(u: T, v: T): T {
  // TODO ...
  if ((u as IMat).matrix && (v as IMat).matrix) {
    if (u.length !== v.length) {
      throw new Error(`mult(): trying to mult matrices of different dimensions`);
    }

    const result: IMat = [] as unknown as IMat;
    for (let i = 0; i < u.length; i += 1) {
      if ((u as IMat)[i].length !== (v as IMat)[i].length) {
        throw new Error(`mult(): trying to mult matrices of different dimensions`);
      }

      const temp: IVec = [] as unknown as IVec;
      for (let j = 0; j < v.length; j += 1) {
        let sum = 0;
        for (let k = 0; k < u.length; k += 1) {
          sum += u[i][k] * v[k][j];
        }
        temp.push(sum);
      }
      result[i] = temp;
    }
    result.matrix = true;
    return result as T;
  } else if ((u as IMat).matrix && (u.length === v.length)) {
    const result = [];
    for (let i = 0; i < v.length; i += 1) {
      let sum = 0;
      for (let j = 0; j < v.length; j += 1) {
        sum += u[i][j] * (v as IVec)[j];
      }
      result.push(sum);
    }
    return result as T;
  } else {
    if (u.length !== v.length) {
      throw new Error(`mult(): trying to mult vectors of different dimensions`);
    }

    const result: IVec = [] as unknown as IVec;
    for (let i = 0; i < u.length; i += 1) {
      result.push((u as IVec)[i] * (v as IVec)[i]);
    }
    return result as T;
  }
}

// -------------------------------------------------------------------------------------------------

/**
 * 将向量/矩阵展开并存储在Float32Array中
 * @param v 向量/矩阵
 * @returns Float32Array
 */
export function flatten(v: IMat|IVec|IVec[]): Float32Array {
  if ((v as IMat).matrix === true) {
    // WebGL使用列主序描述矩阵，MV.js使用行主序描述矩阵，在向GPU发送数组时，将矩阵进行转置
    v = transpose(v as IMat);
  }

  let n = v.length;
  let elemsAreArrays = false;

  if (Array.isArray(v[0])) {
    elemsAreArrays = true;
    n *= v[0].length;
  }

  const floats = new Float32Array(n);

  if (elemsAreArrays) {
    let idx = 0;
    for (let i = 0; i < v.length; i += 1) {
      for (let j = 0; j < (v as IMat)[i].length; j += 1) {
        floats[idx++] = v[i][j];
      }
    }
  } else {
    for (let i = 0; i < v.length; i += 1) {
      floats[i] = (v as IVec)[i];
    }
  }

  return floats;
}

// -------------------------------------------------------------------------------------------------

/**
 * 矩阵/数组的大小
 */
export const sizeof = {
  'vec2': new Float32Array(flatten(vec2())).byteLength,
  'vec3': new Float32Array(flatten(vec3())).byteLength,
  'vec4': new Float32Array(flatten(vec4())).byteLength,
  'mat2': new Float32Array(flatten(mat2())).byteLength,
  'mat3': new Float32Array(flatten(mat3())).byteLength,
  'mat4': new Float32Array(flatten(mat4())).byteLength,
};
