import { useCallback, useEffect, useState } from 'react';

export function useShaders(gl: WebGLRenderingContext|null, vShaderScript: string, fShaderScript: string): WebGLProgram|null {
  const [webglProgram, setWebglProgram] = useState<WebGLProgram | null>(null);
  const getShader = useCallback((type: GLenum|undefined, shaderScript: string): WebGLShader | null => {
    if (!type) {
      return null;
    }
    const shader = gl?.createShader(type) as WebGLShader;
    gl?.shaderSource(shader, shaderScript);
    gl?.compileShader(shader);
    if (!gl?.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl?.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }, [gl]);

  useEffect(() => {
    const vertexShader = getShader(gl?.VERTEX_SHADER, vShaderScript) as WebGLShader;
    const fragmentShader = getShader(gl?.FRAGMENT_SHADER, fShaderScript) as WebGLShader;
    const program = gl?.createProgram() as WebGLProgram;

    gl?.attachShader(program, vertexShader);
    gl?.attachShader(program, fragmentShader);
    gl?.linkProgram(program);

    if (!gl?.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders.');
      setWebglProgram(null);
    } else {
      setWebglProgram(program);
    }
  }, [getShader, gl, vShaderScript, fShaderScript]);

  return webglProgram;
}
