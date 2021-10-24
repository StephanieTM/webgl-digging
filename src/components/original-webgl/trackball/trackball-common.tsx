import React, { useCallback, useEffect, useRef } from 'react';
import { useWebGL, useRender, useShaders } from 'src/components/original-webgl/hooks';
import { flatten, IMat4, IVec3, IVec4, mat4, mult, normalize, vec4, rotate } from 'src/lib/mvjs';
import vShader from './shaders/trackball-common/vshader.glsl';
import fShader from './shaders/trackball-common/fshader.glsl';

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

function trackballView(x: number, y: number): IVec3 {
  let a;
  const v = [];

  v[0] = x;
  v[1] = y;

  const d = v[0] * v[0] + v[1] * v[1];

  if (d < 1) {
    v[2] = Math.sqrt(1 - d);
  } else {
    v[2] = 0;
    a = 1 / Math.sqrt(d);
    v[0] *= a;
    v[1] *= a;
  }

  return v as IVec3;
}

export default function TrackBallCommon(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gl = useWebGL(canvasRef);
  const program = useShaders(gl, vShader, fShader);
  const points = useRef<IVec4[]>([]);
  const colors = useRef<IVec4[]>([]);
  const rotationMatrix = useRef<IMat4>(mat4());
  const rotationMatrixLoc = useRef<WebGLUniformLocation | null>(null);
  const axis = useRef<IVec3>([0, 0, 1]);
  const angle = useRef<number>(0);
  const trackingMouse = useRef(false);
  const trackballMove = useRef(false);
  const startX = useRef<number>();
  const startY = useRef<number>();
  const curX = useRef<number>();
  const curY = useRef<number>();
  const lastPos = useRef<IVec3>([0, 0, 0]);

  const renderFunc = useCallback(() => {
    if (gl && program) {
      gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

      if (trackballMove.current) {
        axis.current = normalize(axis.current);
        rotationMatrix.current = mult(rotationMatrix.current, rotate(angle.current, axis.current));
        gl.uniformMatrix4fv(rotationMatrixLoc.current, false, flatten(rotationMatrix.current));
      }
      gl.drawArrays(gl.TRIANGLES, 0, points.current.length)
    }
  }, [gl, program]);

  useEffect(() => {
    function quad(a: number, b: number, c: number, d: number) {
      const indices = [a, b, c, a, c, d];
      for (let i = 0; i < indices.length; i += 1) {
        points.current.push(vertices[indices[i]]);
        colors.current.push(vertexColors[a]);
      }
    }
    
    function colorCube() {
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
    if (canvasRef.current) {
      canvasRef.current.addEventListener('mousedown', (event) => {
        if (canvasRef.current) {
          const x = 2 * event.clientX/canvasRef.current.width - 1;
          const y = 2 * (canvasRef.current.height - event.clientY) / canvasRef.current.height - 1;
          startMotion(x, y);
        }
      });

      canvasRef.current.addEventListener('mouseup', (event) => {
        if (canvasRef.current) {
          const x = 2 * event.clientX/canvasRef.current.width - 1;
          const y = 2 * (canvasRef.current.height - event.clientY) / canvasRef.current.height - 1;
          stopMotion(x, y);
        }
      });

      canvasRef.current.addEventListener('mousemove', (event) => {
        if (canvasRef.current) {
          const x = 2 * event.clientX/canvasRef.current.width - 1;
          const y = 2 * (canvasRef.current.height - event.clientY) / canvasRef.current.height - 1;
          mouseMotion(x, y);
        }
      });
    }

    function startMotion(x: number, y: number) {
      trackingMouse.current = true;
      startX.current = x;
      startY.current = y;
      curX.current = x;
      curY.current = y;

      lastPos.current = trackballView(x, y);
      trackballMove.current = true;
    }

    function stopMotion(x: number, y: number) {
      trackingMouse.current = false;
      if (startX.current === x && startY.current === y) {
        angle.current = 0;
        trackballMove.current = false;
      }
    }

    function mouseMotion(x: number, y: number) {
      let dx, dy, dz;

      const curPos = trackballView(x, y);
      if (trackingMouse.current) {
        dx = curPos[0] - lastPos.current[0];
        dy = curPos[1] - lastPos.current[1];
        dz = curPos[2] - lastPos.current[2];

        if (dx || dy || dz) {
          angle.current = -0.1 * Math.sqrt(dx*dx + dy*dy + dz*dz);
          
          axis.current[0] = lastPos.current[1] * curPos[2] - lastPos.current[2] * curPos[1];
          axis.current[1] = lastPos.current[2] * curPos[0] - lastPos.current[0] * curPos[2];
          axis.current[2] = lastPos.current[0] * curPos[1] - lastPos.current[1] * curPos[0];

          lastPos.current[0] = curPos[0];
          lastPos.current[1] = curPos[1];
          lastPos.current[2] = curPos[2];
        }
      }
    }
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

      rotationMatrixLoc.current = gl.getUniformLocation(program, 'r');
      gl.uniformMatrix4fv(rotationMatrixLoc.current, false, flatten(rotationMatrix.current));
    }
  }, [gl, program]);

  useRender(renderFunc);

  return (
    <div style={{ padding: '20px' }}>
      <canvas ref={canvasRef} width={512} height={512}></canvas>
    </div>
  );
}
