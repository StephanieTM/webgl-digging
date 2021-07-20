import { useEffect } from 'react';

export function useRender(rendererFn: () => void): void {
  useEffect(() => {
    let refreshId = 0;
    const animate = () => {
      refreshId = requestAnimationFrame(animate);
      rendererFn();
    };
    animate();

    return () => {
      cancelAnimationFrame(refreshId);
    };
  }, [rendererFn]);
}

export function useRenderDelay(rendererFn: () => void, delay: number): void {
  useEffect(() => {
    let refreshId = 0;
    let timeoutId = 0;
    const animate = () => {
      rendererFn();
      timeoutId = setTimeout(() => {
        refreshId = requestAnimationFrame(animate);
      }, delay) as unknown as number;
    };
    animate();

    return () => {
      cancelAnimationFrame(refreshId);
      clearTimeout(timeoutId);
    };
  }, [rendererFn, delay]);
}
