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
    for (let i = 0; i < 300; i++) {
      const star = document.createElement('div');
      star.className = 'lightspeed-star';
      
      // Random position covering the entire viewport
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      // Variable width for more realistic effect
      const width = Math.random() * 150 + 30;
      
      star.style.width = `${width}px`;
      star.style.height = `${Math.random() * 2 + 1}px`; // Variable height
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      
      // Shorter animation duration for better performance
      star.style.animation = `lightspeed ${Math.random() * 1 + 0.5}s forwards`;
      star.style.animationDelay = `${Math.random() * 0.2}s`;
      
      // Add color variation - keeping mostly white for better visibility
      const colors = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#8BE9FD', '#50FA7B', '#BD93F9'];
      star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      container.appendChild(star);
    }
    
    // Sound effect for lightspeed - making it optional to prevent blocking
    try {
      const audio = new Audio('/lightspeed.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio playback prevented', e));
    } catch (err) {
      console.log('Audio not supported', err);
    }
    
    // Trigger callback when animation is complete with a safer approach
    const timeout = setTimeout(() => {
      if (onComplete && typeof onComplete === 'function') {
        onComplete();
      }
    }, 2000);
    
    return () => {
      clearTimeout(timeout);
      if (container) container.innerHTML = '';
    };
  }, [active, onComplete]);
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed top-0 left-0 w-full h-full z-50 pointer-events-none ${active ? '' : 'hidden'}`}
      data-testid="lightspeed-effect"
      style={{ background: active ? 'rgba(0,0,0,0.5)' : 'transparent' }}
    />
  );
};

export default LightspeedEffect;
