
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, useTexture } from '@react-three/drei';

interface PlanetProps {
  position: [number, number, number];
  texturePath: string;
  size: number;
  rotationSpeed?: number;
  hasRings?: boolean;
  ringColor?: string;
  ringSize?: number;
}

function Planet({ position, texturePath, size, rotationSpeed = 0.002, hasRings = false, ringColor = '#FFD700', ringSize = 1.8 }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(texturePath);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 4;
      ringRef.current.rotation.z += rotationSpeed * 0.5;
    }
  });
  
  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      
      {hasRings && (
        <mesh ref={ringRef}>
          <ringGeometry args={[size * 1.4, size * ringSize, 64]} />
          <meshStandardMaterial
            color={ringColor}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      )}
    </group>
  );
}

interface SpaceSceneProps {
  activePlanet: string;
  isTransitioning: boolean;
}

const SpaceScene: React.FC<SpaceSceneProps> = ({ activePlanet, isTransitioning }) => {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#FFFFFF" />
      
      {/* Dynamic stars background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        fade
        speed={isTransitioning ? 20 : 1}
      />
      
      {/* Sun */}
      <mesh position={[0, 0, -50]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
        <pointLight position={[0, 0, 0]} intensity={1.5} distance={100} decay={2} />
      </mesh>
      
      {/* Planets */}
      {activePlanet === 'earth' && (
        <Planet 
          position={[0, 0, -15]} 
          texturePath="/textures/earth.jpg" 
          size={4} 
        />
      )}
      
      {activePlanet === 'mars' && (
        <Planet 
          position={[0, 0, -15]} 
          texturePath="/textures/mars.jpg" 
          size={3} 
          rotationSpeed={0.003} 
        />
      )}
      
      {activePlanet === 'jupiter' && (
        <Planet 
          position={[0, 0, -20]} 
          texturePath="/textures/jupiter.jpg" 
          size={6} 
          rotationSpeed={0.004} 
        />
      )}
      
      {activePlanet === 'saturn' && (
        <Planet 
          position={[0, 0, -20]} 
          texturePath="/textures/saturn.jpg" 
          size={5} 
          rotationSpeed={0.003}
          hasRings={true} 
          ringColor="#C7A96F"
          ringSize={2.2} 
        />
      )}
      
      {/* Orbit controls */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true} 
        zoomSpeed={0.6}
        minDistance={10}
        maxDistance={50}
        enabled={!isTransitioning}
      />
    </Canvas>
  );
};

export default SpaceScene;
