import React, { useRef } from 'react';

export default function TrackBallCommon(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div style={{ padding: '20px' }}>
      <canvas ref={canvasRef} width={512} height={512}></canvas>
    </div>
  );
}
