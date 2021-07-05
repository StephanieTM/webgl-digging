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
