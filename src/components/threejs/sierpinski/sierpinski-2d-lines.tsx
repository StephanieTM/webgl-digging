import React, { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useRender, useScene } from 'src/components/threejs/hooks';
import { vec3, IVec3, scale, add } from 'src/lib/mvjs';

const width = 1000;
const height = 600;
const numTimesToSubdivides = 5;

const vertices = [
  vec3(-50, -50,  0),
  vec3(  0,  50,  0),
  vec3( 50, -50,  0),
];

export default function Comp(): JSX.Element {
  const playground = useRef<HTMLDivElement>(null);
  const pointsArr = useRef<IVec3[]>([]);
  const geometry = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry());
  const material = useRef<THREE.MeshBasicMaterial>(new THREE.MeshBasicMaterial({ color: '#fff', side: THREE.DoubleSide }));
  const mesh = useRef<THREE.Mesh>(new THREE.Mesh(geometry.current, material.current));
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
    function triangle(a: IVec3, b: IVec3, c: IVec3) {
      pointsArr.current.push(a, b, c);
    }

    function divideTriangle(a: IVec3, b: IVec3, c: IVec3, count: number) {
      if (count === 0) {
        triangle(a, b, c);
      } else {
        const ab = scale(0.5, add(a, b));
        const bc = scale(0.5, add(b, c));
        const ac = scale(0.5, add(a, c));
        --count;

        divideTriangle(a, ab, ac, count);
        divideTriangle(c, ac, bc, count);
        divideTriangle(b, bc, ab, count);
      }
    }

    divideTriangle(vertices[0], vertices[1], vertices[2], numTimesToSubdivides);

    geometry.current.setAttribute('position', new THREE.Float32BufferAttribute(pointsArr.current.flat(), 3));
  }, []);

  useEffect(() => {
    scene.current.add(mesh.current);
    playground.current?.appendChild(renderer.current.domElement);
  }, [scene, renderer]);
  useRender(renderFunc);

  return (
    <div>
      <div ref={playground}></div>
    </div>
  );
}
