import React, { useEffect, useRef } from 'react';
import { useShaders, useWebGL } from 'src/components/original-webgl/hooks';
import { add, scale, vec3, IVec3, flatten } from 'src/lib/mvjs';
import { normalizeHexColor, randomHexColor } from 'src/utils';
import vShader from './shaders/3d-lines/vshader.glsl';
import fShader from './shaders/3d-lines/fshader.glsl';

const numTimesToSubdivides = 3;
const vertices = [
  vec3(  0.0000,  0.0000, -1.0000 ),
  vec3(  0.0000,  0.9428,  0.3333 ),
  vec3( -0.8165, -0.4714,  0.3333 ),
  vec3(  0.8165, -0.4714,  0.3333 )
];

export default function Comp(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsArr = useRef<IVec3[]>([]);
  const colorsArr = useRef<IVec3[]>([]);
  const gl = useWebGL(canvasRef);
  const program = useShaders(gl, vShader, fShader);

  useEffect(() => {
    const baseColors = [
      normalizeHexColor(randomHexColor()),
      normalizeHexColor(randomHexColor()),
      normalizeHexColor(randomHexColor()),
      normalizeHexColor(randomHexColor()),
    ];

    function triangle(a: IVec3, b: IVec3, c: IVec3, colorIndex: number): void {
      colorsArr.current.push(baseColors[colorIndex]);
      pointsArr.current.push(a);

      colorsArr.current.push(baseColors[colorIndex]);
      pointsArr.current.push(b);

      colorsArr.current.push(baseColors[colorIndex]);
      pointsArr.current.push(c);
    }

    function tetra(a: IVec3, b: IVec3, c: IVec3, d: IVec3): void {
      triangle(a, c, b, 0);
      triangle(a, c, d, 1);
      triangle(a, b, d, 2);
      triangle(b, c, d, 3);
    }

    function divideTetra(a: IVec3, b: IVec3, c: IVec3, d: IVec3, count: number) {
      if (count === 0) {
        tetra(a, b, c, d);
      } else {
        const ab = scale(0.5, add(a, b));
        const ac = scale(0.5, add(a, c));
        const ad = scale(0.5, add(a, d));
        const bc = scale(0.5, add(b, c));
        const bd = scale(0.5, add(b, d));
        const cd = scale(0.5, add(c, d));
        --count;

        divideTetra( a, ab, ac, ad, count);
        divideTetra(ab,  b, bc, bd, count);
        divideTetra(ac, bc,  c, cd, count);
        divideTetra(ad, bd, cd,  d, count);
      }
    };

    divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], numTimesToSubdivides);
  }, []);

  useEffect(() => {
    if (gl && canvasRef.current && program) {
      gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
      gl.clearColor(1, 1, 1, 1);
      gl.useProgram(program);

      // IMPORTANT! 隐藏面消除 z-buffer算法
      gl.enable(gl.DEPTH_TEST);

      // 绑定cBuffer以后传输vColor
      const cBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArr.current), gl.STATIC_DRAW);

      const vColor = gl.getAttribLocation(program, 'vColor');
      gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vColor);

      // 绑定vBuffer以后传输vPosition
      const vBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArr.current), gl.STATIC_DRAW);

      const vPosition = gl.getAttribLocation(program, 'vPosition');
      gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);

      // IMPORTANT! 隐藏面消除 z-buffer算法
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, pointsArr.current.length);
    }
  }, [gl, program]);

  return (
    <div style={{ padding: '20px' }}>
      <canvas ref={canvasRef} width="512" height="512"></canvas>
    </div>
  );
}
