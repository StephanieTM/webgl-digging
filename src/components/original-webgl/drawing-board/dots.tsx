import React, { useCallback, useEffect, useRef } from 'react';
import { useRender, useShaders, useWebGL } from 'src/components/original-webgl/hooks';
import { flatten, sizeof, vec2, vec4 } from 'src/lib/mvjs';
import { normalizeHexColor, randomHexColor } from 'src/utils';
import vShader from './shaders/dots/vshader.glsl';
import fShader from './shaders/dots/fshader.glsl';

const maxNumVertices  = 600;

export default function Comp(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gl = useWebGL(canvasRef);
  const program = useShaders(gl, vShader, fShader);
  const vBuffer = useRef<WebGLBuffer|null>(null);
  const cBuffer = useRef<WebGLBuffer|null>(null);
  const index = useRef<number>(0);
  const renderFunc = useCallback(() => {
    if (gl) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (index.current > 0) {
        gl.drawArrays(gl.POINTS, 0, index.current);
      }
    }
  }, [gl]);

  useEffect(() => {
    const curCanvasRef = canvasRef.current;
    function onMouseDown(event: MouseEvent): void {
      if (gl && canvasRef.current) {
        if (index.current < maxNumVertices) {
          const vertex = vec2(
            2 * ( (event.clientX - canvasRef.current.offsetLeft) / canvasRef.current.clientWidth ) - 1,
            -2 * ( (event.clientY - canvasRef.current.offsetTop) / canvasRef.current.clientHeight ) + 1
          );
          const color = vec4(...normalizeHexColor(randomHexColor()).concat(1));
 
          gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer.current);
          gl.bufferSubData(gl.ARRAY_BUFFER, sizeof.vec2 * index.current, flatten(vertex));
  
          gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer.current);
          gl.bufferSubData(gl.ARRAY_BUFFER, sizeof.vec4 * index.current, flatten(color));
  
          index.current += 1;
        }
      }
    }

    curCanvasRef && curCanvasRef.addEventListener('mousedown', onMouseDown)

    return () => {
      curCanvasRef && curCanvasRef.removeEventListener('mousedown', onMouseDown);
    };
  }, [gl]);

  useEffect(() => {
    if (gl && program && canvasRef.current) {
      gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
      gl.clearColor(0.95, 0.95, 0.95, 1.0);
      gl.useProgram(program);

      vBuffer.current = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer.current);
      gl.bufferData(gl.ARRAY_BUFFER, sizeof.vec2 * maxNumVertices, gl.STATIC_DRAW);

      const vPosition = gl.getAttribLocation(program, 'vPosition');
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);

      cBuffer.current = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer.current);
      gl.bufferData(gl.ARRAY_BUFFER, sizeof.vec4 * maxNumVertices, gl.STATIC_DRAW);

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
