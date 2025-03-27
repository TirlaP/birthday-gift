import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Improved GiftReveal component with full-size image display
const GiftReveal = ({ gift, onClose }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.src = gift.image;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [gift.image]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-auto backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="gift-message w-full max-w-4xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sparkles around corners */}
        <div className="absolute -top-4 -left-4 text-xl">✨</div>
        <div className="absolute -top-4 -right-4 text-xl">✨</div>
        <div className="absolute -bottom-4 -left-4 text-xl">✨</div>
        <div className="absolute -bottom-4 -right-4 text-xl">✨</div>

        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 text-center">
            {gift.name}
          </h2>
          
          <div className="mb-4 overflow-hidden rounded-lg bg-gray-100 shadow-inner relative">
            {imageError ? (
              <div className="w-full h-64 md:h-96 flex items-center justify-center bg-gradient-to-r from-purple-100 to-pink-100 relative">
                <p className="text-gray-500">Image will be added soon!</p>
              </div>
            ) : (
              <div className="relative w-full h-64 md:h-96 overflow-hidden">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={gift.image}
                  alt={gift.name}
                  className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
            )}
          </div>
          
          <p className="text-gray-700 mb-6 text-center">
            {gift.description}
          </p>
          
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium shadow-md"
              onClick={onClose}
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GiftReveal;