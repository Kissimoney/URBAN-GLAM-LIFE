
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!isVisible) setIsVisible(true);
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
      if (ringRef.current) {
        // Use a slight delay for the ring via transition or manual raf
        ringRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsHovering(true);
    const onMouseUp = () => setIsHovering(false);

    const handleLinkHover = () => {
      const hoverables = document.querySelectorAll('a, button, .cursor-pointer, input, select, textarea');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    // Initial check and dynamic check for new elements
    handleLinkHover();
    const observer = new MutationObserver(handleLinkHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
      />
      <div 
        ref={ringRef}
        className={`custom-cursor fixed top-0 left-0 border border-gold/40 rounded-full z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          isHovering ? 'w-16 h-16 bg-gold/5 scale-110 opacity-100' : 'w-10 h-10 opacity-40 scale-100'
        }`}
      />
    </>
  );
};

export default CustomCursor;
