import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ISceneConfig {
  cameraConfig?: {
    init?: [fov?: number, aspect?: number, near?: number, far?: number];
    position?: [x: number, y: number, z: number];
    lookAt?: [vector: THREE.Vector3 | number, y?: number, z?: number],
  };
  rendererConfig?: {
    size?: [width: number, height: number, updateStyle?: boolean];
    clearColor?: [color: string | number | THREE.Color, alpha?: number | undefined];
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
  const instances = useRef<Record<string, unknown>>({});

  const scene = useRef<THREE.Scene>(singleton('scene', () => new THREE.Scene()));
  const camera = useRef<THREE.PerspectiveCamera>(singleton('camera', () => new THREE.PerspectiveCamera(...(cameraConfig?.init || []))));
  const renderer = useRef<THREE.WebGLRenderer>(singleton('renderer', () => new THREE.WebGLRenderer()));

  /**
   * 生成或返回单例实例，避免构造方法重复执行导致的空间浪费
   * @param key 实例key
   * @param genFunc 实例生成方法
   * @returns 实例
   */
  function singleton<T>(key: string, genFunc: () => T): T {
    if (instances.current[key]) {
      return instances.current[key] as T;
    }
    const instance = genFunc();
    instances.current[key] = instance;
    return instance;
  }

  useEffect(() => {
    callIfConfigExists(camera.current.lookAt.bind(camera.current), cameraConfig?.lookAt);
    callIfConfigExists(camera.current.position.set.bind(camera.current.position), cameraConfig?.position);
  }, [cameraConfig?.lookAt, cameraConfig?.position]);

  useEffect(() => {
    callIfConfigExists(renderer.current.setSize.bind(renderer.current), rendererConfig?.size);
    callIfConfigExists(renderer.current.setClearColor.bind(renderer.current), rendererConfig?.clearColor);
  }, [rendererConfig?.clearColor, rendererConfig?.size]);

  return {
    scene,
    camera,
    renderer,
  };
}
