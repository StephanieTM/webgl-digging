import React, { useEffect, useRef } from 'react';
import { useShaders, useWebGL } from 'src/components/original-webgl/hooks';
import { add, flatten, scale, vec3 } from 'src/lib/mvjs';
import vShader from './shaders/3d-points/vshader.glsl';
import fShader from './shaders/3d-points/fshader.glsl';

const NumPoints = 5000;
const vertices = [
  vec3(-1.0, -1.0, -1.0),
  vec3( 1.0, -1.0, -1.0),
  vec3( 0.0,  1.0,  0.0),
  vec3( 0.0, -1.0,  1.0),
];

export default function Comp(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gl = useWebGL(canvasRef);
  const program = useShaders(gl, vShader, fShader);

  useEffect(() => {
    if (gl && program && canvasRef.current) {
      const points = [vec3(0.0, 0.0, 0.0)];
  
      for (let i = 0; points.length < NumPoints; i += 1) {
        const j = Math.floor(Math.random() * 4);
        points.push(scale(0.5, add(points[i], vertices[j])));
      }

      gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
      gl.clearColor(1, 1, 1, 1);

      gl.useProgram(program);

      const bufferId = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

      const vPosition = gl.getAttribLocation(program, 'vPosition');
      gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
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
