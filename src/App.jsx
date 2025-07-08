import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Leva, useControls } from "leva";
import planetData from "./planetData";
import "./index.css";

export default function App() {
  return (
    <>
      <Leva collapsed />
      <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        <Stars radius={100} count={4000} factor={4} saturation={0} fade />
        <Sun />
        {planetData.map((planet) => (
          <Planet key={planet.id} planet={planet} />
        ))}
        <OrbitControls />
      </Canvas>
    </>
  );
}

function Sun() {
  return (
    <mesh>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial
        color="yellow"
        emissive="orange"
        emissiveIntensity={1}
      />
    </mesh>
  );
}

function Planet({ planet }) {
  const planetRef = React.useRef();

  const { orbitSpeed } = useControls(planet.id, {
    orbitSpeed: { value: planet.speed, min: 0, max: 5, step: 0.01 },
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * orbitSpeed;
    const x = planet.xRadius * Math.sin(t);
    const z = planet.zRadius * Math.cos(t);
    planetRef.current.position.set(x, 0, z);
  });

  return (
    <>
      <mesh ref={planetRef}>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial color={planet.color} />
      </mesh>
      <OrbitPath xRadius={planet.xRadius} zRadius={planet.zRadius} />
    </>
  );
}

function OrbitPath({ xRadius = 1, zRadius = 1 }) {
  const points = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * 2 * Math.PI;
    points.push(
      new THREE.Vector3(xRadius * Math.cos(angle), 0, zRadius * Math.sin(angle))
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#BFBBDA" />
    </line>
  );
}
