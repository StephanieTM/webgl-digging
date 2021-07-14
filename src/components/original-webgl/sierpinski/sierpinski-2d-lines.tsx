import React, { useRef, useEffect, useCallback } from 'react';
import { useWebGL, useShaders, useRender } from 'src/components/original-webgl/hooks';
import { vec3, IVec3, scale, add, flatten } from 'src/lib/mvjs';
import vShader from './shaders/2d-lines/vshader.glsl';
import fShader from './shaders/2d-lines/fshader.glsl';

const numTimesToSubdivides = 5;
const vertices = [
  vec3( -1, -1,  0 ),
  vec3(  0,  1,  0 ),
  vec3(  1, -1,  0 ),
];

export default function Comp(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsArr = useRef<IVec3[]>([]);
  const gl = useWebGL(canvasRef);
  const program = useShaders(gl, vShader, fShader);

  useEffect(() => {
    function triangle(a: IVec3, b: IVec3, c: IVec3): void {
      pointsArr.current.push(a, b, c);
    }

    function divideTriangle(a: IVec3, b: IVec3, c: IVec3, count: number): void {
      if (count === 0) {
        triangle(a, b, c);
      } else {
        const ab = scale(0.5, add(a, b));
        const ac = scale(0.5, add(a, c));
        const bc = scale(0.5, add(b, c));
        --count;

        divideTriangle(a, ab, ac, count);
        divideTriangle(c, ac, bc, count);
        divideTriangle(b, bc, ab, count);
      }
    }

    divideTriangle(vertices[0], vertices[1], vertices[2], numTimesToSubdivides);
  }, []);

  useEffect(() => {
    if (gl && canvasRef.current && program) {
      gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
      gl.clearColor(1, 1, 1, 1);
      gl.useProgram(program);

      const bufferId = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArr.current), gl.STATIC_DRAW);

      const vPosition = gl.getAttribLocation(program, 'vPosition');
      gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);
    }
  }, [gl, program]);

  useRender(useCallback(() => {
    if (gl) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, pointsArr.current.length);
    }
  }, [gl]));

  return (
    <div style={{ padding: '20px' }}>
      <canvas ref={canvasRef} width={512} height={512}></canvas>
    </div>
  );
}
