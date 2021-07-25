import React, { useCallback, useEffect, useRef } from 'react';
import { useWebGL, useRender, useShaders } from 'src/components/original-webgl/hooks';
import { flatten, IVec2, sizeof, vec2, vec4 } from 'src/lib/mvjs';
import { normalizeHexColor, randomHexColor } from 'src/utils';
import vShader from './shaders/triangles/vshader.glsl';
import fShader from './shaders/triangles/fshader.glsl';

const maxNumTriangles = 5000;
const maxNumVertices  = 3 * maxNumTriangles;

export default function Comp(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gl = useWebGL(canvasRef);
  const program = useShaders(gl, vShader, fShader);
  const vBuffer = useRef<WebGLBuffer|null>(null);
  const cBuffer = useRef<WebGLBuffer|null>(null);
  const index = useRef<number>(0);
  const triangleIndex = useRef<number>(0);
  const vertexA = useRef<IVec2>(); // 顶点
  const redraw = useRef<boolean>(false);
  const curColor = useRef(vec4(...normalizeHexColor(randomHexColor()).concat(1)));
  const mouse = useRef<IVec2|undefined>(undefined);
  const renderFunc = useCallback(() => {
    if (gl) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (index.current > 0) {
        gl.drawArrays(gl.TRIANGLES, 0, index.current);
      }
    }
  }, [gl]);

  useEffect(() => {
    const curCanvasRef = canvasRef.current;
    function onMouseDown(): void {
      redraw.current = true;
      if (gl && mouse.current && triangleIndex.current < maxNumTriangles) {
        vertexA.current = mouse.current;

        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer.current);
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof.vec2 * (index.current), flatten(mouse.current));
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof.vec2 * (index.current + 1), flatten(mouse.current));
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof.vec2 * (index.current + 2), flatten(mouse.current));

        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer.current);
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof.vec4 * (index.current), flatten(curColor.current));
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof.vec4 * (index.current + 1), flatten(curColor.current));
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof.vec4 * (index.current + 2), flatten(curColor.current));

        index.current += 3;
      }
    }
    function onMouseUp(): void {
      redraw.current = false;
      triangleIndex.current += 1;
      vertexA.current = undefined;
      curColor.current = vec4(...normalizeHexColor(randomHexColor()).concat(1));
    }
    function onMouseMove(event: MouseEvent): void {
      if (canvasRef.current) {
        mouse.current = vec2(
          2 * ( (event.clientX - canvasRef.current.offsetLeft) / canvasRef.current.clientWidth ) - 1,
          -2 * ( (event.clientY - canvasRef.current.offsetTop) / canvasRef.current.clientHeight ) + 1
        );
      }
      if (gl && mouse.current && redraw.current && vertexA.current) {
        const vertexB = mouse.current;
        const vertexC = vec2(2 * vertexA.current[0] - vertexB[0], vertexB[1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer.current);
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof.vec2 * (index.current - 2), flatten(vertexB));
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof.vec2 * (index.current - 1), flatten(vertexC));
      }
    }

    if (curCanvasRef) {
      curCanvasRef.addEventListener('mousedown', onMouseDown);
      curCanvasRef.addEventListener('mouseup', onMouseUp);
      curCanvasRef.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      if (curCanvasRef) {
        curCanvasRef.removeEventListener('mousedown', onMouseDown);
        curCanvasRef.removeEventListener('mouseup', onMouseUp);
        curCanvasRef.removeEventListener('mousemove', onMouseMove);
      }
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
