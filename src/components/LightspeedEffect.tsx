
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
    
    // Create star streaks for lightspeed effect - much more stars for immersive effect
    for (let i = 0; i < 500; i++) {
      const star = document.createElement('div');
      star.className = 'lightspeed-star';
      
      // Random position covering the entire viewport
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      // Variable width for more realistic effect
      const width = Math.random() * 200 + 50;
      
      star.style.width = `${width}px`;
      star.style.height = `${Math.random() * 3 + 1}px`; // Variable height
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
      star.style.animation = `lightspeed ${Math.random() * 1.5 + 0.3}s forwards`;
      star.style.animationDelay = `${Math.random() * 0.3}s`;
      
      // Add color variation
      const colors = ['#FFFFFF', '#8BE9FD', '#50FA7B', '#BD93F9', '#FF79C6'];
      star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      container.appendChild(star);
    }
    
    // Sound effect for lightspeed
    const audio = new Audio('/lightspeed.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => console.log('Audio playback prevented'));
    
    // Trigger callback when animation is complete
    const timeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);
    
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
