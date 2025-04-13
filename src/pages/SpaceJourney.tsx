
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Planet from '@/components/Planet';
import StarField from '@/components/StarField';
import ControlPanel from '@/components/ControlPanel';
import LightspeedEffect from '@/components/LightspeedEffect';

const SpaceJourney: React.FC = () => {
  const [activePlanet, setActivePlanet] = useState('earth');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showStarField, setShowStarField] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Handle scroll-based navigation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isTransitioning) return;
      
      const scrollY = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      
      // Determine which planet section is currently visible
      if (scrollY < windowHeight * 0.5) {
        setActivePlanet('earth');
      } else if (scrollY < windowHeight * 1.5) {
        setActivePlanet('mars');
      } else if (scrollY < windowHeight * 2.5) {
        setActivePlanet('jupiter');
      } else {
        setActivePlanet('saturn');
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isTransitioning]);
  
  // Handle navigation between planets
  const handleNavigate = (planet: string) => {
    if (isTransitioning || planet === activePlanet) return;
    
    setIsTransitioning(true);
    
    // Calculate index of the target planet
    const planets = ['earth', 'mars', 'jupiter', 'saturn'];
    const targetIndex = planets.indexOf(planet);
    
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: targetIndex * window.innerHeight,
        behavior: 'smooth'
      });
      
      // Wait for scrolling to complete
      setTimeout(() => {
        setActivePlanet(planet);
        setIsTransitioning(false);
      }, 1000);
    }
  };
  
  return (
    <div 
      className="relative h-screen w-screen overflow-hidden bg-space-darker"
      onClick={() => setShowStarField(prev => !prev)}
    >
      {/* Interactive star background with parallax effect */}
      <StarField starCount={200} interactive={showStarField} />
      
      {/* Lightspeed effect during transitions */}
      <LightspeedEffect 
        active={isTransitioning} 
        onComplete={() => setIsTransitioning(false)} 
      />
      
      {/* Planet viewing sections */}
      <div ref={containerRef} className="space-container relative z-10">
        {/* Earth Section */}
        <section className="planet-section earth-section relative flex items-center justify-center">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
            <div className="md:w-1/2 text-left mb-8 md:mb-0 z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Earth</h2>
              <p className="text-blue-200 mb-6 max-w-md">
                Our home planet, teeming with life and covered in vast oceans. 
                Earth is the only known celestial body in our solar system 
                that supports life as we know it.
              </p>
              <div className="text-blue-300 space-y-2 text-sm">
                <div><span className="font-bold">Distance from Sun:</span> 149.6 million km</div>
                <div><span className="font-bold">Rotation Period:</span> 23.9 hours</div>
                <div><span className="font-bold">Orbital Period:</span> 365.3 days</div>
                <div><span className="font-bold">Mean Temperature:</span> 15°C</div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Planet type="earth" size={320} />
            </div>
          </div>
        </section>
        
        {/* Mars Section */}
        <section className="planet-section mars-section relative flex items-center justify-center">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
            <div className="md:w-1/2 text-left mb-8 md:mb-0 z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Mars</h2>
              <p className="text-red-200 mb-6 max-w-md">
                The Red Planet, named after the Roman god of war, is home to the 
                largest volcano in our solar system, Olympus Mons, and a vast canyon 
                system called Valles Marineris.
              </p>
              <div className="text-red-300 space-y-2 text-sm">
                <div><span className="font-bold">Distance from Sun:</span> 227.9 million km</div>
                <div><span className="font-bold">Rotation Period:</span> 24.6 hours</div>
                <div><span className="font-bold">Orbital Period:</span> 687 days</div>
                <div><span className="font-bold">Mean Temperature:</span> -65°C</div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Planet type="mars" size={260} rotationSpeed="animate-rotate-medium" />
            </div>
          </div>
        </section>
        
        {/* Jupiter Section */}
        <section className="planet-section jupiter-section relative flex items-center justify-center">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
            <div className="md:w-1/2 text-left mb-8 md:mb-0 z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Jupiter</h2>
              <p className="text-orange-200 mb-6 max-w-md">
                The largest planet in our solar system, Jupiter is a gas giant with 
                a distinctive feature called the Great Red Spot, a massive storm that 
                has been raging for hundreds of years.
              </p>
              <div className="text-orange-300 space-y-2 text-sm">
                <div><span className="font-bold">Distance from Sun:</span> 778.5 million km</div>
                <div><span className="font-bold">Rotation Period:</span> 9.9 hours</div>
                <div><span className="font-bold">Orbital Period:</span> 11.9 years</div>
                <div><span className="font-bold">Moons:</span> 79 confirmed</div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Planet type="jupiter" size={400} rotationSpeed="animate-rotate-fast" />
            </div>
          </div>
        </section>
        
        {/* Saturn Section */}
        <section className="planet-section saturn-section relative flex items-center justify-center">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
            <div className="md:w-1/2 text-left mb-8 md:mb-0 z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Saturn</h2>
              <p className="text-yellow-200 mb-6 max-w-md">
                Famous for its stunning ring system, Saturn is the second-largest planet 
                in our solar system. Its beautiful rings are made mostly of ice particles 
                with a smaller amount of rocky debris and dust.
              </p>
              <div className="text-yellow-300 space-y-2 text-sm">
                <div><span className="font-bold">Distance from Sun:</span> 1.4 billion km</div>
                <div><span className="font-bold">Rotation Period:</span> 10.7 hours</div>
                <div><span className="font-bold">Orbital Period:</span> 29.5 years</div>
                <div><span className="font-bold">Moons:</span> 82 confirmed</div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Planet type="saturn" size={350} rotationSpeed="animate-rotate-medium" />
            </div>
          </div>
        </section>
      </div>
      
      {/* Control panel UI at bottom of screen */}
      <ControlPanel onNavigate={handleNavigate} />
      
      {/* Info overlay - tap anywhere to toggle full starfield */}
      <div className="fixed top-4 left-0 w-full text-center text-blue-200/70 text-sm z-20 pointer-events-none">
        <p>Tap anywhere to toggle view mode. Scroll to travel between planets.</p>
      </div>
    </div>
  );
};

export default SpaceJourney;
