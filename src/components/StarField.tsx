
import React, { useEffect, useRef } from 'react';

interface StarFieldProps {
  starCount?: number;
  interactive?: boolean;
}

const StarField: React.FC<StarFieldProps> = ({ 
  starCount = 100,
  interactive = false 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const x = Math.random() * containerWidth;
      const y = Math.random() * containerHeight;
      
      // Random size (smaller stars are more common)
      const size = Math.random() * 3;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      
      // Add some twinkling effect with different animation delays
      const delay = Math.random() * 5;
      star.style.animation = `twinkle 3s ease-in-out ${delay}s infinite`;
      
      // Add a subtle glow to larger stars
      if (size > 2) {
        star.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.8)';
      }
      
      container.appendChild(star);
    }
    
    // Interactive movement for stars if enabled
    if (interactive) {
      const handleMouseMove = (e: MouseEvent) => {
        const stars = container.querySelectorAll('.star');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        stars.forEach((star: Element) => {
          const starElement = star as HTMLElement;
          const speed = parseFloat(starElement.style.width) * 0.05;
          
          // Calculate new position based on mouse movement
          const starX = parseFloat(starElement.style.left);
          const starY = parseFloat(starElement.style.top);
          
          const dx = mouseX - containerWidth / 2;
          const dy = mouseY - containerHeight / 2;
          
          // Move stars in the opposite direction of the mouse
          const newX = starX - dx * speed * 0.01;
          const newY = starY - dy * speed * 0.01;
          
          // Apply boundaries
          starElement.style.left = `${Math.max(0, Math.min(containerWidth, newX))}px`;
          starElement.style.top = `${Math.max(0, Math.min(containerHeight, newY))}px`;
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [starCount, interactive]);
  
  return <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-0"></div>;
};

export default StarField;
