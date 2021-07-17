import React, { useCallback, useEffect, useRef } from 'react';
import { useShaders, useWebGL, useRender } from 'src/components/original-webgl/hooks';
import { flatten, vec2 } from 'src/lib/mvjs';
import vShader from './shaders/vshader.glsl';
import fShader from './shaders/fshader.glsl';

const vertices = [
  vec2( 0,  1),
  vec2( 1,  0),
  vec2(-1,  0),
  vec2( 0, -1),
];

export default function Comp(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gl = useWebGL(canvasRef);
  const program = useShaders(gl, vShader, fShader);
  const theta = useRef(0);
  // 在renderFunc中频繁用到thetaLoc，故存放在ref中
  const thetaLoc = useRef<WebGLUniformLocation|null>(null);
  const renderFunc = useCallback(() => {
    if (gl && program && thetaLoc.current) {
      gl.clear(gl.COLOR_BUFFER_BIT);

      theta.current += 0.01;
      gl.uniform1f(thetaLoc.current, theta.current);
  
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length);
    }
  }, [gl, program]);

  useEffect(() => {
    if (gl && canvasRef.current && program) {
      gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
      gl.clearColor(1, 1, 1, 1);
      gl.useProgram(program);

      const vBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

      const vPosition = gl.getAttribLocation(program, 'vPosition');
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);

      thetaLoc.current = gl.getUniformLocation(program, 'theta');
    }
  }, [gl, program]);

  useRender(renderFunc);

  return (
    <div style={{ padding: '20px' }}>
      <canvas ref={canvasRef} width="512" height="512"></canvas>
    </div>
  );
}
