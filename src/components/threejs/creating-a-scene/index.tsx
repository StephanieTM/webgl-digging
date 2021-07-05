import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const width = 1000;
const height = 600;

export default function Comp(): JSX.Element {
  const playground = useRef<HTMLDivElement>(null); // 场景载体的div容器
  const scene = useRef<THREE.Scene>(new THREE.Scene()); // 场景对象
  const camera = useRef<THREE.PerspectiveCamera>(
    new THREE.PerspectiveCamera(
      75, // FOV: Field of View 视野范围
      width / height, // aspect ratio 宽高比
      0.1, // near clipping plane 近裁剪平面，更近的对象不会被渲染
      1000 // far clipping plane 远裁剪平面，更远的对象不会被渲染
    )
  ); // 照相机对象
  const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer()); // 渲染器

  const geometry = useRef<THREE.BoxGeometry>(); // 几何体
  const material = useRef<THREE.MeshBasicMaterial>(); // 材质
  const cube = useRef<THREE.Mesh>(); // 网格

  useEffect(() => {
    // 场景初始化
    renderer.current.setSize(width, height);
    playground.current?.appendChild(renderer.current.domElement);
  }, []);

  useEffect(() => {
    // 几何体初始化
    geometry.current = new THREE.BoxGeometry();
    material.current = new THREE.MeshBasicMaterial({ color: '#eeff99' });
    cube.current = new THREE.Mesh(geometry.current, material.current);
    scene.current.add(cube.current);

    camera.current.position.z = 5;
  }, []);

  useEffect(() => {
    // 动态帧渲染
    let refreshId = 0;
    const animate = (): void => {
      refreshId = requestAnimationFrame(animate);
      if (cube.current) {
        cube.current.rotation.x += 0.01;
        cube.current.rotation.y += 0.01;
      }
      renderer.current.render(scene.current, camera.current);
    };
    animate();

    return (): void => {
      window.cancelAnimationFrame(refreshId);
    };
  }, []);

  return (
    <div>
      <div ref={playground}></div>
    </div>
  );
}
