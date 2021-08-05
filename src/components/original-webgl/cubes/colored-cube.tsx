import React, { useCallback, useEffect, useRef } from 'react';
import { useWebGL, useRender, useShaders } from 'src/components/original-webgl/hooks';
import { vec4, IVec4, flatten } from 'src/lib/mvjs';
import vShader from './shaders/colored-cube/vshader.glsl';
import fShader from './shaders/colored-cube/fshader.glsl';

const numVertices = 6 * 6; // 6个面，每个面由两个三角形组成，使用gl.TRIANGLES绘制，需要6个顶点
const vertices = [
  vec4(-0.5, -0.5,  0.5,  1.0),
  vec4(-0.5,  0.5,  0.5,  1.0),
  vec4( 0.5,  0.5,  0.5,  1.0),
  vec4( 0.5, -0.5,  0.5,  1.0),
  vec4(-0.5, -0.5, -0.5,  1.0),
  vec4(-0.5,  0.5, -0.5,  1.0),
  vec4( 0.5,  0.5, -0.5,  1.0),
  vec4( 0.5, -0.5, -0.5,  1.0),
];
const vertexColors = [
  vec4( 0.0,  0.0,  0.0,  1.0), // 黑
  vec4( 1.0,  0.0,  0.0,  1.0), // 红
  vec4( 1.0,  1.0,  0.0,  1.0), // 黄
  vec4( 0.0,  1.0,  0.0,  1.0), // 绿
  vec4( 0.0,  0.0,  1.0,  1.0), // 蓝
  vec4( 1.0,  0.0,  1.0,  1.0), // 品红
  vec4( 1.0,  1.0,  1.0,  1.0), // 白
  vec4( 0.0,  1.0,  1.0,  1.0), // 青
];

export default function ColoredCube(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gl = useWebGL(canvasRef);
  const program = useShaders(gl, vShader, fShader);
  const points = useRef<IVec4[]>([]);
  const colors = useRef<IVec4[]>([]);
  const renderFunc = useCallback(() => {
    if (gl) {
      gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, numVertices);
    }
  }, [gl]);

  useEffect(() => {
    function quad(a: number, b: number, c: number, d: number): void {
      const indices = [a, b, c, a, c, d];
      for (let i = 0; i < indices.length; i += 1) {
        points.current.push(vertices[indices[i]]);
        colors.current.push(vertexColors[indices[i]]);
      }
    }

    function colorCube(): void {
      quad(1, 0, 3, 2);
      quad(2, 3, 7, 6);
      quad(3, 0, 4, 7);
      quad(6, 5, 1, 2);
      quad(4, 5, 6, 7);
      quad(5, 4, 0, 1);
    }

    colorCube();
  }, []);

  useEffect(() => {
    if (gl && program && canvasRef.current) {
      gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
      gl.clearColor(1, 1, 1, 1);
      gl.useProgram(program);
      gl.enable(gl.DEPTH_TEST);

      const vBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(points.current), gl.STATIC_DRAW);

      const vPosition = gl.getAttribLocation(program, 'vPosition');
      gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);

      const cBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(colors.current), gl.STATIC_DRAW);

      const vColor = gl.getAttribLocation(program, 'vColor');
      gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vColor);
    }
  }, [gl, program]);

  useRender(renderFunc);

  return (
    <div style={{ padding: '20px' }}>
      <canvas ref={canvasRef} width={1024} height={512}></canvas>
    </div>
  );
}
