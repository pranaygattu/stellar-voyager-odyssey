import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeDSpace from '@/components/ThreeDSpace';
import LightspeedEffect from '@/components/LightspeedEffect';
import ControlPanel from '@/components/ControlPanel';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Search, Info, ZoomIn, ZoomOut, Compass } from "lucide-react";

const SpaceJourney: React.FC = () => {
  const [activePlanet, setActivePlanet] = useState('earth');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    
    toast({
      title: `Traveling to ${planet.charAt(0).toUpperCase() + planet.slice(1)}`,
      description: "Engaging lightspeed drive...",
      duration: 2000,
    });
    
    // Wait for lightspeed animation to complete
    setTimeout(() => {
      setActivePlanet(planet);
      setIsTransitioning(false);
      
      toast({
        title: `Welcome to ${planet.charAt(0).toUpperCase() + planet.slice(1)}`,
        description: "Arrived at destination",
        duration: 3000,
      });
    }, 2000);
  };
  
  // Handle navigation between planets
  const handleNavigate = (planet: string) => {
    if (isTransitioning || planet === activePlanet) return;
    handleTransition(planet);
  };
  
  // Handle direct planet click in 3D space
  const handlePlanetClick = (planet: string) => {
    if (planet !== activePlanet) {
      handleTransition(planet);
    } else {
      // Show detailed view of current planet
      toast({
        title: `Exploring ${planet.charAt(0).toUpperCase() + planet.slice(1)}`,
        description: "Click and drag to explore the surface",
        duration: 3000,
      });
    }
  };
  
  const getPlanetDescription = () => {
    switch(activePlanet) {
      case 'earth':
        return "Our home planet, the only known celestial body to harbor life. Featuring vast oceans, diverse ecosystems, and a protective atmosphere.";
      case 'mars':
        return "The Red Planet, named after the Roman god of war. Known for its reddish appearance due to iron oxide on its surface and potential for future human colonization.";
      case 'jupiter':
        return "The largest planet in our solar system, a gas giant composed mainly of hydrogen and helium. Notable for its Great Red Spot, a giant storm system.";
      case 'saturn':
        return "Famous for its stunning ring system made of ice particles, rocks, and dust. A gas giant with an average radius about nine times that of Earth.";
      default:
        return "";
    }
  };
  
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-space-darker">
      {/* 3D Space environment - takes over full screen */}
      <ThreeDSpace 
        activePlanet={activePlanet} 
        isTransitioning={isTransitioning} 
        onPlanetClick={handlePlanetClick} 
      />
      
      {/* Lightspeed effect during transitions */}
      {/* <LightspeedEffect 
        active={isTransitioning} 
        onComplete={() => setIsTransitioning(false)} 
      /> */}
      
      {/* Google Earth-like UI controls */}
      <div className="absolute top-4 left-4 z-30 flex space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-black/40 backdrop-blur-md border-blue-400/30 hover:bg-black/60"
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info size={18} className="text-blue-300" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-black/40 backdrop-blur-md border-blue-400/30 hover:bg-black/60"
        >
          <ZoomIn size={18} className="text-blue-300" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-black/40 backdrop-blur-md border-blue-400/30 hover:bg-black/60"
        >
          <ZoomOut size={18} className="text-blue-300" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-black/40 backdrop-blur-md border-blue-400/30 hover:bg-black/60"
        >
          <Compass size={18} className="text-blue-300" />
        </Button>
      </div>
      
      {/* Search bar - Google Earth style */}
      <div className="absolute top-4 right-4 z-30">
        <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full border border-blue-400/30 px-3 py-1.5">
          <Search size={16} className="text-blue-300 mr-2" />
          <input 
            type="text" 
            placeholder="Search planets..."
            className="bg-transparent border-none focus:outline-none text-blue-100 text-sm placeholder:text-blue-400/50"
          />
        </div>
      </div>
      
      {/* Planet info overlay */}
      {showInfo && (
        <div className="absolute top-20 left-6 z-20 max-w-xs text-white bg-black/40 p-4 rounded-lg backdrop-blur-md border border-blue-400/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            {activePlanet.charAt(0).toUpperCase() + activePlanet.slice(1)}
          </h2>
          
          <p className="text-blue-200 text-sm mb-3">
            {getPlanetDescription()}
          </p>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            {activePlanet === 'earth' && (
              <>
                <div className="bg-black/20 p-2 rounded">
                  <span className="block text-blue-400">Diameter</span>
                  <span className="font-mono">12,742 km</span>
                </div>
                <div className="bg-black/20 p-2 rounded">
                  <span className="block text-blue-400">Distance from Sun</span>
                  <span className="font-mono">149.6M km</span>
                </div>
              </>
            )}
            {activePlanet === 'mars' && (
              <>
                <div className="bg-black/20 p-2 rounded">
                  <span className="block text-red-400">Diameter</span>
                  <span className="font-mono">6,779 km</span>
                </div>
                <div className="bg-black/20 p-2 rounded">
                  <span className="block text-red-400">Distance from Sun</span>
                  <span className="font-mono">227.9M km</span>
                </div>
              </>
            )}
            {activePlanet === 'jupiter' && (
              <>
                <div className="bg-black/20 p-2 rounded">
                  <span className="block text-orange-400">Diameter</span>
                  <span className="font-mono">139,820 km</span>
                </div>
                <div className="bg-black/20 p-2 rounded">
                  <span className="block text-orange-400">Distance from Sun</span>
                  <span className="font-mono">778.5M km</span>
                </div>
              </>
            )}
            {activePlanet === 'saturn' && (
              <>
                <div className="bg-black/20 p-2 rounded">
                  <span className="block text-yellow-400">Diameter</span>
                  <span className="font-mono">116,460 km</span>
                </div>
                <div className="bg-black/20 p-2 rounded">
                  <span className="block text-yellow-400">Distance from Sun</span>
                  <span className="font-mono">1.4B km</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Control panel UI at bottom of screen */}
      <div className="absolute bottom-0 left-0 w-full z-30">
        <ControlPanel onNavigate={handleNavigate} />
      </div>
      
      {/* Google Earth-like navigation hints */}
      <div className="fixed bottom-4 right-4 text-blue-200/70 text-xs z-20 bg-black/30 p-2 rounded backdrop-blur-sm">
        <p>Scroll to travel between planets • Click and drag to explore</p>
      </div>
    </div>
  );
};

export default SpaceJourney;
