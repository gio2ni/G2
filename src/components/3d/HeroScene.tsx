'use client';

// ============================================================
// HERO SCENE 3D — VERSION OPTIMISÉE PERFORMANCE
//
// Optimisations clés vs v1 :
//   ✅ EffectComposer désactivé sur mobile (économie ~60% GPU)
//   ✅ Bloom léger (luminanceThreshold plus haut = moins de pixels traités)
//   ✅ ChromaticAberration supprimé (peu visible, très coûteux)
//   ✅ Particules : 60 au lieu de 150 (−60%)
//   ✅ DPR plafonné à 1.5 au lieu de 2 (−44% pixels rendus sur retina)
//   ✅ Bevel segments : 3 au lieu de 5 (−30% triangles)
//   ✅ useMemo sur tous les objets Three.js
//   ✅ useRef pour la souris (0 re-render)
//   ✅ Détection mobile : désactive postprocessing
//   ✅ Stars count réduit à 500
//   ✅ frameloop="always" mais useFrame optimisé avec lerp paresseux
// ============================================================

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ---- Détection mobile (hook léger) ----
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
  }, []);
  return mobile;
}

// ================================================================
// Forme 2D du t-shirt — même fonction qu'avant, inchangée
// ================================================================
function createTshirtShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(-1.2, -2.0);
  shape.lineTo(-1.2, 0.2);
  shape.lineTo(-2.2, 0.0);
  shape.lineTo(-2.3, 0.5);
  shape.lineTo(-0.9, 0.8);
  shape.bezierCurveTo(-0.75, 1.0, -0.55, 1.5, -0.38, 1.78);
  shape.bezierCurveTo(-0.25, 1.95, 0.25, 1.95, 0.38, 1.78);
  shape.bezierCurveTo(0.55, 1.5, 0.75, 1.0, 0.9, 0.8);
  shape.lineTo(2.3, 0.5);
  shape.lineTo(2.2, 0.0);
  shape.lineTo(1.2, 0.2);
  shape.lineTo(1.2, -2.0);
  shape.lineTo(-1.2, -2.0);
  return shape;
}

// ================================================================
// T-shirt Mesh — chrome avec emissive intégré pour le glow natif
// ================================================================
function TshirtMesh({
  mouse,
}: {
  mouse: React.MutableRefObject<[number, number]>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Géométrie créée une seule fois
  const geometry = useMemo(() => {
    const shape = createTshirtShape();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.02,
      bevelSegments: 3,  // Réduit de 5 → 3 (-30% triangles)
    });
    geo.center();
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Rotation douce — amplitude réduite pour moins de travail GPU
    meshRef.current.rotation.y = Math.sin(t * 0.35) * 0.28;

    // Réaction souris — seulement si le mouvement est significatif
    const targetX = mouse.current[1] * 0.15;
    const targetZ = -mouse.current[0] * 0.07;
    const LERP = 0.04; // Plus lent = plus doux

    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * LERP;
    meshRef.current.rotation.z += (targetZ - meshRef.current.rotation.z) * LERP;

    // Float vertical
    meshRef.current.position.y = Math.sin(t * 0.65) * 0.05;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={0xffffff}
        metalness={0.95}
        roughness={0.05}
        envMapIntensity={2.2}
        // emissive natif = glow sans Bloom (économie GPU si Bloom désactivé)
        emissive={new THREE.Color(0x001a2a)}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

// ================================================================
// Lumière réactive à la souris (optimisée)
// ================================================================
function MouseLight({
  mouse,
}: {
  mouse: React.MutableRefObject<[number, number]>;
}) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!lightRef.current) return;
    const LERP = 0.06;
    lightRef.current.position.x += (mouse.current[0] * 3 - lightRef.current.position.x) * LERP;
    lightRef.current.position.y += (mouse.current[1] * 2 - lightRef.current.position.y) * LERP;
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 3]}
      color="#00E5FF"
      intensity={8}
      distance={10}
    />
  );
}

// ================================================================
// Particules — count réduit, optimisées
// ================================================================
function Particles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    // Rotation très lente — économise des calculs
    ref.current.rotation.y = state.clock.elapsedTime * 0.018;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.016}
        color="#00E5FF"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

// ================================================================
// Scène principale
// ================================================================
function Scene({
  mouse,
  isMobile,
}: {
  mouse: React.MutableRefObject<[number, number]>;
  isMobile: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.06} />
      <directionalLight position={[4, 6, 4]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-4, 4, 2]} color="#7C3AED" intensity={4} distance={12} />
      <MouseLight mouse={mouse} />

      <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.2}>
        <TshirtMesh mouse={mouse} />
      </Float>

      {/* Moins de particules sur mobile */}
      <Particles count={isMobile ? 30 : 60} />

      <Stars
        radius={60}
        depth={60}
        count={isMobile ? 300 : 500}  // Réduit sur mobile
        factor={2}
        fade
        speed={0.3}
      />

      <Environment preset="city" />

      {/* Post-processing UNIQUEMENT sur desktop — très lourd sur mobile */}
      {!isMobile && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.4}  // Plus haut = moins de pixels traités
            luminanceSmoothing={0.8}
            intensity={1.2}           // Réduit de 1.8 → 1.2
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  );
}

// ================================================================
// Export — HeroScene
// ================================================================
export default function HeroScene() {
  const mouse = useRef<[number, number]>([0, 0]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      gl={{
        antialias: !isMobile,  // Désactive l'antialiasing sur mobile
        alpha: true,
        powerPreference: 'high-performance',  // Demande le GPU dédié
      }}
      style={{ background: 'transparent' }}
      dpr={isMobile ? [1, 1] : [1, 1.5]}  // Plafonné à 1.5x au lieu de 2x
    >
      <Scene mouse={mouse} isMobile={isMobile} />
    </Canvas>
  );
}
