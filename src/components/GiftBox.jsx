import { useState, useCallback, memo } from 'react';
import { motion, useMotionValue } from 'framer-motion';

// Optimized GiftBox with responsive design and performance-focused animations
// Memoized to prevent unnecessary re-renders
const GiftBox = memo(({ gift, isOpened, onClick }) => {
  const [isHovering, setIsHovering] = useState(false);
  // Using motion values for more performant animations
  const scale = useMotionValue(1);
  
  // Memoized handlers to prevent recreation on each render
  const handleHoverStart = useCallback(() => {
    setIsHovering(true);
    scale.set(1.03);
  }, [scale]);
  
  const handleHoverEnd = useCallback(() => {
    setIsHovering(false);
    scale.set(1);
  }, [scale]);
  
  // Get a predictable random value for staggered floating
  const getRandomOffset = useCallback((id) => {
    // Use the gift id to create a deterministic "random" offset
    return (((id * 9973) % 8) / 8) * 1.5;
  }, []);
  
  // Memoize the click handler
  const handleClick = useCallback(() => {
    onClick(gift);
  }, [gift, onClick]);
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      className={`gift-box bg-gradient-to-br ${gift.colors.box} relative overflow-visible h-36 sm:h-40 md:h-44 w-full max-w-xs mx-auto`}
      onClick={handleClick}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      style={{ scale }}
      whileTap={{ scale: 0.96 }}
      // Add floating animation
      animate={{ 
        y: [0, -8, 0],
      }}
      transition={{ 
        scale: { type: "spring", damping: 15 },
        y: { 
          repeat: Infinity, 
          duration: 3 + getRandomOffset(gift.id), // Staggered durations
          ease: "easeInOut",
          delay: getRandomOffset(gift.id) // Staggered delays
        }
      }}
    >
      {/* Box base layer */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-br z-0"></div>
      
      {/* Ribbon vertical */}
      <div className={`absolute w-6 h-full top-0 left-1/2 -ml-3 bg-gradient-to-br ${gift.colors.ribbon} z-10`} />
      
      {/* Ribbon horizontal */}
      <div className={`absolute w-full h-6 top-1/3 -mt-3 bg-gradient-to-br ${gift.colors.ribbon} z-20`} />
      
      {/* Simplified Gift Bow */}
      <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 w-10 sm:w-12 h-6 sm:h-8 z-30">
        <div 
          className={`absolute w-full h-6 rounded-full bg-gradient-to-r ${gift.colors.ribbon} opacity-90`}
        />
        <div 
          className={`absolute w-5 sm:w-6 h-6 sm:h-8 left-1/4 -top-1 transform rotate-45 rounded-full bg-gradient-to-r ${gift.colors.ribbon} opacity-90`}
        />
        <div 
          className={`absolute w-5 sm:w-6 h-6 sm:h-8 left-1/4 -top-1 transform -rotate-45 rounded-full bg-gradient-to-r ${gift.colors.ribbon} opacity-90`}
        />
      </div>

      {/* Lid */}
      <motion.div 
        className={`absolute w-full h-1/3 top-0 bg-gradient-to-br ${gift.colors.lid} shadow-md`}
        animate={isOpened 
          ? { y: -40, rotateX: 60, opacity: 0.8 } 
          : isHovering 
            ? { y: -5, rotateX: 10 } 
            : { y: 0, rotateX: 0, opacity: 1 }
        }
        transition={{ 
          type: "spring", 
          damping: 20
        }}
      />
      
      {/* Box shadow for depth */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-2 bg-black/10 rounded-full blur-sm" />
      
      {/* Subtle shine effect for unopened boxes */}
      {!isOpened && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none"
        />
      )}
      
      {/* Gift label - Moved outside the ribbons with higher z-index */}
      <div 
        className="absolute bottom-3 left-0 right-0 flex items-center justify-center z-50"
        style={{ filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.3))" }}
      >
        {isOpened ? (
          <div className="bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <span className="text-sm text-white font-bold">✓ Opened</span>
          </div>
        ) : (
          <div className="bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <span className="text-sm sm:text-base text-white font-bold">Click to open!</span>
          </div>
        )}
      </div>
    </motion.div>
  );
});

// Add display name for better debugging
GiftBox.displayName = 'GiftBox';

export default GiftBox;