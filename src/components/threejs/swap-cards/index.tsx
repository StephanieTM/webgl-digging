import React, { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useScene, useRender, useRaycaster } from 'src/components/threejs/hooks';
import { Card } from './classes';

const width = 1000;
const height = 600;
const positions = [
  new THREE.Vector3( -3, 0, 0 ),
  new THREE.Vector3( -1, 0, 0 ),
  new THREE.Vector3(  1, 0, 0 ),
  new THREE.Vector3(  3, 0, 0 ),
];

export default function Comp(): JSX.Element {
  const playground = useRef<HTMLDivElement>(null);
  const { scene, renderer, camera } = useScene({
    cameraConfig: {
      init: [45, width / height, 1, 20],
      position: [0, 0, 10],
      lookAt: [0, 0, 0],
    },
    rendererConfig: {
      size: [width, height],
      clearColor: ['#f0f0f0'],
    },
  });
  const { raycaster, mouse } = useRaycaster(renderer.current.domElement);
  const cards = useRef<Card[]>([]);
  const renderFunc = useCallback(() => {
    if (raycaster.current && mouse.current && camera.current) {
      raycaster.current.setFromCamera(mouse.current, camera.current);
      cards.current.forEach((card) => {
        card.doRaycaster();
      });
    }

    renderer.current.render(scene.current, camera.current);
  }, [camera, mouse, raycaster, renderer, scene]);

  useEffect(() => {
    positions.forEach((position, index) => {
      let number: number;
      do {
        number = Math.floor(Math.random() * (positions.length + 1) * 2);
      } while (cards.current.findIndex((card) => card.number === number) > -1);
      const card = new Card({ id: `card${index}`, position, number, raycaster, mouse });
      cards.current.push(card);
      scene.current.add(card.object);
    });

    playground.current?.appendChild(renderer.current.domElement);
  }, [mouse, raycaster, renderer, scene]);
  useRender(renderFunc);

  return (
    <div>
      <div ref={playground}></div>
    </div>
  );
}
