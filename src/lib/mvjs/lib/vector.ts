import { _argumentsToArray } from './helpers';

export type IVec = IVec2 | IVec3 | IVec4;
export type IVec2 = [x: number, y: number];
export type IVec3 = [x: number, y: number, z: number];
export type IVec4 = [x: number, y: number, z: number, w: number];

/**
 * 由数据生成二维向量
 * @param args 数据
 * @returns 二维向量
 */
export function vec2<T extends unknown>(...args: T[]): IVec2 {
  const result = _argumentsToArray(args);
  const length = result.length
  for (let i = 0; i < 2 - length; i += 1) {
    result.push(0.0);
  }

  return result.splice(0, 2) as IVec2;
}

/**
 * 由数据生成三维向量
 * @param args 数据
 * @returns 三维向量
 */
export function vec3<T extends unknown>(...args: T[]): IVec3 {
  const result = _argumentsToArray(args);
  const length = result.length
  for (let i = 0; i < 3 - length; i += 1) {
    result.push(0.0);
  }

  return result.splice(0, 3) as IVec3;
}

/**
 * 由数据生成四维向量
 * @param args 数据
 * @returns 四维向量
 */
export function vec4<T extends unknown>(...args: T[]): IVec4 {
  const result = _argumentsToArray(args);
  const length = result.length
  for (let i = 0; i < 4 - length; i += 1) {
    result.push(0.0);
  }

  return result.splice(0, 4) as IVec4;
}

