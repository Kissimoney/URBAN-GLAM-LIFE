import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for X and Y positions
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for that "Elite" lag feel
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = (e: MouseEvent) => {
      // Check if the element being hovered is a link, button, or input
      const target = e.target as HTMLElement;
      const isSelectable = target.closest('button, a, input, select, .group');
      setIsHovered(!!isSelectable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 border rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        width: isHovered ? '48px' : '24px',
        height: isHovered ? '48px' : '24px',
        borderColor: '#E2E8F0', // Silver
        backgroundColor: isHovered ? 'rgba(226, 232, 240, 0.1)' : 'transparent',
        borderWidth: isHovered ? '1px' : '2px',
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
    >
      {/* Center dot - stays consistent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#E2E8F0] rounded-full" />
    </motion.div>
  );
};

export default CustomCursor;
