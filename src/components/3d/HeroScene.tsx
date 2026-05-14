'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function useIsMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
}

function CloudCluster({
  position,
  scale = 1,
  speed = 0.003,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Group>(null);

  const spheres = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        pos: [
          (i - 3.5) * 0.75 * scale,
          Math.sin(i * 1.3) * 0.35 * scale,
          Math.cos(i * 0.9) * 0.2 * scale,
        ] as [number, number, number],
        r: (0.55 + Math.abs(Math.sin(i * 0.7)) * 0.55) * scale,
      })),
    [scale]
  );

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x += speed;
    if (ref.current.position.x > 22) {
      ref.current.position.x = -22;
    }
  });

  return (
    <group ref={ref} position={position}>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[s.r, 10, 8]} />
          <meshStandardMaterial
            color="white"
            transparent
            opacity={0.88}
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={3} color="#e3f2fd" />
      <directionalLight position={[10, 15, 5]} intensity={2.5} color="#fff9e6" />
      <directionalLight position={[-8, 8, -5]} intensity={1.2} color="#bbdefb" />

      <CloudCluster position={[-10, 2.5, -6]} scale={1.3} speed={0.003} />
      <CloudCluster position={[2, 0.5, -10]} scale={1.0} speed={0.002} />
      <CloudCluster position={[-2, -2, -4]} scale={1.6} speed={0.004} />
      <CloudCluster position={[12, 1.5, -14]} scale={1.1} speed={0.0015} />
      <CloudCluster position={[-6, 3.5, -8]} scale={0.8} speed={0.005} />

      {!isMobile && (
        <>
          <CloudCluster position={[6, -1.5, -5]} scale={0.9} speed={0.0035} />
          <CloudCluster position={[-14, -0.5, -12]} scale={1.4} speed={0.002} />
          <CloudCluster position={[8, 4, -18]} scale={1.2} speed={0.0012} />
        </>
      )}
    </>
  );
}

export default function HeroScene() {
  const isMobile = useIsMobile();

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 65 }}
      gl={{
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      }}
      dpr={isMobile ? [1, 1] : [1, 1.5]}
    >
      <Scene isMobile={isMobile} />
    </Canvas>
  );
}
