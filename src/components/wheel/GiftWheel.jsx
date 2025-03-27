import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import WheelSegment from './WheelSegment';

const GiftWheel = ({ gifts, openedGifts, onSelectGift }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const wheelRef = useRef(null);
  
  // Filter out already opened gifts
  const availableGifts = gifts.filter(gift => !openedGifts.includes(gift.id));

  // Calculate segment angles
  const segmentAngle = 360 / availableGifts.length;
  
  // Handle spinning the wheel
  const spinWheel = () => {
    if (isSpinning || availableGifts.length === 0) return;
    
    setIsSpinning(true);
    
    // Random number of rotations (2-5 full rotations) + random segment
    const minSpins = 2; // Minimum number of full rotations
    const maxSpins = 5; // Maximum number of full rotations
    const spinAmount = (minSpins + Math.random() * (maxSpins - minSpins)) * 360;
    
    // Random selection for landing spot
    const randomIndex = Math.floor(Math.random() * availableGifts.length);
    const selectedGiftSegment = availableGifts[randomIndex];
    
    // Calculate final rotation to land on the selected gift
    // We add a small offset to ensure it lands in the middle of the segment
    const segmentOffset = (randomIndex * segmentAngle) + (segmentAngle / 2);
    const finalRotation = rotation + spinAmount + (360 - segmentOffset);
    
    // Animate the wheel rotation
    setRotation(finalRotation);
    
    // Set a timer to "select" the gift after the wheel stops spinning
    setTimeout(() => {
      setSelectedGift(selectedGiftSegment);
      setIsSpinning(false);
      onSelectGift(selectedGiftSegment);
    }, 3000); // This should match the duration of the rotation animation
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative mb-8">
        {/* Arrow indicator */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-0 h-0 
                        border-l-[15px] border-l-transparent 
                        border-t-[20px] border-t-pink-500 
                        border-r-[15px] border-r-transparent
                        z-10">
          <div className="absolute -top-7 -left-3 text-xl">✨</div>
        </div>
        
        {/* Wheel container */}
        <motion.div
          ref={wheelRef}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl border-4 border-purple-300"
          animate={{ rotate: rotation }}
          transition={{ 
            duration: 3,
            type: "spring",
            damping: 20
          }}
        >
          {availableGifts.map((gift, index) => (
            <WheelSegment
              key={gift.id}
              gift={gift}
              index={index}
              segmentAngle={segmentAngle}
              total={availableGifts.length}
            />
          ))}
          
          {/* Center of wheel */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-inner border-2 border-purple-300 z-20" />
        </motion.div>
      </div>
      
      {/* Spin button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={spinWheel}
        disabled={isSpinning || availableGifts.length === 0}
        className={`px-8 py-3 rounded-full text-lg font-bold shadow-lg ${
          isSpinning || availableGifts.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white cursor-pointer'
        }`}
      >
        {availableGifts.length === 0 
          ? "All gifts opened!" 
          : isSpinning 
            ? "Spinning..." 
            : "Spin for a Gift!"}
      </motion.button>
      
      {/* Message when all gifts have been opened */}
      {availableGifts.length === 0 && (
        <p className="mt-4 text-center text-purple-700">
          You've discovered all your gifts! 🎉
        </p>
      )}
    </div>
  );
};

export default GiftWheel;