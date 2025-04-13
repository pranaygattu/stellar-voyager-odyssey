
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Planet from '@/components/Planet';
import StarField from '@/components/StarField';
import ControlPanel from '@/components/ControlPanel';
import { Button } from '@/components/ui/button';

const EarthView: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-space-darker">
      {/* Star background */}
      <StarField starCount={150} />
      
      {/* Earth display */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="container mx-auto flex flex-1 items-center">
          <div className="w-full flex flex-col md:flex-row items-center justify-between">
            {/* Left side - Info panel */}
            <div className="md:w-2/5 text-left p-6 bg-space-dark bg-opacity-50 rounded-lg backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-blue-400">Earth</h2>
                <Button 
                  onClick={() => navigate('/journey')}
                  variant="outline" 
                  className="border-blue-500/50 text-blue-400"
                >
                  Continue Journey
                </Button>
              </div>
              
              <p className="text-blue-100 mb-6">
                Third planet from the Sun and the only astronomical object known to harbor life.
                Earth's atmosphere primarily consists of nitrogen and oxygen, with a protective
                ozone layer that shields the planet from harmful solar radiation.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-space-dark bg-opacity-70 p-3 rounded-md">
                  <div className="text-blue-400 font-bold mb-1">Mass</div>
                  <div className="text-white">5.97 × 10²⁴ kg</div>
                </div>
                <div className="bg-space-dark bg-opacity-70 p-3 rounded-md">
                  <div className="text-blue-400 font-bold mb-1">Diameter</div>
                  <div className="text-white">12,742 km</div>
                </div>
                <div className="bg-space-dark bg-opacity-70 p-3 rounded-md">
                  <div className="text-blue-400 font-bold mb-1">Gravity</div>
                  <div className="text-white">9.8 m/s²</div>
                </div>
                <div className="bg-space-dark bg-opacity-70 p-3 rounded-md">
                  <div className="text-blue-400 font-bold mb-1">Day Length</div>
                  <div className="text-white">23.9 hours</div>
                </div>
                <div className="bg-space-dark bg-opacity-70 p-3 rounded-md">
                  <div className="text-blue-400 font-bold mb-1">Atmosphere</div>
                  <div className="text-white">N₂, O₂, Ar, CO₂</div>
                </div>
                <div className="bg-space-dark bg-opacity-70 p-3 rounded-md">
                  <div className="text-blue-400 font-bold mb-1">Surface Temp</div>
                  <div className="text-white">-88°C to 58°C</div>
                </div>
              </div>
            </div>
            
            {/* Right side - Planet display */}
            <div className="md:w-3/5 flex justify-center items-center">
              <Planet type="earth" size={400} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Control panel UI */}
      <ControlPanel onNavigate={(planet) => navigate('/journey')} />
    </div>
  );
};

export default EarthView;
