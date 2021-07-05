import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ISceneConfig {
  cameraConfig?: {
    init?: [fov?: number, aspect?: number, near?: number, far?: number];
    position?: [x: number, y: number, z: number];
    lookAt?: [vector: THREE.Vector3 | number, y?: number, z?: number],
  };
  rendererConfig?: {
    size?: [width: number, height: number, updateStyle?: boolean];
  };
}

interface IScene {
  scene: React.MutableRefObject<THREE.Scene>;
  camera: React.MutableRefObject<THREE.PerspectiveCamera>;
  renderer: React.MutableRefObject<THREE.WebGLRenderer>;
}

function callIfConfigExists<T extends unknown[]>(func: (...args: T) => unknown, config?: T) {
  if (config) {
    func(...config);
  }
}

export function useScene(configs: ISceneConfig = {}): IScene {
  const { cameraConfig, rendererConfig } = configs;

  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(...(cameraConfig?.init || [])));
  const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer());

  useEffect(() => {
    callIfConfigExists(camera.current.lookAt.bind(camera.current), cameraConfig?.lookAt);
    callIfConfigExists(camera.current.position.set.bind(camera.current.position), cameraConfig?.position);
  }, [cameraConfig?.lookAt, cameraConfig?.position]);

  useEffect(() => {
    callIfConfigExists(renderer.current.setSize.bind(renderer.current), rendererConfig?.size);
  }, [rendererConfig?.size]);

  return {
    scene,
    camera,
    renderer,
  };
}
