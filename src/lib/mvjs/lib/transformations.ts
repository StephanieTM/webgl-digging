import { IVec3, vec4 } from './vector';
import { IMat4, mat4 } from './matrix';
import { normalize } from './vec-funcs';
import { radians } from './helpers';

export function rotate(angle: number, axis: IVec3): IMat4;
export function rotate(angle: number, x: number, y: number, z: number): IMat4;
export function rotate(angle: number, axis: IVec3|number, axisY?: number, axisZ?: number): IMat4 {
  if (!Array.isArray(axis) && typeof axisY === 'number' && typeof axisZ === 'number') {
    axis = [axis, axisY, axisZ];
  }

  const v = normalize(axis as IVec3);

  const [x, y, z] = v;

  const c = Math.cos(radians(angle));
  const s = Math.sin(radians(angle))
  const omc = 1 - c;
  
  const result = mat4(
    vec4(x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s, 0 ),
    vec4(x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s, 0 ),
    vec4(x*z*omc - y*s, z*y*omc + x*s, z*z*omc + c,   0 ),
    vec4()
  );

  return result;
}
