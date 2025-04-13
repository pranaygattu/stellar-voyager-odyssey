
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeDSpace from '@/components/ThreeDSpace';
import LightspeedEffect from '@/components/LightspeedEffect';
import ControlPanel from '@/components/ControlPanel';

const SpaceJourney: React.FC = () => {
  const [activePlanet, setActivePlanet] = useState('earth');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Handle scroll-based navigation
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (isTransitioning) return;
      
      const planets = ['earth', 'mars', 'jupiter', 'saturn'];
      const currentIndex = planets.indexOf(activePlanet);
      let targetIndex;
      
      // Determine direction of scroll
      if (e.deltaY > 0 && currentIndex < planets.length - 1) {
        // Scrolling down
        targetIndex = currentIndex + 1;
        handleTransition(planets[targetIndex]);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scrolling up
        targetIndex = currentIndex - 1;
        handleTransition(planets[targetIndex]);
      }
    };
    
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [activePlanet, isTransitioning]);
  
  const handleTransition = (planet: string) => {
    if (isTransitioning || planet === activePlanet) return;
    
    setIsTransitioning(true);
    
    // Wait for lightspeed animation to complete
    setTimeout(() => {
      setActivePlanet(planet);
      setIsTransitioning(false);
    }, 2000);
  };
  
  // Handle navigation between planets
  const handleNavigate = (planet: string) => {
    if (isTransitioning || planet === activePlanet) return;
    handleTransition(planet);
  };
  
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-space-darker">
      {/* 3D Space environment - takes over full screen */}
      <ThreeDSpace activePlanet={activePlanet} isTransitioning={isTransitioning} />
      
      {/* Lightspeed effect during transitions */}
      <LightspeedEffect 
        active={isTransitioning} 
        onComplete={() => setIsTransitioning(false)} 
      />
      
      {/* Planet info overlay */}
      <div className="absolute top-10 left-10 z-20 text-white bg-black/40 p-4 rounded-lg backdrop-blur-md">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          {activePlanet.charAt(0).toUpperCase() + activePlanet.slice(1)}
        </h2>
        
        {activePlanet === 'earth' && (
          <p className="text-blue-200 max-w-xs">
            Our home planet, the only known celestial body to harbor life.
          </p>
        )}
        
        {activePlanet === 'mars' && (
          <p className="text-red-200 max-w-xs">
            The Red Planet, named after the Roman god of war.
          </p>
        )}
        
        {activePlanet === 'jupiter' && (
          <p className="text-orange-200 max-w-xs">
            The largest planet in our solar system, a gas giant.
          </p>
        )}
        
        {activePlanet === 'saturn' && (
          <p className="text-yellow-200 max-w-xs">
            Famous for its stunning ring system made of ice particles.
          </p>
        )}
      </div>
      
      {/* Control panel UI at bottom of screen */}
      <div className="absolute bottom-0 left-0 w-full z-30">
        <ControlPanel onNavigate={handleNavigate} />
      </div>
      
      {/* Info overlay */}
      <div className="fixed top-4 right-4 text-blue-200/70 text-sm z-20 bg-black/30 p-2 rounded backdrop-blur-sm">
        <p>Scroll to travel between planets. Click and drag to explore.</p>
      </div>
    </div>
  );
};

export default SpaceJourney;
