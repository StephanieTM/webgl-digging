import React, { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useScene, useRender } from '../hooks';

const width = 1000;
const height = 600;
const MAX_POINTS = 500;
const INIT_DRAW_COUNT = 2;

export default function Comp(): JSX.Element {
  const playground = useRef<HTMLDivElement>(null);
  const drawCount = useRef<number>(INIT_DRAW_COUNT);
  const { scene, camera, renderer } = useScene({
    cameraConfig: {
      init: [75, width / height, 1, 1000],
      position: [0, 0, 900],
      lookAt: [0, 0, 0],
    },
    rendererConfig: {
      size: [width, height],
    },
  });
  const geometry = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry());
  const material = useRef<THREE.LineBasicMaterial>(new THREE.LineBasicMaterial({ color: '#33dd99' }));
  const line = useRef<THREE.Line>(new THREE.Line(geometry.current, material.current));
  const renderFunc = useCallback(() => {
    drawCount.current = ( drawCount.current + 1 ) % MAX_POINTS;

    line.current.geometry.setDrawRange( 0, drawCount.current );

    if ( drawCount.current === 0 ) {

      // periodically, generate new data

      updatePositions();

      line.current.geometry.attributes.position.needsUpdate = true; // required after the first render

      (line.current.material as THREE.LineBasicMaterial).color.setHSL( Math.random(), 1, 0.5 );
    }

    line.current.geometry.computeBoundingBox();
    line.current.geometry.computeBoundingSphere();
    renderer.current.render(scene.current, camera.current);
  }, [camera, renderer, scene]);

  useEffect(() => {
    // attributes
    const positions = new Float32Array(3 * MAX_POINTS); // 每个顶点三个值
    geometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // draw range
    geometry.current.setDrawRange(0, INIT_DRAW_COUNT);
  }, []);

  useEffect(() => {
    // add line
    scene.current.add(line.current);
    updatePositions();

    playground.current?.appendChild(renderer.current.domElement);
  }, [renderer, scene]);

  useRender(renderFunc);

  // 随机更新buffer中的顶点坐标
  function updatePositions(): void {
    const positions = line.current.geometry.attributes.position.array as number[];
    let x, y, z, index;
    x = y = z = index = 0;

    for ( let i = 0, l = MAX_POINTS; i < l; i ++ ) {
      positions[ index ++ ] = x;
      positions[ index ++ ] = y;
      positions[ index ++ ] = z;

      x += ( Math.random() - 0.5 ) * 30;
      y += ( Math.random() - 0.5 ) * 30;
      z += ( Math.random() - 0.5 ) * 30;
    }
  }

  return (
    <div>
      <div ref={playground}></div>
    </div>
  );
}
