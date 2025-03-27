import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

/**
 * Improved GiftReveal component with enhanced image loading and error handling
 * Memoized to prevent unnecessary re-renders
 */
const GiftReveal = memo(({ gift, onClose }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const retryCount = useRef(0);
  const maxRetries = 3;

  // Memoize the close function to prevent re-renders
  const handleClose = useCallback((e) => {
    e && e.stopPropagation();
    onClose();
  }, [onClose]);

  // Memoize the stopPropagation function
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  // Preload the image with retry logic
  useEffect(() => {
    let isMounted = true;
    const loadImage = (url) => {
      const img = new Image();
      img.src = url;
      
      img.onload = () => {
        if (isMounted) {
          setImageLoaded(true);
          setImageError(false);
        }
      };
      
      img.onerror = () => {
        if (!isMounted) return;
        
        // Implement retry logic
        if (retryCount.current < maxRetries) {
          retryCount.current++;
          console.log(`Retrying image load attempt ${retryCount.current}/${maxRetries}`);
          // Add cache-busting parameter to prevent cached error responses
          setTimeout(() => loadImage(`${url}?retry=${Date.now()}`), 1000);
        } else {
          setImageError(true);
          console.error(`Failed to load image after ${maxRetries} attempts:`, url);
        }
      };
    };

    // Start loading
    setImageLoaded(false);
    setImageError(false);
    retryCount.current = 0;
    loadImage(gift.image);
    
    return () => {
      isMounted = false;
    };
  }, [gift.image]);

  // Memoized handlers for image error and load events
  const handleImageError = useCallback(() => {
    if (!imageError) {
      setImageError(true);
    }
  }, [imageError]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // Memoized handler for retry button
  const handleRetry = useCallback(() => {
    setImageError(false);
    retryCount.current = 0;
    setImageLoaded(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-auto backdrop-blur-sm"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="gift-message w-full max-w-4xl relative overflow-hidden"
        onClick={stopPropagation}
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
                <div className="text-center p-4">
                  <p className="text-gray-600 mb-2">Unable to load image</p>
                  <button 
                    onClick={handleRetry}
                    className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm hover:bg-purple-600 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-64 md:h-96 overflow-hidden">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-sm text-purple-600">Loading your gift...</p>
                    </div>
                  </div>
                )}
                <OptimizedImage
                  src={gift.image}
                  alt={gift.name}
                  className="w-full h-full object-contain"
                  loading="eager" // Use eager for the modal since it's the focal point
                  onError={handleImageError}
                  onLoad={handleImageLoad}
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
              onClick={handleClose}
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

// Add display name for better debugging
GiftReveal.displayName = 'GiftReveal';

export default GiftReveal;