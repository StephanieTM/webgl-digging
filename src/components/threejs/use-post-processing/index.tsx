import React, { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { useScene, useRender } from '../hooks';

const width = 1000;
const height = 600;

const points = [
  new THREE.Vector3(-30,  0,  0),
  new THREE.Vector3(-20, 10,  0),
  new THREE.Vector3(-10,  0,  0),
  new THREE.Vector3(  0, 10,  0),
  new THREE.Vector3( 10,  0,  0),
  new THREE.Vector3( 20, 10,  0),
  new THREE.Vector3( 30,  0,  0),
];

export default function Comp(): JSX.Element {
  const playground = useRef<HTMLDivElement>(null);
  const { scene, camera, renderer } = useScene({
    cameraConfig: {
      init: [45, width / height, 1, 500],
      position: [0, 0, 100],
      lookAt: [0, 0, 0],
    },
    rendererConfig: {
      size: [width, height],
    },
  });
  const material = useRef(new THREE.LineBasicMaterial({ color: '#aa0000' }));
  const geometry = useRef(new THREE.BufferGeometry().setFromPoints(points));
  const line = useRef(new THREE.Line(geometry.current, material.current));
  const composer = useRef<EffectComposer>(new EffectComposer(renderer.current));
  const renderFunc = useCallback(() => {
    composer.current.render();
  }, []);

  useEffect(() => {
    scene.current.add(line.current);
    playground.current?.appendChild(renderer.current.domElement);
  }, [scene, renderer]);

  useEffect(() => {
    const renderPass = new RenderPass(scene.current, camera.current);
    composer.current.addPass(renderPass);

    const glitchPass = new GlitchPass();
    composer.current.addPass(glitchPass);
  }, [camera, scene]);

  useRender(renderFunc);

  return (
    <div>
      <div ref={playground}></div>
    </div>
  );
}
