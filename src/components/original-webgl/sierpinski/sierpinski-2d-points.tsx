import React, { useRef, useEffect } from 'react';
import { useWebGL, useShaders } from 'src/components/original-webgl/hooks';
import { vec2, add, scale, flatten, IMat2 } from 'src/lib/mvjs';
import vShader from './shaders/2d-points/vshader.glsl';
import fShader from './shaders/2d-points/fshader.glsl';

const NumPoints = 5000;
const vertices = [
  vec2( -1, -1 ),
  vec2(  0,  1 ),
  vec2(  1, -1 ),
];

export default function Comp(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gl = useWebGL(canvasRef);
  const program = useShaders(gl, vShader, fShader);

  useEffect(() => {
    if (gl && program && canvasRef.current) {
      const u = add(vertices[0], vertices[1]);
      const v = add(vertices[0], vertices[2]);
      let p = scale(0.5, add(u, v));
      const points: IMat2 = [p] as unknown as IMat2;
  
      for (let i = 0; i < NumPoints; i += 1) {
        const j = Math.floor(Math.random() * 3);
        p = add(points[i], vertices[j]);
        p = scale(0.5, p);
        points.push(p);
      }

      gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
      gl.clearColor(1, 1, 1, 1);

      gl.useProgram(program);

      const bufferId = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

      const vPosition = gl.getAttribLocation(program, 'vPosition');
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, points.length);
    }
  }, [gl, program]);

  return (
    <div style={{ padding: '20px' }}>
      <canvas ref={canvasRef} width="512" height="512"></canvas>
    </div>
  );
}
