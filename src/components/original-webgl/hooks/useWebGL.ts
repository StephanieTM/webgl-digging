import React, { useEffect, useState } from 'react';

const GET_A_WEBGL_BROWSER = 'This page requires a browser that supports WebGL.';

export function useWebGL(canvas: React.RefObject<HTMLCanvasElement>, opts?: WebGLContextAttributes): WebGLRenderingContext | null {
  const context = use3DContext(canvas, opts);

  useEffect(() => {
    if (canvas.current && context) {
      if (!window.WebGLRenderingContext) {
        console.error(GET_A_WEBGL_BROWSER);
      }
    }
  }, [canvas, context]);

  return context;
}

const contextIds = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

export function use3DContext(canvas: React.RefObject<HTMLCanvasElement>, opts?: WebGLContextAttributes): WebGLRenderingContext | null {
  const [context, setContext] = useState<WebGLRenderingContext | null>(null);
  useEffect(() => {
    if (canvas.current) {
      for (let i = 0; i < contextIds.length; i += 1) {
        try {
          setContext(canvas.current.getContext(contextIds[i], opts) as WebGLRenderingContext | null);
          break;
        } catch(e) {}
      }
    }
  }, [canvas, opts]);

  return context;
}
