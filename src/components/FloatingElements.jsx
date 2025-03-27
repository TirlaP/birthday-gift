import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

// Floating balloon component
const Balloon = memo(({ emoji, x, y, delay, duration, scale, rotation }) => (
  <motion.div 
    className="fixed text-4xl sm:text-5xl md:text-6xl pointer-events-none select-none"
    initial={{ x, y: '110vh', rotate: 0 }}
    animate={{ 
      y: '-20vh', 
      rotate: rotation,
    }}
    transition={{ 
      repeat: Infinity,
      duration,
      delay,
      ease: "easeInOut",
    }}
    style={{ 
      left: `${x}%`,
      rotate: rotation,
      scale,
      willChange: 'transform',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
      zIndex: 5 // Higher z-index to be above background
    }}
  >
    {emoji}
    <motion.div 
      className="absolute w-1 h-20 bg-gray-300/50 rounded-full left-1/2 -ml-0.5 top-full"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: [1, 1.05, 1] }}
      transition={{ 
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: 'top' }}
    />
  </motion.div>
));

Balloon.displayName = 'Balloon';

// Floating gift component
const FloatingGift = memo(({ emoji, x, y, delay, duration, scale, rotation }) => (
  <motion.div 
    className="fixed text-3xl sm:text-4xl pointer-events-none select-none"
    initial={{ x, y: '110vh', rotate: 0, opacity: 0.7 }}
    animate={{ 
      y: '-20vh', 
      rotate: rotation,
    }}
    transition={{ 
      repeat: Infinity,
      duration,
      delay,
      ease: "easeInOut",
    }}
    style={{ 
      left: `${x}%`,
      rotate: rotation,
      scale,
      willChange: 'transform',
      filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.1))',
      zIndex: 5 // Higher z-index to be above background
    }}
  >
    {emoji}
  </motion.div>
));

FloatingGift.displayName = 'FloatingGift';

// Optimization: Fixed number of elements
const BALLOON_COUNT = 5;
const GIFT_COUNT = 6;
const BALLOON_EMOJIS = ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈'];
const BALLOON_COLORS = ['❤️', '💙', '💜', '💚', '🧡', '💛'];
const GIFT_EMOJIS = ['🎁', '🎀', '🎊', '🎉', '💝', '👑', '🎵', '💌'];

const FloatingElements = () => {
  const [balloons, setBalloons] = useState([]);
  const [gifts, setGifts] = useState([]);
  
  useEffect(() => {
    // Generate balloons
    const newBalloons = Array.from({ length: BALLOON_COUNT }).map((_, i) => {
      const x = 10 + (i * (80 / BALLOON_COUNT));
      const emoji = Math.random() > 0.3 ? 
        BALLOON_EMOJIS[Math.floor(Math.random() * BALLOON_EMOJIS.length)] : 
        BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
        
      return {
        id: `balloon-${i}`,
        emoji,
        x,
        rotation: -5 + Math.random() * 10,
        duration: 40 + Math.random() * 70,
        delay: i * 5,
        scale: 0.8 + Math.random() * 0.4,
      };
    });
    
    // Generate floating gifts
    const newGifts = Array.from({ length: GIFT_COUNT }).map((_, i) => {
      const x = 5 + (i * (90 / GIFT_COUNT));
      
      return {
        id: `gift-${i}`,
        emoji: GIFT_EMOJIS[Math.floor(Math.random() * GIFT_EMOJIS.length)],
        x,
        rotation: -180 + Math.random() * 360,
        duration: 30 + Math.random() * 40,
        delay: 10 + i * 4,
        scale: 0.7 + Math.random() * 0.5,
      };
    });
    
    setBalloons(newBalloons);
    setGifts(newGifts);
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
      {/* Balloons */}
      {balloons.map(balloon => (
        <Balloon 
          key={balloon.id}
          emoji={balloon.emoji}
          x={balloon.x}
          y={balloon.y}
          duration={balloon.duration}
          delay={balloon.delay}
          rotation={balloon.rotation}
          scale={balloon.scale}
        />
      ))}
      
      {/* Floating gifts and elements */}
      {gifts.map(gift => (
        <FloatingGift 
          key={gift.id}
          emoji={gift.emoji}
          x={gift.x}
          y={gift.y}
          duration={gift.duration}
          delay={gift.delay}
          rotation={gift.rotation}
          scale={gift.scale}
        />
      ))}
    </div>
  );
};

export default FloatingElements;