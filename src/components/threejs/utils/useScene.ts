import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ISceneConfig {
  cameraConfig?: [fov?: number, aspect?: number, near?: number, far?: number];
  rendererConfig?: {
    size?: [width: number, height: number, updateStyle?: boolean];
  };
}

interface IScene {
  scene: React.MutableRefObject<THREE.Scene>;
  camera: React.MutableRefObject<THREE.PerspectiveCamera>;
  renderer: React.MutableRefObject<THREE.WebGLRenderer>;
}

export function useScene(configs: ISceneConfig): IScene {
  const { cameraConfig, rendererConfig } = configs;

  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(...(cameraConfig || [])));
  const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer());

  useEffect(() => {
    if (rendererConfig?.size) {
      renderer.current.setSize(...rendererConfig.size);
    }
  }, [rendererConfig?.size]);

  return {
    scene,
    camera,
    renderer,
  };
}
