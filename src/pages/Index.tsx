
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import StarField from '@/components/StarField';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    navigate('/journey');
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden bg-space-darker">
      <StarField starCount={150} />
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-wider">
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
