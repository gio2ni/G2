'use client';

// ============================================================
// HERO SCENE 3D — Scène principale Three.js
//
// Contenu :
//   - T-shirt 3D procédural (THREE.Shape + ExtrudeGeometry)
//   - Matériau chrome miroir (MeshStandardMaterial metalness:1)
//   - Lumière cyan réactive à la souris (MouseLight)
//   - Système de particules flottantes (Particles)
//   - Post-processing : Bloom + ChromaticAberration
//   - Environment HDRI pour les reflets chrome
//
// IMPORTANT : Ce composant ne doit jamais être importé directement
// depuis un Server Component. Toujours utiliser :
//   const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), { ssr: false })
//
// Pourquoi useRef pour la souris (pas useState) :
//   La souris bouge à 60fps+. useState recauserait 60 re-renders/s.
//   useRef met à jour la valeur sans déclencher de re-render.
// ============================================================

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// ================================================================
// UTILITAIRE — Crée le contour 2D du t-shirt avec THREE.Shape
//
// Coordonnées en unités Three.js (1 unité ≈ vue de la caméra à fov=50, z=5)
// Le t-shirt est centré sur l'origine, symétrique sur l'axe X
// ================================================================
function createTshirtShape(): THREE.Shape {
  const shape = new THREE.Shape();

  // Point de départ : bas gauche de l'ourlet
  shape.moveTo(-1.2, -2.0);

  // Corps gauche : vers le haut jusqu'à l'aisselle
  shape.lineTo(-1.2, 0.2);

  // Manche gauche : sort sur le côté, monte, revient
  shape.lineTo(-2.2, 0.0);    // bout manche gauche (angle descendant)
  shape.lineTo(-2.3, 0.5);    // coin haut-gauche manche
  shape.lineTo(-0.9, 0.8);    // rentrée manche (jointure épaule gauche)

  // Épaule gauche → col gauche (courbe de Bézier pour arrondi naturel)
  shape.bezierCurveTo(-0.75, 1.0, -0.55, 1.5, -0.38, 1.78);

  // Courbe du col (demi-cercle vers le haut)
  shape.bezierCurveTo(-0.25, 1.95, 0.25, 1.95, 0.38, 1.78);

  // Col droit → épaule droite (symétrique)
  shape.bezierCurveTo(0.55, 1.5, 0.75, 1.0, 0.9, 0.8);

  // Manche droite (symétrique)
  shape.lineTo(2.3, 0.5);
  shape.lineTo(2.2, 0.0);
  shape.lineTo(1.2, 0.2);

  // Corps droit : vers le bas jusqu'à l'ourlet
  shape.lineTo(1.2, -2.0);

  // Fermeture du bas (ourlet droit → gauche)
  shape.lineTo(-1.2, -2.0);

  return shape;
}

// ================================================================
// COMPOSANT : Mesh du T-shirt
// Réagit à la position de la souris (légère inclinaison)
// ================================================================
function TshirtMesh({
  mouse,
}: {
  mouse: React.MutableRefObject<[number, number]>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Crée la géométrie une seule fois (useMemo = pas de recréation au re-render)
  const geometry = useMemo(() => {
    const shape = createTshirtShape();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,           // Épaisseur du t-shirt en 3D
      bevelEnabled: true,
      bevelThickness: 0.025, // Épaisseur du biseau (arrondi des bords)
      bevelSize: 0.02,
      bevelSegments: 5,      // Plus de segments = bords plus lisses
    });

    // CRUCIAL : recentre la géométrie sur son centre visuel
    // Sans cela, la rotation se fait autour du coin bas-gauche
    geo.center();

    return geo;
  }, []);

  // Animation par frame : rotation + réaction souris
  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;

    // Rotation Y automatique (oscillation sinusoïdale)
    meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.35;

    // Inclinaison réactive à la souris (lerp = interpolation smooth)
    // La valeur 0.05 définit la "viscosité" du mouvement (0.01 = très lent, 0.3 = rapide)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.current[1] * 0.18, // mouse[1] = axe Y normalisé [-1, 1]
      0.05
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      -mouse.current[0] * 0.08, // mouse[0] = axe X normalisé [-1, 1]
      0.05
    );

    // Flottement vertical doux
    meshRef.current.position.y = Math.sin(t * 0.7) * 0.06;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      {/* Matériau chrome : metalness=1 + roughness≈0 = miroir parfait */}
      <meshStandardMaterial
        color={0xffffff}
        metalness={1.0}
        roughness={0.04}
        envMapIntensity={2.0}
      />
    </mesh>
  );
}

// ================================================================
// COMPOSANT : Lumière cyan réactive à la souris
// La lumière suit la souris avec un léger retard (lerp 0.08)
// Crée un halo lumineux qui semble "pointer" sur le t-shirt
// ================================================================
function MouseLight({
  mouse,
}: {
  mouse: React.MutableRefObject<[number, number]>;
}) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!lightRef.current) return;

    // Lerp plus lent que le mesh (0.08) = décalage visuel entre lumière et t-shirt
    lightRef.current.position.x = THREE.MathUtils.lerp(
      lightRef.current.position.x,
      mouse.current[0] * 3.5,
      0.08
    );
    lightRef.current.position.y = THREE.MathUtils.lerp(
      lightRef.current.position.y,
      mouse.current[1] * 2.5,
      0.08
    );
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 3]}
      color="#00FFFF"   // Néon cyan
      intensity={10}
      distance={12}
    />
  );
}

// ================================================================
// COMPOSANT : Système de particules flottantes
// 150 points dispersés autour du t-shirt qui tournent lentement
// ================================================================
function Particles({ count = 150 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Génère les positions des particules une seule fois
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribution dans un espace 3D large autour du t-shirt
      arr[i * 3]     = (Math.random() - 0.5) * 9;  // X : [-4.5, 4.5]
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;  // Y : [-3.5, 3.5]
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;  // Z : [-2.5, 2.5]
    }
    return arr;
  }, [count]);

  // Rotation lente du nuage de particules
  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.025;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#00FFFF"
        transparent
        opacity={0.55}
        sizeAttenuation   // Les particules plus loin paraissent plus petites
      />
    </points>
  );
}

// ================================================================
// COMPOSANT : Assemblage de la scène (dans le Canvas)
// ================================================================
function Scene({
  mouse,
}: {
  mouse: React.MutableRefObject<[number, number]>;
}) {
  return (
    <>
      {/* Lumière ambiante très faible — laisse la lumière directionnelle dominer */}
      <ambientLight intensity={0.08} />

      {/* Lumière principale (haut-droite, blanche) */}
      <directionalLight position={[4, 6, 4]} intensity={0.6} color="#ffffff" />

      {/* Lumière d'accentuation violet (haut-gauche) */}
      <pointLight position={[-5, 4, 2]} color="#7C3AED" intensity={5} distance={14} />

      {/* Lumière cyan réactive à la souris */}
      <MouseLight mouse={mouse} />

      {/* Le t-shirt, enveloppé dans Float pour un micro-flottement supplémentaire */}
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <TshirtMesh mouse={mouse} />
      </Float>

      {/* Nuage de particules */}
      <Particles count={150} />

      {/* Étoiles dans le fond lointain */}
      <Stars
        radius={60}
        depth={60}
        count={800}
        factor={2}
        fade
        speed={0.4}
      />

      {/* Environment HDRI "city" — fournit les reflets pour le matériau chrome */}
      <Environment preset="city" />

      {/* Post-processing : Bloom + aberration chromatique subtile */}
      <EffectComposer>
        {/* Bloom : les zones lumineuses "débordent" et créent un halo */}
        <Bloom
          luminanceThreshold={0.25}
          luminanceSmoothing={0.85}
          intensity={1.8}
          mipmapBlur
        />

        {/* ChromaticAberration : légère dispersion des couleurs (effet lentille) */}
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0006, 0.0006)}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </>
  );
}

// ================================================================
// EXPORT PRINCIPAL — HeroScene
// Gère le Canvas Three.js et le tracking de la souris
// ================================================================
export default function HeroScene() {
  // Stocke la position normalisée de la souris [-1, 1]
  // useRef évite les re-renders (la souris bouge à 60fps)
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,    // -1 (gauche) → 1 (droite)
        -(e.clientY / window.innerHeight) * 2 + 1,  // -1 (bas) → 1 (haut)
      ];
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      // dpr : ratio pixel — [1, 2] = crisp sur retina, plafonné à 2x pour la perf
      dpr={[1, 2]}
    >
      <Scene mouse={mouse} />
    </Canvas>
  );
}
