import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Background particle component
const Particle = ({ emoji, delay, duration, x, y, size }) => (
  <motion.div 
    className="fixed text-lg sm:text-xl pointer-events-none select-none opacity-20"
    initial={{ 
      x, 
      y: -50, 
      scale: 0.5,
      opacity: 0 
    }}
    animate={{ 
      y: `calc(100vh + 100px)`, 
      scale: size,
      opacity: [0, 0.15, 0.15, 0],
      rotate: Math.random() > 0.5 ? 360 : -360
    }}
    transition={{ 
      repeat: Infinity,
      duration,
      delay,
      ease: "linear",
      opacity: { duration: duration * 0.8 }
    }}
    style={{ 
      left: `${x}%`,
      willChange: 'transform, opacity',
      zIndex: 1
    }}
  >
    {emoji}
  </motion.div>
);

// Floating bubble component
const FloatingBubble = ({ color, size, x, delay, duration }) => (
  <motion.div
    className={`fixed rounded-full ${color} opacity-10 blur-md pointer-events-none`}
    style={{ 
      width: size,
      height: size,
      left: `${x}%`,
      willChange: 'transform',
      zIndex: 1
    }}
    initial={{ y: '110vh' }}
    animate={{ 
      y: '-10vh',
    }}
    transition={{ 
      repeat: Infinity,
      duration,
      delay,
      ease: "easeInOut",
    }}
  />
);

// Shimmering stars effect
const ShimmeringStars = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    // Create fewer stars on mobile
    const count = window.innerWidth < 768 ? 15 : 30;
    
    const newStars = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 1 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
    
    setStars(newStars);
  }, []);
  
  return (
    <>
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="fixed bg-white rounded-full pointer-events-none"
          style={{ 
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            willChange: 'opacity, transform',
            zIndex: 1
          }}
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

// Main background effects component
const BackgroundEffects = () => {
  const [particles, setParticles] = useState([]);
  const [bubbles, setBubbles] = useState([]);
  
  useEffect(() => {
    // Adapt particle count based on screen size
    const count = window.innerWidth < 768 ? 8 : 12;
    
    // Create floating emoji particles
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      emoji: '✨',
      x: Math.random() * 100,
      y: -50,
      size: 0.7 + Math.random() * 0.8,
      duration: 20 + Math.random() * 40,
      delay: Math.random() * 20,
    }));
    
    // Create floating bubbles
    const bubbleColors = [
      'bg-pink-500', 'bg-purple-500', 'bg-indigo-500', 
      'bg-blue-500', 'bg-teal-500', 'bg-rose-500'
    ];
    
    const bubbleCount = window.innerWidth < 768 ? 5 : 10;
    
    const newBubbles = Array.from({ length: bubbleCount }).map((_, i) => ({
      id: i,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
      size: 20 + Math.random() * 60,
      x: Math.random() * 100,
      duration: 30 + Math.random() * 60,
      delay: Math.random() * 20,
    }));
    
    setParticles(newParticles);
    setBubbles(newBubbles);
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-gradient-radial from-purple-300 to-transparent"
        style={{
          backgroundSize: '200% 200%',
          backgroundPosition: 'center',
          animation: 'pulse 15s infinite ease-in-out',
          zIndex: 1
        }}
      />
      
      {/* Floating particles */}
      {particles.map(particle => (
        <Particle 
          key={particle.id}
          emoji={particle.emoji}
          x={particle.x}
          y={particle.y}
          size={particle.size}
          duration={particle.duration}
          delay={particle.delay}
        />
      ))}
      
      {/* Floating bubbles */}
      {bubbles.map(bubble => (
        <FloatingBubble 
          key={bubble.id}
          color={bubble.color}
          size={bubble.size}
          x={bubble.x}
          duration={bubble.duration}
          delay={bubble.delay}
        />
      ))}
      
      {/* Shimmering stars */}
      <ShimmeringStars />
    </div>
  );
};

export default BackgroundEffects;