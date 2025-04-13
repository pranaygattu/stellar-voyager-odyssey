
import React, { useRef, useEffect } from 'react';

interface PlanetProps {
  type: 'earth' | 'mars' | 'jupiter' | 'saturn';
  size?: number;
  rotationSpeed?: string;
}

const Planet: React.FC<PlanetProps> = ({ 
  type, 
  size = 300, 
  rotationSpeed = 'animate-rotate-slow' 
}) => {
  const planetRef = useRef<HTMLDivElement>(null);
  
  // Planet texture and color configurations
  const planetConfig = {
    earth: {
      mainColor: 'from-blue-500 to-green-500',
      overlayColor: 'bg-blue-600/30',
      highlights: 'bg-green-400/30',
      shadow: 'bg-blue-900/50',
    },
    mars: {
      mainColor: 'from-red-500 to-orange-700',
      overlayColor: 'bg-red-800/30',
      highlights: 'bg-orange-500/20',
      shadow: 'bg-red-900/50',
    },
    jupiter: {
      mainColor: 'from-orange-300 to-amber-700',
      overlayColor: 'bg-orange-600/30',
      highlights: 'bg-amber-400/30',
      shadow: 'bg-amber-900/50',
    },
    saturn: {
      mainColor: 'from-yellow-200 to-amber-600',
      overlayColor: 'bg-yellow-700/20',
      highlights: 'bg-yellow-400/20',
      shadow: 'bg-amber-800/50',
      hasRings: true,
    },
  };
  
  const config = planetConfig[type];
  
  return (
    <div className="relative flex items-center justify-center" style={{ perspective: '1000px' }}>
      {/* Planet */}
      <div 
        ref={planetRef}
        className={`relative rounded-full bg-gradient-to-br ${config.mainColor} ${rotationSpeed}`}
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          boxShadow: '0 0 50px rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Surface details */}
        <div className={`absolute inset-0 rounded-full ${config.overlayColor} opacity-60`} 
          style={{ mixBlendMode: 'overlay' }}>
          {/* Random surface details */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className={`absolute rounded-full ${config.highlights}`}
              style={{
                width: `${Math.random() * (size * 0.5) + 20}px`,
                height: `${Math.random() * (size * 0.3) + 20}px`,
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
                opacity: Math.random() * 0.8 + 0.2,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
        
        {/* Shadow side */}
        <div 
          className={`absolute top-0 left-0 w-1/2 h-full rounded-l-full ${config.shadow}`}
          style={{ 
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '50%' 
          }}
        />
      </div>
      
      {/* Saturn's rings */}
      {type === 'saturn' && (
        <div className="absolute">
          <div className="absolute" style={{
            width: `${size * 1.8}px`,
            height: `${size * 0.1}px`,
            background: 'linear-gradient(90deg, rgba(255,230,170,0.3) 0%, rgba(200,180,120,0.7) 20%, rgba(255,230,170,0.8) 50%, rgba(200,180,120,0.7) 80%, rgba(255,230,170,0.3) 100%)',
            transform: 'rotateX(75deg)',
            borderRadius: '50%',
            boxShadow: '0 0 20px rgba(200,180,120,0.5)'
          }} />
        </div>
      )}
    </div>
  );
};

export default Planet;
