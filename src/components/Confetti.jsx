import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

// Memoized confetti piece to prevent unnecessary re-renders
const ConfettiPiece = memo(({ delay, x, size, color, duration, rotation }) => (
  <motion.div
    className={`confetti ${color}`}
    initial={{ 
      x: `${x}vw`, 
      y: '-10vh', 
      rotate: 0,
      opacity: 1 
    }}
    animate={{ 
      y: '105vh', 
      rotate: rotation,
      opacity: [1, 1, 0.8, 0.4, 0]
    }}
    transition={{ 
      duration,
      ease: "easeOut", 
      delay,
      opacity: { duration: duration * 0.8, delay: duration * 0.2 }
    }}
    style={{ 
      width: size, 
      height: size,
      borderRadius: Math.random() > 0.2 ? '50%' : '2px',
      willChange: 'transform, opacity', // Performance hint to the browser
    }}
  />
));

ConfettiPiece.displayName = 'ConfettiPiece';

// Optimized confetti component
const Confetti = () => {
  const [pieces, setPieces] = useState([]);
  
  useEffect(() => {
    // Optimized with fewer color options and pieces
    const colors = [
      'bg-pink-500', 'bg-blue-500', 'bg-green-500', 
      'bg-yellow-400', 'bg-purple-500', 'bg-red-500'
    ];
    
    // Create a reasonable number of confetti pieces based on screen size
    const screenWidth = window.innerWidth;
    const pieceCount = screenWidth < 768 ? 40 : 60; // Fewer pieces on mobile
    
    const confettiPieces = Array.from({ length: pieceCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1, // shorter delay
      size: 4 + Math.random() * 8, // smaller pieces
      duration: 2 + Math.random() * 2, // shorter duration
      rotation: Math.random() > 0.5 ? 180 : -180, // simplified rotation
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setPieces(confettiPieces);
    
    // Clean up
    return () => setPieces([]);
  }, []);
  
  // Using React.Fragment to avoid an extra div
  return (
    <>
      {pieces.map((piece) => (
        <ConfettiPiece 
          key={piece.id}
          x={piece.x}
          delay={piece.delay}
          size={piece.size}
          color={piece.color}
          duration={piece.duration}
          rotation={piece.rotation}
        />
      ))}
    </>
  );
};

export default Confetti;