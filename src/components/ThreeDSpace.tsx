import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, useTexture, Environment } from '@react-three/drei';
import { EffectComposer, GodRays } from '@react-three/postprocessing';

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

// New component for Earth and its orbiting Moon
interface EarthSystemProps {
  onPlanetClick: (planet: string) => void;
}

function EarthSystem({ onPlanetClick }: EarthSystemProps) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Group>(null);
  const orbitRadius = 6;
  const orbitSpeed = 0.5;

  useFrame(({ clock }) => {
    // Orbit calculation for the Moon
    if (moonRef.current) {
      const elapsedTime = clock.getElapsedTime();
      moonRef.current.position.x = Math.sin(elapsedTime * orbitSpeed) * orbitRadius;
      moonRef.current.position.z = Math.cos(elapsedTime * orbitSpeed) * orbitRadius;
      moonRef.current.rotation.y = elapsedTime * 0.1; 
    }
  });

  return (
    <group ref={earthGroupRef} position={[0, 0, -15]}> {/* Base position for the Earth system */}
      {/* Earth Planet */}
      <Planet 
        position={[0, 0, 0]} // Relative to group
        texturePath="/textures/earth.jpg" 
        size={4}
        onClick={() => onPlanetClick('earth')}
      />
      {/* Moon Orbiting Earth - Re-enabled */}
      <group ref={moonRef}> 
        <Planet 
          position={[0, 0, 0]} // Position is controlled by useFrame
          texturePath="/textures/moon.jpg" // Make sure this file exists!
          size={1} 
          rotationSpeed={0.005}
          onClick={() => onPlanetClick('earth')} // Clicking moon focuses Earth
        />
      </group>
      {/* Cloud layer remains commented out due to previous issues 
      <CloudLayer size={4} speed={0.0005} /> */}
    </group>
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
  
  const sunRef = useRef<THREE.Mesh>(null); // Ref for the Sun mesh
  
  // Log sunRef after mount to check if it's assigned
  useEffect(() => {
    console.log("Sun Ref:", sunRef.current);
  }, []);
  
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
      
      <EffectComposer>
        {/* Dynamic stars background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          fade
          speed={isTransitioning ? 40 : 1}
        />
        
        {/* Sun with glow - Moved further and made white/brighter */}
        <mesh ref={sunRef} position={[0, 0, -300]}> 
          <sphereGeometry args={[8, 32, 32]} />
          <meshBasicMaterial color="#FFFFFF" /> 
          <pointLight position={[0, 0, 0]} intensity={6} distance={400} decay={2} /> 
        </mesh>
        <mesh position={[0, 0, -300]}> 
          <sphereGeometry args={[8.5, 32, 32]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} /> 
        </mesh>
        
        {/* Planets */}
        {activePlanet === 'earth' && (
          <EarthSystem onPlanetClick={handlePlanetClick} />
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

        {/* God Rays Effect - Requires sunRef to be assigned */}
        {sunRef.current && (
          <GodRays
            sun={sunRef.current}
            config={{
              density: 0.97,
              decay: 0.95,
              weight: 1.5,
              exposure: 1,
              clampMax: 1,
              samples: 100,
              blur: false,
            }}
          />
        )}
      </EffectComposer>
    </Canvas>
  );
};

export default SpaceScene;
