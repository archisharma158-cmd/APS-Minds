import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Sparkles,
  Stars,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const core = useRef<THREE.Mesh>(null);
  const ringOne = useRef<THREE.Mesh>(null);
  const ringTwo = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (core.current) {
      core.current.rotation.x = t * 0.12;
      core.current.rotation.y = t * 0.22;
      core.current.rotation.z = Math.sin(t * 0.4) * 0.12;
    }

    if (ringOne.current) {
      ringOne.current.rotation.x = t * 0.4;
      ringOne.current.rotation.y = t * 0.2;
    }

    if (ringTwo.current) {
      ringTwo.current.rotation.z = -t * 0.35;
      ringTwo.current.rotation.y = t * 0.25;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />

      <pointLight
        position={[2, 2, 3]}
        intensity={10}
        distance={7}
      />

      <pointLight
        position={[-3, -2, -2]}
        intensity={5}
        distance={6}
      />

      <Float
        speed={1.4}
        rotationIntensity={0.2}
        floatIntensity={0.45}
      >
        {/* Main neural core */}
        <mesh ref={core}>
          <icosahedronGeometry args={[1.18, 5]} />

          <MeshDistortMaterial
            color="#36d9ff"
            emissive="#006b88"
            emissiveIntensity={2.2}
            roughness={0.1}
            metalness={0.9}
            distort={0.16}
            speed={1.5}
          />
        </mesh>

        {/* Inner energy sphere */}
        <mesh scale={0.55}>
          <sphereGeometry args={[1, 48, 48]} />

          <meshBasicMaterial
            color="#d9faff"
            transparent
            opacity={0.2}
          />
        </mesh>

        {/* Outer holographic ring */}
        <mesh
          ref={ringOne}
          rotation={[Math.PI / 2.4, 0.3, 0]}
        >
          <torusGeometry args={[1.65, 0.012, 16, 180]} />

          <meshBasicMaterial
            color="#48dcff"
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Second ring */}
        <mesh
          ref={ringTwo}
          rotation={[Math.PI / 3, 0.6, 0]}
        >
          <torusGeometry args={[1.95, 0.008, 12, 180]} />

          <meshBasicMaterial
            color="#8178ff"
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Inner ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.35, 0.006, 12, 160]} />

          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.28}
          />
        </mesh>
      </Float>

      <Sparkles
        count={140}
        scale={[5, 5, 5]}
        size={1.4}
        speed={0.25}
        color="#5de3ff"
      />

      <Stars
        radius={7}
        depth={5}
        count={500}
        factor={1.5}
        saturation={0}
        fade
        speed={0.2}
      />
    </>
  );
}

export default function ArctesOrb() {
  return (
    <div className="h-[430px] w-[430px] sm:h-[540px] sm:w-[540px]">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Core />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}