import React, { useCallback, useEffect, useRef } from 'react';
import { useRender, useShaders, useWebGL } from 'src/components/original-webgl/hooks';
import { normalizeHexColor, randomHexColor } from 'src/utils';
import { flatten, IVec2, vec2, vec4 } from 'src/lib/mvjs';
import vShader from './shaders/drag-and-draw-lines/vshader.glsl';
import fShader from './shaders/drag-and-draw-lines/fshader.glsl';

const maxNumTriangles = 500;
const maxNumVertices  = 3 * maxNumTriangles;

export default function Comp(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gl = useWebGL(canvasRef);
  const program = useShaders(gl, vShader, fShader);
  const vBuffer = useRef<WebGLBuffer|null>(null);
  const cBuffer = useRef<WebGLBuffer|null>(null);
  const index = useRef<number>(0);
  const redraw = useRef<boolean>(false);
  const breakPoint = useRef<number[]>([0]);
  const curColor = useRef(vec4(normalizeHexColor(randomHexColor()).concat(1)));
  const mouse = useRef<IVec2|undefined>(undefined);
  const renderFunc = useCallback(() => {
    if (gl) {
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (index.current > 0) {
        for (let i = 0; i < breakPoint.current.length - 1; i += 1) {
          const startPoint = breakPoint.current[i] + 1;
          const numPoints = breakPoint.current[i + 1] - breakPoint.current[i] - 1;
          if (numPoints > 1) {
            gl.drawArrays(gl.LINE_STRIP, startPoint, numPoints);
          } else if (numPoints === 1) {
            gl.drawArrays(gl.POINTS, startPoint, numPoints);
          }
        }
      }
    }
  }, [gl]);

  useEffect(() => {
    const curCanvasRef = canvasRef.current;
    function addPoint(addExtraBreakPoint = false): void {
      if (gl && mouse.current && index.current < maxNumVertices) {

        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer.current);
        gl.bufferSubData(gl.ARRAY_BUFFER, 8 * index.current, flatten(mouse.current));

        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer.current);
        gl.bufferSubData(gl.ARRAY_BUFFER, 16 * index.current, flatten(curColor.current));

        index.current += 1;
        if (breakPoint.current.length > 1) {
          breakPoint.current.pop();
        }
        breakPoint.current.push(index.current);
        if (addExtraBreakPoint) {
          breakPoint.current.push(-1);
        }
      }
    }
    function onMouseDown(): void {
      redraw.current = true;
      if (gl && canvasRef.current && redraw.current && mouse.current) {
        addPoint(false);
      }
    }
    function onMouseUp(): void {
      redraw.current = false;
      curColor.current = vec4(normalizeHexColor(randomHexColor()).concat(1));
      if (gl && canvasRef.current && mouse.current) {
        addPoint(true);
      }
    }
    function onMouseMove(event: MouseEvent): void {
      if (canvasRef.current) {
        mouse.current = vec2(
          2 * ( (event.clientX - canvasRef.current.offsetLeft) / canvasRef.current.clientWidth ) - 1,
          -2 * ( (event.clientY - canvasRef.current.offsetTop) / canvasRef.current.clientHeight ) + 1
        );
      }
      if (gl && canvasRef.current && redraw.current && mouse.current) {
        addPoint(false);
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
      gl.bufferData(gl.ARRAY_BUFFER, 8 * maxNumVertices, gl.STATIC_DRAW);

      const vPosition = gl.getAttribLocation(program, 'vPosition');
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);

      cBuffer.current = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer.current);
      gl.bufferData(gl.ARRAY_BUFFER, 16 * (maxNumVertices + 3), gl.STATIC_DRAW);

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
