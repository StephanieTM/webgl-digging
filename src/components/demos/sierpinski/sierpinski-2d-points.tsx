import React, { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { add, IVec3, scale, vec3 } from 'src/components/mvjs/lib';
import { useScene, useRender } from 'src/components/threejs/hooks';
import { randomHexColor } from 'src/utils';

const width = 1000;
const height = 600;
const numPoints = 5000;

const vertices = [
  vec3(-50, -50,  0),
  vec3(  0,  50,  0),
  vec3( 50, -50,  0),
];

export default function Comp(): JSX.Element {
  const playground = useRef<HTMLDivElement>(null);
  const pointsArr = useRef<IVec3[]>([]);
  const geometry = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry());
  const material = useRef<THREE.PointsMaterial>(new THREE.PointsMaterial({ vertexColors: true }));
  const points = useRef<THREE.Points>(new THREE.Points(geometry.current, material.current));
  const colors = useRef<number[]>([]);
  const { scene, camera, renderer } = useScene({
    cameraConfig: {
      init: [45, width / height, 0.1, 500],
      position: [0, 0, 150],
      lookAt: [0, 0, 0],
    },
    rendererConfig: {
      size: [width, height],
    },
  });
  const renderFunc = useCallback(() => {
    renderer.current.render(scene.current, camera.current);
  }, [scene, camera, renderer]);

  useEffect(() => {
    // init points
    const u = scale(0.5, add(vertices[0], vertices[1]));
    const v = scale(0.5, add(vertices[0], vertices[2]));
    let p = scale(0.5, add(u, v));
    let color = new THREE.Color(randomHexColor());

    pointsArr.current.push(p);
    colors.current.push(color.r, color.g, color.b);

    for (let i = 1; i < numPoints; i += 1) {
      const j = Math.floor(Math.random() * 3);

      p = scale(0.5, add(pointsArr.current[i - 1], vertices[j]));
      pointsArr.current.push(p);

      color = new THREE.Color(randomHexColor());
      colors.current.push(color.r, color.g, color.b);
    }

    geometry.current.setAttribute('position', new THREE.Float32BufferAttribute(pointsArr.current.flat(), 3));
    geometry.current.setAttribute('color', new THREE.Float32BufferAttribute(colors.current, 3));
  }, []);

  useEffect(() => {
    scene.current.add(points.current);
    playground.current?.appendChild(renderer.current.domElement);
  }, [scene, renderer]);
  useRender(renderFunc);

  return (
    <div>
      <div ref={playground}></div>
    </div>
  );
}
