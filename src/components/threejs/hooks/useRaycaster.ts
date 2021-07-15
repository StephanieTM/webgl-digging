import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface IRaycaster {
  raycaster: React.MutableRefObject<THREE.Raycaster>;
  mouse: React.MutableRefObject<THREE.Vector2|undefined>;
}

export function useRaycaster(canvas: HTMLCanvasElement): IRaycaster {
  const raycaster = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouse = useRef<THREE.Vector2>();

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const x = ((event.clientX - canvas.offsetLeft) / canvas.clientWidth) * 2 - 1;
      const y = ((event.clientY - canvas.offsetTop) / canvas.clientHeight) * -2 + 1;
      if (!mouse.current) {
        mouse.current = new THREE.Vector2(x, y);
      } else {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    };
    if (canvas) {
      window.addEventListener('mousemove', onMouseMove, false);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove, false);
    };
  }, [canvas]);

  return {
    raycaster,
    mouse,
  };
}
