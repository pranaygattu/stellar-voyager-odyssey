
import React, { useEffect, useRef } from 'react';

interface LightspeedEffectProps {
  active: boolean;
  onComplete?: () => void;
}

const LightspeedEffect: React.FC<LightspeedEffectProps> = ({ active, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!active || !containerRef.current) return;
    
    const container = containerRef.current;
    container.innerHTML = '';
    
    // Create star streaks for lightspeed effect
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'lightspeed-star';
      
      // Random position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      // Random width (streak length)
      const width = Math.random() * 100 + 20;
      
      star.style.width = `${width}px`;
      star.style.height = '1px';
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.animation = `lightspeed ${Math.random() * 1 + 0.5}s forwards`;
      star.style.animationDelay = `${Math.random() * 0.3}s`;
      
      container.appendChild(star);
    }
    
    // Trigger callback when animation is complete
    const timeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, [active, onComplete]);
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed top-0 left-0 w-full h-full z-50 pointer-events-none ${!active ? 'hidden' : ''}`}
    />
  );
};

export default LightspeedEffect;
