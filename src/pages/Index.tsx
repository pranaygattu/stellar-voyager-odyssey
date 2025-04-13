
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import * as THREE from 'three';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Setup Three.js scene for the landing page
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Add stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.5
    });
    
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add Earth
    const earthGeometry = new THREE.SphereGeometry(10, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233FF,
      specular: 0x555555,
      shininess: 30
    });
    
    // Create atmospheric glow
    const earthAtmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(10.5, 32, 32),
      new THREE.MeshPhongMaterial({
        color: 0x88CCFF,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.3
      })
    );
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    
    // Create continents
    const landGeometry = new THREE.SphereGeometry(10.01, 32, 32);
    const landMaterial = new THREE.MeshPhongMaterial({
      color: 0x00AA00,
      specular: 0x555555,
      shininess: 5
    });
    const land = new THREE.Mesh(landGeometry, landMaterial);
    
    // Only show continents on parts of the sphere
    const landVertices = landGeometry.attributes.position.array;
    const landColors = [];
    
    for (let i = 0; i < landVertices.length; i += 3) {
      const x = landVertices[i];
      const y = landVertices[i + 1];
      const z = landVertices[i + 2];
      
      // Create random continent patterns
      const noise = Math.sin(x * 5) * Math.sin(y * 5) * Math.sin(z * 5);
      
      if (noise > 0.8) {
        landColors.push(0, 1, 0); // Green for land
      } else {
        landColors.push(0, 0, 1); // Blue for water (will be invisible against blue earth)
      }
    }
    
    scene.add(earth);
    scene.add(earthAtmosphere);
    earth.add(land);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate stars slightly
      stars.rotation.y += 0.0002;
      
      // Rotate Earth
      earth.rotation.y += 0.001;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Set loading to false after initial render
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);
  
  const handleStart = () => {
    navigate('/journey');
  };
  
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* 3D Canvas background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full bg-[#030014]"
      />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-wider">
          <span className="text-blue-400">STELLAR</span> VOYAGER
        </h1>
        <p className="text-xl md:text-2xl text-blue-200 mb-10 max-w-md">
          Embark on an interplanetary journey through our solar system
        </p>
        
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-300 border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-200">Preparing launch sequence...</p>
          </div>
        ) : (
          <Button 
            onClick={handleStart} 
            className="glow-button bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white px-8 py-6 rounded-full text-xl transition-all duration-300 animate-pulse-light"
          >
            BEGIN JOURNEY
          </Button>
        )}
      </div>
      
      <div className="absolute bottom-8 w-full text-center text-blue-200/70 text-sm">
        <p>© 2025 Stellar Voyager Odyssey | Use scroll to travel between planets</p>
      </div>
    </div>
  );
};

export default Index;
