import { _argumentsToArray } from './helpers';
import { vec2, vec3, vec4, IVec2, IVec3, IVec4 } from './vector';

export type IMatrix2 = [IVec2, IVec2];
export type IMatrix3 = [IVec3, IVec3, IVec3];
export type IMatrix4 = [IVec4, IVec4, IVec4, IVec4];

export type IMat = IMat2 | IMat3 | IMat4;
export interface IMat2 extends IMatrix2 { matrix: boolean }
export interface IMat3 extends IMatrix3 { matrix: boolean }
export interface IMat4 extends IMatrix4 { matrix: boolean }

/**
 * 由数据生成二维矩阵
 * @param args 数据
 * @returns 二维矩阵
 */
export function mat2(...args: unknown[]): IMat2 {
  const v = _argumentsToArray(args);

  const m: IMat2 = [] as unknown as IMat2;
  switch (v.length) {
    case 0:
      v[0] = 1;
      m.push(vec2( v[0],  0.0 ));
      m.push(vec2(  0.0, v[0] ));
      break;
    case 1:
      m.push(vec2( v[0],  0.0 ));
      m.push(vec2(  0.0, v[0] ));
      break;
    default:
      m.push(vec2(v));
      v.splice(0, 2);
      m.push(vec2(v));
      break;
  }

  m.matrix = true;

  return m;
}

/**
 * 由数据生成三维矩阵
 * @param args 数据
 * @returns 三维矩阵
 */
export function mat3(...args: unknown[]): IMat3 {
  const v = _argumentsToArray(args);

  const m: IMat3 = [] as unknown as IMat3;
  switch (v.length) {
    case 0:
      v[0] = 1;
      m.push(vec3( v[0],  0.0,  0.0 ));
      m.push(vec3(  0.0, v[0],  0.0 ));
      m.push(vec3(  0.0,  0.0, v[0] ));
      break;
    case 1:
      m.push(vec3( v[0],  0.0,  0.0 ));
      m.push(vec3(  0.0, v[0],  0.0 ));
      m.push(vec3(  0.0,  0.0, v[0] ));
      break;
    default:
      m.push(vec3(v));
      v.splice(0, 3);
      m.push(vec3(v));
      v.splice(0, 3);
      m.push(vec3(v));
      break;
  }

  m.matrix = true;

  return m;
}

/**
 * 由数据生成三维矩阵
 * @param args 数据
 * @returns 三维矩阵
 */
export function mat4(...args: unknown[]): IMat4 {
  const v = _argumentsToArray(args);

  const m: IMat4 = [] as unknown as IMat4;
  switch (v.length) {
    case 0:
      v[0] = 1;
      m.push(vec4( v[0],  0.0,  0.0,  0.0 ));
      m.push(vec4(  0.0, v[0],  0.0,  0.0 ));
      m.push(vec4(  0.0,  0.0, v[0],  0.0 ));
      m.push(vec4(  0.0,  0.0,  0.0, v[0] ));
      break;
    case 1:
      m.push(vec4( v[0],  0.0,  0.0,  0.0 ));
      m.push(vec4(  0.0, v[0],  0.0,  0.0 ));
      m.push(vec4(  0.0,  0.0, v[0],  0.0 ));
      m.push(vec4(  0.0,  0.0,  0.0, v[0] ));
      break;
    default:
      m.push(vec4(v));
      v.splice(0, 4);
      m.push(vec4(v));
      v.splice(0, 4);
      m.push(vec4(v));
      v.splice(0, 4);
      m.push(vec4(v));
      break;
  }

  m.matrix = true;

  return m;
}
