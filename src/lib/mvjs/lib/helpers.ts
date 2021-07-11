/**
 * 将参数（数组）转化为数组，浅拷贝
 * @param args 参数数组
 * @returns 数组
 */
export function _argumentsToArray<T extends unknown[]>(args: T): number[] {
  return ([] as unknown as number[]).concat([], args.slice() as number[]) as number[];
}

/**
 * 将角度转化为弧度
 * @param degrees 角度
 * @returns 弧度
 */
export function radians(degrees: number): number {
  return degrees * Math.PI / 180.0;
}


