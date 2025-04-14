import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, useTexture, Environment } from '@react-three/drei';

interface PlanetProps {
  position: [number, number, number];
  texturePath: string;
  size: number;
  rotationSpeed?: number;
  hasRings?: boolean;
  ringColor?: string;
  ringSize?: number;
  onClick?: () => void;
}

function Planet({ position, texturePath, size, rotationSpeed = 0.002, hasRings = false, ringColor = '#FFD700', ringSize = 1.8, onClick }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
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
    <group 
      position={position} 
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial 
          map={texture} 
          emissiveMap={texture}
          emissiveIntensity={hovered ? 0.1 : 0}
          emissive="#ffffff"
        />
        {hovered && (
          <mesh>
            <sphereGeometry args={[size * 1.05, 32, 32]} />
            <meshBasicMaterial transparent opacity={0.1} color="#80CFFF" />
          </mesh>
        )}
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

interface CloudLayerProps {
  size: number;
  speed: number;
}

function CloudLayer({ size, speed }: CloudLayerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudTexture = useTexture('/textures/earth_clouds.jpg');
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size * 1.02, 32, 32]} />
      <meshStandardMaterial 
        map={cloudTexture} 
        transparent={true} 
        opacity={0.4} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface SpaceSceneProps {
  activePlanet: string;
  isTransitioning: boolean;
  onPlanetClick?: (planet: string) => void;
}

const SpaceScene: React.FC<SpaceSceneProps> = ({ activePlanet, isTransitioning, onPlanetClick }) => {
  const handlePlanetClick = (planet: string) => {
    if (onPlanetClick && !isTransitioning) {
      onPlanetClick(planet);
    }
  };
  
  return (
    <Canvas 
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 25], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, 10]} intensity={3} color="#FFFFFF" />
      
      {/* --- TEST CUBE --- */}
      {/* <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="red" />
      </mesh> */}
      {/* --- END TEST CUBE --- */}
      
      {/* Dynamic stars background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        fade
        speed={isTransitioning ? 20 : 1}
      />
      
      {/* Sun with glow */}
      <mesh position={[0, 0, -50]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
        <pointLight position={[0, 0, 0]} intensity={1.5} distance={100} decay={2} />
      </mesh>
      <mesh position={[0, 0, -50]}>
        <sphereGeometry args={[8.5, 32, 32]} />
        <meshBasicMaterial color="#FDB81380" transparent opacity={0.3} />
      </mesh>
      
      {/* Planets */}
      {activePlanet === 'earth' && (
        <group>
          <Planet 
            position={[0, 0, -15]} 
            texturePath="/textures/earth.jpg" 
            size={4}
            onClick={() => handlePlanetClick('earth')}
          />
          {/* <CloudLayer size={4} speed={0.0005} /> */}
        </group>
      )}
      
      {activePlanet === 'mars' && (
        <Planet 
          position={[0, 0, -15]} 
          texturePath="/textures/mars.jpg" 
          size={3} 
          rotationSpeed={0.003}
          onClick={() => handlePlanetClick('mars')}
        />
      )}
      
      {activePlanet === 'jupiter' && (
        <Planet 
          position={[0, 0, -20]} 
          texturePath="/textures/jupiter.jpg" 
          size={6} 
          rotationSpeed={0.004}
          onClick={() => handlePlanetClick('jupiter')}
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
          onClick={() => handlePlanetClick('saturn')}
        />
      )}
      
      {/* Enhanced orbit controls */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true} 
        zoomSpeed={0.6}
        minDistance={10}
        maxDistance={50}
        enabled={!isTransitioning}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
      
      {/* Environment lighting for better rendering */}
      <Environment preset="night" />
    </Canvas>
  );
};

export default SpaceScene;
